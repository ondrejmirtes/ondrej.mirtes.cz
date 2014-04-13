---
layout: post
title: Doctrine vs. NotORM vs. zbytek světa
date: 2010-11-06 00:00:00
guid: c9f0f895fb98ab9159f51fd0297e236d
---

[Jakub Vrána](http://php.vrana.cz/) na dnešním [Barcampu](http://srazy.info/barcamp-praha/709) ve své přednášce srovnával [Doctrine 2 ORM](http://zdrojak.root.cz/serialy/doctrine-2/) se svou knihovnou [NotORM](http://www.notorm.com/). V jednoduchosti kódu, počtu řádků a vykonaných dotazů nutných pro vypsání článků a přiřazených tagů z databáze zvítězilo nepřekvapivě NotORM, což z něj u naivních programátorů hned dělá kandidáta na modelovou část webové aplikace. Z čehož mi přebíhá mráz po zádech.

Hlavní motivací pro používání Doctrine je konzistentní reprezentace dat v aplikaci a práce s nimi. A tu mi zařídí objekty. Nikoli obálky nad funkce (třida se samými statickými metodami), ani obálky nad data (třída s public proměnnými či obecným ukládacím mechanismem jako [DibiRow](http://api.dibiphp.com/2.1/DibiRow.html)), ale skutečné objekty reprezentující nějaký smysluplný celek s nenarušitelnou konzistencí a metodami, které mi umožní práci s nimi.

Pokud to vezmu z toho konce, že chci do databáze uložit nějaké řádky a pak je zase vybrat, pak mám s Doctrine skutečně o mnoho víc psaní, které nedává smysl. Ale pokud si primárně stanovím, že chci v aplikaci pohodlně pracovat s **konzistentními** objekty, jak se to standardně dělá třeba v Javě (a PHPčkařům to stále neleze pod kůži), pro ukládání do databáze pomocí Doctrine už musím udělat jen minimum - napsat ke třídě a jejím proměnným pár anotací.

Jakou máme motivaci pro tento způsob psaní aplikace a odstoupení od jednoduchých databázových vrstev, jako je právě NotORM nebo [dibi](http://dibiphp.com/)? Ve chvíli, kdy velikost aplikace [překročí určitou mez](http://www.google.cz/images?q=enterprise), je [model s de facto statickými metodami](http://doc.nette.org/cs/0.9/quickstart/vytvoreni-modelu), ve kterém se míchá přístup do databáze, zápis do souborů a posílání mailů, dlouhodobě neudržitelný chaos. Na řadu pak přichází dnes již legendární [pětivrstvý model](http://www.phpguru.cz/clanky/pet-vrstev-modelu), jehož nejbližší implementací v PHP je právě Doctrine 2.

Tato architektura umožňuje snadnou testovatelnost a tudíž i spolehlivost, flexibilitu (API modelu a tudíž ani prezentační vrstva se při překopání databáze nemusí měnit), je dlouhodobě udržitelná a když přijde řeč na vícejazyčnost a verzování, lze to udělat čistě a bez vytrhání všech vlasů. V této oblasti se NotORM, ani klasické Nette modely, jak byly dlouhou dobu komunitou upřednostňovány, skutečně nechytají.

Samozřejmě to není jediný správný způsob, jak k problému přistoupit. Některé firmy/projekty volí přístup mít [všechnu logiku v databázi](http://webexpo.cz/prednaska/proc-ne-orm/). PHP aplikace je pak stavěná pouze do role jednoduché prezentační vrstvy a všechny operace se provádějí pomocí databázových procedur. Proč ne.

V Doctrine je určitě prostor pro optimalizaci pokládaných dotazů a umím si představit, že by k tomu použila NotORM. Ale mít tuto knihovnu jako jedinou vrstvu modelu u rozsáhlejších aplikací vyvíjenými více lidmi moc dobře nejde.
