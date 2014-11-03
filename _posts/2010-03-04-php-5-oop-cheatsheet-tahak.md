---
title: PHP 5 OOP cheatsheet (tahák)
date: 2010-03-04 00:00:00
guid: d3d9446802a44259755d38e6d163e820
---

Zápis některých aspektů objektově orientovaného programování v PHP má poměrně velký WTF faktor a nejednou jsem narazil na pokročilého programátora, jak tápal, proč jeho kód způsobuje **parse error** či nějakou jinou chybu. Rozhodl jsem se proto oprášit můj blog a přehledně na jednom místě shrnout OOP syntax v PHP.

U jednotlivých popisů budu velice stručný, článek si neklade za cíl vysvětlit [OOP](http://cs.wikipedia.org/wiki/Objektov%C4%9B_orientovan%C3%A9_programov%C3%A1n%C3%AD), zaměřuje se pouze na způsob zápisu.

K hezkému objektovému kódu patří i jeho jednotná podoba, doporučuji k nastudování [Nette Coding Standard](http://doc.nette.org/en/2.1/coding-standard).

### Třídy

#### Definice nové třídy

{% highlight php startinline %}
//obecná třída
class A {

}

//abstraktní třída - nelze vytvořit instanci, to až u potomka
abstract class A {

}

//finální třída - nelze podědit
final class A {

}

//definice třídy B, která dědí od třídy A
class B extends A {

}
{% endhighlight %}

#### Konstruktor

Metoda, která se jmenuje `__construct()` a volá se při vytvoření instance nové třídy.

{% highlight php startinline %}
class A {
	public function __construct() {

	}
}

//konstruktor může mít parametry
class A {
	public function __construct($name) {

	}
}
{% endhighlight %}

#### Vytvoření instance

{% highlight php startinline %}
$a = new A; //pokud konstruktor nemá žádné povinné parametry
$a = new A(); //ekvivalentní zápis

$a = new A('foo'); //konstruktor s povinným parametrem
{% endhighlight %}

### Rozhraní (interfaces)

{% highlight php startinline %}
//obecný interface
interface A {

}

//interface B, který dědí od interface A
interface B extends A {

}

//třída B, která implementuje interface A
class B implements A {

}

/* PHP umožňuje implementaci více rozhraní naráz */

//třída C, která implementuje interfaces A a B
class C implements A, B {

}
{% endhighlight %}

### Viditelnost (zapouzdření)

U metod a statických/in­stančních členů (atributů třídy) lze nastavit viditelnost pro volání (u metod), resp. pro čtení a zápis (u atributů). PHP, stejně jako ostatní jazyky, podporuje tři typy viditelnosti:

- **public**: volat metody a přistupovat k atributům může každý
- **protected**: pouze samotná třída, její potomci (při překrývání - overriding - i předci) a sourozenci (dvě různé instance typu B či nadtypu A si navzájem mohou sahat na protected metody a atributy)
- **private**: pouze samotná třída

### Atributy

#### Definice atributů

Konvence říká, že všechny atributy by měly být definovány na začátku definice třídy.

{% highlight php startinline %}
class A {
	//instanční atributy
	var $a; //zastaralý zápis public
	public $b;
	protected $c;
	private $d;

	//statické atributy
	public static $e;

	//atributům lze předat výchozí hodnoty primitivních datových typů anebo pole
	//složitější data se musí předávat v konstruktoru
	private $f = '';
	private $g = 'foo';
	private $h = 108;
	private $i = array('bar');
}
{% endhighlight %}

#### Přistupování k atributům

{% highlight php startinline %}
$a = new A;

//zvenčí, k instančním
$a->a = 'foo';

//zvenčí, ke statickým
A::$e = 'bar';

//zevnitř třídy, k instančním
$this->c = 'foo';
echo $this->f;

//zevnitř třídy, ke statickým
self::$e = 'bar';
{% endhighlight %}

### Konstanty

PHP umožňuje definovat neměnitelné atributy třídy, např. pro všelijaká nastavení a podporu principu [DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

{% highlight php startinline %}
class A {

	//definice konstanty
	const DEFAULT_USER = 'foobar';

}

//přístup zvenčí
echo A::DEFAULT_USER;

//přístup zevnitř
echo self::DEFAULT_USER;
{% endhighlight %}

### Metody

#### Definice metod

{% highlight php startinline %}
class A {

	//metody bez uvedení viditelnosti jsou brány jako public
	function methodFoo() {

	}

	public function methodBar() {

	}

	protected function methodFooBar() {

	}

	private function methodBarFoo() {

	}

	//metoda může být abstraktní, její definici pak necháváme na potomkovi třídy
	abstract public function methodAbstract();

	//metoda může být i finální, nelze ji pak v potomkovi překrýt
	final public function methodFinal() {

	}

}
{% endhighlight %}

#### Parametry metod

{% highlight php startinline %}
class A {

	//metoda, která přijímá dva parametry
	public function methodExample($a, $b) {

	}

	//PHP neumožňuje přetěžování metod (overloading), umí ale nepovinné parametry
	//metodu lze zavolat se dvěma nebo třemi parametry
	public function methodFoo($name, $age, $sex='male') {

	}

	//lze definovat, jakého typu má přijímaný parametr být
	//nejde použít pro primitivní datové typy - lze vynutit pouze pole, interface nebo třídu - funguje zde polymorfismus
	public function methodBar(array $names, Person $p, Traversable $t) {

	}

	//i metody mohou být statické
	public static function methodStatic() {

	}

}
{% endhighlight %}

#### Volání metod

{% highlight php startinline %}
$a = new A;

//instanční zvenčí
$a->methodExample('foo', 'bar');

//instanční zevnitř
$this->methodFoo('foo', 'bar');
$this->methodFoo('foo', 'bar', 'female');

//statické zvenčí
A::methodStatic();

//statické zevnitř
self::methodStatic();
{% endhighlight %}

### Překrývání

Pokud v potomkovi definuji atribut nebo metodu s názvem, který existuje už v předkovi, a jejich viditelnost je public či protected, dojde k překrytí (overriding).

{% highlight php startinline %}
class A {
	public $foo = 'foo';

	public function methodExample() {
		return 'foo';
	}
}

class B extends A {
	public $foo = 'bar';

	public function methodExample() {
		return 'bar';

		//pomocí parent::methodExample() mohu zavolat metodu předka
	}
}

$b = new B;
echo $b->foo; //vypíše bar
echo $b->methodExample(); //vypíše bar
{% endhighlight %}

Pokud se v třídním předkovi odkazuji na public/protected atribut či metodu, která je v potomkovi přepsána, volá se/přistupuje se k implementaci potomka.

**Pozor!** Tento způsob nefunguje u statických atributů a metod, tam se při přístupu pomocí self:: bude stále volat implementace v předkovi. Tento nedostatek řeší late static binding v PHP 5.3, viz níže.

{% highlight php startinline %}
class A {
	protected $foo = 'foo';

	public function getFoo() {
		return $this->foo;
	}
}

class B extends A {
	protected $foo = 'bar';
}

$b = new B;
echo $b->getFoo(); //vypíše bar
{% endhighlight %}

### Špatné návyky

**Zdrojové kódy v této části doma, v práci, ani ve škole nezkoušejte!** ;)

PHP kvůli své skriptovací povaze umožňuje v OOP opravdu nehezké věci.

{% highlight php startinline %}
$a = 'foo';
$b = 'bar';

//podmíněné dědění? 11 z 10 programátorů pláče
if ($a == $b) {
	class B {

	}
} else {
	class B extends A {

	}
}

//pokud chci pracovat s nějakým atributem, musí být ve třídě vždy definovaný
class A {
	//fuj!
	if ('foo' == 'bar') {
		public $aaa;
	}

	public function fooBar() {
		if (isset($this->aaa)) { //nesmyslná kontrola, ve správném kódu musí $this->aaa vždy existovat
			//...
		}
	}
}
{% endhighlight %}

### Dynamické názvy

Pokud k tomu máme důvod, můžeme na základě nějaké proměnné či výpočtu rozhodovat, jaká třída se použije, k jakému atributu se přistoupí a jaká metoda se zavolá.

Musíme být samozřejmě připraveni na všechny hodnoty, kterých daná proměnná může nabýt.

{% highlight php startinline %}
$den = date('D'); //nabývá hodnot Mon až Sun

$a = new $den; //zavolá se třída s názvem dne v týdnu

//od PHP 5.3 lze přistupovat i ke statickým atributům/konstantám/metodám
$den::TRIDNI_KONSTANTA;
$den::methodStatic();

//volání metody
$method = 'mojeMetoda';

//zavolá se instanční metoda mojeMetoda() třídy Thu (pokud je čtvrtek ;))
$a->$method();

//pokud chci zapsat složitější logiku, slouží k tomu složené závorky
$bool = true;

//zavolá se metoda allow() nebo deny()
$a->{$bool ? 'allow' : 'deny'}();
{% endhighlight %}

### Jmenné prostory (namespaces) (PHP 5.3)

Pokud se vám hodí mít dvě třídy stejného názvu, tak je stačí dát do dvou různých jmenných prostorů a nemáte problém. Ale pozor! Namespaces spíše přidělávají práci, než aby ji ulehčovali. Přesto se dá přijít na způsob, jak práci s namespaces [minimalizovat na nejmenší možnou mez](http://forum.nettephp.com/cs/2418-jak-nejlepe-na-php-5-3-a-namespaces).

{% highlight php startinline %}
//lze mít více úrovní jmenných prostorů, \ je oddělovač
namespace Foo\Bar;

//v jiných souborech je nyní ke třídě A nutné přistupovat jako k Foo\Bar\A
class A {

}
{% endhighlight %}

{% highlight php startinline %}
namespace MujNamespace;

class B {

	public function methodTest() {
		/**
		  * pokud chci uvnitř nějakého namespace přistoupit k úplně jinému namespace,
		  * musím zvolit absolutní "cestu" s \ na začátku
		  */
		$a = new \Foo\Bar\A;

		/**
		  * jinak by došlo k tomuto:
		  */
		$a = new A; //třída MujNamespace\A neexistuje!

		/**
		  * Pokud na začátku souboru pod definicí namespace zavolám:
		  * use \Foo\Bar\A;
		  * ...tak už se na třídu mohu odvolávat klasicky:
		  */
		$a = new A; //funguje!
	}

}
{% endhighlight %}

### Late static binding (PHP 5.3)

Problém s překrýváním statických atributů a metod jsem zmínil už výše, zde uvedu jen praktický příklad:

{% highlight php startinline %}
class A {
	protected static $foo = 'foo';

	public function methodLsb() {
		echo self::$foo . "\n";
		echo static::$foo . "\n";
	}
}

class B extends A {
	protected static $foo = 'bar';
}

$b = new B;
$b->methodLsb();

//vypíše:
foo
bar
{% endhighlight %}
