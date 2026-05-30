---
title: What I expect from iOS 7
slug: what-i-expect-from-ios-7
date: 2013-04-02T10:03:00
guid: c9e1074f5b3f9fc8ea15d152add07294
---

I recently realized that I spend more time on mobile devices than at the computer. Thanks to portability and battery life, it's the better choice for me despite the simplified operating system and the touch keyboard.

That's why I'm anticipating the new version of iOS with more interest than Mac OS X. The current sixth version didn't bring much new compared to its predecessor, so I assume Apple has now been working on a more substantial update for the second year.

### iCloud

In the last few days, [a number of](http://www.theverge.com/2013/3/26/4148628/why-doesnt-icloud-just-work) [not exactly flattering](http://inessential.com/2013/03/27/why_developers_shouldnt_use_icloud_sy) articles about iCloud have [come out](http://arstechnica.com/apple/2013/03/frustrated-with-icloud-apples-developer-community-speaks-up-en-masse/). This brand covers several different services — an email inbox, a calendar, and contact storage, but above all an API for third-party apps. That's where the biggest problems are, and developers are resorting to other services (e.g. [Simperium](https://simperium.com/)) or to their own infrastructure (e.g. [Things](http://culturedcode.com/things/) or [Instacast](http://vemedio.com/products/instacast3)).

If you decided to use iCloud for your app today, you'd have to choose one of three storage options for your data. A simple key-value store that can hold at most 1,000 values, file storage, and database storage (CoreData). The most problems are with CoreData, which is at the same time the most tempting. It promises synchronization of mutually interconnected data structures, which is a big challenge in itself. But beyond the inherent difficulties of this complex task, the API sometimes [doesn't work](https://twitter.com/SteveStreza/status/314494942489751553) even at the most basic level, and developers can hardly figure out where the error lies.

Apple has to solve this. Whether by fixing the existing CoreData implementation, or by creating a fourth API with similar functionality but with cloud synchronization in mind from the very beginning. After all, developers had CoreData available even before iCloud as ordinary database storage, and this functionality was only added on top of it.

If we set aside the fact that data synchronization simply doesn't work, iCloud faces other problems. From the user's point of view, the file system on iOS is made up of application containers. Every installed app thus has its own directory available and can't read outside of it. iCloud's document storage works the same way. If I save a Keynote presentation to iCloud, I open it again in Keynote on the iPad. But if I save a file in an app that has no counterpart from the same developer on the other device, I simply won't find that file. I can't send myself a PDF over iCloud, because on the Mac I can only save it in the Preview app, which doesn't exist on iOS. I have to resort to Dropbox or email. This isn't a simple nut to crack either, because Apple won't give up its intention to build a wall between the user and the filesystem.

Data in iCloud can only be accessed in native apps for iOS and Mac OS X. If a developer wants to make, say, a web or Windows variant as well, they also have to develop their own synchronization. The fact that Apple only supports its own platform is understandable, but it applies a double standard here — you can get to email, calendar, and contacts even in a web browser at [icloud.com](http://www.icloud.com/).

If an app is supposed to support collaboration among multiple users, it also has to have its own server. iCloud only serves as data storage for a single user. At present it only supports limited use cases, and as soon as an app wants to do something more sophisticated, it can't use iCloud for it.

Apple has to solve these technological and fundamental shortcomings. Because otherwise it risks being [overtaken by others](http://www.businessinsider.com/apple-google-design-web-services-2012-11) even in the area where it currently leads, leaving it with no competitive advantage at all.

### Inter-app communication

The shape of inter-app communication is tied to the shape of the filesystem and the application containers. On iOS it's very limited.

Apps can register to open certain file types. A PDF I load in Safari I can thus open in iBooks or in Dropbox. At that moment this file is **copied** into the iBooks container. So the changes I make to files don't propagate to its other instances in other apps.

Another option for exchanging data is so-called URL schemes. Each app can register its own [protocol](http://applookup.com/Home) with the system (e.g. googlechrome://), and other apps can launch it through that. The condition, then, is that developers know about other **specific** apps and implement support for them.

By the way, this means that every app has to implement sending links to "read it later" services on its own, and — if I leave aside the integrated Twitter and Facebook in iOS 6 — support for sharing to social networks as well.

Fortunately, things are looking up in this regard. While poking around the system's internals, Ole Begemann [discovered](http://oleb.net/blog/2012/10/remote-view-controllers-in-ios-6/) the mechanism of so-called remote view controllers, which Apple started using, for example, for the email-sending window. The Mail app uses this approach to offer up part of itself inside another app and, once the task is done, retreat to the background again. In the future, exactly this could become the basis for more sophisticated data sharing between apps, which users of other operating systems know as intents (Android) or contracts (Windows Phone).

### Jony Ive

After Scott Forstall was let go at the end of October, there was a reshuffle in the company's top positions. Jony Ive took over software design, and everyone is [hoping](http://www.cultofmac.com/198751/why-firing-scott-forstall-means-ios-will-get-a-lot-better/) this will bring a new look to the iOS user interface. The [end](http://www.cultofmac.com/198844/8-design-crimes-that-jonathan-ive-should-set-right-in-ios-7-feature/) of leather calendars and lined notepads!

It's hard to say how many sweeping changes can be managed in those few months, and to be safe I'd look as far ahead as iOS 8, but the first swallow has already arrived. At the end of March, an [update](http://arstechnica.com/apple/2013/03/hands-on-apples-podcasts-app-loses-reel-animation-gains-playlists/) to the Podcasts app arrived that removed the flashy but utterly pointless moving magnetic tape.

What we'll actually get in iOS 7 and what it will look like we'll most likely find out in June at the traditional WWDC 2013 conference.
