---
title: 'Solving PHPStan error "Unsafe usage of new static()"'
slug: solving-phpstan-error-unsafe-usage-of-new-static
date: 2021-01-13
external_url: https://phpstan.org/blog/solving-phpstan-error-unsafe-usage-of-new-static
---

> This error is reported for new static() calls that might break once the class is extended, and the constructor is overridden with different parameters.
