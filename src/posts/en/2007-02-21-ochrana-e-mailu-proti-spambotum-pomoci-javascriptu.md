---
title: Protecting e-mail addresses from spambots with JavaScript
slug: protecting-e-mail-addresses-from-spambots-with-javascript
date: 2007-02-21T00:00:00
guid: 45c48cce2e2d7fbdea1afc51c7c6ad26
---

E-mail addresses on websites are exposed to attacks by spambots, which index them and store them in their database. So all it takes is having your e-mail just once on some indexed website and the trouble begins. The usual defenses against these methods of harvesting addresses for spam are unfriendly to users. When the at sign is replaced with some other character, a less experienced visitor might not think to replace that character correctly when writing the e-mail. And in the case of addresses displayed as images, the user has to retype the whole thing. On top of that, bots now have quality OCR, so you can't rely on CAPTCHA technology.

[Martin Jurča](http://scorpions.cz/vizitky/martin-jurca/) suggested a defense to me that he himself uses to his full satisfaction. It relies on the fact that bots can't do JavaScript. JS is used to write out the link in its normal form, and it appears on the page the way we know it. Users aren't restricted and bots are (at least for some time) eliminated.

The code for implementing it on a website is the following:

```js
<script type="text/javascript">
	var prikaz = "mail";
	var prikaz2 = "to:";
	var jmeno = "ondrej.mirtes";
	var server = "lasthunter";
	var domena = "cz";
	document.write ('<a href="' + prikaz + prikaz2 + jmeno + '@' + server + '.' + domena + '">');
	document.write (jmeno + '@' + server + '.' + domena + '</a>');
</script>
```
