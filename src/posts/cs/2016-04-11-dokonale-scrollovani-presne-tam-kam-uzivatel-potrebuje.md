---
title: Dokonalé scrollování přesně tam, kam uživatel potřebuje
---

Při vývoji [nového košíku Slevomatu](https://twitter.com/slevomat/status/529988112756539392) jsme čelili řadě výzev. Jedna z nich souvisela s tím, že celý košík byl prezentován na jedné stránce a nové kroky prodlužovaly stránku směrem dolů. Pro uživatele to má ten přínos, že na pozdějších krocích nemusí dohledávat, co v košíku vlastně má, ale stačí se podívat na vrchol stránky.

<div style="text-align:center">
![Aktuální košík](/images/cely-kosik.png)
</div>

Celý košík je koncipovaný jako SPA[^spa]. I když jsme měli wireframy s návrhem podoby jednotlivých kroků košíku, statický návrh, který sám o sobě vypadá dobře, neposkytuje kompletní obraz o fungování aplikace. Musel jsem přijít na to, jak udělat přechod mezi jednotlivými kroky košíku tak, aby se uživatel hned zorientoval a měl představu, kde se nachází.

V momentě, kdy uživatel vyjádří svůj úmysl (pokračuje v košíku do dalšího kroku, nebo se vrací zpět) by mu aplikace neměla klást žádné překážky a další "úkoly" před tím, než bude moct pokračovat v tom, co chce udělat. V případě našeho košíku se tedy nabízí automatické scrollování, aby uživatel poté, co klikne na "Pokračovat", mohl rovnou vybírat platbu a nemusel už sahat na kolečko myši.

První naivní implementace posouvala stránku vždy tak, že horní okraj aktuálního kroku košíku byl srovnaný s horním okrajem viewportu:

```js
$('html, body').animate({
	scrollTop: $target.offset().top
}, 500);
```

<div style="text-align:center">
![Košík -- prvek je zarovnaný s horním okrajem](/images/kosik-top.png)
</div>

Stránka se hýbala pokaždé a někdy urazila i zbytečně dlouhou vzdálenost, což bylo nepříjemné pro oči. Řekl jsem si, že cílem vlastně není, aby se aktuální krok objevil vždy na vrcholu viewportu, ale pouze aby byl celý viditelný a to kdekoli na obrazovce.

První optimalizace spočívala v tom, že pokud už je aktuální krok celý ve viewportu, nemusím scrollovat vůbec. K tomu potřebuji výšku viewportu a relativní pozici prvku vůči němu. Žádné scrollování je nejlepší scrollování!

```js
var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var isWholeElementVisible = $element[0].getBoundingClientRect().top >= 0 &&
	$element[0].getBoundingClientRect().bottom <= viewportHeight;
if (isWholeElementVisible) {
	return;
}
```

Pokud tato podmínka neprošla, přistoupil jsem opět k naivnímu scrollu k hornímu okraji. To ale vedlo ke stejně zbytečným a příliš velkým pohybům jako před touto optimalizací. Napadlo mě, že bych mohl nějak pracovat s dolním okrajem prvku a zarovnávat ho ke spodnímu okraji viewportu:

<div style="text-align:center">
![Košík -- prvek je zarovnaný s dolním okrajem](/images/kosik-bottom.png)
</div>

Ale v jakém případě? Nemůžu tak scrollovat pokaždé, protože by to since jakž-takž fungovalo pro přechod do následujících kroků, ale při návratu do předchozích by opět docházelo k většímu pohybu stránky, než je ve skutečnosti potřeba. A to je ten pravý klíč - porovnám vzdálenost, jakou musí stránka cestovat pro zarovnání horního okraje prvku s horním okrajem viewportu a dolního okraje prvku s dolním okrajem viewportu a zascrolluju tam, kam je to blíž!

Ze scrollování na dolní okraje musím ještě vyřadit prvky, které jsou vyšší než celý viewport, protože uživatel by neměl přijít o začátek kroku, kde může být jeho název, vysvětlivky nebo třeba i část formuláře, který musí vyplnit.

```js
var currentScrollPosition = window.scrollY;
var scrollingOffsetTop = $element.offset().top;
var offsetToScrollTo = scrollingOffsetTop;
var fitsInViewPort = $element.height() < viewportHeight;
if (fitsInViewPort) {
	var scrollingDistanceToTop = Math.abs(currentScrollPosition - scrollingOffsetTop);
	var scrollingOffsetBottom = scrollingOffsetTop + $element.outerHeight() - viewportHeight;
	var scrollingDistanceToBottom = Math.abs(currentScrollPosition - scrollingOffsetBottom);
	if (scrollingDistanceToBottom < scrollingDistanceToTop) {
		offsetToScrollTo = scrollingOffsetBottom;
	}
}

$('html, body').animate({
	scrollTop: offsetToScrollTo
}, 500);

```

Toto řešení se mi už celkem líbilo. Poslední detail, který jsem upravil, byla délka trvání animace. Pro větší vzdálenosti proběhl scroll příliš rychle a výsledný efekt opět nebyl příjemný. Nastavil jsem animaci tedy tak, že pokud během scrollu urazí stránka více jak 60 % viewportu, prodloužím výchozí délku o 30 %:

```js
var duration = 500;
var scrollingDistance = Math.abs(currentScrollPosition - offsetToScrollTo);
if (scrollingDistance / viewportHeight > 0.6) {
	duration *= 1.3;
}
$('html, body').animate({
	scrollTop: offsetToScrollTo
}, duration);
```

Mám za to, že nad pozicí při scrollování je potřeba uvažovat vždy a nezůstat u naivního řešení v první ukázce. Věřím, že popsaný postup najde uplatnění nejen u jednostránkových košíků.

Osobně se jako doma cítím spíše při programování backendu, ale baví mě [občas skočit](/jak-se-webar-stal-mobilnim-vyvojarem) i na frontend a vyřešit nějaký zajímavý problém - počítání se souřadnicemi na displeji je úplně jiná liga, než psaní SQL dotazů a plnění šablon[^backend]. Minulý týden jsem např. strávil nějakou dobu[^vinyl] laděním [pohybu vinylové desky](https://www.slevomat.cz/narozeniny), aby se plynule zastavovala a rozjížděla v závislosti na kurzoru uživatele.

[^spa]: Single-page application -- po prvotním načtení už veškerá uživatelova interakce a komunikace se serverem probíhá pomocí AJAXu a nedochází ke znovunačítání stránky, což vede k rychlejší práci s aplikací a zvýšenému uživatelskému komfortu.

[^backend]: Samozřejmě, že práce na backendu není jen o tomhle, ale s klientskými aplikacemi si připadám tak nějak blíž lidem 😉

[^vinyl]: Víc, než jsem ochotný přiznat.
