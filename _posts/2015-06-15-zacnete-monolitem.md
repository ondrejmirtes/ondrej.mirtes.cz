---
title: Začněte monolitem
date: 2015-06-15 13:01:00
external_url: http://martinfowler.com/bliki/MonolithFirst.html
---

Martin Fowler reaguje na aktuální módu mikroservisní architektury tvrzením, že začínat vývoj nové aplikace od mikroservis je nebezpečné, protože dopředu nevíte, jak do nich projekt rozdělit, a spíše si špatně aplikovanou architekturou uškodíte.

> Any refactoring of functionality between services is much harder than it is in a monolith. But even experienced architects working in familiar domains have great difficulty getting boundaries right at the beginning. By building a monolith first, you can figure out what the right boundaries are, before a microservices design brushes a layer of treacle over them.

Mikroservisy jsou sice výhodnější z dlouhodobého hlediska, protože lze vývoj projektu rozdělit a škálovat do více nezávislých týmů, ale zároveň s sebou nese i nevyhnutelnou režii při navrhování a implementaci API, reagování na selhávající požadavky, nemožnost stahovat si všechna data z jedné databáze naráz apod. A pokud vyvíjíte něco nového, nevíte, zdali daný projekt bude mít takový úspěch a růst, aby se mikroservisy a pomalejší příchod na trh vyplatily.

> When you begin a new application, how sure are you that it will be useful to your users? It may be hard to scale a poorly designed but successful software system, but that's still a better place to be than its inverse. As we're now recognizing, often the best way to find out if a software idea is useful is to build a simplistic version of it and see how well it works out. During this first phase you need to prioritize speed (and thus cycle time for feedback), so the premium of microservices is a drag you should do without.
