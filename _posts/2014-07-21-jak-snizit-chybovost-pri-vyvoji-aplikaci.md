---
layout: post
title: Jak snížit chybovost při vývoji aplikací
---

Přiblížím vám několik oblastí, na které byste se měli zaměřit, pokud nejste spokojeni s počtem chyb, které se vám dostávají na produkční server. Mým záměrem není vydat další článek typu "vyhněte se duplikaci" nebo "pište testy", protože takových je hromada, ale vyzdvihnout postupy, které tak hluboce zakořeněné ještě nejsou. Nejspíše i proto, že chybám můžete zabránit nejen technickými, ale i komunikačními dovednostmi.

Nejprve upřesním, co vůbec považuji za chybu. Nechci se pustit do nepopulárního akademického cvičení o co nejpřesnější definici, ale líbí se mi tvrzení, že **chyba je jakákoli odchylka chování aplikace od toho, co uživatel očekává**. Zastřešuje totiž nejen zjevné pády aplikací a pětistovky, ale i chybné operace s daty a jejich prezentaci, nekonzistence, neintuitivní rozhraní a utváření špatného mentálního modelu v hlavě uživatele. [^gulfs]

### Požadavky a zpětná vazba

Řada chyb se rodí ještě v době, kdy není napsaná jediná řádka kódu. Neměli byste začít programovat na základě nejednoznačného či neúplného zadání. Vyžádat si jeho upřesnění či opravu je levné, předělávat hotovou feature či celou aplikaci je drahé, časově náročné a nikoho nebaví.

I v případě, že je zadání v pořádku, je potřeba se neustále ujišťovat, že ho chápete správně a že se ho držíte. Pokud se jedná o vývoj většího celku, doporučuji zadavatele seznamovat s jeho stavem a podobou nejen na konci, ale i v průběhu. Jak často, to záleží na formě spolupráce. V případě interního vývoje klidně několikrát týdně, ve vztahu dodavatel-klient alespoň dvakrát měsíčně.

Některé změny svou povahou umožňují nasazení do produkce, i když nejsou ještě úplně hotové. Pokud např. předěláváte datový model aplikace, aby dokázal pojmout nějakou novou funkcionalitu, pro kterou budete uživatelské rozhraní vyvíjet v další fázi, nasaďte i takovou "neviditelnou" změnu rovnou do produkce. Cílem je co nejrychlejší získání zpětné vazby -- můžete ihned pozorovat vliv na zátěž serveru, přijdete brzy na případné problémy se začleňováním do zbytku systému a upozorníte zadavatele na hrozbu nevyhnutelného zpoždění. Podobně můžete nasadit a testovat třeba i sběr dat týdny či měsíce před tím, než tato data někdo v aplikaci uvidí. [^data-gathering]

### Termíny

- Klient: "Jak dlouho vám zabere vyvinout X?"
- Vývojář: "Čtyři až pět týdnů."
- Klient: "My to ale potřebujeme za dva!"

Jak se obvykle zachováte v takové situaci? Smíříte se s tím, že budete muset pracovat šestnáct hodin denně namísto osmi? Slíbíte klientovi, že to bude za dva týdny, ale po jejich uplynutí mu řeknete, že to potrvá ještě další tři?

