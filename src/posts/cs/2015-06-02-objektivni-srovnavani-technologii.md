---
title: Objektivní srovnávání technologií
---

David Grudl [na Twitteru vyzval](https://twitter.com/geekovo/status/603583104498999298) vývojáře ke srovnání vývoje webové aplikace v Nette oproti řešení v JavaScriptu. Ať už by v rychlosti vyhrála jakákoli ze soutěžících technologií, zastávám názor, že to nic nevypovídá o její vhodnosti pro dlouhodobý vývoj a údržbu seriózních aplikací.

Tato srovnání mají mnoho společného se syntetickými benchmarky. To, co se v nich testuje, neodpovídá tomu, co v běžném provozu aplikace provádí, a zároveň hrubý výkon frameworku není to hlavní kritérium, které by vývojáře při výběru mělo zajímat.

Při vývoji není důležité, za jak dlouho dokáže vývojář na zelené louce nabušit první verzi aplikace podle pevného zadání, ale řada jiných kritérií:

- Rozšiřitelnost a udržovatelnost aplikace, jak snadné je ve zdrojovém kódu provádět změny
- Testovatelnost a pokrytí testy
- Stav a předatelnost zdrojových kódů jinému vývojáři či týmu
- Přívětivost uživatelského rozhraní
- Dostupnost a cena vývojářů se znalostí technologie
- Dokumentace, komunita a budoucnost technologie

Sám jsem se před třemi lety účastnil [Souboje frameworků](http://www.knesl.com/articles/view/webexpo-2012-souboj-frameworku). Úkolem bylo, podobně jako v Davidově výzvě, za jeden den vyvinout e-shop s administrací. Každý ze soutěžících k úkolu přistoupil jinak a výsledné pořadí ne nutně odpovídalo tomu, jak by si daná aplikace vedla dlouhodobě. Např. vítězný Jakub Vrána ke tvorbě administrace použil svůj Adminer Editor, což mu v soutěži ušetřilo spoustu času, ale generovaná administrace na základě definice tabulek v relační databázi neposkytuje žádný prostor pro customizaci chování a tudíž přináší nižší uživatelský komfort.

Do srovnání samozřejmě promlouvá i zkušenost jednotlivých účastníků -- a to jak celkově s programováním, tak s konkrétní soutěžní technologií.

Jak tedy postupovat při výběru technologie, když ji nám nepomůže vybrat jednodenní hackaton? Když jsme na konci loňského srpna začínali s vývojem nového nákupního košíku na Slevomatu, věděli jsme, že chceme, aby celý fungoval jako single-page aplikace a veškerá komunikace se serverem probíhala pomocí AJAXu. Potřebovali jsme technologii, která by do šablony na straně klienta promítala stav dat na serveru. Jako vhodné kandidáty jsme vybrali [React](https://facebook.github.io/react/), [Knockout](http://knockoutjs.com/) a šablonovací engine [Handlebars](http://handlebarsjs.com/). Strávil jsem tři dny porovnáváním těchto technologií tak, že jsem v každé naimplementoval první krok košíku, a posléze porovnával, která technologie je nejbližší tomu, jak ve firmě vývoj probíhá, odhadoval, s čím by mohly být v budoucnu problémy a jak snadno nám to či ono pomůže řešit. Vybral jsem Knockout a košík jsme o dva měsíce později [úspěšně spustili](https://twitter.com/slevomat/status/529988112756539392) bez nějakých větších problémů na klientu ani na serveru.

Vybral jsme tedy správně? Zádrhel spočívá v tom, že to nelze určit. Jak by vývoj probíhal v případě, kdybych zvolil React? Možná by byl košík hotový o dva týdny dříve, ale po spuštění bychom přišli na nepříjemný a těžko odladitelný bug. Možná bychom termín nestihli. Možná by byl při překreslování DOMu výkonnější, ale kodér by nedokázal upravovat jeho šablony. Pokud by nás opravdu zajímalo, zdali jsme vybrali dobře, mohli bychom se pokusit celé dva měsíce vyvíjet paralelně v obou technologiích zároveň, což by jednak stálo více peněz, a druhak bychom opět narazili na různou úroveň zkušeností vývojářů, srovnání by tedy opět nebylo objektivní.

Pokud by mě po dokončení košíku v Knockoutu zajímalo, jak by si vedl React, a pustil se do implementace v něm sám, opět bych nedokázal technologie srovnat objektivně, protože jsem při vývoji první verze nabral zkušenosti, které bych v Reactu aplikoval a dokázal se tak vyhnout některým slepým uličkám. Spravedlivé srovnání tedy nejenže nelze získat od více různých vývojářů, ale ani od jednoho.

Při výběru technologie berte vpotaz, jaká od ní máte očekávání a zdali je dokáže splnit, dovednosti a zkušenosti lidí, kteří s ní budou pracovat, a moc se netrapte úvahami, jak by projekt mohl dopadnout, pokud byste se na začátku rozhodli jinak. [^benchmarks]

[^benchmarks]:
	A určitě nehleďte na výkonnostní benchmarky, ankety popularity a co používá vaše oblíbená osobnost.
