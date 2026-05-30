---
title: Objectively comparing technologies
slug: objectively-comparing-technologies
---

David Grudl [called on developers on Twitter](https://twitter.com/geekovo/status/603583104498999298) to compare developing a web application in Nette versus a JavaScript solution. No matter which of the competing technologies won on speed, I hold the view that it says nothing about its suitability for the long-term development and maintenance of serious applications.

These comparisons have a lot in common with synthetic benchmarks. What they test doesn't correspond to what an application does in normal operation, and at the same time the raw performance of a framework isn't the main criterion a developer should care about when choosing one.

When developing, what matters isn't how quickly a developer can hammer out the first version of an application on a greenfield project according to a fixed specification, but a number of other criteria:

- The application's extensibility and maintainability, how easy it is to make changes in the source code
- Testability and test coverage
- The state of the source code and how easily it can be handed over to another developer or team
- The friendliness of the user interface
- The availability and cost of developers familiar with the technology
- Documentation, community, and the technology's future

Three years ago I myself took part in the [Battle of the Frameworks](https://web.archive.org/web/20120924223212/http://www.knesl.com:80/articles/view/webexpo-2012-souboj-frameworku). The task was, much like in David's challenge, to develop an e-shop with an admin interface in a single day. Each of the competitors approached the task differently, and the resulting ranking didn't necessarily correspond to how the given application would fare over the long term. For example, the winner, Jakub Vrána, used his Adminer Editor to build the admin interface, which saved him a lot of time in the competition, but an admin interface generated from the definition of tables in a relational database provides no room for customizing behavior and therefore delivers lower user comfort.

The experience of the individual participants also naturally factors into the comparison -- both with programming in general and with the specific competition technology.

So how should you go about choosing a technology, when a one-day hackathon won't help us pick it? When we started developing a new shopping cart at Slevomat at the end of last August, we knew we wanted the whole thing to work as a single-page application with all server communication happening via AJAX. We needed a technology that would project the state of the data on the server into the template on the client side. As suitable candidates we picked [React](https://facebook.github.io/react/), [Knockout](http://knockoutjs.com/), and the templating engine [Handlebars](http://handlebarsjs.com/). I spent three days comparing these technologies by implementing the first step of the cart in each one, and then comparing which technology was closest to how development happens at the company, estimating what could become a problem in the future and how easily this or that would help us solve it. I chose Knockout, and two months later we [successfully launched](https://twitter.com/slevomat/status/529988112756539392) the cart without any major problems on the client or the server.

So did I choose correctly? The catch is that this can't be determined. How would development have gone if I'd chosen React? Maybe the cart would have been finished two weeks earlier, but after launch we'd have run into a nasty, hard-to-debug bug. Maybe we wouldn't have made the deadline. Maybe it would have been more performant at redrawing the DOM, but the front-end coder wouldn't have been able to edit its templates. If we really cared whether we'd chosen well, we could try developing in both technologies in parallel for the entire two months, which on one hand would cost more money, and on the other we'd again run into the differing levels of developer experience, so the comparison once again wouldn't be objective.

If, after finishing the cart in Knockout, I were curious how React would fare and set out to implement it in React myself, I again wouldn't be able to compare the technologies objectively, because while developing the first version I'd gathered experience that I'd apply in React, allowing me to avoid some dead ends. A fair comparison therefore can't be obtained not only from several different developers, but not even from a single one.

When choosing a technology, take into account what your expectations of it are and whether it can meet them, the skills and experience of the people who'll be working with it, and don't agonize too much over musings about how the project might have turned out if you'd decided differently at the start. [^benchmarks]

[^benchmarks]:
	And definitely don't look at performance benchmarks, popularity polls, and what your favorite personality uses.
