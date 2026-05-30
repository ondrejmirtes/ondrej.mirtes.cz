---
title: Get rid of branches in your code with promises
---

I don't like branchy code. More branches (`if`/`elseif`/`else`) mean more combinations to test, more complicated and more fragile code. Long chains of ifs can be [removed using polymorphism](https://sourcemaking.com/refactoring/replace-conditional-with-polymorphism) — that's a well-known and, I believe, sufficiently established technique.

Today, though, I want to show a way to get rid of ifs if you meet these two prerequisites:

1. Your code is asynchronous.
2. You're waiting for something.

You commonly run into asynchronous code in the JavaScript world -- in the browser as well as on the server in node.js. PHP can be asynchronous too if you use [ReactPHP](http://reactphp.org/). What all of these implementations have in common is that the application's run is driven by an event loop. Blocking operations such as making HTTP requests, querying a database, reading from disk and so on become non-blocking in an asynchronous environment. That means that while waiting for their result (a response from a remote server, the result of a query, the contents of a file) you can run other code, so the application's process is never bored and you make more efficient use of system resources.

You meet the second condition if your code contains conditions in the style of:

- "Has that query finished yet?"
- "Did the connection succeed, or are we still waiting?"
- "Have X seconds elapsed?"

The goal is to adjust the code so that it works whether the given matter has or hasn't been fulfilled yet, without having to branch the code before/after it is fulfilled.

Take the following example: a process has to do some work and at the same time stay alive for at least 5 seconds so that [Supervisor](http://supervisord.org/) considers its startup successful. With ordinary synchronous code we would do it like this:

```php
$startTime = microtime(true);

// doing work...

$stayAliveSeconds = 5;
$uptime = microtime(true) - $startTime;
if ($uptime < $stayAliveSeconds) {
	usleep(round(($stayAliveSeconds - $uptime) * 1000000));
}

exit(0);
```

An ugly `if` that forces us to run the given method at least twice when testing.

Thanks to the fact that our RabbitMQ queue consumers run under the [Bunny](https://github.com/jakubkulhan/bunny) library, and therefore within ReactPHP's event loop, we can use [promises](https://github.com/reactphp/promise) instead of the solution above.

A promise is an object that can be in one of three states: pending, resolved and rejected. While pending it is waiting for a result, when resolved it has already obtained it, and rejected represents a failure. Parties interested in the result attach themselves to a promise using the `then()` method. Alongside the promise there also lives a deferred object, which serves as the controller of its promise. It determines when its promise will be fulfilled. To preserve encapsulation you should expose only the promise object, never the deferred.

What helps you get rid of ifs in the code is precisely the behavior of the `then()` method. When you call it, it doesn't matter what state the promise is currently in. If it isn't fulfilled yet, the passed callback will be called later; otherwise immediately.

The `usleep()` example can be rewritten like this:

```php
$stayAliveDeferred = new \React\Promise\Deferred();
$this->loop->addTimer(5, function () use ($stayAliveDeferred) {
	$stayAliveDeferred->resolve();
});
$stayAlivePromise = $stayAliveDeferred->promise();

// doing work...

$stayAlivePromise->then(function () {
	exit(0);
});
```

If you refactor the first part into a separate [PromiseTimer](https://gist.github.com/ondrejmirtes/ffd1be5be4062493c50a) class, because this logic repeats often in the code, then the code is reduced to something more pleasant:

```php
$stayAlivePromise = (new \PromiseTimer($this->loop))->wait(5);

// doing work...

$stayAlivePromise->then(function () {
	exit(0);
});
```

I got rid not only of any ifs, but also of all the arithmetic with milliseconds.

The same trick can be used on the frontend when fetching data over AJAX. If several components are interested in the same data at the same time, but you only want to request it from the server once one of them asks for it, you suddenly find yourself fighting these states in your code: nobody has asked for the data yet, the data is currently being downloaded from the server, we already have the data. To avoid duplicate requests to the server and other bugs that may show up, for example, the moment a fast-clicking user on a slow connection comes along, you can write a set of confusing and hard-to-test ifs, or use promises. All the code that is interested in the data asks for it using `then()` -- so it won't assume the data is already downloaded, but if it is, the passed callback is called immediately:

```js
getProducts().then(function (products) {
	// ...
});
```