Stejně jako [devět žen nedokáže porodit dítě za měsíc](http://en.wikipedia.org/wiki/The_Mythical_Man-Month), stejně jako dvojnásobný počet vývojářů nezkrátí délku vývoje na půlku, tak ani vyřčené odhady nelze nijak magicky obejít. Uspěchaný produkt bude obsahovat více chyb.

Správné řešení je dohodnout se, zdali je důležitější dodržení vyžádaného termínu, nebo rozsahu zadání, a přijít s nějakým kompromisem, typicky kratším vývojem ořezané verze. Důležité je stát si za tím, že odhad původního rozsahu je neměnný.

### Code reviews

Aplikace psaná jedním programátorem nikdy nebude tak kvalitní jako při vývoji ve více lidech. Ale z většího týmu těžíte jen v případě, že děláte code reviews. Veškerý kód, až na triviální bugfixy, by před začleněním do hlavní větve a nasazením měl vedle autora vidět ještě alespoň jeden vývojář.

Při zkoumání kódu kolegy se nejdříve seznámím se zadáním jeho úkolu a vymyslím, jak bych při jeho řešení asi postupoval a co všechno bych musel udělat. Zabývám se vhodností zvolených datových struktur, architekturou a názvy tříd, metod a proměnných. Z kódu musí být zřejmé, co dělá. Rozdíly mezi imaginárním a skutečným řešením pak s autorem konzultuji -- někdy přijdeme na to, že je nedomyšlené to moje, někdy jeho.

Na každý kus kódu je potřeba se dívat velice kriticky a přemýšlet, jaká kombinace vstupních dat by ho mohla rozbít. Ovšem [ego musí stranou](http://www.kitchensoap.com/2012/10/25/on-being-a-senior-engineer/) -- obě strany si musí uvědomit, že je pod drobnohledem kód a nikoli jeho autor. Kontrolor tedy nesmí napadat autora a autor si výtky vůči jeho vlastnímu kódu nesmí brát osobně. Někdy je těžké se rozloučit s tou metodou, na které jsme si dali tak záležet. Pokud ale nezapadá do širšího kontextu, musí jít pryč.

Součástí review by mělo být i důkladné otestování.

### Verzování

To není jen zálohování. Verzování považuji za nedílnou součást kódu, sám jím při vývoji trávím přibližně třetinu času. Verzovací nástroj vám při správném používání usnadní týmovou spolupráci a pomůže s hledáním zdrojů chyb. Ten váš byste se měli naučit dokonale ovládat.

Dělejte malé atomické commity. Tedy takové, které se týkají pouze jednoho úkolu a nic nerozbijí. Cílem je zvýšit čitelnost diffů pro review a ulehčit případné vrácení těchto změn. [^revert]

V případě, že používáte Git, naučte se používat příkazy [`reset`](http://git-scm.com/blog/2011/07/11/reset.html) a [`rebase`](http://git-scm.com/book/en/Git-Branching-Rebasing) (i jeho [interaktivní variantu](http://git-scm.com/book/en/Git-Tools-Rewriting-History)). Přepisování historie je důležité pro zamezení vzniku [merge hell](http://blog.xebia.com/wp-content/uploads/2010/09/git-merge-hell-smaller.png) a navádí vás také k častému commitování, takže nepřijdete nedopatřením o svoji práci. Jelikož se ale časté commity nemusí vždy slučovat s atomičností a stabilitou, můžete těsně před odevzdáním pomocí uvedených příkazů historii uklidit, aby tato kritéria splňovala. [^history]

Stabilní commity vám umožní používat příkaz [`bisect`](http://git-scm.com/book/en/Git-Tools-Debugging-with-Git#Binary-Search). Ten využijete v momentě, kdy máte nějakou chybu, o které víte, že kdysi v systému nebyla, ale nedokážete dohledat, kde vzniká. `git bisect` pomocí binárního vyhledávání nalezne první commit, ve kterém se projevuje. Pokud ale máte v historii takové commity, ve kterých je aplikace značně rozbitá, máte toto hledání ztížené.

### Automatizace

Pokud jakákoli často prováděná operace sestává z více netriviálních kroků, je velmi náchylná na lidské chyby. Proto by operace jako nasazování aplikace, spouštění migrací, kompilace javascriptu a CSS, mazání cache apod. měly mít podobu jediného příkazu. Můžete k tomu použít build nástroje jako [Phing](http://www.phing.info/) nebo [Make](http://www.gnu.org/software/make/). Kromě získání odolnosti proti chybám ušetříte i čas.

A když už je aplikace od nuly zprovoznitelná zavoláním jediného příkazu, nic nebrání její automatické kontrole na tzv. continuous integration serveru jako jsou [Travis](http://docs.travis-ci.com/) a [Jenkins](http://jenkins-ci.org/). Ty nad každým commitem v repozitáři mohou spouštět statickou analýzu, automatické testy nebo kontrolu dodržování coding standardu. Pokud píšete testy, ale nemáte zařízené jejich automatické spouštění a zasílání upozornění když selžou, tak jako kdybyste je neměli. Continuous integration nemá nahrazovat code reviews, ale doplňovat je. Můžete se tak při nich soustředit na věcné problémy a nezabývat se formátováním kódu, jehož správnost se dá ověřit automatizovaně.

[^gulfs]:
	Za jedny z nejfatálnějších chyb považuji tzv. [gulf of execution](http://en.wikipedia.org/wiki/Gulf_of_execution) a [gulf of evaluation](http://en.wikipedia.org/wiki/Gulf_of_evaluation). Tyto pojmy z teorie HCI vyjadřují dva nejčastější zdroje frustrace uživatelů: "Vím, co chci udělat, ale nevím jak" a "Něco jsem udělal, ale nevím, jestli se opravdu stalo to, co jsem chtěl".

[^data-gathering]:
	Crawling cizích webů, stahování dat z API či import e-mailů.

[^revert]:
	Příkaz `git revert`, který jako parametr přijímá hash commitu k vrácení, vytvoří nový, přesně opačný commit. Tedy ty řádky, který původní commit přidával, budou odebrány, a odebrané řádky opět přidány. Proto se vyplatí dělat malé commity -- větší obvykle takto snadno revertovat nejdou a je potřeba změny ručně "vyzobávat".

[^history]:
	"With Git, the trick is to think of history less as 'history' and more as a step-by-step description of your codebase." -- [Max Howell](https://twitter.com/mxcl/status/325002868321046528)