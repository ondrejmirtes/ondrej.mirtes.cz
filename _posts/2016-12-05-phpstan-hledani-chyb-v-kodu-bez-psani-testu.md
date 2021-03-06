---
title: "PHPStan: hledání chyb v kódu bez psaní testů"
date: 2016-12-05 08:00
external_url: https://phpstan.org/blog/find-bugs-in-your-code-without-writing-tests
---

Na [blogu PHPStanu jsem se rozepsal](https://phpstan.org/blog/find-bugs-in-your-code-without-writing-tests) o tom, na čem pracuji již několik let, z toho poslední rok intenzivně -- na nástroji pro statickou analýzu PHP kódu. PHPStan hledá chyby, aniž by bylo třeba daný kód spouštět, čímž se blíží kompilátorům staticky typovaných jazyků. Využívá informací, které jsou k dispozici při parsování PHP kódu - typehinty, dokumentační komentáře a reflexi.

Různé vývojové verze PHPStanu nám už přes rok hlídají produkční kód ve Slevomatu a už mnohokrát včas na CI serveru odhalil chybu, která by se jinak dostala do produkce. Pochvalují si ho také vývojáři v [Hele.cz](https://www.hele.cz/), [DámeJídlo.cz](https://www.damejidlo.cz/) a [Bonami](https://www.bonami.cz/).

Oproti podobným nástrojům nabízí především rychlost, rozšiřitelnost[^extensibility] a různé nastavení striktnosti, aby vás napoprvé nezahltil nadbytečným množstvím chyb, ale pouze těmi nejzásadnějšími, a mohli jste ho tak rovnou začít používat.

Delší a podrobnější povídání o něm najdete na [najdete na blogu PHPStanu](https://phpstan.org/blog/find-bugs-in-your-code-without-writing-tests) nebo se rovnou [podívejte do dokumentace](https://phpstan.org/user-guide/getting-started), jak ho zprovoznit na svém projektu. V případě, že byste s integrací a nastavením chtěli pomoct, určitě se [ozvěte](/o-mne).

[^extensibility]: Pro popis magického chování tříd, které si dynamicky definují properties a metody pomocí implementace magických metod `__get`, `__set` a `__call`.
