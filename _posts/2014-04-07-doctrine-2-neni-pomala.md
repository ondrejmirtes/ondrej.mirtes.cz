---
layout: post
title: Doctrine 2 není pomalá!*
date: 2014-04-07 07:59:00
no_initial: TRUE
guid: 069059b7ef840f0c74a814ec9237b6ec
---

**pokud ji umíte používat a správně si ji nakonfigurujete*

Rozmáhá se nám tu takový nešvar. [Čas](http://devel.cz/otazka/vlastnosti-objektu-a-lazy-loading) [od](https://twitter.com/jiriknesl/status/444740405280923648) [času](http://php.vrana.cz/notorm-je-rychlejsi-nez-doctrine-2-i-dibi.php) se objeví někdo s tvrzením, že Doctrine je pomalá a tudíž nepoužitelná na reálných projektech. Tento omyl plyne z několika mýtů, kterými je Doctrine 2 opředená.

Jak už jsem [psal před třemi a půl lety](/doctrine-vs-notorm-vs-zbytek-sveta), hlavní motivace pro používání ORM je reprezentace dat z databáze v aplikaci prostřednictvím konzistentních objektů. Objektů, které nejsou obecné univerzální hashmapy s neznámým obsahem, ale objektů, které mají pevné dané rozhraní a tudíž vím, jaká data z nich mohu získat a jak s nimi manipulovat. Po ORM tedy nechci, aby mi ušetřilo psaní SQL dotazů a nechci ani odstínit od konkrétní databáze, kterou používám. Mohu si tedy dovolit optimalizovat výběr dat velmi podobně, jako s jinými "lightweight" knihovnami, které podle výše odkazovaných zlých jazyků již pomalé nejsou.

Pokud tedy chci výkonnou aplikaci, nenechávám většinu SQL dotazů generovat Doctrine, ale píšu je sám za pomoci [DQL](http://docs.doctrine-project.org/projects/doctrine-orm/en/latest/reference/dql-doctrine-query-language.html), což je příbuzný jazyk, který Doctrine používá. Namísto tabulek sloupců se v něm odkazujete na entitní třídy a atributy. Je snadno rozšiřitelný, což se hodí, pokud potřebujete využít nějakou vlastnost vaší databáze, kterou DQL v základu nepodporuje.

V případě, že chci z databáze vybrat data pouze pro čtení (typicky pro výpis v šabloně), není třeba přenášet celé objekty. V takovém případě v DQL [vyjmenuji sloupce](http://docs.doctrine-project.org/projects/doctrine-orm/en/latest/reference/dql-doctrine-query-language.html#dql-select-examples), které mě zajímají a Doctrine mi výsledek dotazu vrátí v obyčejných polích. Díky DQL se dá vyhnout i [1+N problému](http://stackoverflow.com/questions/97197/what-is-the-n1-selects-issue) (lazy loading uvnitř cyklu). Avšak od určité návštěvnosti si nemůžete dovolit stále sahat na čerstvá data z databáze s žádným nástrojem a musíte nasadit aplikační cachování tak jako tak.

Odpůrci Doctrine často argumentují tím, že je to moloch. Nevím, co tím přesně myslí. Asi se jim nelíbí, že jsou její zdrojáky v mnoha souborech, a je jim daleko sympatičtější přístup [mPDF](https://raw.githubusercontent.com/finwe/mpdf/master/mpdf.php). V každém případě ale velikost knihovny nemá dopad na výkon, pokud si zapnete a [správně nakonfigurujete](http://fr.slideshare.net/jpauli/yoopee-cache-op-cache-internals) OpCache, která výrazně ulehčí práci PHP.

Dále byste si na produkci měli vypnout automatické generování proxy tříd:

{% highlight php startinline %}
$config->setAutoGenera­teProxyClasses(FAL­SE);
{% endhighlight %}

Doctrine jinak totiž bude při každém požadavku pro každou entitu generovat proxy, což je, ano, pomalé.[^proxy]

Také je třeba nastavit cache pro metadata (konfigurace entit) a zkompilované DQL dotazy. Viz [výpis všech dostupných driverů](http://docs.doctrine-project.org/projects/doctrine-orm/en/latest/reference/caching.html).

{% highlight php startinline %}
$cache = new \Doctrine\Com­mon\Cache\ApcCache();
$config->setMetadataCache­Impl($cache);
$config->setQueryCache­Impl($cache);
{% endhighlight %}

Správnost těchto nastavení vám ověří [CLI command](http://docs.doctrine-project.org/projects/doctrine-orm/en/latest/reference/tools.html) orm:ensure-production-settings.

Nejhorší nápad, jaký můžete dostat, je psát si vlastní ORM. Jedná se o neuvěřitelně komplexní a náročnou oblast. Problémy, které budete řešit, za vás již dávno vyřešili autoři Doctrine. Pokud ale máte dva roky čas na full-time vyvíjet vlastní ORM a myslíte si, že to zvládnete líp než oni, nebudu vám bránit.

[^proxy]: Proxy třídy slouží k lazy loadingu navázaných dat -- Doctrine vygeneruje kód, který při přístupu k nenačtené proměnné položí dotaz do databáze.
