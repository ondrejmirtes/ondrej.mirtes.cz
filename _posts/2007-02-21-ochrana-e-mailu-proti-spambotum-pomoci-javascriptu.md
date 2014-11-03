---
title: Ochrana e-mailů proti spambotům pomocí JavaScriptu
date: 2007-02-21 00:00:00
no_initial: TRUE
guid: 45c48cce2e2d7fbdea1afc51c7c6ad26
---

E-mailové adresy na webech jsou vystaveny útokům spamrobotů, kteří je indexují a ukládají do své databáze. Stačí mít tedy svůj e-mail 1x na nějakém zaindexovaném webu a už to jede. Obvyklé obrany proti těmto způsobům získávání adres pro spam jsou pro uživatele nepřívětivé. V případě, že je zavináč nahrazen nějakým jiným znakem, nemusí méně zkušeného návštěvníka napadnout při psaní e-mailu ten znak správně nahradit. A v případě adres zobrazených jako obrázky ji musí uživatel přepisovat celou. Navíc už boti disponují kvalitním OCR, na technologii CAPTCHA se nedá spolehnout.

[Martin Jurča](http://scorpions.cz/vizitky/martin-jurca/) mi poradil ochranu, kterou sám ke své plné spokojenosti používá. Ta sází na skutečnost, že boti neumí JavaScript. Pomocí JS se zapíše odkaz v normálním tvaru a objeví se na stránce tak, jak ho známe. Uživatelé nejsou omezeni a boti jsou (aspoň na nějakou dobu) eliminování.

Kód pro její implementování na web je následující:

{% highlight js %}
<script type="text/javascript">
	var prikaz = "mail";
	var prikaz2 = "to:";
	var jmeno = "ondrej.mirtes";
	var server = "lasthunter";
	var domena = "cz";
	document.write ('<a href="' + prikaz + prikaz2 + jmeno + '@' + server + '.' + domena + '">');
	document.write (jmeno + '@' + server + '.' + domena + '</a>');
</script>
{% endhighlight %}
