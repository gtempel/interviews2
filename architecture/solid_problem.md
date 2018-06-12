# SOLID problem and closed-code

Given the following code snippet:

```
      public void Work(string switchoption)
        {
            switch (switchoption)
            {
                case "Fun1":
                    ///
                    /// So many lines of code
                    ///
                    break;
                case "Fun2":
                    ///
                    /// So many lines of code
                    ///
                    break;
                case "Fun3":
                    ///
                    /// So many lines of code
                    ///
                    break;
            }
        }
```
---
## Q: is this closed?
## A: No
You don't know what kinds of cases might be added in the future.

---

## Q: what happens if you need to add a new case, or change code for a particular case?
## A: You have to test all cases again because the function changed.

---

## Q: How could you improve this?
## A: refactoring
Each `case` should be refactored to a separate method. It's still not *closed*, though.

---
## Q: How could you close this and future-proof it?
## A: Use a dictionary/function-lookup
That will close the function, but still doesn't follow *Single Responsibility* part of SOLID since `work()` is still doing several things

---
## Q: How could you improve this and future-proof it and yet still have it be testable and work?
## A: Implement a [strategy pattern](http://www.dofactory.com/net/strategy-design-pattern) and dependency injection
The method wouldn't then care _what_ work has to be performed, just that it could do it.

```
 class Program
    {
        static void Main(string[] args)
        {
           //Unity container registration.
            var container = new UnityContainer();
            container.RegisterType<IExampleStrategy, ExampleStrategy1>("Fun1");
            container.RegisterType<IExampleStrategy, ExampleStrategy2>("Fun2");
            container.RegisterType<IExampleStrategy, ExampleStrategy3>("Fun3");

            CloseCodeExample2 codeExample2 = new CloseCodeExample2(container);
            codeExample2.Work("Fun1");
            codeExample2.Work("Fun2");
           Console.WriteLine("---------------------------------");
           codeExample2.Work(new List<string>() { "Fun2", "Fun3", "Fun1" });
          Console.ReadKey();
        }
    }
```
