---
title: Slevomat Coding Standard
date: 2015-12-21 08:00:00
---

*English version of the article is [available on Medium](https://medium.com/@ondrejmirtes/slevomat-coding-standard-861267de576f).*

Každý vývojářský tým by měl mít k dispozici kvalitní podpůrnou infrastrukturu, která pomáhá zajišťovat a vynucovat konzistentní výstupy všech jeho členů. Coding standard je jednou z mnoha věcí, které drží projekt pohromadě.

Ze zdrojového kódu by nemělo být poznat, kdo ho psal. Celý tým by měl mít jednotné zvyklosti. Některé (způsob formátování) jdou kontrolovat automaticky, jiné (např. dodržování navržené architektury) je potřeba řešit při code review.

Ve Slevomatu máme již rok a půl velmi striktní standard, který nám v každém pull requestu za pomoci [PHP_CodeSnifferu](https://github.com/squizlabs/PHP_CodeSniffer) kontroluje [Jenkins](https://jenkins-ci.org/). Před šesti měsíci jsme k základu v podobě [Consistence Coding Standardu](https://github.com/consistence/coding-standard) přidali řadu pokročilých sniffů, které jsme měli provizorně commitnuté v našem privátním repozitáři. Některé podporují i automatické opravy, což ulehčuje jejich integraci do projektu.

Na dnešek jsem čekal hodně dlouho. Tyto sniffy konečně vydáváme jako open-source pro veřejné použití. Vypíchnu zde ty, které považuji za nejzajímavější a nejužitečnější:

### Nepoužité privátní properties a metody

*SlevomatCodingStandard.Classes.UnusedPrivateElements*

PHP_CodeSniffer je sice nevhodný pro statickou analýzu zdrojových kódů, protože umí analyzovat najednou pouze jeden soubor a nemá přístup k reflexi, ale některé specifické kontroly pomocí něj provádět jdou. Tento sniff detekuje nepoužité a write-only privátní properties a nepoužité metody, které lze bez obav smazat. Díky tomuto sniffu se pravidelně zbavujeme mrtvého kódu při refaktoringu a zbytečně injektovaných nepoužívaných závislostí v konstruktoru.

### Čárka za posledním prvkem pole

*SlevomatCodingStandard.Arrays.TrailingArrayComma*

Čárka za posledním prvkem ve víceřádkovém poli zjednodušuje přidávání dalších prvků a zpřehledňuje verzovací diffy.

### Zákaz Yoda podmínek

*SlevomatCodingStandard.ControlStructures.YodaComparison*

Pokud máte radši klasické pořadí při zápisu podmínek namísto [Yoda stylu](https://en.wikipedia.org/wiki/Yoda_conditions), tento sniff dokáže najít a dokonce i automaticky opravit prohřešky.

### Abecedně seřazené uses

*SlevomatCodingStandard.Namespaces.AlphabeticallySortedUses*

Dobrý coding standard by měl vynucovat sjednocení podoby veškerého kódu, co jde objektivně sjednotit. Tento sniff odbourává hádky o tom, jak řadit importy z jiných jmenných prostorů na začátku každého souboru.

### Nepoužité uses

*SlevomatCodingStandard.Namespaces.UnusedUses*

Další detekce mrtvého kódu. Proč trpět nadbytečné uses, když je tento sniff umí najít a dokonce i smazat? Poradí si i s Doctrine anotacemi.

## Začněte je používat ještě dnes!

Zmíněné sniffy nejsou jediné, které jsme dnes vydali. Jejich kompletní výčet a vyčerpávající návod k použití celého standardu, ale i třeba jen pár jednotlivých sniffů, společně se zdrojovými kódy [naleznete na GitHubu](https://github.com/slevomat/coding-standard). Kód považujeme za tak prozkoušený a stabilní, že jsme neváhali vydat verzi 1.0.0.
