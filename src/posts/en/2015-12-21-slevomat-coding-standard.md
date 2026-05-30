---
title: Slevomat Coding Standard
slug: slevomat-coding-standard
date: 2015-12-21T08:00:00
---

*English version of the article is [available on Medium](https://medium.com/@ondrejmirtes/slevomat-coding-standard-861267de576f).*

Every development team should have a solid supporting infrastructure that helps ensure and enforce consistent output from all of its members. A coding standard is one of the many things that hold a project together.

You shouldn't be able to tell who wrote a piece of source code. The whole team should follow uniform conventions. Some of them (the way code is formatted) can be checked automatically, others (e.g. adherence to the chosen architecture) need to be addressed during code review.

At Slevomat we've had a very strict standard in place for a year and a half now, which [Jenkins](https://jenkins-ci.org/) checks in every pull request with the help of [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer). Six months ago, on top of the foundation provided by the [Consistence Coding Standard](https://github.com/consistence/coding-standard), we added a number of advanced sniffs that we'd provisionally committed to our private repository. Some of them also support automatic fixes, which makes integrating them into a project easier.

I've waited a very long time for today. We're finally releasing these sniffs as open source for public use. Let me highlight the ones I consider the most interesting and useful:

### Unused private properties and methods

*SlevomatCodingStandard.Classes.UnusedPrivateElements*

PHP_CodeSniffer is unsuitable for static analysis of source code, because it can only analyze a single file at a time and has no access to reflection. But some specific checks can be performed with it. This sniff detects unused and write-only private properties and unused methods that can be safely deleted. Thanks to this sniff we regularly get rid of dead code during refactoring, as well as needlessly injected, unused dependencies in the constructor.

### Trailing comma after the last array element

*SlevomatCodingStandard.Arrays.TrailingArrayComma*

A comma after the last element in a multi-line array makes adding further elements easier and makes version-control diffs clearer.

### Disallowing Yoda conditions

*SlevomatCodingStandard.ControlStructures.YodaComparison*

If you prefer the classic ordering when writing conditions instead of the [Yoda style](https://en.wikipedia.org/wiki/Yoda_conditions), this sniff can find and even automatically fix the offenses.

### Alphabetically sorted uses

*SlevomatCodingStandard.Namespaces.AlphabeticallySortedUses*

A good coding standard should enforce unifying the form of all code that can be objectively unified. This sniff eliminates arguments about how to order the imports from other namespaces at the top of each file.

### Unused uses

*SlevomatCodingStandard.Namespaces.UnusedUses*

More dead-code detection. Why tolerate superfluous uses when this sniff can find them and even delete them? It can handle Doctrine annotations too.

## Start using them today!

The sniffs mentioned here aren't the only ones we released today. You'll find a complete list of them and an exhaustive guide to using the whole standard — or even just a few individual sniffs — together with the source code [on GitHub](https://github.com/slevomat/coding-standard). We consider the code so well tested and stable that we didn't hesitate to release version 1.0.0.
