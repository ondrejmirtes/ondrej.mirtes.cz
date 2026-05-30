---
title: How to combine an XML declaration (prolog) with PHP?
slug: how-to-combine-an-xml-declaration-prolog-with-php
date: 2007-10-07T00:00:00
guid: c20ad4d76fe97759aa27a0c99bff6710
---

An **XML declaration** should be part of a valid XHTML page, even though it's not mandatory.

The problem arises the moment we want to use this declaration at the beginning of a PHP script. Both the XML declaration and the PHP code use < > brackets. PHP tries to chew through the declaration code here, but unsuccessfully - the script stops on the first possible line.

How do we work around this limitation and have an XML declaration in any PHP script? Just use echo with single quotes:

```php
echo '<?xml version="1.0" encoding="utf-8"?>';
```
