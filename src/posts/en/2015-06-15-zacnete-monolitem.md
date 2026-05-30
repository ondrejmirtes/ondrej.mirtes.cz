---
title: Start with a monolith
slug: start-with-a-monolith
date: 2015-06-15T13:01:00
external_url: http://martinfowler.com/bliki/MonolithFirst.html
---

Martin Fowler responds to the current craze for microservice architecture by arguing that starting the development of a new application from microservices is dangerous, because you don't know up front how to split the project into them, and you're more likely to hurt yourself with poorly applied architecture.

> Any refactoring of functionality between services is much harder than it is in a monolith. But even experienced architects working in familiar domains have great difficulty getting boundaries right at the beginning. By building a monolith first, you can figure out what the right boundaries are, before a microservices design brushes a layer of treacle over them.

Microservices are indeed more advantageous in the long run, because development of the project can be split and scaled across multiple independent teams, but at the same time they carry inevitable overhead in designing and implementing the API, reacting to failing requests, the inability to pull all the data from a single database at once, and so on. And if you're developing something new, you don't know whether the project will have enough success and growth to make microservices and a slower time to market worth it.

> When you begin a new application, how sure are you that it will be useful to your users? It may be hard to scale a poorly designed but successful software system, but that's still a better place to be than its inverse. As we're now recognizing, often the best way to find out if a software idea is useful is to build a simplistic version of it and see how well it works out. During this first phase you need to prioritize speed (and thus cycle time for feedback), so the premium of microservices is a drag you should do without.
