---
layout: post
title: Dokonalý kontaktní formulář za 10 minut
date: 2009-09-17 00:00:00
guid: 6512bd43d9caa6e02c990b0a82652dca
---

[Nette Framework](http://nette.org/) má mnoho předností. Hlavní z nich je rychlá a efektivní tvorba kvalitních webových aplikací.

Už dávno jsou ty doby, kdy jsem v PHP půl odpoledne patlal obstojný formulář s kontrolou vyplněných textových polí, validitou e-mailové adresy a jakž-takž ucházejícím vzhledem odesílané zprávy.

V Nette je tvorba **dokonalého** a **neprůstřelného** kontaktního formuláře práce na 10 minut. Framework totiž obsahuje třídu jak pro práci s formuláři, tak třídu pro odeslání e-mailu (včetně podpory tvorby zprávy šablonovým způsobem).

Jak vypadá zdrojový kód takového formuláře? Vytvoříme si ho v [továrničce](http://doc.nette.org/cs/presenters#toc-tovarnicky-na-komponenty) v [Presenteru](http://doc.nette.org/cs/presenters):

{% highlight php startinline %}
use Nette\Application\UI\Form;
use Nette\Mail\Message;

class ContactPresenter extends BasePresenter
{
	protected function createComponentContactForm() {
		$form = new Form;
		$form->addText('name', 'Vaše jméno')
			->addRule(Form::FILLED, 'Vyplňte vaše jméno');

		$form->addText('email', 'Váš e-mail')
			->setEmptyValue('@')
			->addRule(Form::FILLED, 'Vyplňte váš e-mail')
			->addRule(Form::EMAIL, 'E-mail má nesprávný tvar');

		$form->addTextarea('text', 'Zpráva')
			->addRule(Form::FILLED, 'Vyplňte zprávu');

		$form->addSubmit('okSubmit', 'Odeslat');

		$form->onSubmit[] = array($this, 'contactFormSubmitted');
		return $form;
	}
}
{% endhighlight %}

Jednoduchým zavoláním makra widget vykreslíme formulář v té [šabloně](http://zdrojak.root.cz/clanky/nette-framework-chytre-sablony/), kde ho chceme:

{% highlight html %}
{control contactForm}
{% endhighlight %}

Napíšeme metodu, která se při odeslání formuláře zavolá (a dbáme při tom na pattern [Post/Redirect/Get](http://en.wikipedia.org/wiki/Post/Redirect/Get)):

{% highlight php startinline %}
public function contactFormSubmitted(BaseForm $form) {
	try {
		$this->sendMail($form->getValues());
		$this->flashMessage('Zpráva úspěšně odeslána!');
		$this->redirect('this');
	} catch (\Nette\InvalidStateException $e) {
		$form->addError('Nepodařilo se odeslat e-mail, zkuste to prosím za chvíli.');
	}
}
{% endhighlight %}

Napíšeme samotné odeslání e-mailu (včetně plnění souboru se šablonou):

{% highlight php startinline %}
private function sendMail($values) {
	$mail = new Message;
	$mail->setSubject('Nová zpráva z kontaktního formuláře');
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
{% endhighlight %}

A vytvoříme šablonu, jak bude e-mail vypadat (Mail.phtml):

{% highlight html %}
<h3>Nová zpráva z kontaktního formuláře</h3>

<ul>
	<li><strong>Jméno</strong> {$name}</li>
	<li><strong>E-mail</strong> <a href="mailto:{$email}">{$email}</a></li>
</ul>

<h1>Text zprávy</h1>

{$text}
{% endhighlight %}

To je celé. Máme formulář, který se neodešle, pokud nejsou vyplněna všechna povinná pole (včetně klientské validace Javascriptem), u kterého nebude hrozit vícenásobné odeslání pomocí F5 a který by nám zabral daleko více času, kdybychom se ho snažili vytvořit bez frameworku.

P.S. Vložit tento článek do mého CMS (tento blog jsem programoval půl roku před tím, než jsem začal s Nette dělat) se ukázalo jako daleko náročnější, než tvorba celého formuláře - neescapuje mi správně znaky (vyřešilo by [dibi](http://dibiphp.com/)) a neobarví mi PHP kód (vyřešilo by [Texy!](http://texy.info/)). [Davide](http://davidgrudl.com/), co bychom bez tebe dělali? :)

P.P.S. Začátkem října jsem celý blog přepsal do Nette, dibi a Texy, takže přesun článku a obarvení kódu v novém systému bylo daleko pohodlnější :)

### K nastudování

- [Nette Framework: Neprůstřelné formuláře (Zdroják.cz)](http://zdrojak.root.cz/clanky/nette-framework-neprustrelne-formulare/)
- [Třída Mail (nette.org)](http://doc.nette.org/cs/mailing)
