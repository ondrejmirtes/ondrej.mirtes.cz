---
layout: post
title: Jak na kombinaci XML deklarace (prologu) a PHP?
date: 2007-10-07 00:00:00
guid: c20ad4d76fe97759aa27a0c99bff6710
---

**XML deklarace** by měla být součástí validní XHTML stránky, i když není povinná.

Problém nastává v momentě, kdy tuto deklaraci chceme použít na začátku PHP skriptu. Jak deklarace XML, tak PHP kód používají < > závorky. PHP se tady snaží překousat kód deklarace, ale neúspěšně - skript se zastaví na první možné řádce.

Jak toto omezení obejít a mít XML deklaraci v libovolném PHP skriptu? Stačí použít echo s jednoduchými uvozovkami:

{% highlight php startinline %}
echo '<?xml version="1.0" encoding="utf-8"?>';
{% endhighlight %}
