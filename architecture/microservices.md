# Microservices

## Q: What Are Microservices?

## Answer:

Microservices are a variant of the service-oriented architecture (SOA) architectural style that structures an application as a collection of loosely coupled services. In a microservices architecture, services should be fine-grained and the protocols should be lightweight. The benefit of decomposing an application into different smaller services is that it improves modularity and makes the application easier to understand, develop and test. It also parallelism development by enabling small autonomous teams to develop, deploy and scale their respective services independently. It also allows the architecture of an individual service to emerge through continuous refactoring. Microservices-based architectures enable continuous delivery and deployment.

(https://dzone.com/articles/patterns-for-microservices-sync-vs-async)

Microservices is an architecture paradigm. In this architectural style, small and independent components work together as a system. Despite its higher operational complexity, the paradigm has seen a rapid adoption. It is because it helps break down a complex system into manageable services. The services embrace micro-level concerns like single responsibility, separation of concerns, modularity, etc.



---
## Q: How do microservices and SOA differ?

## A: [Microservices vs SOA](https://dzone.com/articles/microservices-vs-soa-whats-the-difference)

In short, SOA shares as much as possible, and classically relies upon an enterprise service bus as well as multiple message protocols, whereas microservice tend to share as little as possible, be small silos with bounded context, use a simple messaging mechanism and usually rely upon http/rest. SOA data stores are usually enterprise vs siloed service domains.

---
## Q: What are the pros and cons of monolithic vs microservice architectures?

## A: 
A monolithic architecture means that your app is written as one cohesive unit of code whose components are designed to work together, sharing the same memory space and resources.

A microservice architecture means that your app is made up of lots of smaller, independent applications capable of running in their own memory space and scaling independently from each other across potentially many separate machines.

* The major advantage of the monolithic architecture is that most apps typically have a large number of cross-cutting concerns, such as logging, rate limiting, and security features such audit trails and DOS protection.

* When everything is running through the same app, it’s easy to hook up components to those cross-cutting concerns.

* There can also be performance advantages, since shared-memory access is faster than inter-process communication (IPC).

### Monolithic cons: 

* Monolithic app services tend to get tightly coupled and entangled as the application evolves, making it difficult to isolate services for purposes such as independent scaling or code maintainability.

* Monolithic architectures are also much harder to understand, because there may be dependencies, side-effects, and magic which are not obvious when you’re looking at a particular service or controller.

### Microservice pros: 

* Microservice architectures are typically better organized, since each microservice has a very specific job, and is not concerned with the jobs of other components. Decoupled services are also easier to recompose and reconfigure to serve the purposes of different apps (for example, serving both the web clients and public API).

* They can also have performance advantages depending on how they’re organized because it’s possible to isolate hot services and scale them independent of the rest of the app.

### Microservice cons: 
* As you’re building a new microservice architecture, you’re likely to discover lots of cross-cutting concerns that you did not anticipate at design time.

* A monolithic app could establish shared magic helpers or middleware to handle such cross-cutting concerns without much effort.

* In a microservice architecture, you’ll either need to incur the overhead of separate modules for each cross-cutting concern, or encapsulate cross-cutting concerns in another service layer that all traffic gets routed through.

* Eventually, even monolthic architectures tend to route traffic through an outer service layer for cross-cutting concerns, but with a monolithic architecture, it’s possible to delay the cost of that work until the project is much more mature.

* Microservices are frequently deployed on their own virtual machines or containers, causing a proliferation of VM wrangling work. These tasks are frequently automated with container fleet management tools.

## Good to hear:

* Positive attitudes toward microservices, despite the higher initial cost vs monolthic apps. 
* Aware that microservices tend to perform and scale better in the long run.
* Practical about microservices vs monolithic apps. * Structure the app so that services are independent from each other at the code level, but easy to bundle together as a monolithic app in the beginning. Microservice overhead costs can be delayed until it becomes more practical to pay the price.

## Red flags:

* Unaware of the differences between monolithic and microservice architectures.
* Unaware or impractical about the additional overhead of microservices.
* Unaware of the additional performance overhead caused by IPC and network communication for microservices.
* Too negative about the drawbacks of microservices. * Unable to articulate ways in which to decouple monolithic apps such that they’re easy to split into microservices when the time comes.
* Underestimates the advantage of independently scalable microservices.

---

## Q: Areas of concern for some microservices patterns?
## A:

1. Consumers  
These can be external programs, web interfaces, etc, and often deal with the server synchronously, and expect the interface(s) to support that. The complexity of the server system should be hidden by a unified interface for consumers.
1. Workflow Management  
Business workflow can be: **implicit**, happening at each service and remain districuted; **explicit**, with an orchestrator service coordinating the business flows with a workflow specification that lays out the sequence of execution and does the calls and is tightly bound to the communication paradigm of the services; **event-based** which substitutes an event bus or similar in place of an orchestrator.
1. Read/Write Bias  
A read-heavy system may expect the majority of operations to complete synchronously, such as a public API for weather forecast. Alternatively, a write-heavy system benefits greatly from asynchronous execution. As such, services may be split into read and write services.
1. Synchronous  
Closely associated with HTTP (and RPC), and while there may be parallel/asynchronous calls within the implementation they must all wrap-up and (re)join for the return. Synchronous systems are easier to grasp and debug, but are susceptible to bursts in load, cascading failures, tighter coupling, etc. Some of these can be moderated with [circuit breakers](https://martinfowler.com/bliki/CircuitBreaker.html) or [bulkheads](https://docs.microsoft.com/en-us/azure/architecture/patterns/bulkhead), but only to a certain extent.
1. Asynchronous  
Well suited for distributed architectures, removing the need to wait for completion and thus decoupling execution. Queues help mitigate the bursts in load. Asynch systems, though, are harder to follow as they tend to be more complex. Synchronous consumers are most affected by asynch systems and require some adapter or wrapper to present the asynchronous system as a synchronous black box entity. [CQRS -- command query responsibility segregation](https://martinfowler.com/bliki/CQRS.html) systems split reads from writes, and stream the writes to the read stores for eventual consistency.
1. Logging  
There is no one place to figure out what is going on. Logging into tens or hundreds of services to tail logs is pretty useless. You will also require some type of **_global request tracing_**, assigning a request ID to each request such that you can figure out how things flow. Microservice architectures really require a mechanism to visualize a request ID across the services and measure performance. One slow microservice can slow down the application to a halt.

