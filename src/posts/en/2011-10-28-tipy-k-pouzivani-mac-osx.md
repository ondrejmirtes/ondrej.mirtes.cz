---
title: Tips for using Mac OS X
slug: tips-for-using-mac-os-x
date: 2011-10-28T00:00:00
guid: c81e728d9d4c2f636f067f89cc14862c
---

Articles like this one usually start with the words "forget everything you're used to from Windows." It's nonsense to ask something like that of users, because habits formed over many years of computer use can't be shaken off so easily.

Instead, I want to share with you the tips and experiences I've gathered over 2 months of using a MacBook. I struggled with a lot of things, ran into dead ends, fell into despair. Lately, though, I have the feeling that the tide is turning and I'm starting to recognize the advantages of Mac OS X over a PC.

Rule #1 - **forget the traffic light**! The trio of colored buttons in the top-left corner of a window reminds everyone of a similar trio from Windows, but their functions differ. The green + usually doesn't maximize the window - instead it resizes the window to the size it thinks is ideal. There's practically no difference between the yellow and the red button. Both effectively hide the window; pressing the yellow one is just accompanied by an animation.

Rather than trying to hit tiny buttons, it's far more convenient to use keyboard shortcuts. Cmd+W is the most frequent shortcut I currently use. It's the equivalent of pressing the red button. The application doesn't quit and keeps running in the background; only its current window closes. You can quit an application completely with Cmd+Q, but I've found I do that very rarely, more in emergency situations. Another point against Cmd+Q is that it can't be used in Finder.

OS X blurs the distinction between closed and running applications. To reinforce this idea, I turned off the display of the blue dots under the icons in the Dock in the settings. (System Preferences - Dock - Show indicator lights for open applications) For one thing, it irritated me that the blue dot next to an application stayed there even after I pressed the red button, and for another, it reminded me of the new-posts indicator on Twitter (so I thought there was "something new" in the application I should look at). I therefore have no idea which applications are running right now, and as a user I don't even care.

On a MacBook you can't set what should happen when you close the lid. If it isn't connected to an external monitor and to power at the same time, it goes to sleep. If you want to finish working or move somewhere, you don't have to hunt for some sleep mode in the settings - just snap it shut. Waking up after opening it is almost instant.

I recommend going through System Preferences - Trackpad. There's a list of all the gestures you can perform on the touchpad, and you can turn them on/off as needed. The touchpad can be pressed anywhere, so you can use the same finger to move the cursor and to click. It surprises me how many people don't know this fundamental thing.

