---
layout: post
title: Hledání alternativy k Gmailu
date: 2013-10-14 09:40:00
guid: 5ef059938ba799aaa845e1c2e8a762bd
---

Od doby, kdy Google zrušil svůj [Reader](http://www.google.com/reader), se od něj snažím odejít a decentralizovat služby, které používám. To, že za produkt mohu [zaplatit](http://feedbin.me/), považuji za příjemnou a nikoli přitěžující okolnost, protože se tím přesouvám z pozice nabízeného zboží (kterému jsou zobrazovány reklamy) do pozice zákazníka.

Vedle RSS čtečky patří mezi mé nejpoužívanější aplikace samozřejmě e-mail. Zrušení Gmailu se nebojím, protože je to se stovkami milionů uživatelů jeden z nejpoužívanějších produktů Googlu. Ten se ho ale stále zoufaleji snaží monetizovat; např. již strká reklamy mezi řadové e-maily a zhoršuje použitelnost Google Talku, resp. nyní již Hangouts, jako Jabber klienta. Jelikož chci mít únikový plán pro případ dalšího mrzačení, jal jsem se ohlížet po alternativách.

### Fastmail

Jako první jsem vyzkoušel [Fastmail](https://www.fastmail.fm/), který [donedávna provozovala Opera](http://thenextweb.com/insider/2013/09/26/fastmail-goes-independent-again-after-the-team-buys-itself-free-of-opera/). Četl jsem na něj hodně chvály, podle ohlasů na Internetu je to asi nejpoužívanější e-mail po Gmailu.

Bohužel jsem ve zkušební době narazil na několik fatálních nedostatků, které mi znemožňují na Fastmail přejít. Obecně mi přišlo, že jeho vývoj zamrzl před několika lety.

Import archivu e-mailů jsem musel dělat nadvakrát a využít při tom své znalosti IMAP protokolu, což si u běžných uživatelů neumím představit. Kromě serveru, jména a hesla se nastavuje ještě tzv. IMAP prefix. Když jsem provedl import s prefixem `[Gmail]` podle návodu, naimportovaly se mi jen e-maily bez štítku. Musel jsem ho spustit znovu bez prefixu, navzdory varování, že import byl navržen jen pro jednorázové spuštění, protože jinak by mohlo dojít k duplikaci e-mailů.

K tomu naštěstí nedošlo a všechny e-maily jsem úspěšně přesunul. Výsledné zaplnění schránky ± 50 MB odpovídalo tomu na Gmailu a při letmé kontrole jsem nalezl e-maily z různých období a v různých složkách tam, kde měly být.

E-mailová schránka je vstupní brána ke všem ostatním účtům, protože si do ní odevšad můžete nechat zaslat požadavek na zapomenuté heslo. Považuji tedy za nutnost mít nastavenou [dvoufázovou autentizaci](/dvoufazove-prihlasovani). Fastmail se tváří, že ji umí, ale oproti Gmailu nepředstavuje tak vysokou úroveň zabezpečení, jak bych si představoval. Podporuje několik alternativních metod přihlašování, ale společně s nimi stále funguje přihlášení hlavním heslem, které vám žádný bezpečnostní kód na mobil nezašle a rovnou vás přihlásí. Takové zabezpečení teoreticky umožňuje bruteforce útok, který u Gmailu principiálně není možný, protože po vás vždy chce opsat kód z SMS.

Rozhodl jsem se v sobě potlačit svého vnitřního [Spazeho](https://twitter.com/spazef0rze) a tento nedostatek překousnout. Fastmail mi v nastavení umožnil zadat mé telefonní číslo, ale v momentě, kdy jsem do přihlašovacího formuláře zadal uživatelské jméno a heslo, které má spustit zaslání autorizační SMS, formulář vypsal chybu, že v ČR zatím SMSky nepodporuje. Aby mi o tom aplikace dala vědět již při jeho nastavování by asi bylo moc mainstream.

Dále jsem chtěl využít Jabber na vlastní doméně tak, jak ho mám u Googlu. Po letmém hledání v nastavení a na Internetu jsem dospěl k tomu, že pokud nechci používat @fastmail.fm doménu a nenutit všechny mé kontakty k opětovné autorizaci, musel bych přejít na [Family tarif](https://www.fastmail.fm/signup/family.html). Ten má ovšem horší parametry - za $40 ročně dostanete namísto 10 GB místa pouze 8 GB, což už je na hraně mých potřeb.

Moje trpělivost přetekla ještě předtím, než jsem začal Fastmail naplno využívat, takže jsem se rozhodl hledat dál.

### Outlook.com

Slábnoucí pozice Microsoftu na trhu ho nutí k nevídaným věcem a je otevřenější než kdy předtím. Uměli jste si ještě před několika lety představit, že bude poskytovat službu ušitou na míru vývojářům konkurenční platformy a mít na webu [videa s člověkem před Macbookem](http://www.windowsazure.com/en-us/develop/mobile/ios/), který vysvětluje výhody Windows Azure pro iOS? Evilizace opouští Microsoft a požírá Google.

Při výběru náhrady za Gmail jsem tedy ochotný zvážit i [odpověď Microsoftu](http://www.outlook.com/). V jeho prospěch mluví i to, že [údajně neskenuje e-maily](http://windows.microsoft.com/en-us/windows/outlook-private) - zobrazené reklamy nemají kontextem nic společného s tím, co vám chodí za poštu. Navíc má obchodní model postavený na bázi freemium - můžete si připlatit $20 ročně, aby vám žádné reklamy vůbec neukazoval. So far so good.

Nastavení služby je přehledné, ale zabugované. Na některé odkazy jsem musel kliknout několikrát, abych na ně mohl přejít. Jednou jsem v prohlížeči musel potvrdit "načíst nezabezpečený skript", abych se dostal do další sekce.

Nastavení dvoufázové autentizace proběhlo bez problémů a je na úrovni Gmailu. Včetně app-specific hesel pro klienty, které ji nepodporují.

Příjemně mě překvapil iOS přímou podporou Outlook.com při přidávání účtu do systému, takže jsem nemusel opisovat žádné názvy serverů ani porty. Zabudovaná aplikace Mail pro Outlook.com podporuje push notifikace, takže se o e-mailu dozvím okamžitě a ne v patnáctiminutových obnovovacích intervalech, což se o Gmailu říct nedá.

Horší to je s importem e-mailů. Sám Microsoft na svém webu [odkazuje](http://blogs.office.com/b/microsoft-outlook/archive/2012/08/09/upgrade-from-gmail-to-outlook-com-in-5-easy-steps.aspx) na vlastní službu [TrueSwitch](https://secure5.trueswitch.com/hotmail/), která ovšem byla zrušena. E-maily lze vždy přesunout ručně v běžném mailovém klientovi díky IMAPu, ale stejně bych tu práci radši přenechal automatizovanému nástroji.

Absence doménového koše není problém. Když jsem se včera vůbec poprvé podíval do koše v Google Apps, 99% e-mailů nebylo určených mně, šlo jen o spam. Bez něj se obejdu.

Poštu jsem si tedy přemigroval k Microsoftu a zatím s tím žádný další problém nemám. V oprošťování se od okovů Googlu se chystám pokračovat. Další na řadě bude instant messaging.
