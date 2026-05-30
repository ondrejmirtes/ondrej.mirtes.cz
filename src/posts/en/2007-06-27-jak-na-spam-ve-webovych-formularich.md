---
title: How to deal with spam in web forms?
slug: how-to-deal-with-spam-in-web-forms
date: 2007-06-27T00:00:00
guid: c51ce410c124a10e0db5e4b97fc2af39
---

Since my original website was powered by a custom system, I implemented features into it gradually, only as I needed them. When, a few months after launch, the bots figured out how to add comments under articles and those started showing up in truly large numbers, the situation needed to be solved.

I didn't want to bother users with copying characters from illegible images, nor with math. The problem was solved for me by [Jakub Vrána](http://php.vrana.cz/ochrana-formularu-proti-spamu.php). I have to say that his method of eliminating spam worked a hundred percent for me; since deploying it, not a single unsolicited comment (from an automated bot) has reached me.

**So how is it done?** We assume the bots still haven't been blessed with JavaScript. We therefore ask the user a question, or instruct them to fill in an additional form field, then use JavaScript to hide that field and fill it with the required value. Users with JavaScript know nothing about any of this. Users without JavaScript aren't restricted in any way, they just have to fill in one extra value. When processing the submitted form, we then don't continue if the given variable doesn't contain the required value.

### The part of the form with the protective field

```html
<noscript>
	<label>Fill in nospam:</label>
	<input type="text" name="robot" />
</noscript>
<script type="text/javascript">
	document.write('<input type="hidden" name="robot" value="' + 'no' + 'spam' + '" />');
</script>
```

### The PHP script

What follows here is just a simple condition that won't let the data through to be written into the database if the form field doesn't contain the string *nospam*:

```php
if ($_POST["robot"] !== "nospam") { ... }
```
