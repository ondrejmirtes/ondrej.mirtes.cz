---
title: Doctrine vs. NotORM vs. the rest of the world
slug: doctrine-vs-notorm-vs-the-rest-of-the-world
date: 2010-11-06T00:00:00
guid: c9f0f895fb98ab9159f51fd0297e236d
---

At today's [Barcamp](http://srazy.info/barcamp-praha/709), [Jakub Vrána](http://php.vrana.cz/) gave a talk comparing [Doctrine 2 ORM](http://zdrojak.root.cz/serialy/doctrine-2/) with his own library, [NotORM](http://www.notorm.com/). In terms of code simplicity, line count, and the number of queries executed to print out articles and their assigned tags from the database, NotORM won unsurprisingly, which immediately makes it a candidate for the model layer of a web application in the eyes of naive programmers. Which sends a shiver down my spine.

The main motivation for using Doctrine is a consistent representation of data in the application and working with it. And objects give me that. Not wrappers around functions (a class with nothing but static methods), nor wrappers around data (a class with public properties or a generic storage mechanism like [DibiRow](http://api.dibiphp.com/2.1/DibiRow.html)), but real objects representing some meaningful whole with unbreakable consistency and methods that let me work with them.

If I take it from the angle that I want to store some rows in the database and then select them back out again, then with Doctrine I really do have a lot more writing to do that doesn't make sense. But if I decide up front that I primarily want to comfortably work with **consistent** objects in the application, the way it's normally done in Java, for instance (and something PHP folks still can't quite get under their skin), then to store them in the database using Doctrine I only have to do the bare minimum - write a few annotations on the class and its properties.

What motivation do we have for this way of writing an application and stepping away from simple database layers like NotORM or [dibi](http://dibiphp.com/)? The moment the size of the application [exceeds a certain threshold](http://www.google.cz/images?q=enterprise), a [model with de facto static methods](http://doc.nette.org/cs/0.9/quickstart/vytvoreni-modelu), in which database access, writing to files, and sending emails are all mixed together, becomes unmaintainable chaos over the long term. That's when the by-now legendary [five-layer model](http://www.phpguru.cz/clanky/pet-vrstev-modelu) comes into play, whose closest implementation in PHP is precisely Doctrine 2.

This architecture allows for easy testability and therefore reliability, flexibility (the model's API, and consequently the presentation layer, doesn't have to change when the database is reworked), it's maintainable over the long term, and when it comes to multilingualism and versioning, you can do it cleanly and without tearing all your hair out. In this area NotORM, and the classic Nette models the community favored for a long time, really don't stand a chance.

Of course this isn't the only correct way to approach the problem. Some companies/projects choose the approach of having [all the logic in the database](http://webexpo.cz/prednaska/proc-ne-orm/). The PHP application is then built only to play the role of a simple presentation layer, and all operations are carried out using database procedures. Why not.

There's certainly room in Doctrine to optimize the queries it issues, and I can imagine it using NotORM for that. But having that library as the only model layer in larger applications developed by multiple people doesn't really work very well.
