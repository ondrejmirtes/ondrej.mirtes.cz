---
title: Setting up PHP on Mac OS X
slug: setting-up-php-on-mac-os-x
date: 2012-09-15T11:12:00
guid: 2838023a778dfaecdc212708f721b788
---

The Mac does come with PHP preinstalled, but it's awkward to work with - for instance, it's hard to add further extensions to it (such as gettext). It's therefore more convenient to manage your own PHP installation. We'll use the [Homebrew](https://brew.sh/) package manager for that, which also lets you install a whole range of other CLI tools.

If you're just getting started with the Mac, I also recommend reading through [a few tips and tricks for Mac OS X](/en/tips-for-using-mac-os-x).

### Homebrew

```bash
# install Homebrew
ruby <(curl -fsSkL raw.github.com/mxcl/homebrew/go)

# Before continuing, resolve all the problems that the following command prints out.
# Above all, you'll need to install Xcode from the Mac App Store and add Command Line Tools inside it.
#
# In the /etc/paths file, also move/add the path '/usr/local/bin' to the first line,
# so that tools installed via Homebrew take precedence over the ones already built into the system.
brew doctor
```

### Git

The Xcode Command Line Tools already include Git for the command line. But if you always want the latest version, you can download it from the "official website":http://git-scm.org/ or use Homebrew:

```bash
brew install git
```

To generate an SSH public/private key, use ssh-keygen, which will ask you a few questions and then generate the pair into the .ssh directory:

```bash
ssh-keygen
```

I also recommend using [my .gitconfig](https://gist.github.com/1210819) (inspired by the one from [Vašek Purchart](https://gist.github.com/1109501)) with plenty of handy settings and aliases.

### PHP

```bash
# Let Homebrew know about the repository with PHP packages.
brew tap homebrew/dupes
brew tap josegonzalez/homebrew-php

# And install PHP.
# Make note of the instructions from the result of this command, you'll need them when integrating PHP into Apache!
brew install php54 --with-pgsql --with-intl --with-imap

# Extensions can also be installed via Homebrew. You can list the available ones like this:
brew search php54
```

`php.ini` is located in `/usr/local/etc/php/5.4/php.ini`.

### PEAR

PEAR always needs to be called with sudo, otherwise it won't work.

```bash
# If the following command doesn't print '/usr/local/bin/pear',
# you haven't edited the /etc/paths file according to the instructions in the section on installing Homebrew!
which pear

# Installing PHPUnit
sudo pear channel-discover pear.phpunit.de
sudo pear channel-discover pear.symfony-project.com
sudo pear channel-discover components.ez.no
sudo pear install phpunit/PHPUnit
```

For tools installed via PEAR to work, you need to add the path `/usr/local/Cellar/php53/5.3.16/bin` to `/etc/paths` (adjust it according to your PHP version).

Newly opened Terminal windows can now find the tools installed via PEAR:

```bash
phpunit --version
```

### Apache

The system already has Apache built in, which doesn't suffer from the problems of the built-in PHP, so we can use it for our purposes.

Its configuration file is located in `/etc/apache2/httpd.conf`.

We need to add loading of the PHP module to it. So next to the other LoadModule directives we add (the correct path was printed out for you by the brew install php53 command at the beginning of the guide):

```bash
LoadModule php5_module /usr/local/Cellar/php53/5.3.16/libexec/apache2/libphp5.so
```

Next you need to choose a more convenient DocumentRoot. I place my projects in `/Users/www`.

In httpd.conf, find the line `DocumentRoot "/Library/WebServer/Documents"` and replace it with:

```bash
DocumentRoot "/Users/www"
```

Then find the section `<Directory "/Library/WebServer/Documents">` and again rewrite the path to `/Users/www`.

In that same section, also replace `AllowOverride None` (so that .htaccess works) with `AllowOverride All`.

Restart the server:

```bash
sudo apachectl restart
```

### Selenium

```bash
# Installing wget, which we'll use to download the Selenium server binary
brew install wget
```

Copy the URL to the downloaded selenium-server-standalone-*.jar file from [this list](https://web.archive.org/web/20120909082029/http://code.google.com:80/p/selenium/downloads/list) and use it in the wget command:

```bash
sudo mkdir /usr/lib/selenium/
sudo wget http://selenium.googlecode.com/files/selenium-server-standalone-2.25.0.jar /usr/lib/selenium/
sudo mkdir -p /var/log/selenium/
sudo chmod a+w /var/log/selenium/
```

Save the following file to:

```bash
~/Library/LaunchAgents/org.nhabit.Selenium.plist
```

And of course replace it with the correct path to your version of the Selenium server:

```xml
<?xml version="1.0" encoding="UTF-8"?>

<plist version="1.0">
	<dict>
		<key>Label</key>
		<string>org.nhabit.Selenium</string>
		<key>OnDemand</key>
		<true/>
		<key>ProgramArguments</key>
		<array>
			<string>/usr/bin/java</string>
			<string>-jar</string>
			<string>/usr/lib/selenium/selenium-server-standalone-2.25.0.jar</string>
			<string>-port</string>
			<string>4443</string>
		</array>
		<key>ServiceDescription</key>
		<string>Selenium Server</string>
		<key>StandardErrorPath</key>
		<string>/var/log/selenium/selenium-error.log</string>
		<key>StandardOutPath</key>
		<string>/var/log/selenium/selenium-output.log</string>
	</dict>
</plist>
```

And in the terminal, start the service:

```bash
launchctl load ~/Library/LaunchAgents/org.nhabit.Selenium.plist
launchctl start org.nhabit.Selenium
```
