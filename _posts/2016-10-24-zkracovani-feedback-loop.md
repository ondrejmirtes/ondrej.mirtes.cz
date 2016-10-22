---
title: Zkracování feedback loop
date: 2016-10-24 08:00
---

V odvětví softwarového vývoje existuje spousta best practices, které vedou ke zrychlení a zjednodušení práce programátora. O čistém a čitelném kódu, SOLID principech a testování bylo již napsáno mnoho a myslím si, že kdo chce, už to všechno dlouho dělá. Poslední dobou se ale zabývám něčím, co je pro fungování týmu vývojářů a jejich projektů neméně důležité a zásadní, ale v praxi to ještě příliš často nepotkávám, zato vidím důsledky absence tohoto postupu.

Řada [článků](http://codeahoy.com/2016/04/21/when-to-rewrite-from-scratch-autopsy-of-a-failed-software/) a přednášek odrazuje od kompletního přepisu funkčního software a mají k tomu pádné důvody. Nutnost dohánět roky vývoje současné verze, nulová hodnota pro uživatele a nejistota, že to všechno vynaložené úsilí dopadne lépe. Kompletní přepis nikdy nedává smysl. V kontextu tohoto článku ho ale považuji pouze za jeden extrém na dlouhé škále různých řešení a chci ukázat, že lekce, které z něj plynou, lze aplikovat při každodenní práci, i když zrovna něco nepřepisujete od nuly a zdánlivě děláte vše dobře.

Jaký důvod mají týmy ke kompletnímu přepisu? Potřebují něco udělat jinak, než to v aktuálním projektu je, často si to chtějí jen vyzkoušet. Nikdo, ani sebevětší expert, často neví, jestli směr, kterým se vývoj ubírá, je správný. Proto bychom se to měli snažit zjistit co nejdříve, co nejrychleji získat zpětnou vazbu. Kámen úrazu tkví především v tom, že přepis trvá příliš dlouho a celé měsíce či roky týmy budují něco, u čeho nikdo netuší, jestli je to správně a jestli se to vyplatí. Tento problém se však netýká jen kompletních přepisů, ale i běžného iterativního vývoje.

Feedback loop, v češtině "kolečko zpětné vazby", je základním kamenem jakékoli tvůrčí práce. Vždy byste se měli soustředit na to, abyste co nejdříve dostali zpětnou vazbu k vašemu výtvoru. Od kolegů, od hardwaru, od uživatelů i zákazníků. Jen tak si zajistíte, že stavíte něco, co má cenu.

Že se to někomu nedaří se dá navenek velmi snadno poznat. Z nedávné doby mě napadá např. [ČEZ a jeho nový zákaznický systém](https://ekonomika.idnes.cz/cez-odstavil-zakaznicky-system-dnp-/ekonomika.aspx?c=A160915_191018_ekonomika_ozr):

> Energetická společnost ČEZ přechází na nový zákaznický systém. Kvůli změně však není možné až do poloviny října provést jakoukoliv změnu v zákaznických smlouvách. Část zákazníků dostane se zpožděním roční vyúčtování.

Měsíc (!) nemůže jedna z největších českých společností hýbat s daty zákazníků. A to kvůli tomu, že nesbírali feedback k novému produktu průběžně, ale nasadili ho celý najednou a přišli příliš pozdě na to, že nefunguje.

Rychlejšího sběru zpětné vazby se dá dosáhnout častějšími releasy. To ale není jediná metrika, o kterou by se tým měl snažit. Zásadní je držet množství nového kódu, který není v produkci, na naprostém minimu. Kód, který není nasazený, představuje riziko.

Čím častěji budete nasazovat, tím menší změny v jedné dávce dostanete do produkce. S malými změnami se pojí řada výhod. Snadněji provedete poctivé a detailní code review. Máte větší šanci, že v kódu odhalíte problémy, pokud reviewujete desítky a nikoli tisíce řádků.

> 10 lines of code = 10 issues. \\
> 500 lines of code = "looks fine." \\
> [twitter.com/iamdevloper](https://twitter.com/iamdevloper/status/397664295875805184)

Čím menší změna, tím menší riziko, že se něco pokazí. Menší změny se snadno revertují. Krátké větve v Gitu se také daleko snadněji spravují, rebasují a mergují.

Koncentrace na rychlé získávání feedbacku vyžaduje změnu mindsetu. U každé změny, kterou provádíte, musíte uvažovat, jak ji provést tak, aby se dala ihned bez problému nasadit.

Při vývoji nové funkcionality vás typicky čeká spousta "přípravných" prací, na kterých pak novou funkcionalitu stavíte. Takové refaktoringy by neměly nic rozbít a měly by jít rovnou nasadit. Tím si ověříte, že fungují a opravíte případné chyby, kterých určitě nebude tolik, jako kdybyste je nasazovali až ve velkém finálním balíku změn s hotovou celou funkcionalitou. Určitě je výhodnější opravovat 15× dvě chyby v průběhu několika týdnů, než třicet chyb najednou.

Kromě toho, že sbíráte feedback na své změny v produkci, vám poděkují i kolegové, se kterými sdílíte váš čerstvý kód a mohou z něj rovnou těžit ve svém úkolu, nebo vám s tím vaším snadno pomoci.

Tento přístup je přes své výhody ale i v lecčems náročnější. Zadání úkolů je třeba rozfázovat na malé části. Tyto části vám mohou zpočátku připadat až směšně malé, to ale znamená, že na to jdete dobře. Stejně jako objektový model aplikace by se měl skládat z mnoha jednoduchých malých objektů, tak i vývoj by se měl skládat z mnoha malých změn, kde každá dává izolovaně i společně smysl.

Rozfázování úkolu znamená, že je potřeba promyslet i to, jak aplikace vypadá v mezistavech. Získáte cit pro to, jaké požadavky spolu souvisí, které části úkolu jsou zásadní a které podružné. Pokud např. redesignujete část aplikace a zároveň do ní implementujete nové funkce, využijte příležitosti rozdělit tento velký projekt na dva menší -- nejdřív naimplementujte a nasaďte redesign se současnými funkcemi a až poté do něj nové funkce dodělejte. Tento přístup k práci vyžaduje určitou režii navíc, ale zato si tím snížíte rizika spojená s nasazováním nových verzí aplikace na minimum. A je navenek vidět progres. Malé změny se nebojíte nasadit ani v pátek odpoledne. A pokud se to naučíte, váš vývoj bude sestávat pouze z těchto malých bezpečných změn.

> The more s/w projects I see, the more I am getting convinced that most code quality guidelines have zero impact compared to feedback loops \\
> [twitter.com/pembleton](https://twitter.com/pembleton/status/768551599052644352)

Pokud pracujete na funkcionalitě, která ještě nemá být vidět, převedete větve ve verzovacím systému na větve v kódu, tzv. feature toggles. Rozpracovanou ji tedy nasadíte do produkce, ale zpřístupníte pouze určité uživatelské roli či pod speciální URL. Stejným způsobem můžete provádět i A/B testy či postupný roll out. Počet feature toggles byste měli také ale držet na nutném minimu a jakmile je nová funkce přístupná všem, měli byste kód aplikace zase zjednodušit a feature toggle odstranit.

Pokud pracujete na něčem úplně novém, měli byste si co nejdříve ověřit užitečnost produktu. Je tedy nesmysl začínat vývoj od registračního a přihlašovacího formuláře, který je vždy stejný, ale vždy začněte od toho, co je jádrem daného produktu, co představuje jeho přínos. Pokud vám první verze bude přinášet užitek, můžete ji začít vylepšovat.

Těší mě, když vidím tyto principy aplikované i mimo softwarový vývoj. Píšete článek a nemá to konce? Rozdělte ho na více částí a ty vydávejte postupně. Píšete knihu? Vydávejte ji čtenářům po kapitolách. Zní to šíleně? Pro někoho už [běžná](https://www.objc.io/blog/2015/07/14/advanced-swift-early-access/) [praxe](https://www.objc.io/blog/2015/07/28/core-data-early-access/).

Další čtení: [Why Continuous Deployment?](http://www.startuplessonslearned.com/2009/06/why-continuous-deployment.html), [Code spiral](http://www.pushing-pixels.org/2015/06/11/code-spiral.html). Doporučuju také [followovat Michiela Rooka](https://twitter.com/michieltcs), vývojáře Phingu, který o tématu často píše a odkazuje.
