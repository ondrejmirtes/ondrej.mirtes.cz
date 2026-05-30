---
title: On ad blocking
slug: on-ad-blocking
---

Every now and then a debate flares up about it. Some defend advertising as the only possible livelihood for website operators, others point to ad overload, its tastelessness, intrusiveness and generally diminished comfort as reasons for blocking it. Why I see nothing wrong with the second camp's point of view (and count myself among them) I'll explain in the following paragraphs.

I'll begin with a gentle introduction to how today's web works. Servers (someone's computers) expose freely available content on some port and some address. Anyone can ask for that content with an HTTP request. In most cases, text in HTML format is downloaded, and it's up to the client what it does with that text. It can display it in its pure form, render it as ASCII art in a text console, have it read aloud by a screen reader for the blind -- the possibilities are countless. One of them is to hand the HTML code to the rendering engine of a modern web browser. Even there I have a range of options for how to interpret the downloaded code -- I can disable or enable JavaScript execution, not download images, not run Flash, tell the server that I'm on a [slow connection](http://caniuse.com/#feat=netinfo) or that I have a [low battery](http://caniuse.com/#feat=battery-status).

There's a lot of talk these days about machine learning. Imagine a browser that, based on the movement of the user's eyes, would learn and on repeat visits to a site present the user with only those parts of the page they paid attention to in the past. So that irrelevant blocks of headlines, text and graphics wouldn't distract them from what actually interests them. An enticing idea that, if executed well, a lot of users might be interested in.

Except that we already have something like that today, and it's causing an enormous stir. Ad blockers maintain lists of elements on pages that bother most users, and automatically remove them during rendering. Why does this bother website operators? After all, they gave me content to download that can be interpreted in various ways, and I picked one of them.

The thing is, in their business model the operators rely on my browser interpreting the code I download from them in the way that earns them money. But that's outdated thinking that will work worse and worse. How do we get out of it?

There are efforts to prevent ad blocking, but if you read the previous paragraphs carefully, you already know that it's fundamentally impossible. Yes, both sides can react to each other's moves and adapt to them, but it will always be a game of cat and mouse, and the blocking side will generally always have the upper hand, because the principles of web technologies favor it. Just as I can switch the channel while watching television, or skip the page with paid ads while reading the newspaper, on the web I will always have the option to avoid ads. Nobody bats an eye anymore at the pop-up blocking built right into the browser.

So this is not the way forward in the long run. Website operators have to realize why users feel the need to block ads -- because they're intrusive, aggressive, tasteless, and eat up far more data, processor time and battery[^sviznost]. As long as I have to close, with the little X, an animated and noisy ad for a mobile carrier when I enter a news portal -- an ad that's eating precious megabytes out of my data cap -- I'm simply going to block it. So advertisers, ad networks and operators should first and foremost fix advertising's reputation -- serve it in such quantity and quality that people don't flee from it and don't ignore it.

Even though I don't look at and don't click on ads on content sites, I don't feel like a freeloader. I believe I'm useful to the website operator anyway. I give them my time, read their articles, think about the topics in question, and if they grab me, I share them onward.

From the previous paragraphs it might seem that I'm in favor of abolishing the field of marketing, but that's not the case. Marketing is a creative field, and it's up to the creatives to get content to me at the right moment that will be useful to me and interest me. I'm a proponent of [native advertising](https://en.wikipedia.org/wiki/Native_advertising). If the form of the ad is combined with the right targeting, I have nothing against it. So if my [favorite tech podcast](http://atp.fm/) mentions a quality [domain registrar](https://www.hover.com/) or a [VPS host](https://www.linode.com/), it's a bullseye for me.[^podcasty]

Further reading: [The ethics of modern web ad-blocking](https://marco.org/2015/08/11/ad-blocking-ethics)

[^sviznost]: Nothing compares to the snappiness of websites with a blocker enabled, especially on mobile devices. iOS 9 came to 64-bit devices with support for so-called content blockers, which brings unexpected support for ad blocking to Apple's closed ecosystem. I recommend everyone install one.

[^podcasty]: Based on ads in podcasts, I've bought at least four products by now. Who can say that about banners on Czech websites?
