---
title: Shortening the feedback loop
slug: shortening-the-feedback-loop
date: 2016-10-24T08:00:00
---

In the software development industry there are plenty of best practices that speed up and simplify a programmer's work. Much has already been written about clean and readable code, SOLID principles and testing, and I think that whoever wants to has been doing all of that for a long time now. Lately, though, I have been thinking about something that is no less important and fundamental to how a team of developers and their projects function, but which I still don't encounter very often in practice -- whereas I do see the consequences of its absence.

A number of [articles](http://codeahoy.com/2016/04/21/when-to-rewrite-from-scratch-autopsy-of-a-failed-software/) and talks discourage a complete rewrite of working software, and they have solid reasons for it. The need to catch up on years of work on the current version, zero value for the user, and the uncertainty that all that effort will turn out any better. A complete rewrite never makes sense. In the context of this article, though, I consider it merely one extreme on a long scale of different solutions, and I want to show that the lessons that follow from it can be applied to everyday work too, even when you are not rewriting something from scratch and seemingly doing everything right.

What reason do teams have for a complete rewrite? They need to do something differently than it is in the current project; often they just want to try it out. Nobody, not even the greatest expert, often knows whether the direction the development is heading in is the right one. That is why we should try to find out as soon as possible, to get feedback as quickly as possible. The crux of the problem lies above all in the fact that a rewrite takes too long, and for whole months or years teams build something that nobody has any idea whether it is right and whether it will pay off. This problem, however, doesn't concern only complete rewrites, but ordinary iterative development as well.

The feedback loop is the cornerstone of any creative work. You should always focus on getting feedback on your creation as soon as possible. From colleagues, from the hardware, from users and customers. That is the only way to make sure you are building something that is worthwhile.

It is very easy to tell from the outside that someone isn't managing this. From recent memory, one example that comes to mind is [ČEZ and its new customer system](https://ekonomika.idnes.cz/cez-odstavil-zakaznicky-system-dnp-/ekonomika.aspx?c=A160915_191018_ekonomika_ozr):

> The energy company ČEZ is switching to a new customer system. Because of the change, however, it is not possible to make any change to customer contracts until mid-October. Some customers will receive their annual statement late.

For a whole month (!) one of the largest Czech companies cannot touch its customers' data. And that is because they did not collect feedback on the new product continuously, but deployed it all at once and found out too late that it doesn't work.

Faster collection of feedback can be achieved with more frequent releases. But that is not the only metric a team should strive for. It is crucial to keep the amount of new code that is not in production at an absolute minimum. Code that is not deployed is a risk.

The more frequently you deploy, the smaller the changes you get into production in a single batch. Small changes come with a number of advantages. It is easier to do an honest and detailed code review. You have a greater chance of uncovering problems in the code if you are reviewing tens of lines rather than thousands.

> 10 lines of code = 10 issues. \\
> 500 lines of code = "looks fine." \\
> [twitter.com/iamdevloper](https://twitter.com/iamdevloper/status/397664295875805184)

The smaller the change, the smaller the risk that something breaks. Small changes are easy to revert. Short branches in Git are also far easier to manage, rebase and merge.

Concentrating on getting feedback quickly requires a change of mindset. For every change you make, you have to think about how to make it so that it can be deployed immediately without any problem.

When developing new functionality, you typically face a lot of "preparatory" work on which you then build the new functionality. Such refactorings shouldn't break anything and should be deployable right away. That way you verify that they work and fix any errors, of which there certainly won't be as many as if you deployed them only in one big final bundle of changes with the whole functionality finished. It is certainly more advantageous to fix two errors 15 times over the course of several weeks than thirty errors all at once.

Besides collecting feedback on your changes in production, the colleagues with whom you share your fresh code will thank you too -- they can benefit from it right away in their own task, or easily help you with yours.

Despite its advantages, however, this approach is also in some ways more demanding. Tasks need to be broken down into small parts. These parts may at first seem almost ridiculously small to you, but that means you are going about it the right way. Just as an application's object model should consist of many simple small objects, so too should development consist of many small changes, where each one makes sense both in isolation and together with the others.

Breaking a task down into phases means you also need to think through how the application looks in the intermediate states. You will develop a feel for which requirements relate to one another, which parts of the task are essential and which are secondary. If, for example, you are redesigning part of the application and at the same time implementing new features in it, take the opportunity to split this big project into two smaller ones -- first implement and deploy the redesign with the current features, and only then add the new features to it. This approach to work requires a certain amount of extra overhead, but in return you reduce the risks associated with deploying new versions of the application to a minimum. And progress is visible from the outside. You won't be afraid to deploy a small change even on a Friday afternoon. And once you learn this, your development will consist solely of these small, safe changes.

> The more s/w projects I see, the more I am getting convinced that most code quality guidelines have zero impact compared to feedback loops \\
> [twitter.com/pembleton](https://twitter.com/pembleton/status/768551599052644352)

If you are working on functionality that is not yet supposed to be visible, you turn branches in the version control system into branches in the code, so-called feature toggles. You deploy the work-in-progress to production, but make it accessible only to a certain user role or under a special URL. In the same way you can also run A/B tests or a gradual roll out. You should keep the number of feature toggles to the necessary minimum as well, and as soon as the new feature is accessible to everyone, you should simplify the application code again and remove the feature toggle.

If you are working on something completely new, you should verify the product's usefulness as soon as possible. It is therefore nonsense to start development with a registration and login form, which is always the same, but you should always start with what is the core of the given product, what represents its value. If the first version delivers value to you, you can start improving it.

It pleases me when I see these principles applied outside software development too. Are you writing an article and it has no end? Split it into several parts and release them one by one. Are you writing a book? Release it to readers chapter by chapter. Does it sound crazy? For some it is already [common](https://www.objc.io/blog/2015/07/14/advanced-swift-early-access/) [practice](https://www.objc.io/blog/2015/07/28/core-data-early-access/).

Further reading: [Why Continuous Deployment?](http://www.startuplessonslearned.com/2009/06/why-continuous-deployment.html), [Code spiral](http://www.pushing-pixels.org/2015/06/11/code-spiral.html). I also recommend [following Michiel Rook](https://twitter.com/michieltcs), the developer of Phing, who often writes and links about the topic.
