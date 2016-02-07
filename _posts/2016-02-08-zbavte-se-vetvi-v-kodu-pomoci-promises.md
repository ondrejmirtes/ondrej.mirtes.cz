---
title: Zbavte se větví v kódu pomocí promises
---

Nemám rád rozvětvený kód. Více větví (`if`/`elseif`/`else`) představuje více kombinací k testování, komplikovanější a křehčí kód. Řady ifů se dá [zbavit pomocí polymorfismu](https://sourcemaking.com/refactoring/replace-conditional-with-polymorphism), to je známá a věřím, že dostatečně zakořeněná technika.

Dnes chci ale představit způsob, jak se můžete zbavit ifů, pokud splňujete tyto dva předpoklady:

1. Váš kód je asynchronní.
2. Na něco čekáte.

S asynchronním kódem se můžete běžně setkat ve světě JavaScriptu -- v prohlížeči i na serveru v node.js. PHP může být asynchronní, pokud využijete [ReactPHP](http://reactphp.org/). Všechny tyto implementace mají společné to, že běh aplikace je řízený pomocí event loop. Blokující operace, jako provádění HTTP requestů, dotazování do databáze, čtení z disku apod., se v asynchronním prostředí stávají neblokujícími. To znamená, že během čekání na jejich výsledek (odpověď od vzdáleného serveru, výsledek dotazu, obsah souboru) můžete spouštět jiný kód, proces aplikace se tak nikdy nenudí a využíváte efektivněji systémové prostředky.

Druhou podmínku splňujete, pokud váš kód obsahuje podmínky ve stylu:

- "Už doběhl ten dotaz?"
- "Podařilo se navázat spojení, nebo stále ještě čekáme?"
- "Uplynulo X sekund?"

Cílem je upravit kód tak, aby fungoval, pokud už daná záležitost byla, nebo ještě nebyla splněna, a nemusel kód větvit před/po splnění.

Vezměte si následující příklad: Proces má vykonat nějakou práci a zároveň zůstat alespoň 5 sekund naživu, aby [Supervisor](http://supervisord.org/) jeho spuštění považoval za úspěšné. S běžným sychronním kódem bychom postupovali takto:

{% highlight php startinline %}
$startTime = microtime(true);

// vykonávám práci...

$stayAliveSeconds = 5;
$uptime = microtime(true) - $startTime;
if ($uptime < $stayAliveSeconds) {
	usleep(round(($stayAliveSeconds - $uptime) * 1000000));
}

exit(0);
{% endhighlight %}

Ošklivý `if`, který nás donutí při testování danou metodu spustit alespoň dvakrát.

Díky tomu, že naši consumeři front z RabbitMQ běží pod knihovnou [Bunny](https://github.com/jakubkulhan/bunny) a tedy v rámci event loop z ReactPHP, můžeme namísto řešení výše použít [promises](https://github.com/reactphp/promise).

Promise je objekt, který se může nacházet ve tří stavech. Pending, resolved a rejected. Při pending čeká na výsledek, při resolved ho už získal a rejected představuje selhání. Na promise se pomocí metody `then()` navěšují zájemci o výsledek. Vedle promise žije ještě objekt deferred, který slouží jako ovladač ke své promise. Určuje, kdy bude jeho promise splněna. Pro splnění zapouzdření byste ven měli dát k dispozici pouze objekt promise, nikoli deferred.

To, co vám pomůže zbavit se ifů v kódu, je právě chování metody `then()`. Když ji voláte, tak nezáleží na tom, v jakém stavu se právě promise nachází. Pokud ještě není splněná, tak bude předaný callback zavolaný později, jinak okamžitě.

Příklad s `usleep()` se dá přepsat takto:

{% highlight php startinline %}
$stayAliveDeferred = new \React\Promise\Deferred();
$this->loop->addTimer(5, function () use ($stayAliveDeferred) {
	$stayAliveDeferred->resolve();
});
$stayAlivePromise = $stayAliveDeferred->promise();

// vykonávám práci...

$stayAlivePromise->then(function () {
	exit(0);
});
{% endhighlight %}

Pokud první část zrefaktorujete do zvláštní třídy [PromiseTimer](https://gist.github.com/ondrejmirtes/ffd1be5be4062493c50a), protože se tato logika v kódu často opakuje, tak se kód zredukuje na příjemnější:

{% highlight php startinline %}
$stayAlivePromise = (new \PromiseTimer($this->loop))->wait(5);

// vykonávám práci...

$stayAlivePromise->then(function () {
	exit(0);
});
{% endhighlight %}

Zbavil jsem se nejen jakýchkoli ifů, ale i všech počtů s milisekundami.

Stejný trik lze použít na frontendu při získávání dat AJAXem. Pokud má o ta samá data zájem více komponent zároveň, ale chcete je od serveru žádat až pokud si o ně jedna z nich řekne, najednou ve vašem kódu bojujete s těmito stavy: Nikdo si o ta data ještě neřekl, data se právě stahují ze serveru, data už máme. Abyste se vyhli duplicitním požadavkům na server a dalším chybám, které se mohou projevit třeba v momentě, kdy se sejde rychle klikající uživatel na pomalém připojení, můžete napsat sadu nepřehledných a těžko testovatelných ifů, nebo využít promises. Veškerý kód, který má o data zájem, si o ně řekne pomocí `then()` -- nebude tedy předpokládat, že už jsou stažena, ale pokud už jsou, zavolá se předaný callback okamžitě:

{% highlight js startinline %}
getProducts().then(function (products) {
	// ...
});
{% endhighlight %}
