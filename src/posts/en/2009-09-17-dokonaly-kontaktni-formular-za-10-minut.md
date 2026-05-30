---
title: The perfect contact form in 10 minutes
slug: the-perfect-contact-form-in-10-minutes
date: 2009-09-17T00:00:00
guid: 6512bd43d9caa6e02c990b0a82652dca
---

[Nette Framework](http://nette.org/) has many strengths. The main one is the fast and efficient creation of high-quality web applications.

Long gone are the days when I'd spend half an afternoon in PHP cobbling together a passable form with validation of filled-in text fields, e-mail address validity, and a more-or-less acceptable look for the message being sent.

In Nette, building a **perfect** and **bulletproof** contact form is a 10-minute job. The framework contains both a class for working with forms and a class for sending e-mail (including support for building the message in a template-based way).

What does the source code of such a form look like? We create it in a [factory](https://web.archive.org/web/20110611115409/http://doc.nette.org:80/cs/presenters) inside a [Presenter](https://web.archive.org/web/20110611115409/http://doc.nette.org:80/cs/presenters):

```php
use Nette\Application\UI\Form;
use Nette\Mail\Message;

class ContactPresenter extends BasePresenter
{
	protected function createComponentContactForm() {
		$form = new Form;
		$form->addText('name', 'Your name')
			->addRule(Form::FILLED, 'Fill in your name');

		$form->addText('email', 'Your e-mail')
			->setEmptyValue('@')
			->addRule(Form::FILLED, 'Fill in your e-mail')
			->addRule(Form::EMAIL, 'The e-mail has an incorrect format');

		$form->addTextarea('text', 'Message')
			->addRule(Form::FILLED, 'Fill in the message');

		$form->addSubmit('okSubmit', 'Send');

		$form->onSubmit[] = array($this, 'contactFormSubmitted');
		return $form;
	}
}
```

By simply calling the widget macro, we render the form in whatever [template](http://zdrojak.root.cz/clanky/nette-framework-chytre-sablony/) we want it in:

```html
{control contactForm}
```

We write a method that gets called when the form is submitted (while taking care to follow the [Post/Redirect/Get](http://en.wikipedia.org/wiki/Post/Redirect/Get) pattern):

```php
public function contactFormSubmitted(BaseForm $form) {
	try {
		$this->sendMail($form->getValues());
		$this->flashMessage('Message sent successfully!');
		$this->redirect('this');
	} catch (\Nette\InvalidStateException $e) {
		$form->addError('Failed to send the e-mail, please try again in a moment.');
	}
}
```

We write the actual e-mail sending (including populating the template file):

```php
private function sendMail($values) {
	$mail = new Message;
	$mail->setSubject('New message from the contact form');
	$mail->setFrom($values['email'], $values['name']);
	$mail->addTo('ondrej@mirtes.cz', 'Ondřej Mirtes');

	$template = $this->createTemplate();
	$template->setFile(__DIR__ . '/../templates/Mail.phtml');

	$template->name = $values['name'];
	$template->email = $values['email'];
	$template->text = $values['text'];

	$mail->setHtmlBody($template);
	$mail->send();
}
```

And we create the template for how the e-mail will look (Mail.phtml):

```html
<h3>New message from the contact form</h3>

<ul>
	<li><strong>Name</strong> {$name}</li>
	<li><strong>E-mail</strong> <a href="mailto:{$email}">{$email}</a></li>
</ul>

<h1>Message text</h1>

{$text}
```

That's all. We have a form that won't submit unless all required fields are filled in (including client-side validation with JavaScript), that won't be at risk of being submitted multiple times by hitting F5, and that would have taken us far more time had we tried to build it without a framework.

P.S. Inserting this article into my own CMS (I programmed this blog half a year before I started working with Nette) turned out to be far more demanding than building the entire form - it doesn't escape characters correctly (which [dibi](http://dibiphp.com/) would solve) and it doesn't syntax-highlight PHP code (which [Texy!](http://texy.info/) would solve). [David](http://davidgrudl.com/), what would we do without you? :)

P.P.S. At the beginning of October I rewrote the whole blog into Nette, dibi and Texy, so moving the article and highlighting the code in the new system was far more comfortable :)

### Further reading

- [Nette Framework: Bulletproof forms (Zdroják.cz)](http://zdrojak.root.cz/clanky/nette-framework-neprustrelne-formulare/)
- [The Mail class (nette.org)](https://web.archive.org/web/20110611115348/http://doc.nette.org:80/cs/mailing)
