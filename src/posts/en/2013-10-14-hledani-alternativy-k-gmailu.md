---
title: Looking for an alternative to Gmail
slug: looking-for-an-alternative-to-gmail
date: 2013-10-14T09:40:00
guid: 5ef059938ba799aaa845e1c2e8a762bd
---

Ever since Google shut down its [Reader](http://www.google.com/reader), I've been trying to leave it and decentralize the services I use. The fact that I can [pay](http://feedbin.me/) for a product I consider a pleasant rather than a burdensome circumstance, because it moves me from the position of merchandise on offer (which gets shown ads) into the position of a customer.

Alongside the RSS reader, one of my most-used applications is, of course, email. I'm not afraid of Gmail being shut down, because with its hundreds of millions of users it's one of Google's most-used products. But Google is trying ever more desperately to monetize it; for example, it's already shoving ads in among ordinary emails and degrading the usability of Google Talk — or rather Hangouts now — as a Jabber client. Since I want an escape plan in case of further mutilation, I set out to look around for alternatives.

### Fastmail

The first one I tried was [Fastmail](https://www.fastmail.fm/), which [until recently was run by Opera](http://thenextweb.com/insider/2013/09/26/fastmail-goes-independent-again-after-the-team-buys-itself-free-of-opera/). I'd read a lot of praise for it; judging by the responses online, it's probably the most-used email after Gmail.

Unfortunately, during the trial period I ran into several fatal shortcomings that make it impossible for me to switch to Fastmail. In general, it felt to me like its development froze several years ago.

I had to do the email archive import twice and use my knowledge of the IMAP protocol in the process, which I can't imagine ordinary users doing. Besides the server, username, and password, you also configure a so-called IMAP prefix. When I ran the import with the `[Gmail]` prefix as instructed, only the emails without a label got imported. I had to run it again without the prefix, despite the warning that the import was designed for a one-time run only, because otherwise emails could be duplicated.

Fortunately that didn't happen, and I successfully moved all my emails. The resulting mailbox usage of about 50 MB matched the one on Gmail, and in a quick check I found emails from various periods and in various folders where they were supposed to be.

The email inbox is the gateway to all your other accounts, because you can have a forgotten-password request sent to it from everywhere. So I consider it a necessity to have [two-factor authentication](/en/two-factor-authentication) set up. Fastmail pretends to support it, but compared to Gmail it doesn't represent as high a level of security as I'd like. It supports several alternative login methods, but alongside them you can still log in with the main password, which doesn't send any security code to your phone and logs you in right away. Such security theoretically allows a brute-force attack, which with Gmail is in principle impossible, because it always wants you to copy a code from an SMS.

I decided to suppress my inner [Spaze](https://twitter.com/spazef0rze) and swallow this shortcoming. Fastmail let me enter my phone number in the settings, but the moment I entered the username and password into the login form that's supposed to trigger sending the authorization SMS, the form printed an error that it doesn't support SMS in the Czech Republic yet. Having the app tell me about this back when I was setting it up would probably have been too mainstream.

Next I wanted to use Jabber on my own domain the way I have it with Google. After a quick search in the settings and online, I concluded that if I didn't want to use the @fastmail.fm domain and force all my contacts to re-authorize, I'd have to switch to the [Family plan](https://www.fastmail.fm/signup/family.html). That, however, has worse parameters — for $40 a year you get only 8 GB of space instead of 10 GB, which is already on the edge of my needs.

My patience ran out even before I started using Fastmail in earnest, so I decided to keep looking.

### Outlook.com

Microsoft's waning position in the market is forcing it into unprecedented things, and it's more open than ever before. Could you, just a few years ago, have imagined that it would provide a service tailored to developers of a competing platform and have [videos on its site of a person in front of a MacBook](http://www.windowsazure.com/en-us/develop/mobile/ios/) explaining the advantages of Windows Azure for iOS? Evilization is leaving Microsoft and devouring Google.

In choosing a replacement for Gmail, I'm therefore willing to consider [Microsoft's answer](http://www.outlook.com/) as well. Another point in its favor is that it [allegedly doesn't scan emails](http://windows.microsoft.com/en-us/windows/outlook-private) — the ads it shows have nothing to do with the context of what arrives in your mail. On top of that, it has a freemium-based business model — you can pay an extra $20 a year so that it shows you no ads at all. So far so good.

The service's settings are well laid out, but buggy. I had to click some links several times before I could go to them. Once I had to confirm "load unsafe script" in the browser to get into another section.

Setting up two-factor authentication went without a hitch and is on a par with Gmail. Including app-specific passwords for clients that don't support it.

I was pleasantly surprised by iOS's direct support for Outlook.com when adding the account to the system, so I didn't have to copy out any server names or ports. The built-in Mail app supports push notifications for Outlook.com, so I learn about an email immediately and not in fifteen-minute refresh intervals — something you can't say about Gmail.

It's worse with importing emails. Microsoft itself [points](http://blogs.office.com/b/microsoft-outlook/archive/2012/08/09/upgrade-from-gmail-to-outlook-com-in-5-easy-steps.aspx) on its site to its own [TrueSwitch](https://web.archive.org/web/20140123032618/https://secure5.trueswitch.com/hotmail/) service, which has, however, been discontinued. Emails can always be moved manually in an ordinary mail client thanks to IMAP, but I'd still rather leave that work to an automated tool.

The absence of a domain catch-all isn't a problem. When I looked into the catch-all in Google Apps for the very first time yesterday, 99% of the emails weren't meant for me — it was just spam. I can do without it.

So I migrated my mail over to Microsoft, and so far I've had no further problem with it. I plan to keep going in freeing myself from Google's shackles. Next in line will be instant messaging.
