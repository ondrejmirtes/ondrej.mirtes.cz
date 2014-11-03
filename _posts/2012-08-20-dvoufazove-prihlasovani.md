---
title: Dvoufázové přihlašování
date: 2012-08-20 09:00:00
guid: e369853df766fa44e1ed0ff613f563bd
---

Two-factor authentication zabraňuje vniku do účtu v případě odhalení vašeho hesla. Přidává další úroveň zabezpečení - musíte prokázat nejen, že něco víte (heslo), ale i že něco máte. Implementace tohoto druhého faktoru se napříč službami liší.

### Gmail

E-mail je centrem vaší internetové identity. Kdokoli s přístupem k vašemu e-mailu se může zmocnit i vašeho libovolného dalšího účtu pomocí zaslání zapomenutého hesla. Dvoufázové přihlášení tedy každému důrazně doporučuji.

Google ho [umožňuje zapnout](https://www.google.com/settings/security) pro všechny své služby. Uživatelům Google Apps ho nejdříve musí povolit správce domény.

Při prvním přihlášení na neověřeném počítači vám SMS zprávou přijde šestimístný číselný kód, který opíšete do přihlašovacího formuláře. Důvěryhodný počítač pak můžete autorizovat až na 30 dní, během kterých po vás Google nebude ověření SMSkou vyžadovat.

Pro aplikace, které dvoufázové přihlášení nepodporují (např. nativní mobilní aplikace a e-mailoví klienti), umí Google vygenerovat “application-specific password”. To je vždy v podobě čtyř písmenných čtveřic, které se vám zobrazí pouze jednou, abyste je pouze opsali do dané aplikace. Zpětně pak můžete tato konkrétní hesla zneplatnit. Zneklidnilo mě, že k mému účtu nebude existovat jedno heslo, ale více, což zvyšuje šanci na prolomení. Google naštěstí neumožňuje tato specifická hesla použít pro přihlášení tam, kde je podporována autorizace SMSkou, takže nehrozí nějaké destrukční zneužití.

### Facebook

Pro Facebook platí to samé, co pro e-mail - zneužití vašeho účtu může mít katastrofální následky.

Dvoufázové přihlášení je na něm implementováno stejně, jako u Googlu - při přihlášení z neznámého zařízení vám přijde SMS s šestimístným číselným kódem. Kromě toho umožňuje zasílat ověření e-mailem, ve kterém je odkaz na přihlášení.

Zapnout si ho můžete [v nastavení zabezpečení](https://www.facebook.com/settings?tab=security).

### Internetbanking

Moje ČSOB sice nevyžaduje ověření SMSkou při přihlášení do bankovnictví, ale při provádění jakékoli operace s účty již ano. Dnes je to u všech bank snad už standard.

Nedávno ale navíc zavedla [dvoufázovou autorizaci při použití platební karty na Internetu](http://www.csob.cz/cz/lide/Platebni-karty/Stranky/Zabezpeceni-internetovych-plateb-kartou-3D-Secure.aspx). V ČR ji již podporují všechny platební brány, ale začíná se rozmáhat i v zahraničí. Je nešikovné, že tato služba je pro prodejce opt-in, takže útočník může kartu tam, kde toto ověření vyžadování není, ale i tak je to krok správným směrem.

### Steam

Mít zabezpečenou svou herní knihovnu a aktuální zůstatek na Steam Wallet považuji za neméně důležité. Valve podporu dvoufázového přihlášení [pompézně představilo](http://www.joystiq.com/2011/03/04/steam-guard-gets-the-ultimate-test-gabe-newell-makes-his-passwo/) v březnu loňského roku - Gabe Newell při něm odhalil své heslo.

Při přihlášení vám přijde e-mail s pětimístným alfanumerickým kódem, který opíšete do přihlašovacího formuláře, ať už na webu nebo ve Steam klientu.

### Battle.net

Účty Blizzardu jsou velmi častým cílem hackerů. Gold selleři ve World of Warcraft vykrádají postavy, nasbírané předměty dávají na aukci a zlaťáky přeprodávají hráčům, kteří za ně platí reálné peníze.

Dvoufázová autorizace je zde uskutečněná pomocí aplikace pro smartphony, kterou si stáhnete z app storu vaší platformy. Při prvním spuštění vygeneruje kódy, které opíšete do administrace účtu na Battle.netu a tím ji propojíte se svým účtem. Při přihlašování do her pak vyplňujete časově omezený číselný kód, který vám autentikátor na telefonu ukáže.

Správa účtu na webu Battle.netu ho po mně chce vyplnit pokaždé, v herních klientech spíše sporadicky - nedokázal jsem přijít na konkrétní časový interval. Blizzard o tom píše:

> The authenticator system will now intelligently track your login locations. If you are logging in consistently from the same location, you may not be asked for an authenticator code. This process is designed to make logging in faster when you're at a secure location.

### A další?

Doufám, že se tato praktika mezi poskytovateli služeb bude šířit. Jasní kandidáti, kteří ji zatím neimplementují, jsou Apple, Twitter, Dropbox, Amazon a další.

PayPal by měl umět dvoufázovou autentizaci pomocí [VeriSign Identity Protection](https://idprotect.verisign.com/mainmenu.v), ale při snaze o spárování autentikátoru mi zahlásil chybu. Nejspíš ji ještě nepodporuje pro české účty.
