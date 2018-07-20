# Software Design



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

---
# SOLID

## Q:
SOLID design principles are...what?

## A:
* S = [SRP or Single responsibility principle](https://codeburst.io/understanding-solid-principles-single-responsibility-b7c7ec0bf80)
A class or module should have one, and only one, reason to be changed.

* O = [OCP or Open closed principle](https://codeburst.io/understanding-solid-principles-open-closed-principle-e2b588b6491f)
Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.

* L = [LSP or Liskov substitution principle](https://codeburst.io/understanding-solid-principles-liskov-substitution-principle-e7f35277d8d5)
Objects should be replaceable with instances of their subtypes without altering the correctness of that program

* I = [ISP or Interface segregation principle](https://codeburst.io/understanding-solid-principles-interface-segregation-principle-b2d57026cf6c)
Clients should not be forced to depend on methods that they do not use.

* D = [DIP or Dependency inversion principle](https://codeburst.io/understanding-solid-principles-dependency-injection-d570c15560ab)

  * High level modules should not depend upon low level modules. Both should depend upon abstractions.
  * Abstractions should not depend upon details; details should depend upon abstractions.


## Q: if I told you that [something] followed strict SOLID principles...what would you be expecting to find in the code base?

## A: 
* S (single responsibility):
well organized folder/file arrangement, very specific logic, no huge manager classes

* O (open/closed):
New functionality added through new classes / abstractions / composition / interfaces

* L (liskov substitution):
Subtypes treated as parent type; logic makes use of base/abstract objects rather than subtypes

* I (interface segregation):
smaller defined sets of api/functionality interfaces, such as breaking out reader and writer approaches

* D (dependency inversion):
dependency injection mechanism, service locator, feeding-in the required resources instead of creating them



## Q: [Law of Demeter](https://medium.com/@ipapikas/bonus-solid-series-7-5-law-of-demeter-859ac8b3c4d4)
## A:
* Each unit should have only limited knowledge about other units: only units “closely” related to the current unit.
* Each unit should only talk to its friends; don’t talk to strangers.
* Only talk to your immediate friends.

OR...

* When one wants a dog to walk, one does not command the dog’s legs to walk directly; instead one commands the dog which then commands its own legs.

* will *often* rely upon interface segregation principle and dependency inversion principle to clean-up the code

### Solution:
There are some common solutions that allow you to write better software and avoid all the problems described above:

* Only talk to your immediate friends.
* Inject (pass in) the more specific object that you really need.
* Leave the object location and configuration responsibility to the caller ie the factory or the container.

---

# Data Binding

## Q: What are two-way data binding and one-way data flow, and how are they different?

_Two way data binding_ means that UI fields are bound to model data dynamically such that when a UI field changes, the model data changes with it and vice-versa.

_One way data flow_ means that the model is the single source of truth. Changes in the UI trigger messages that signal user intent to the model (or “store” in React). Only the model has the access to change the app’s state. The effect is that data always flows in a single direction, which makes it easier to understand.

One way data flows are deterministic, whereas two-way binding can cause side-effects which are harder to follow and understand.

## Good to hear:

* React is the new canonical example of one-way data flow, so mentions of React are a good signal. Cycle.js is another popular implementation of uni-directional data flow.
* Angular is a popular framework which uses two-way binding.

## Red flags:

* No understanding of what either one means. Unable to articulate the difference.


---

# Static Analysis & Metrics

## Q: What is static analysis and what's it good for?

## A:
Get a view onto/into the complexity, maintainability,and possibly performance of the code without actually running it.


---

## Q: ABC metric?

## A: 
assignments, branches, conditionals

Can actually be represented as a 3d-vector, magnitude: | abc | = sqrt(a^2 + b^2 + c^2)

---

## Q: Halstead complexity?

## A: 
operators, operands, total operators, total operands

---
## Q: Cyclomatic complexity

## A: 
number of linearly independent paths through the logic by computing a control flow graph


---

## Q: CRAP (Change Risk Anti-Pattern) index?

## A: change risk analysis and prediction
It's designed to analyze and predict the amount of effor, pain, and time required to maintain an existing body of code. 

CRAP(m) = complexity(m)<sup>2</sup> * (1 - coverage(m)/100)<sup>3</sup> + complexity(m)

The more a block of code is covered by unit tests the lower the CRAP index.



