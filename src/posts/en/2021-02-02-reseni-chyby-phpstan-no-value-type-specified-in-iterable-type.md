---
title: 'Solving PHPStan error "No value type specified in iterable type"'
slug: solving-phpstan-no-value-type-specified-in-iterable-type
date: 2021-02-02
external_url: https://phpstan.org/blog/solving-phpstan-no-value-type-specified-in-iterable-type
---

> This problem is reported by PHPStan on level 6 when typehinting an array or an iterable object as a parameter type or a return type. It’s there to prevent values of unknown types to be used as a foreach value:
