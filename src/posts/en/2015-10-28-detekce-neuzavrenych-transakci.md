---
title: Detecting unresolved transactions
slug: detecting-unresolved-transactions
---

Take a look at the following code:

```php
public function processRow(Row $row)
{
	$this->databaseConnection->begin();
	try {
		// some initial checks
		// $isProcessed = ...

		if ($isProcessed) {
			return;
		}

		// lots of work processing the row

		$this->databaseConnection->commit();
	} catch (\Exception $e) {
		$this->databaseConnection->rollback();
		throw $e;
	}
}
```

Did you spot the bug? When `$isProcessed === true`, the method is exited without committing or rolling back the transaction, which leaves it open in the database until the connection is closed. And it may needlessly hold locks for too long — locks that other threads of the application might be interested in.

If you don't mind the locked rows, you still won't like the next consequence of this bug:

```php
$this->databaseConnection->begin();
try {
	// the called method evaluates the passed row as $isProcessed
	$this->processRow($fooRow);
	$this->databaseConnection->commit();
} catch (\Exception $e) {
	$this->databaseConnection->rollback();
	throw $e;
}
```

Because in this case you're committing or rolling back a different transaction than you'd expect!

With a better transactional API, the situation can be detected:

```php
$databaseTransaction = $this->databaseConnection->begin();
try {
	// the called method evaluates the passed row as $isProcessed
	$this->processRow($fooRow);
	$databaseTransaction->commit();
} catch (\Exception $e) {
	$databaseTransaction->rollback();
	throw $e;
}
```

In this case the database transaction is represented by a separate object, so it's always unambiguous which specific transaction we're working with.

But how do we detect that an unresolved transaction is left dangling in the application? A [destructor](http://php.net/manual/en/language.oop5.decon.php) will help us:

```php
class DatabaseTransaction
{

	//...

	public function __destruct()
	{
		if (!$this->resolved) {
			// a destructor cannot throw exceptions
			trigger_error('Unresolved transaction!', E_USER_NOTICE);
		}
	}

	//...

}
```

But when does PHP call an object's destructor?

> The destructor method will be called as soon as there are no other references to a particular object, or in any order during the shutdown sequence.

Depending on how `DatabaseConnection` is implemented, the destructor is called either as soon as PHP exits the method in which `$databaseTransaction` was assigned, or perhaps not — for example, if we store all transactions in an internal array for later reference.

So if the transaction's destructor is called right after the method is exited, then in the [logged error](https://tracy.nette.org/) we get a stack trace in which we can easily find the place where the transaction is handled incorrectly, and we'll be able to fix it.

If the destructor is called only during the shutdown sequence, then the error's stack trace tells us nothing about where the unhandled transaction originates. If you have a large, multi-layered application with many transactions, such a place is very hard to find.

But I came up with a working solution that makes debugging the transaction easier in this situation. In PHP you can instantiate an exception without throwing it, and an exception created this way carries within it the stack trace from the place where it originated!

```php
class DatabaseTransaction
{

	/** @var UnresolvedTrasactionException */
	private $originException;

	public function __construct(DatabaseConnection $databaseConnection/*, ...*/)
	{
		// ...
		$this->originException = new UnresolvedTrasactionException();
	}

	public function __destruct()
	{
		if (!$this->resolved) {
			\Tracy\Debugger::log($this->originException);

			// a destructor cannot throw exceptions
			trigger_error('Unresolved transaction!', E_USER_NOTICE);
		}
	}

	//...

}
```

So for every transaction that's started I create an exception, which I log in case of an unresolved transaction, and thus obtain the place where the faulty transaction originated. In the destructor I still raise a notice, so that the programmer notices this error during development too, when they don't normally watch the log folder.

In terms of code cleanliness and architecture this is of course a rather unusual, even insane solution — one I'd never let into the regular business logic of an application during a code review, where a developer has to make do with the usual means of expression and design patterns from OOP. But in this case it's an infrastructural helper that occurs exactly once in the entire application and doesn't affect the architecture of the rest of the application in any way. To make debugging easier — and thus save the developer's time — I'm willing to cross a line I'd normally never even approach.
