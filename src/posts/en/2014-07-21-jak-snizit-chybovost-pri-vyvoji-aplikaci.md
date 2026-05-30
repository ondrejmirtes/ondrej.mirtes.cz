---
title: How to reduce the error rate in application development
slug: how-to-reduce-the-error-rate-in-application-development
---

I'll walk you through several areas you should focus on if you're not happy with the number of bugs that make it to your production server. My intention isn't to publish yet another "avoid duplication" or "write tests" article -- there are plenty of those -- but to highlight practices that aren't yet so deeply ingrained. Probably also because you can prevent bugs not only with technical skills but with communication skills as well.

First let me clarify what I even consider a bug. I don't want to dive into an unpopular academic exercise about the most precise possible definition, but I like the claim that **a bug is any deviation in the application's behavior from what the user expects**. That covers not only obvious application crashes and 500 errors, but also incorrect data operations and their presentation, inconsistencies, unintuitive interfaces, and the forming of a wrong mental model in the user's head. [^gulfs]

### Requirements and feedback

A lot of bugs are born while there isn't a single line of code written yet. You shouldn't start programming based on an ambiguous or incomplete specification. Requesting its clarification or correction is cheap; reworking a finished feature or an entire application is expensive, time-consuming, and no fun for anyone.

Even when the specification is fine, you need to keep reassuring yourself that you understand it correctly and that you're sticking to it. If you're developing a larger whole, I recommend keeping the client informed about its state and shape not just at the end, but throughout. How often depends on the form of cooperation. For internal development, by all means several times a week; in a vendor-client relationship, at least twice a month.

Some changes, by their nature, allow deployment to production even when they aren't completely finished yet. If, for example, you're reworking the application's data model so it can accommodate some new functionality whose user interface you'll develop in a later phase, deploy even such an "invisible" change to production right away. The goal is to get feedback as quickly as possible -- you can immediately observe the impact on server load, you'll catch any problems with integrating it into the rest of the system early, and you'll warn the client about the threat of an inevitable delay. Similarly, you can deploy and test, say, data gathering weeks or months before anyone sees that data in the application. [^data-gathering]

### Deadlines

- Client: "How long will it take you to develop X?"
- Developer: "Four to five weeks."
- Client: "But we need it in two!"

How do you usually react in a situation like that? Do you resign yourself to having to work sixteen hours a day instead of eight? Do you promise the client it'll be done in two weeks, but once they're up, tell them it'll take another three?

Just as [nine women can't deliver a baby in one month](http://en.wikipedia.org/wiki/The_Mythical_Man-Month), just as twice the number of developers won't cut the development time in half, the estimates you give can't be magically circumvented either. A rushed product will contain more bugs.

The right solution is to agree on whether it's more important to meet the requested deadline or the scope of the specification, and to come up with some compromise -- typically a shorter development of a trimmed-down version. The important thing is to stand by the fact that the estimate for the original scope is non-negotiable.

### Code reviews

An application written by a single programmer will never be as high-quality as one developed by more people. But you only benefit from a larger team if you do code reviews. All code, except for trivial bugfixes, should be seen by at least one developer besides the author before it's merged into the main branch and deployed.

When examining a colleague's code, I first familiarize myself with the specification of their task and figure out how I would probably approach solving it and everything I'd have to do. I consider the appropriateness of the chosen data structures, the architecture, and the names of classes, methods, and variables. The code must make it clear what it does. I then discuss the differences between the imaginary and the actual solution with the author -- sometimes we find that mine wasn't thought through, sometimes that theirs wasn't.

You need to look at every piece of code very critically and think about what combination of input data could break it. But [the ego has to be set aside](http://www.kitchensoap.com/2012/10/25/on-being-a-senior-engineer/) -- both sides must realize that it's the code under the microscope, not its author. The reviewer therefore must not attack the author, and the author must not take criticism of their own code personally. Sometimes it's hard to say goodbye to that method we put so much care into. But if it doesn't fit into the broader context, it has to go.

Thorough testing should be part of the review as well.

### Version control

This isn't just backing up. I consider version control an integral part of the code; I personally spend roughly a third of my development time on it. Used correctly, a version control tool will make team collaboration easier and help you find the sources of bugs. You should learn to use yours perfectly.

Make small atomic commits. That is, ones that concern only a single task and don't break anything. The goal is to increase the readability of diffs for review and to make it easier to revert those changes if needed. [^revert]

If you use Git, learn to use the [`reset`](http://git-scm.com/blog/2011/07/11/reset.html) and [`rebase`](http://git-scm.com/book/en/Git-Branching-Rebasing) commands (including its [interactive variant](http://git-scm.com/book/en/Git-Tools-Rewriting-History)). Rewriting history is important for preventing [merge hell](http://blog.xebia.com/wp-content/uploads/2010/09/git-merge-hell-smaller.png), and it also nudges you toward committing often, so you don't accidentally lose your work. Since frequent commits don't always reconcile with atomicity and stability, you can use the aforementioned commands to clean up the history right before submitting it, so it meets those criteria. [^history]

Stable commits let you use the [`bisect`](http://git-scm.com/book/en/Git-Tools-Debugging-with-Git#Binary-Search) command. You'll use it the moment you have some bug that you know wasn't in the system at some point, but you can't track down where it arises. Using binary search, `git bisect` finds the first commit in which it manifests. But if you have commits in your history in which the application is significantly broken, this search is made harder.

### Automation

If any frequently performed operation consists of several non-trivial steps, it's very prone to human error. That's why operations like deploying the application, running migrations, compiling JavaScript and CSS, clearing caches, and so on should take the form of a single command. You can use build tools like [Phing](http://www.phing.info/) or [Make](http://www.gnu.org/software/make/) for this. Besides gaining resilience to errors, you'll also save time.

And once the application is bootable from scratch by invoking a single command, nothing stands in the way of checking it automatically on a so-called continuous integration server such as [Travis](http://docs.travis-ci.com/) or [Jenkins](http://jenkins-ci.org/). These can run static analysis, automated tests, or coding standard compliance checks on every commit in the repository. If you write tests but haven't set up their automatic execution and notifications when they fail, it's as if you didn't have them at all. Continuous integration isn't meant to replace code reviews, but to complement them. That way, during reviews you can focus on substantive problems and not bother with code formatting, whose correctness can be verified automatically.

[^gulfs]:
	Among the most fatal bugs I count the so-called [gulf of execution](http://en.wikipedia.org/wiki/Gulf_of_execution) and [gulf of evaluation](http://en.wikipedia.org/wiki/Gulf_of_evaluation). These terms from HCI theory express the two most common sources of user frustration: "I know what I want to do, but I don't know how" and "I did something, but I don't know whether what I wanted actually happened."

[^data-gathering]:
	Crawling other people's websites, downloading data from an API, or importing e-mails.

[^revert]:
	The `git revert` command, which takes the hash of the commit to revert as a parameter, creates a new commit that is the exact opposite. So the lines the original commit added will be removed, and the removed lines added back. That's why it pays off to make small commits -- larger ones usually can't be reverted this easily and you have to "cherry-pick" the changes by hand.

[^history]:
	"With Git, the trick is to think of history less as 'history' and more as a step-by-step description of your codebase." -- [Max Howell](https://twitter.com/mxcl/status/325002868321046528)
