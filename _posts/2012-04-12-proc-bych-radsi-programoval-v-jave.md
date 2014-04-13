---
layout: post
title: Proč bych radši programoval v Javě
date: 2012-04-12 00:02:00
guid: eccbc87e4b5ce2fe28308fd9f2a7baf3
---

Způsob, jakým se v současnosti píšou aplikace v PHP, velmi připomíná Javu. Programujeme plně objektově a spoléháme se, že u každé proměnné víme její typ. Včetně [položek v polích](http://forum.nette.org/cs/9921-presnejsi-phpdoc-pro-pole). Problém je v tom, že nám to PHP kvůli své procedurální a skriptovací minulosti nemůže zajistit a nedá se na to spolehnout. Principy OOP do něj byly postupně dolepovány. A stále je tu dynamická typovost, která s OOP moc dobře nefunguje.

Pokud na objektu volám nějakou metodu, spoléhám se, že vím typ proměnné, ve které je ten objekt uložen. Jenže ten typ se v dynamických jazycích určuje až on-the-fly a může být při každém běhu jiný. Máme tu sice typehinting, ale nikdo programátorovi nezabrání vložit do metody špatný typ a program tak zhavaruje stejně, jen o jeden krok ve stack trace dříve.

Programátoři v Pythonu a Ruby si často stěžují na ukecanost Javy a příbuzných jazyků. Jenže každý znak, který ušetřím při prvotní implementaci, se mi při následné údržbě kódu vymstí. Při refaktoringu přejmenováváme, přesouváme a mažeme kusy kódu. Při každém takovém kroku ale musíme zkontrolovat, kde všude se ten kód používá, abychom si nerozbili aplikaci. Java to za nás dělá automaticky. Kdykoli se odkazujete na neexistující třídu nebo metodu, případně voláte metodu s neplatnými parametry, IDE vám daný řádek podtrhne a kompilátor vás nepustí dál.

Při vývoji v PHP se většina oprav týká tohoto druhu chyb, stejně tak při testování se nejvíce energie vyplýtvá na nich. Oproti tomu v Javě se testuje především samotná business logika aplikace, tedy jestli kód dělá opravdu, co má. Protože o překlepy a odkazování se na neexistující kód se nám postará kompilátor a neodhalíme ho až díky testům nebo při rozkliknutí třetího kroku v objednávkovém formuláři.

Že spolehlivě můžeme zjistit typ proměnné se kladně odráží na schopnostech IDE. Bezchybné napovídání, nevídané možnosti automatického refaktoringu. Pokud v PHP chcete přejmenovat namespace, třídu nebo nedejbože metodu, čeká vás spousta manuální práce s nejistým výsledkem, nebo psaní důmyslného skriptu. V Javě to zvládne každé IDE na pár kliknutí.

Java nativně podporuje anotace a umí jejich správné použití vynucovat stejně jako u běžného kódu. V PHP si komunity musely vynalézt jejich princip a parsování u každého projektu samy. Zapisují se do dokumentačních komentářů. Komentářů, které se odjakživa ve všech jazycích při kompilaci zahazovaly a nemohly nijak ovlivnit chod aplikace. V PHP se na ně výrazně spoléhá.

Java, ačkoli je terčem vtípků kvůli své rychlosti, je mnohonásobně rychlejší než PHP. Není se čemu divit - PHP musí při každém požadavku načíst a zpracovat zdrojové kódy až ze stovek souborů (záleží na velikosti aplikace a použitých knihovnách), Java si tuto práci odbyde jednorázově při kompilaci. Napomáhá jí také statické typování, které kompilátoru a procesoru ulehčuje práci.

Proč píšu o Javě a ne o C#? Kategoricky to jsou stejné jazyky, přičemž C# je inovativnější a má několik zajímavých featur navíc, např. properties nebo anonymní funkce. V mých očích ho ale pohřbívá nutnost provozovat na vývojářském stroji i produkčním serveru Windows.

Věřím, že každý současný PHP programátor by se v Javě rychle zorientoval a překvapila by ho svými schopnosti, ke kterým se PHP každou verzí snaží přiblížit. Proč tedy není daleko rozšířenější? Když pominu malý počet hostingů a jejich ceny, je to frameworky. Nepovedlo se mi narazit na žádný, se kterým by se mi příjemně pracovalo. Pokud narazím na problém a podaří se mi najít vlákno, kde se řeší to samé, ještě nemám vyhráno, protože často záleží na desetinkových verzích použitých knihoven a serveru a představované řešení mi nemusí fungovat. Je to často o nervy.

Za své rozšíření PHP taky vděčí faktu, že je to v základu jednoduchý a začátečníkům přístupný šablonovací jazyk - snadno se s ním generuje HTML. Většina programátorů ale u něj zůstane i v momentě, kdy prozřou a zjistí, že logika aplikace by se měla oddělit od výpisu informací a že existuje nějaké OOP, které zpřehlední kód, když se správně aplikuje. Máme tu tedy jazyk, na kterém se [nejsnadněji staví business](http://www.knesl.com/articles/view/zkuste-to-bez-php), protože v něm umí spousta programátorů, ale zároveň jim háže klacky pod nohy, pokud v něm začnou dělat něco složitějšího. Bludný kruh.

Když si přečtu článek jako je [tento](http://me.veekun.com/blog/2012/04/09/php-a-fractal-of-bad-design/), (nesouhlasím se vším, s většinou bodů ale ano), nechce se mi v PHP napsat už ani řádek kódu. PHP trpí spoustou problémů, kterých se nejde snadno zbavit, mimojiné kvůli zpětné kompatibilitě.

Abychom ale mohli vyvíjet v Javě, musel by pro ní existovat framework, který by se PHPčkaři rychle naučili a se kterým by se snadno pracovalo a debugovalo. Kam tím mířím? Java potřebuje Nette. Stejně jako [PHP dostalo kopii Hibernate](http://www.doctrine-project.org/), je na čase, aby Java převzala to nejlepší z PHP světa a my mohli z první ruky využívat jazyk, který se už roky v PHP snažíme marně napodobit. Pomůže mi s tím někdo?
