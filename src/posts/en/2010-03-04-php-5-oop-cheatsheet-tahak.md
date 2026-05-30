---
title: PHP 5 OOP cheatsheet
slug: php-5-oop-cheatsheet
date: 2010-03-04T00:00:00
guid: d3d9446802a44259755d38e6d163e820
---

The syntax for some aspects of object-oriented programming in PHP has a fairly high WTF factor, and more than once I've come across an advanced programmer fumbling around, wondering why their code causes a **parse error** or some other error. So I decided to dust off my blog and pull together a clear, one-stop summary of OOP syntax in PHP.

I'll be very brief in the individual descriptions; the article doesn't aim to explain [OOP](http://cs.wikipedia.org/wiki/Objektov%C4%9B_orientovan%C3%A9_programov%C3%A1n%C3%AD), it focuses purely on the way things are written.

Nice object-oriented code also includes a consistent form, so I recommend studying the [Nette Coding Standard](https://web.archive.org/web/20140116001534/http://doc.nette.org:80/en/2.1/coding-standard).

### Classes

#### Defining a new class

```php
//a general class
class A {

}

//an abstract class - can't be instantiated, only its descendant can
abstract class A {

}

//a final class - can't be inherited from
final class A {

}

//definition of class B, which inherits from class A
class B extends A {

}
```

#### Constructor

A method named `__construct()` that is called when an instance of a new class is created.

```php
class A {
	public function __construct() {

	}
}

//a constructor can have parameters
class A {
	public function __construct($name) {

	}
}
```

#### Creating an instance

```php
$a = new A; //if the constructor has no required parameters
$a = new A(); //equivalent notation

$a = new A('foo'); //a constructor with a required parameter
```

### Interfaces

```php
//a general interface
interface A {

}

//interface B, which inherits from interface A
interface B extends A {

}

//class B, which implements interface A
class B implements A {

}

/* PHP allows implementing multiple interfaces at once */

//class C, which implements interfaces A and B
class C implements A, B {

}
```

### Visibility (encapsulation)

For methods and static/instance members (class attributes) you can set the visibility for calling (in the case of methods), or for reading and writing (in the case of attributes). PHP, like other languages, supports three types of visibility:

- **public**: anyone can call the methods and access the attributes
- **protected**: only the class itself, its descendants (and its ancestors when overriding) and its siblings (two different instances of type B or of supertype A can reach into each other's protected methods and attributes)
- **private**: only the class itself

### Attributes

#### Defining attributes

Convention says that all attributes should be defined at the beginning of the class definition.

```php
class A {
	//instance attributes
	var $a; //the deprecated way of writing public
	public $b;
	protected $c;
	private $d;

	//static attributes
	public static $e;

	//attributes can be given default values of primitive data types or arrays
	//more complex data has to be passed in the constructor
	private $f = '';
	private $g = 'foo';
	private $h = 108;
	private $i = array('bar');
}
```

#### Accessing attributes

```php
$a = new A;

//from the outside, to instance attributes
$a->a = 'foo';

//from the outside, to static attributes
A::$e = 'bar';

//from inside the class, to instance attributes
$this->c = 'foo';
echo $this->f;

//from inside the class, to static attributes
self::$e = 'bar';
```

### Constants

PHP lets you define immutable class attributes, e.g. for all sorts of settings and to support the [DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself) principle.

```php
class A {

	//defining a constant
	const DEFAULT_USER = 'foobar';

}

//access from the outside
echo A::DEFAULT_USER;

//access from the inside
echo self::DEFAULT_USER;
```

### Methods

#### Defining methods

```php
class A {

	//methods without a stated visibility are treated as public
	function methodFoo() {

	}

	public function methodBar() {

	}

	protected function methodFooBar() {

	}

	private function methodBarFoo() {

	}

	//a method can be abstract, in which case we leave its definition to a descendant of the class
	abstract public function methodAbstract();

	//a method can also be final, in which case it can't be overridden in a descendant
	final public function methodFinal() {

	}

}
```

#### Method parameters

```php
class A {

	//a method that takes two parameters
	public function methodExample($a, $b) {

	}

	//PHP doesn't allow method overloading, but it does support optional parameters
	//this method can be called with two or three parameters
	public function methodFoo($name, $age, $sex='male') {

	}

	//you can define what type the incoming parameter should be
	//it can't be used for primitive data types - you can only require an array, an interface or a class - polymorphism works here
	public function methodBar(array $names, Person $p, Traversable $t) {

	}

	//methods can be static too
	public static function methodStatic() {

	}

}
```

#### Calling methods

```php
$a = new A;

//instance method from the outside
$a->methodExample('foo', 'bar');

//instance method from the inside
$this->methodFoo('foo', 'bar');
$this->methodFoo('foo', 'bar', 'female');

//static method from the outside
A::methodStatic();

//static method from the inside
self::methodStatic();
```

### Overriding

If in a descendant I define an attribute or method whose name already exists in an ancestor, and their visibility is public or protected, overriding occurs.

```php
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

		//with parent::methodExample() I can call the ancestor's method
	}
}

$b = new B;
echo $b->foo; //prints bar
echo $b->methodExample(); //prints bar
```

If a class ancestor refers to a public/protected attribute or method that is overridden in a descendant, the descendant's implementation is called/accessed.

**Watch out!** This doesn't work for static attributes and methods; there, when accessed via self::, the ancestor's implementation will still be called. This shortcoming is addressed by late static binding in PHP 5.3, see below.

```php
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
echo $b->getFoo(); //prints bar
```

### Bad habits

**Don't try the source code in this section at home, at work, or at school!** ;)

Because of its scripting nature, PHP allows some really ugly things in OOP.

```php
$a = 'foo';
$b = 'bar';

//conditional inheritance? 11 out of 10 programmers cry
if ($a == $b) {
	class B {

	}
} else {
	class B extends A {

	}
}

//if I want to work with some attribute, it always has to be defined in the class
class A {
	//yuck!
	if ('foo' == 'bar') {
		public $aaa;
	}

	public function fooBar() {
		if (isset($this->aaa)) { //a pointless check, in correct code $this->aaa must always exist
			//...
		}
	}
}
```

### Dynamic names

If we have a reason to, we can decide based on some variable or computation which class is used, which attribute is accessed, and which method is called.

We of course have to be prepared for all the values that the given variable can take.

```php
$den = date('D'); //takes values from Mon to Sun

$a = new $den; //the class named after the day of the week is called

//from PHP 5.3 on you can also access static attributes/constants/methods
$den::TRIDNI_KONSTANTA;
$den::methodStatic();

//calling a method
$method = 'mojeMetoda';

//the instance method mojeMetoda() of class Thu is called (if it's Thursday ;))
$a->$method();

//if I want to write more complex logic, curly braces are there for that
$bool = true;

//the allow() or deny() method is called
$a->{$bool ? 'allow' : 'deny'}();
```

### Namespaces (PHP 5.3)

If it's handy for you to have two classes with the same name, just put them into two different namespaces and you're fine. But watch out! Namespaces tend to create more work than they save. Even so, there's a way to [keep working with namespaces to an absolute minimum](https://web.archive.org/web/20100225142608/http://forum.nettephp.com:80/cs/2418-jak-nejlepe-na-php-5-3-a-namespaces).

```php
//you can have multiple levels of namespaces, \ is the separator
namespace Foo\Bar;

//in other files, class A now has to be accessed as Foo\Bar\A
class A {

}
```

```php
namespace MujNamespace;

class B {

	public function methodTest() {
		/**
		  * if I want to access a completely different namespace from inside some namespace,
		  * I have to choose the absolute "path" with a \ at the beginning
		  */
		$a = new \Foo\Bar\A;

		/**
		  * otherwise this would happen:
		  */
		$a = new A; //the class MujNamespace\A doesn't exist!

		/**
		  * If at the beginning of the file, below the namespace definition, I call:
		  * use \Foo\Bar\A;
		  * ...then I can refer to the class the classic way:
		  */
		$a = new A; //works!
	}

}
```

### Late static binding (PHP 5.3)

I already mentioned the problem with overriding static attributes and methods above, so here I'll just give a practical example:

```php
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

//prints:
foo
bar
```
