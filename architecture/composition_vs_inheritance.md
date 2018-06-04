# Composition vs Inheritance

## Q: What does “favor object composition over class inheritance” mean?

## A:
This is a quote from [“Design Patterns: Elements of Reusable Object-Oriented Software”](https://github.com/dieforfree/edsebooks/blob/master/ebooks/Design%20Patterns%2C%20Elements%20of%20Reusable%20Object-Oriented%20Software.pdf). It means that code reuse should be achieved by assembling smaller units of functionality into new objects instead of inheriting from classes and creating object taxonomies.

In other words, use 

* can-do
* has-a
* uses-a 

relationships instead of is-a relationships.

## Good to hear:

* Avoid class hierarchies.
* Avoid brittle base class problem.
* Avoid tight coupling.
* Avoid rigid taxonomy (forced is-a relationships that are eventually wrong for new use cases).
* Avoid the gorilla banana problem (“what you wanted was a banana, what you got was a gorilla holding the banana, and the entire jungle”).
Make code more flexible.

## Red Flags:

* Fail to mention any of the problems above.
* Fail to articulate the difference between composition and class inheritance, or the advantages of composition.


