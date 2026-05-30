---
title: Two-factor authentication
slug: two-factor-authentication
date: 2012-08-20T09:00:00
guid: e369853df766fa44e1ed0ff613f563bd
---

Two-factor authentication prevents access to your account in case your password is exposed. It adds another layer of security - you have to prove not only that you know something (the password), but also that you have something. The implementation of this second factor differs from service to service.

### Gmail

Email is the center of your internet identity. Anyone with access to your email can also take over any of your other accounts by requesting a forgotten password. I therefore strongly recommend two-factor authentication to everyone.

Google lets you [turn it on](https://www.google.com/settings/security) for all of its services. Google Apps users first have to have it enabled by their domain administrator.

When you log in for the first time on an unverified computer, you receive a six-digit numeric code by SMS, which you type into the login form. You can then authorize a trusted computer for up to 30 days, during which Google won't require SMS verification from you.

For applications that don't support two-factor authentication (e.g. native mobile apps and email clients), Google can generate an "application-specific password". It always comes in the form of four groups of four letters, shown to you only once so that you can copy it into the given application. You can later revoke these specific passwords. It worried me that there wouldn't be a single password for my account but several, which increases the chance of a breach. Fortunately Google doesn't allow these specific passwords to be used to log in where SMS authorization is supported, so there's no risk of some destructive misuse.

### Facebook

The same applies to Facebook as to email - misuse of your account can have catastrophic consequences.

Two-factor authentication is implemented on it the same way as at Google - when you log in from an unknown device, you receive an SMS with a six-digit numeric code. In addition, it can send verification by email, which contains a login link.

You can turn it on [in the security settings](https://www.facebook.com/settings?tab=security).

### Internet banking

My bank, ČSOB, doesn't require SMS verification when logging in to online banking, but it does when carrying out any operation with the accounts. These days that's probably already standard at every bank.

Recently, however, it additionally introduced [two-factor authorization when using a payment card on the internet](http://www.csob.cz/cz/lide/Platebni-karty/Stranky/Zabezpeceni-internetovych-plateb-kartou-3D-Secure.aspx). In the Czech Republic all payment gateways already support it, but it's starting to spread abroad too. It's awkward that this service is opt-in for merchants, so an attacker can still use the card where this verification isn't required, but even so it's a step in the right direction.

### Steam

Keeping my game library and my current Steam Wallet balance secure I consider no less important. Valve [grandly unveiled](http://www.joystiq.com/2011/03/04/steam-guard-gets-the-ultimate-test-gabe-newell-makes-his-passwo/) support for two-factor authentication in March of last year - during which Gabe Newell revealed his password.

When you log in, you receive an email with a five-character alphanumeric code, which you type into the login form, whether on the web or in the Steam client.

### Battle.net

Blizzard accounts are a very frequent target for hackers. Gold sellers in World of Warcraft plunder characters, auction off the collected items, and resell the gold to players who pay real money for it.

Two-factor authorization here is carried out via an app for smartphones, which you download from your platform's app store. On first launch it generates codes that you enter into the account administration on Battle.net, linking it to your account. When logging in to games, you then fill in a time-limited numeric code that the authenticator on your phone shows you.

Account management on the Battle.net website asks me to enter it every time; in the game clients it's rather sporadic - I haven't been able to figure out a specific time interval. Blizzard writes about it:

> The authenticator system will now intelligently track your login locations. If you are logging in consistently from the same location, you may not be asked for an authenticator code. This process is designed to make logging in faster when you're at a secure location.

### And others?

I hope this practice will spread among service providers. The obvious candidates that haven't implemented it yet are Apple, Twitter, Dropbox, Amazon, and others.

PayPal is supposed to support two-factor authentication via [VeriSign Identity Protection](https://idprotect.verisign.com/mainmenu.v), but when I tried to pair the authenticator it reported an error. It probably doesn't support it for Czech accounts yet.
