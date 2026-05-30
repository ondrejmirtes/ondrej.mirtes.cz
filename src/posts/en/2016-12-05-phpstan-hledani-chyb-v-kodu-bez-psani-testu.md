---
title: "PHPStan: finding bugs in your code without writing tests"
slug: phpstan-finding-bugs-in-your-code-without-writing-tests
date: 2016-12-05T08:00:00
external_url: https://phpstan.org/blog/find-bugs-in-your-code-without-writing-tests
---

On the [PHPStan blog I've written at length](https://phpstan.org/blog/find-bugs-in-your-code-without-writing-tests) about what I've been working on for several years now, the last year of it intensively -- a tool for static analysis of PHP code. PHPStan finds bugs without needing to run the code in question, which brings it closer to the compilers of statically typed languages. It makes use of the information available when parsing PHP code - typehints, documentation comments and reflection.

Various development versions of PHPStan have been guarding the production code at Slevomat for over a year now, and many times it has caught a bug on the CI server in time that would otherwise have made it into production. Developers at [Hele.cz](https://web.archive.org/web/20161107000617/https://www.hele.cz/), [DámeJídlo.cz](https://www.damejidlo.cz/) and [Bonami](https://www.bonami.cz/) speak highly of it too.

Compared to similar tools, what it offers above all is speed, extensibility[^extensibility] and various levels of strictness, so that it doesn't overwhelm you with an excessive number of bugs on the first run, but only the most fundamental ones, letting you start using it right away.

You'll find a longer and more detailed discussion of it [on the PHPStan blog](https://phpstan.org/blog/find-bugs-in-your-code-without-writing-tests), or just [take a look at the documentation](https://phpstan.org/user-guide/getting-started) on how to set it up on your own project. In case you'd like help with the integration and configuration, definitely [get in touch](/en/about).

[^extensibility]: To describe the magical behavior of classes that dynamically define properties and methods through the implementation of the magic methods `__get`, `__set` and `__call`.
