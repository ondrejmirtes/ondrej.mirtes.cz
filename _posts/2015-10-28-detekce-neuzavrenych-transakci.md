---
title: Detekce neuzavřených transakcí
---

Vezměte si následující kód:

{% highlight php startinline %}
public function processRow(Row $row)
{
	$this->databaseConnection->begin();
	try {
		// nějaké počáteční kontroly
		// $isProcessed = ...

		if ($isProcessed) {
			return;
		}

		// spousta práce se zpracováním row

		$this->databaseConnection->commit();
	} catch (\Exception $e) {
		$this->databaseConnection->rollback();
		throw $e;
	}
}
{% endhighlight %}

Spatřili jste tu chybu? V případě, že `$isProcessed === true`, dojde k opuštění metody bez commitu či rollbacku transakce, čímž zůstane v databázi otevřená až do uzavření spojení. A může zbytečně držet příliš dlouho zámky, o které mohou mít zájem ostatní vlákna aplikace.

Pokud by vám nevadily zamčené řádky, tak se vám stejně nebude líbit další důsledek tohoto bugu:

{% highlight php startinline %}
$this->databaseConnection->begin();
try {
	// volaná metoda vyhodnotí předaný řádek jako $isProcessed
	$this->processRow($fooRow);
	$this->databaseConnection->commit();
} catch (\Exception $e) {
	$this->databaseConnection->rollback();
	throw $e;
}
{% endhighlight %}

V tomto případě totiž commitujete či rollbackujete jinou transakci, než byste čekali!

S lepším transakčním API se nastalá situace dá detekovat:

{% highlight php startinline %}
$databaseTransaction = $this->databaseConnection->begin();
try {
	// volaná metoda vyhodnotí předaný řádek jako $isProcessed
	$this->processRow($fooRow);
	$databaseTransaction->commit();
} catch (\Exception $e) {
	$databaseTransaction->rollback();
	throw $e;
}
{% endhighlight %}

V tomto případě je databázová transakce reprezentovaná odděleným objektem, takže je vždy jednoznačně určeno, s jakou konkrétní transakcí pracujeme.

Jak ale detekovat, že nám v aplikaci zůstává viset nevyřešená transakce? Pomůžeme si [destruktorem](http://php.net/manual/en/language.oop5.decon.php):

{% highlight php startinline %}
class DatabaseTransaction
{

	//...

	public function __destruct()
	{
		if (!$this->resolved) {
			// destruktor nemůže vyhazovat výjimky
			trigger_error('Unresolved transaction!', E_USER_NOTICE);
		}
	}

	//...

}
{% endhighlight %}

Kdy ale PHP destruktor objektu zavolá?

> The destructor method will be called as soon as there are no other references to a particular object, or in any order during the shutdown sequence.

V závislosti na podobě implementace `DatabaseConnection` se destruktor zavolá jakmile PHP opustí metodu, ve které proběhlo přiřazení `$databaseTransaction`, a nebo taky ne, třeba v případě, že si všechny transakce ukládáme do interního pole pro pozdější odkazování.

Pokud se tedy destruktor transakce zavolá ihned po opuštění metody, tak v [zalogované chybě](https://tracy.nette.org/) dostaneme stack trace, ve které snadno dohledáme to místo, kde je špatně ošetřená transakce, a budeme ho moci opravit.

Pokud se destruktor zavolá až při shutdown sekvenci, tak už nám stack trace chyby o místu, kde vzniká neošetřená transakce, nic neřekne. V případě, že máte velkou mnohovrstevnatou aplikaci s mnoha transakcemi, se takové místo hledá velmi těžko.

Přišel jsem ale s funkčním řešením, které v této situaci debugging transakce usnadní. V PHP lze instanciovat výjimku, aniž bychom jí vyhazovali, a takto vytvořená výjimka si v sobě nese stack trace z místa svého vzniku!

{% highlight php startinline %}
class DatabaseTransaction
{

	/** @var UnresolvedTrasactionException */
	private $originException;

	public function __construct(DatabaseConnection $databaseConnection/*, ...*/)
	{
		// ...
		$this->originException = new UnresolvedTrasactionException();
	}

	public function __destruct()
	{
		if (!$this->resolved) {
			\Tracy\Debugger::log($this->originException);

			// destruktor nemůže vyhazovat výjimky
			trigger_error('Unresolved transaction!', E_USER_NOTICE);
		}
	}

	//...

}
{% endhighlight %}

Pro každou započatou transakci tedy vytvořím výjimku, kterou v případě nevyřešené transakce zaloguji a získám tak místo, kde chybná transakce vznikla. V destruktoru stále vyvolávám notice, aby si programátor této chyby všiml i během vývoje, kdy běžně složku s logy nesleduje.

Z hlediska čistoty a architektury kódu jde samozřejmě o dost neobvyklé až šílené řešení, které bych nikdy při code review nevpustil do běžné business logiky aplikace, kde si vývojář musí vystačit s běžnými vyjadřovacími prostředky a návrhovými vzory z OOP, ale v tomto případě jde o infrastrukturní pomocnou záležitost, která se v celé aplikaci vyskytuje právě jednou a nijak neovlivňuje architekturu zbytku aplikace. Pro usnadnění debuggingu a tedy ušetření času vývojáře jsem ochotný překročit hranici, ke které bych se běžně vůbec nepřiblížil.
