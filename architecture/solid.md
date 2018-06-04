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



