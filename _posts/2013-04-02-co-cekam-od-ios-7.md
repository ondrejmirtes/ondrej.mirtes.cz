---
layout: post
title: Co čekám od iOS 7
date: 2013-04-02 10:03:00
guid: c9e1074f5b3f9fc8ea15d152add07294
---

Nedávno jsem si uvědomil, že na mobilních zařízeních trávím více času, než u počítače. Díky přenositelnosti a výdrži baterie je to pro mě lepší volba navzdory zjednodušenému operačnímu systému a dotykové klávesnici.

Novou verzi iOS tak očekávám s větším zájmem, než Mac OS X. Současná šestá verze oproti svému předchůdci nepřinesla moc nového, předpokládám tedy, že Apple už druhým rokem pracuje na zásadnějším updatu.

### iCloud

V posledních dnech [vyšlo](http://arstechnica.com/apple/2013/03/frustrated-with-icloud-apples-developer-community-speaks-up-en-masse/) [několik](http://www.theverge.com/2013/3/26/4148628/why-doesnt-icloud-just-work) [ne zrovna pochvalných](http://inessential.com/2013/03/27/why_developers_shouldnt_use_icloud_sy) článků o iCloudu. Pod tuto značku patří více různých služeb - e-mailová schránka, kalendář a úložiště kontaktů, ale především API pro aplikace třetích stran. Právě s ním jsou největší problémy a vývojáři se uchylují k jiným službám (např. [Simperium](https://simperium.com/)) nebo k vlastní infrastruktuře (např. [Things](http://culturedcode.com/things/) nebo [Instacast](http://vemedio.com/products/instacast3)).

Pokud byste se dnes rozhodli použít pro svoji aplikaci iCloud, musíte si vybrat jedno ze tří úložišť pro svá data. Jednoduché key-value, kam lze uložit maximálně 1000 hodnot, souborové a databázové (CoreData). Nejvíce problémů je s CoreData, které je ale zároveň nejlákavější. Slibuje totiž synchronizaci vzájemně provázaných datových struktur, což je velká výzva samo o sobě. Kromě principiálních problémů s tímto složitým úkolem ale API někdy [nefunguje](https://twitter.com/SteveStreza/status/314494942489751553) ani na té nejzákladnější úrovni a vývojáři se těžko mohou dopídit, v čem je chyba.

Apple tohle musí vyřešit. Ať už tím, že opraví stávající implementaci CoreData, nebo že vytvoří čtvrté API s podobnou funkcionalitou, ale s úmyslem cloudové synchronizace už od začátku. CoreData totiž měli vývojáři k dispozici už před iCloudem jako běžné databázové úložiště a tato funkcionalita do něj byla jen doplněná.

Pokud odhlédneme od toho, že synchronizace dat prostě nefunguje, iCloud čelí dalším problémům. Souborový systém na iOS z pohledu uživatele tvoří aplikační kontejnery. Každá nainstalovaná aplikace má tak k dispozici svůj adresář a mimo něj číst nemůže. Stejně funguje i dokumentové úložiště iCloudu. Pokud uložím prezentaci v Keynote do iCloudu, na iPadu ji otevřu zase v Keynote. Pokud si ale soubor uložím v aplikaci, která na druhém zařízení nemá protějšek od stejného vývojáře, ten soubor prostě nenajdu. PDF si přes iCloud nepošlu, protože ho na Macu můžu uložit jedině v aplikaci Preview a ta na iOS neexistuje. Musím se uchýlit k Dropboxu nebo e-mailu. Tohle taky není jednoduchý oříšek k vyřešení, protože Apple se úmyslu postavit zeď mezi uživatele a filesystém nevzdá.

K datům v iCloudu lze přistupovat pouze v nativních aplikacích pro iOS a Mac OS X. Pokud vývojář chce udělat třeba i variantu pro web nebo pro Windows, musí si také vyvinout vlastní synchronizaci. To, že Apple podporuje pouze svojí platformu, se dá pochopit, ale aplikuje tu dvojí metr - k e-mailu, kalendáři a kontaktům se dostanete i ve webovém prohlížeči na [icloud.com](http://www.icloud.com/).

Pokud má aplikace podporovat spolupráci více uživatelů, musí také mít vlastní server. iCloud slouží jen jako úložiště dat jednoho uživatele. V současnosti podporuje jen omezené případy užití a jakmile chce aplikace dělat něco sofistikovanějšího, nemůže k tomu iCloud využít.

Apple musí tyto technologické a principiální nedostatky vyřešit. Protože jinak hrozí, že ho [ostatní předeženou](http://www.businessinsider.com/apple-google-design-web-services-2012-11) i v tom, v čem zatím vede a žádná konkurenční výhoda mu nezbyde.

### Meziaplikační komunikace

S podobou filesystému a aplikačními kontejnery souvisí i podoba meziaplikační komunikace. Ta je na iOS velmi omezená.

Aplikace se mohou zaregistrovat pro otevírání určitých typů souborů. PDF, které načtu v Safari, tak mohu otevřít v iBooks nebo v Dropboxu. V tu chvíli se tento soubor **nakopíruje** do kontejneru iBooks. Změny, které v souborech provádím, se tedy neprojevují do jeho dalších instancí v jiných aplikacích.

Další možnost výměny dat jsou tzv. URL schemes. Každá aplikace si do systému může zaregistrovat svůj [protokol](http://applookup.com/Home) (např. googlechrome://) a ostatní aplikace ji přes něj mohou mohou spouštět. Podmínkou tedy je, aby vývojáři věděli o ostatních **konkrétních** aplikacích a jejich podporu implementovali.

Mimochodem to znamená, že každá aplikace si musí sama implementovat posílání odkazů do "read it later" služeb a pokud pominu integrovaný Twitter a Facebook v iOS 6, tak i podporu pro sdílení na sociální sítě.

Naštěstí se v tomto ohledu blýská na lepší časy. Ole Begemann při šťourání do vnitřností systému [objevil](http://oleb.net/blog/2012/10/remote-view-controllers-in-ios-6/) mechanismus tzv. remote view controllers, který Apple začal využívat např. pro okno odesílání e-mailu. Aplikace Mail tímto způsobem nabízí použít část sebe uvnitř jiné aplikace a po splnění úkolu opět odejít na pozadí. V budoucnu by se právě tohle mohlo stát základem důmyslnějšího sdílení dat mezi aplikacemi, které uživatelé ostatních operačních systémů znají jako intents (Android) nebo contracts (Windows Phone).

### Jony Ive

Po vyhození Scotta Forstalla na konci října došlo k rošádě na nejvyšších pozicích firmy. Jony Ive převzal softwarový design a všichni si od toho [slibují](http://www.cultofmac.com/198751/why-firing-scott-forstall-means-ios-will-get-a-lot-better/) novou podobu uživatelského rozhraní iOS. [Konec](http://www.cultofmac.com/198844/8-design-crimes-that-jonathan-ive-should-set-right-in-ios-7-feature/) kožených kalendářů a linkovaných poznámkových bloků!

Těžko říct, kolik razantních změn se za těch pár měsíců dá stihnout a vzhlížel bych pro jistotu až k iOS 8, ale první vlaštovka už dorazila. Na konci března [dorazil](http://arstechnica.com/apple/2013/03/hands-on-apples-podcasts-app-loses-reel-animation-gains-playlists/) update aplikace Podcasts, který odstranil efektní, ale naprosto zbytečnou pohyblivou magnetickou pásku.

Čeho se v iOS 7 skutečně dočkáme a jak bude vypadat se dozvíme nejspíše v červnu na tradiční konferenci WWDC 2013.
