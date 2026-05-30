---
title: O blokování reklam
---

Čas od času se o něm strhne debata. Jedni reklamu obhajují jako jedinou možnou obživu pro provozovatele webů, druzí poukazují na zahlcení reklamou, její nevkusnost, vlezlost a celkově nižší pohodlí jako důvody pro její blokování. Proč na pohledu druhého tábora nevidím nic špatného (a řadím se do něj) vysvětlím v následujících odstavcích.

Začnu lehkým úvodem do toho, jak funguje současný web. Servery (něčí počítače) vystavují volně dostupný obsah na nějakém portu a nějaké adrese. Kdokoli si o ten obsah může říct HTTP požadavkem. Ve většině případů se stáhne text ve formátu HTML, a je na klientovi, jak s tímto textem naloží. Může ho zobrazit v čisté podobě, vykreslit v ASCII artu v textové konzoli, nechat ho přečíst čtečkou pro nevidomé, možností je nepočítaně. Jedna z nich je předat HTML kód vykreslovacímu jádru moderního webového prohlížeče. I v něm mám řadu možností, jak stažený kód interpretovat - mohu zakázat či povolit vykonávání JavaScriptu, nestahovat obrázky, nespustit Flash, namluvit serveru, že jsem na [pomalém připojení](http://caniuse.com/#feat=netinfo) nebo že mám [slabou baterii](http://caniuse.com/#feat=battery-status).

Dnes se hodně mluví o strojovém učení. Představte si prohlížeč, který by se na základě pohybu očí uživatele učil a při opakovaných návštěvách webu by uživateli prezentoval pouze ty části stránky, kterým v minulosti věnoval pozornost. Aby ho irelevantní bloky nadpisů, textů a grafiky nerušily od toho, co ho ve skutečnosti zajímá. Lákavá myšlenka, o kterou by v případě povedeného provedení mohla mít zájem spousta uživatelů.

Až na to, že něco takového tu dnes už máme, a budí to obrovský rozruch. Blokátory reklamy si udržují seznamy prvků na stránkách, které většinu uživatelů obtěžují, a při vykreslování je automaticky odstraňují. Proč to  provozovatelům webů vadí? Vždyť mi poskytli ke stažení obsah, který lze interpretovat různými způsoby, a já si jeden z nich vybral.

Provozovatelé se totiž ve svém obchodním modelu spoléhají na to, že ten kód, který si od nich stáhnu, si můj prohlížeč vyloží tím způsobem, který jim vydělá peníze. Jenže to je zastaralé uvažování, které bude fungovat čím dál tím hůř. Jak z toho ven?

Existují snahy, jak blokování reklam zamezit, ale pokud jste pořádně přečetli předchozí odstavce, tak už víte, že to principiálně není možné. Ano, obě strany mohou reagovat na kroky toho druhého a přizpůsobovat se jim, ale vždy to bude hon kočky s myší a blokující strana bude mít zpravidla vždy navrch, protože principy webových technologií jsou ji nakloněny. Stejně jako při sledování televize mám možnost přepnout program a při čtení novin přeskočit stránku s placenou inzercí, tak i na webu budu mít vždy možnost se reklamám vyhnout. Nad blokováním pop-upů vestavěným přímo v prohlížeči se dnes již také nikdo nepozastavuje.

Tudy tedy cesta dlouhodobě nevede. Provozovatelé webů si musí uvědomit, proč uživatelé mají potřebu reklamy blokovat -- protože je vlezlá, agresivní, nevkusná, žere daleko více dat, procesorového času a baterie[^sviznost]. Dokud musím při vstupu na zpravodajský portál zavírat křížkem animovanou a ozvučenou reklamu na mobilního operátora, která mi užírá cenné megabajty z FUP, tak ji prostě blokovat budu. Inzerenti, reklamní systémy a provozovatelé by tedy v první řadě měli reklamám napravit reputaci - servírovat je v takovém množství a kvalitě, aby od nich lidé neutíkali a reklamu neignorovali.

I když se nedívám a neklikám na reklamy na obsahových webech, nepřipadám si jako příživník. Věřím, že jsem provozovateli webu i tak užitečný. Věnuji jim svůj čas, čtu jejich články, přemýšlím nad danými tématy a pokud mě zaujmou, tak je sdílím dál.

Z předchozích odstavců vám může připadat, že jsem pro zrušení oboru marketingu, tak to ale není. Marketing je kreativní obor a na kreativcích je, aby ke mně v pravou chvíli dostali obsah, který mi bude užitečný a bude mě zajímat. Jsem zastávcem [native advertisingu](https://en.wikipedia.org/wiki/Native_advertising). Pokud se forma reklamy skloubí se správným zacílením, nic proti ní nemám. Takže pokud se v mém [oblíbeném technologickém podcastu](http://atp.fm/) objeví zmínka o kvalitním [registrátoru domén](https://www.hover.com/) nebo o [VPS hostingu](https://www.linode.com/), je to pro mě trefa do černého.[^podcasty]

Další čtení: [The ethics of modern web ad-blocking](https://marco.org/2015/08/11/ad-blocking-ethics)

[^sviznost]: Svižnosti webů se zapnutým blokátorem, obzvlášť na mobilních zařízeních, se nic nevyrovná. iOS 9 přišel na 64bitových zařízeních s podporou tzv. content blockers, které přináší do uzavřeného ekosystému Applu nečekanou podporu pro blokování reklam. Každému doporučuji si nějaký nainstalovat.

[^podcasty]: Na základě reklam v podcastech jsem si koupil už minimálně čtyři produkty. Kdo tohle může říct o bannerech na českých webech?