The way Finder is controlled struck me as a bit wild. Enter renames a file; you open it with Cmd+O. The crucial feature, though, is the preview, which is invoked with the spacebar. It handles many file types and doesn't open a specialized application for it, so it displays very quickly. It can even show .docx, which not even Windows can do out of the box. Not to mention PDF. Finder's capabilities are extended by [TotalFinder](http://totalfinder.binaryage.com/).

Applications that aren't from the App Store are installed by simply dragging the .app file from the archive into the Applications directory in Finder.

A chapter unto itself is the keyboard. Compared to a PC, there's one extra modifier key here, Cmd. Where Ctrl is used on a PC, Cmd is used here. So for working with text you use Cmd+X, Cmd+C, Cmd+V. Ctrl here only serves as a substitute in cases where Cmd can't be used. Search is invoked in all applications with Cmd+F, but if I'm in a text editor and want to use Find+Replace, I can't use Cmd+H, because the system has that reserved for minimizing the window. So I have to press Ctrl+H. If I want to switch between tabs in some application, I can't use Cmd+Tab, because again the system has that reserved for showing the list of windows. Once again, Ctrl+Tab works here. Most shortcuts can be derived this way.

Both OS X and application authors honor the meaning of keyboard shortcuts. In all of them, Cmd+comma works for going to the settings. If an application has several different views, you can switch between them with Cmd+1, Cmd+2, … Pressing the function keys F1 - F12 by default does what's drawn on them, i.e. dimming/brightening the display and keyboard, playing music, and so on. An actual press of F1 - F12 can be done with the Fn modifier key. But I haven't needed it yet. To reload a page, which I need very often when developing websites, you can use Cmd+R in all browsers instead of the F5 I was used to on Windows.

The keyboard is missing Home, End, and Page Up/Down. Cmd in combination with the cursor arrows replaces them. Likewise, Delete for forward deletion of text is missing, but Cmd+Backspace works.

Until I needed to program something on the MacBook, the default Czech keyboard suited me fine. The special characters, though, are placed on it so unconventionally that after two days I gave up on the finger gymnastics. There's a tool called [Ukulele](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=ukelele) that lets you comfortably define your own keyboard layout. More options are offered by "KeyRemap4Macbook," which, for example, lets you turn the Eject key into a classic Delete. But beware, Airs no longer have Eject.

I'm finally getting to the applications. The most important one is still the web browser, even though it's nowhere near as significant as on Windows. It only makes sense to consider Google Chrome or Safari. Mozilla Firefox doesn't sit well with the Mac. Chrome is favored by its snappiness and its ever-growing market share, while Safari has a clear sense of better integration with the system.

The web browser on the Mac fades into the background, because for most web applications their desktop variants are available here, and they can sync with their web counterparts. Native applications on the Mac are very pleasant and more convenient than their web counterparts. It's natural for an application I keep working with to have a separate window on the desktop, rather than just one tiny tab in a web browser. I subscribe to the theory that web applications are such a success only because no one on Windows is capable of creating a functional and good-looking application.

For Gmail users I recommend [Sparrow](https://web.archive.org/web/20111024082906/http://www.sparrowmailapp.com:80/), a client with a pleasant minimalist interface. It supports all the main Gmail features - labels, stars, search. Search doesn't work by going through all the mail on the disk, but by querying Google's servers, as if you'd used the search box. The response is therefore instant. I remember years ago, when I set something searching in Outlook, I could have gone and made myself a coffee, if I drank it back then.

For Google Reader users there's [Reeder](http://reederapp.com/mac/) (it also exists for iPhone and iPad). It likewise syncs with the web interface, can throw articles into Read It Later, and supports Readability (stripping a web page of the clutter around it for comfortable reading).

A given is the official [Twitter for Mac](https://web.archive.org/web/20170220061655/https://itunes.apple.com/cz/app/twitter/id409789998?mt=12), which also follows in the footsteps of its iPhone and iPad counterparts.

I dumped my calendars from Google Calendar into the preinstalled iCal.

Because I'd developed a well-earned hatred of iTunes on Windows, I was looking around for an alternative music player. In short - there isn't one. As a consolation, I can say that iTunes is quite a different piece of software on the Mac. My story illustrates this well: the first time I connected my iPhone to the MacBook to sync, I waited for the system-wide several-second lag like on Windows. But nothing happened. So I checked the iPhone to see if it was on, I checked whether I'd plugged in the cable correctly. Everything was fine, and yet nothing was happening. I opened iTunes and it was signaling a just-completed backup of the iPhone :) So you can get along with it.

For instant messaging, [Adium](http://adium.im/) is widely used, but it didn't really win me over. There is, however, a little-known cross-platform messenger from Mozilla called [Instantbird](http://instantbird.com/). It reminds me a lot of Miranda, which I won't hear a bad word about.

For notes I use [Evernote](http://www.evernote.com/), which probably needs no introduction.

For tracking tasks, I recently started toying with [Things](http://culturedcode.com/things/), which follows the GTD methodology to the letter. It does, however, represent a sizable investment. I took advantage of the fact that [beta testing](http://culturedcode.com/things/blog/2011/05/things-cloud-sync-beta-begins.html) of cloud syncing is currently underway, so for now I'm using the development version. If it proves itself, I'll buy it.

If you often work with the command line, I recommend [iTerm](http://www.iterm2.com/). Compared to the default terminal, it brings considerable usability improvements.

Next Sunday I'm headed to [Appleforum](http://appleforum.mujmac.cz/2011/), so it's quite possible that afterwards I'll have to rewrite half of this article, or throw the whole thing out.
