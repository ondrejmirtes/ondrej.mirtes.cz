---
title: Why I'd rather code in Java
slug: why-id-rather-code-in-java
date: 2012-04-12T00:02:00
guid: eccbc87e4b5ce2fe28308fd9f2a7baf3
---

The way applications are currently written in PHP closely resembles Java. We program fully object-orientedly and rely on knowing the type of every variable. Including [items in arrays](http://forum.nette.org/cs/9921-presnejsi-phpdoc-pro-pole). The problem is that, because of its procedural and scripting past, PHP can't guarantee this for us and it can't be relied upon. The principles of OOP were gradually bolted onto it. And there's still dynamic typing, which doesn't work very well with OOP.

When I call some method on an object, I rely on knowing the type of the variable in which that object is stored. But in dynamic languages that type is only determined on the fly and can be different on every run. We do have type hinting, but nothing stops the programmer from passing the wrong type into a method, and the program then crashes just the same, only one step earlier in the stack trace.

Programmers in Python and Ruby often complain about the verbosity of Java and related languages. But every character I save during the initial implementation comes back to bite me during the subsequent maintenance of the code. When refactoring, we rename, move, and delete chunks of code. With every such step, though, we have to check everywhere that code is used so we don't break the application. Java does this for us automatically. Whenever you reference a nonexistent class or method, or call a method with invalid parameters, the IDE underlines that line and the compiler won't let you go any further.

When developing in PHP, most of the fixes concern this kind of error, and likewise during testing the most energy is wasted on them. By contrast, in Java what gets tested is primarily the application's business logic itself, that is, whether the code really does what it should. Because the compiler takes care of typos and references to nonexistent code for us, and we don't discover it only thanks to tests or when clicking through to the third step in an order form.

The fact that we can reliably determine the type of a variable reflects positively on the IDE's capabilities. Flawless autocompletion, unheard-of options for automatic refactoring. If you want to rename a namespace, a class, or heaven forbid a method in PHP, a lot of manual work with an uncertain outcome awaits you, or writing an ingenious script. In Java, every IDE handles it in a few clicks.

Java natively supports annotations and can enforce their correct use just like ordinary code. In PHP, communities had to invent their concept and parsing for each project themselves. They're written into documentation comments. Comments that, in every language, have always been discarded during compilation and couldn't affect the running of the application in any way. In PHP they're heavily relied upon.

Java, although it's the target of jokes about its speed, is many times faster than PHP. No wonder - on every request PHP has to load and process source code from up to hundreds of files (depending on the size of the application and the libraries used), whereas Java gets this work done once, at compile time. It's also helped by static typing, which makes the compiler's and the processor's job easier.

Why am I writing about Java and not C#? Categorically they're the same languages, with C# being more innovative and having a few interesting extra features, e.g. properties or anonymous functions. In my eyes, though, it's buried by the necessity of running Windows on both the developer's machine and the production server.

I believe any present-day PHP programmer would quickly get their bearings in Java and would be surprised by its capabilities, which PHP tries to approach with every version. So why isn't it far more widespread? Setting aside the small number of hosts and their prices, it's the frameworks. I haven't managed to come across a single one I'd enjoy working with. If I run into a problem and manage to find a thread where the same thing is being solved, I still haven't won, because it often depends on the minor point-release versions of the libraries and server used, and the presented solution may not work for me. It's often nerve-racking.

PHP also owes its spread to the fact that it's basically a simple templating language accessible to beginners - it's easy to generate HTML with it. Most programmers, though, stay with it even at the moment when they see the light and realize that the application's logic should be separated from outputting information, and that there's something called OOP that makes the code clearer when applied correctly. So we have a language on which it's [easiest to build a business](http://www.knesl.com/articles/view/zkuste-to-bez-php), because lots of programmers know it, but at the same time it throws sticks under their feet when they start doing something more complex in it. A vicious circle.

When I read an article like [this one](http://me.veekun.com/blog/2012/04/09/php-a-fractal-of-bad-design/), (I don't agree with everything, but with most points I do), I don't feel like writing a single line of code in PHP anymore. PHP suffers from a host of problems that can't be easily gotten rid of, among other things because of backward compatibility.

But in order to be able to develop in Java, there would have to exist a framework for it that PHP folks could learn quickly and that would be easy to work with and debug. Where am I going with this? Java needs Nette. Just as [PHP got a copy of Hibernate](http://www.doctrine-project.org/), it's time for Java to take the best from the PHP world so that we can firsthand make use of a language we've been vainly trying to imitate in PHP for years. Will someone help me with that?
