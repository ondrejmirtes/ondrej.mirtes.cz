---
title: Zprovoznění PHP na Mac OS X
date: 2012-09-15T11:12:00
guid: 2838023a778dfaecdc212708f721b788
---

Na Macu je sice už předinstalované PHP, ale špatně se s ním pracuje - např. se do něj těžko přidávají další rozšíření (třeba gettext). Je tedy pohodlnější spravovat vlastní instalaci PHP. Použijeme k tomu balíčkovací systém [Homebrew](https://brew.sh/), pomocí kterého se dá instalovat i řada dalších CLI nástrojů.

Pokud s Macem začínáte, doporučuji si pročíst také [pár tipů a triků pro Mac OS X](/tipy-k-pouzivani-mac-osx).

### Homebrew

```bash
# instalace Homebrew
ruby <(curl -fsSkL raw.github.com/mxcl/homebrew/go)

# Před pokračováním vyřešte všechny problémy, které vypíše následující příkaz.
# Především bude třeba nainstalovat Xcode z Mac App Store a v něm doinstalovat Command Line Tools.
#
# V souboru /etc/paths také přesunťe/přidejte na první řádku cestu '/usr/local/bin',
# aby dostaly přednost nástroje nainstalované pomocí Homebrew a ne ty již integrované v systému.
brew doctor
```

### Git

Xcode Command Line Tools již Git pro příkazovou řádku obsahují. Pokud ale chcete vždy aktuální verzi, můžete si ho stáhnout z "oficiálního webu":http://git-scm.org/ anebo použít Homebrew:

```bash
brew install git
```

Pro vygenerování SSH public/private klíče slouží ssh-keygen, který vám položí pár otázek a poté vygeneruje dvojici do adresáře .ssh:

```bash
ssh-keygen
```

Doporučuji také použít [můj .gitconfig](https://gist.github.com/1210819) (inspirovaný tím od [Vaška Purcharta](https://gist.github.com/1109501) se spoustou praktických nastavení a aliasů.

### PHP

```bash
# Dáme Homebrew vědět o repozitáři s PHP balíčky.
brew tap homebrew/dupes
brew tap josegonzalez/homebrew-php

# A nainstalujeme PHP.
# Poznamenejte si pokyny z výsledku tohoto příkazu, budete je potřebovat při integraci PHP do Apache!
brew install php54 --with-pgsql --with-intl --with-imap

# Rozšíření lze instalovat také pomocí Homebrew. Seznam dostupných si vypíšete takto:
brew search php54
```

`php.ini` se nachází v `/usr/local/etc/php/5.4/php.ini`.

### PEAR

PEAR je vždy potřeba volat se sudo, jinak nebude fungovat.

```bash
# Pokud následující příkaz nevypíše '/usr/local/bin/pear',
# neupravili jste soubor /etc/paths podle návodu ze sekce o instalaci Homebrew!
which pear

# Instalace PHPUnitu
sudo pear channel-discover pear.phpunit.de
sudo pear channel-discover pear.symfony-project.com
sudo pear channel-discover components.ez.no
sudo pear install phpunit/PHPUnit
```

Aby nástroje nainstalované přes PEAR fungovaly, je potřeba přidat do `/etc/paths` cestu `/usr/local/Cellar/php53/5.3.16/bin` (upravte podle vaší verze PHP).

Nově otevřená okna Terminálu teď již dokážou nástroje instalované přes PEAR najít:

```bash
phpunit --version
```

### Apache

V systému je již integrovaný Apache, který netrpí problémy integrovaného PHP, můžeme ho tedy pro naše účely využít.

Jeho konfigurační soubor se nachází v `/etc/apache2/httpd.conf`.

Potřebujeme do něj doplnit načtení PHP modulu. K ostatním LoadModule příkazům tedy přidáme (správnou cestu vám vypsal příkaz brew install php53 na začátku návodu):

```bash
LoadModule php5_module /usr/local/Cellar/php53/5.3.16/libexec/apache2/libphp5.so
```

Dále je potřeba zvolit si pohodlnější DocumentRoot. Já projekty umisťuji do `/Users/www`.

V httpd.conf nalezněte řádku `DocumentRoot "/Library/WebServer/Documents"` a nahraďte ji:

```bash
DocumentRoot "/Users/www"
```

Dále nalezněte sekci `<Directory "/Library/WebServer/Documents">` a cestu opět přepište na `/Users/www`.

V té samé sekci ještě zaměňte `AllowOverride None` (aby fungoval .htaccess) za `AllowOverride All`.

Restartujte server:

```bash
sudo apachectl restart
```

### Selenium

```bash
# Instalace wgetu, pomocí kterého stáhneme binárku Selenium serveru
brew install wget
```

Zkopírujte si URL na stažené souboru selenium-server-standalone-*.jar z [tohoto seznamu](https://web.archive.org/web/20120909082029/http://code.google.com:80/p/selenium/downloads/list) a použijte ji v příkazu wget:

```bash
sudo mkdir /usr/lib/selenium/
sudo wget http://selenium.googlecode.com/files/selenium-server-standalone-2.25.0.jar /usr/lib/selenium/
sudo mkdir -p /var/log/selenium/
sudo chmod a+w /var/log/selenium/
```

Uložte následující soubor do:

```bash
~/Library/LaunchAgents/org.nhabit.Selenium.plist
```

A samozřejmě nahraďte správnou cestu k vaší verzi Selenium serveru:

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

A v terminálu spusťte službu:

```bash
launchctl load ~/Library/LaunchAgents/org.nhabit.Selenium.plist
launchctl start org.nhabit.Selenium
```
