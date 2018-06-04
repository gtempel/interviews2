# Testing

## Q: what is TDD? BDD? How do they compare?
## A:
* TDD: tests driven -- 
* BDD: behavior driven -- focus on the business behaviors, the "why". Works best when cross-functional, such as when a developer and product owner work together and write specs of what aught to be happening (not how). The phrasing is in business language, not the implementation language. You don't care that an invoice belongs_to account, because only the dev or dba know that.

---
## Q: differences between types of tests
## A:
* unit tests -- smallest isolated components, detects issues at the lowest levels
* integration tests -- two or more components, detects issues between components
* functional tests -- more of a whole system, detects system/workflow issues
* acceptance tests -- often functional tests, these verify that the system works the way the user/customer expects it to. They describe and test business requirements.

---
## Q: what's the typical pattern for unit/functional tests?
https://medium.com/@pjbgf/title-testing-code-ocd-and-the-aaa-pattern-df453975ab80

https://raygun.com/blog/unit-testing-examples-and-anatomy/

* Arrange
* Act
* Assert

```
 public void test() {
    String input = "abc";
    		
    String result = Util.reverse(input);
    
    assertEquals("cba", result);
 }
```
Other patterns that should apply:
* DRY -- don't repeat yourself
* YAGNI -- you aren't going to need it
* SRP -- single responsibility principle
* KISS -- keep it simple stupid

---
## Q: Bowling Kata
http://butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata

---
## Q: common misconceptions about unit tests
## A:
https://abstracta.us/blog/software-testing/devs-you-have-unit-testing-all-wrong/

* unit testing is useless
* unit testing slows down development
* code is so simple doesn't need unit tests
* testers are in charge of unit testing
* we have integration tests, so we don't need unit tests
* 
---
## Q: what should you aim for with unit tests?
## A:

https://www.typemock.com/introduction-and-history-of-unit-testing/
https://www.typemock.com/7-benefits-of-unit-testing/

* verifying functionality of a unit
* no external dependencies
* very much a test in isolation -- each test should be independent of all other tests
* tests must assert something
* avoid testing configuration settings
* prevent regression; pinpoint issues
* Unit tests help reduce bugs in new and existing features
* Unit testing serves as a form of documentation
* Unit testing helps with refactoring
* Unit testing helps with maintaining code
* Unit testing forces you to think about your code more carefully
* Unit testing can make development faster
* unit testing improves teamwork -- colleagues can review the logic behind your code and coordinate their code accordingly
* unit tests are a form of documentation, and show how the code is supposed to work

* tools: mocha, jasmine, tape, xUnit / nUnit, phpunit, rspec

---
## Q: what should you aim for with integration tests?
## A:
* verifying APIs and interaction between components
* could be db and application code, for example
* tools: often the same as unit tests

---
## Q: what should you aim for with functional tests?
## A:
* also called end-to-end
* tests workflow / functionality
* tools: selenium, protractor, cucumber

---
## Q: differences between
* dummies
* spies
* stubs
* fakes
* mocks

## A:
a "test double" is a stand-in or pretend object used in place of a real one for testing purposes.

- dummies -- passed around as placeholders but never really used. May implement an interface but does nothing else. Could just be a placeholder object added to a collection but has no meaning otherwise.

- spies -- records interactions with other objects, allowing you to make assertions on number of calls, arguments, return values, etc. Great to assert if a callback was called (using a spy as the item to be called, for instance)

- stubs -- pretend objects with preprogrammed behavior, usually returning fixed values. Often used to avoid making expensive actual requests, and/or feed known data. These can be great for simplifying testing of asychronous code, stubbing out the asychronous function and forcing a callback to happen right away.

- fakes -- pretend objects with working implementations, usually taking some shortcut making them not suitable for production (such as doing everything in-memory instead of a real db). These are usually one step up from a stub, and are "functional" but not useful outside of any test.

- mocks -- usually test doubles, conforming to the interface of some required collaborator or dependency and passed in its place. These often have hard coded responses to various method calls. Definitely needed when a function has a side effect (such as saving to a db). Mocks are well suited to testing internal behavior or implementation rather than state -- use them to verify that methods were/weren't invoked.

---
## Q: what BDD/TDD tools or techniques can help provide insights into your code base?
## A:
* obviously want to consider pass/fail reporting
* coverage?
* complexity? -- this is often overlooked

---

## Q: Some core unit testing patterns?

## A:
There are several, but some of the common patterns include the following...

### Result
The simplest, this basically checks that an operation/calculation/call generates the expected result.
```
[Test]
public void Increment_Zero_ReturnsOne()
{
  int value = 0; // Arrange
  int result = IntegerUtils.Increment(value); // Act
  Assert.AreEqual(1, result); // Assert
}
```

### State
Very similar to Result

```
[Test]
public void Normalize_PossitiveVector2_ResultingVectorLengthIsOne()
{
  Vector2 vector = new Vector2(5,6); // Arrange
  vector.Normalize(); // Act
  Assert.AreEqual(1, vector.Length); // Assert
}
```

### Fluent-builder
Not so much solely a test approach, but the use of this technique can help out with your tests. There are some key components of the fluent approach:
* several clearly named Set methods, each responsible for setting a *single* piece of state on the object *and* returns the builder, so the methods can be chained
* a Build method that uses the (previously) set state(s) and build/return the desired object
```
public class PersonBuilder {
    private string _firstName;
    private string _lastName;
    public PersonBuilder SetFirstName(string firstName) {
        _firstName = firstName;
        return this;
    }
    public PersonBuilder SetLastName(string lastName) {
        _lastName = lastName;
        return this;
    }
    public Person Build() {
        return new Person(_firstName, _lastName);
    }
}


Person testPerson = new PersonBuilder()
                               .SetFirstName("Jason")
                               .SetLastName("Fauchelle")
                               .Build();
```

### Database
ORMs can help make db testing easier. Alternatively, faking or mocking the IUnitOfWork to completely remove the need for an actual database is even more helpful. Use the fake or mock to return specific sets of objects as needed for the unit tests as if that data had been returned from a database. You could use a test-specific database instance, or even a different lightweight (in-memory) database.

### Fluent database builder
This is a variation on the fluent builder approach but builds/generates queries.

### Integration
These tests tie your code/system with external technologies and/or services. However, spinning-up external dependencies is expensive and doesn't test in isolation, therefore they could/should be abstracted and then fake/mock those external dependencies.
