---
title: Jak na spam ve webových formulářích?
date: 2007-06-27 00:00:00
guid: c51ce410c124a10e0db5e4b97fc2af39
---

Jelikož můj původní web poháněl vlastní systém, implementoval jsem do něj postupně funkce tehdy, až když jsem je potřeboval. Když roboti po pár měsících od startu přišli na to, jak přidávat komentáře pod články a ty se začaly objevovat opravdu ve velkém množství, situaci bylo potřeba vyřešit.

Nechtěl jsem uživatele obtěžovat s opisováním znaků z nečitelných obrázků, ani s matematikou. Problém za mě vyřešil [Jakub Vrána](http://php.vrana.cz/ochrana-formularu-proti-spamu.php). Nutno říct, že jeho způsob eliminace spamu u mě fungoval na sto procent, od jeho nasazení mi nepřišel do komentářů jediný nevyžádaný příspěvek (od automatu).

**A jak na to?** Předpokládáme, že botům stále nebyl dán do vínku JavaScript. Uživateli tedy položíme nějakou otázku či zadáme úkol vyplnit dodatečné pole formuláře, JavaScriptem toto pole skryjeme a požadovanou hodnotou vyplníme. Uživatelé s JavaScriptem o ničem nevědí. Uživatelé bez JavaScriptu nejsou nijak omezeni, pouze musí vyplnit o jednu hodnotu navíc. Ve zpracování odeslaného formuláře pak nepokračujeme, pokud v dané proměnné není požadovaná hodnota.

### Část formuláře s ochranným polem

{% highlight html %}
<noscript>
	<label>Vyplňte nospam:</label>
	<input type="text" name="robot" />
</noscript>
<script type="text/javascript">
	document.write('<input type="hidden" name="robot" value="' + 'no' + 'spam' + '" />');
</script>
{% endhighlight %}

### PHP skript

Zde už následuje pouze jednoduchá podmínka, která nepustí data k zápisu do databáze, pokud formulářové pole neobsahuje řetězec *nospam*:

{% highlight php startinline %}
if ($_POST["robot"] !== "nospam") { ... }
{% endhighlight %}
