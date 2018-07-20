# Distributed Architecture Questions

## Q: what is vertical vs horizontal scaling?

## A:
* vertical: add more cpu and storage to increase capacity (scaling within the unit)

* horizontal: dividing the data set and distributing over multiple compute units

---

## Q: what is load balancing?

## A: 
In computing, load balancing improves the distribution of workloads across multiple computing resources, such as computers, a computer cluster, network links, central processing units, or disk drives. Load balancing aims to optimize resource use, maximize throughput, minimize response time, and avoid overload of any single resource. Using multiple components with load balancing instead of a single component may increase reliability and availability through redundancy. Load balancing usually involves dedicated software or hardware, such as a multilayer switch or a Domain Name System server process.

---

## Q: ACID vs BASE? (usually discussed in terms of databases, but...)
## A:
ACID (Atomicity, Consistency, Isolation, Durability) is typically the classical immediate/strong consistency model guarantying validity as a single operation with immediate results. BASE (Bascally Available, Soft State, Eventual consistency) is more of a "liveness" guarantee (reads will _eventually_ return the same value), and does not make safety guarantees. Given no new updates, all nodes in the BASE model will return the same values and be in-sync.

BASE trades low-latency at the risk of returning stale data in the short term. 


---
## Q: what does 'consistency' mean, and why is it a concern in some systems and not others?
## A:
(https://www.allthingsdistributed.com/2008/12/eventually_consistent.html)

Previously, things were simply synchronous and ACID, but the rise of large distributed/asynchronous systems presented new problems and have to juggle CAP (consistency, availability, partitioning, and only two can be achieved at any given time). Since network partitioning cannot be prevented or avoided, systems must deal with consistency vs availability. 

* Strong consistency  
After the update completes, any subsequent access (by A, B, or C) will return the updated value.
* Weak consistency  
The system does not guarantee that subsequent accesses will return the updated value. A number of conditions need to be met before the value will be returned. The period between the update and the moment when it is guaranteed that any observer will always see the updated value is dubbed the inconsistency window.
* Eventual consistency  
This is a specific form of weak consistency; the storage system guarantees that if no new updates are made to the object, eventually all accesses will return the last updated value. If no failures occur, the maximum size of the inconsistency window can be determined based on factors such as communication delays, the load on the system, and the number of replicas involved in the replication scheme. The most popular system that implements eventual consistency is DNS (Domain Name System). Updates to a name are distributed according to a configured pattern and in combination with time-controlled caches; eventually, all clients will see the update.
* (eventual) Read-your-writes consistency  
This is an important model where process A, after it has updated a data item, always accesses the updated value and will never see an older value. This is a special case of the causal consistency model.
* (eventual) Session consistency  
This is a practical version of the previous model, where a process accesses the storage system in the context of a session. As long as the session exists, the system guarantees read-your-writes consistency. If the session terminates because of a certain failure scenario, a new session needs to be created and the guarantees do not overlap the sessions.

---
## Q: What is _asychronous programming/architecture_, and why is it important?

## A:
Synchronous programming means that, barring conditionals and function calls, code is executed sequentially from top-to-bottom, blocking on long-running tasks such as network requests and disk I/O.

Asynchronous programming means that the engine runs in an event loop. When a blocking operation is needed, the request is started, and the code keeps running without blocking for the result. When the response is ready, an interrupt is fired, which causes an event handler to be run, where the control flow continues. In this way, a single program thread can handle many concurrent operations.

User interfaces are asynchronous by nature, and spend most of their time waiting for user input to interrupt the event loop and trigger event handlers.

Node is asynchronous by default, meaning that the server works in much the same way, waiting in a loop for a network request, and accepting more incoming requests while the first one is being handled.

This is important in JavaScript, because it is a very natural fit for user interface code, and very beneficial to performance on the server.

## Good to hear:

* An understanding of what blocking means, and the performance implications.
* An understanding of event handling, and why its important for UI code.

## Red flags:

* Unfamiliar with the terms asynchronous or synchronous.
* Unable to articulate performance implications or the relationship between asynchronous code and UI code.

---

## Q: Tell me about the fallacies (false assumptions) of Distributed Systems?
## A:
https://dzone.com/articles/understanding-the-8-fallacies-of-distributed-syste

1. the network is reliable  
Calls over a network _will_ fail (http timeouts, sockets close, [shark attacks](https://www.theguardian.com/technology/2014/aug/14/google-undersea-fibre-optic-cables-shark-attacks), so you need to be prepared for automatic retries (queues are great for this).
2. latency is zero  
Calls over a network are _not_ instantaneous, and are **seven-orders of magnitude** slower than in-memory calls, and beware the [n+1 select problem](https://stackoverflow.com/questions/97197/what-is-the-n1-select-query-issue) which creates more round-trips than you might expect. Be prepared to bring back all the data you might need, and move the data closer to the clients. Additionally, consider inverting the flow of data and removing the remote calls that query for data and replace with pub/sub calls that are pushing data.
3. bandwidth is infinite  
Often this _isn't_ a problem, but be careful about what kind of data you are streaming. Video? VoIP? Dataset replication? Even database calls being handled by an ORM -- queryResults.toList() could inhale the entire result set into memory for the sake of creating the list/array. You may need to partition your data/domain into contexts, start to work with aggregates, or tackle the access-methods and adopt a command/query responsibilty segregation (CQRS: see [Martin Fowler](https://martinfowler.com/bliki/CQRS.html) and [microservice patterns](http://microservices.io/patterns/data/cqrs.html) )
4. the network is secure  
The system is only as secure as the weakest link, and there are lots of links in a distributed system. Use only **https**, and design _from the start_ with the [OWASP Top 10](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project) threats in mind.
5. topology doesn't change  
Networks change all the time, both in terms of hardware and software. Abstract the structure of the network and avoid hard-coded IP addresses, use discovery services instead of DNS if possible, and service bus frameworks can help with location transparency.
6. there is one administrator  
There is no one person who knows everything -- apps have data in configuration files, environment variables, databases, command line args, etc, so finding what can go where can be problematic. **Everyone** should be responsible for the release process, even if "release" means handing the materials over to deployment teams -- they still need to be able to find out what's-where, etc. Logging and monitoring should be clear, and decoupling via queues can help a great deal when taking-down/swapping-out installations.
7. transport cost is zero  
Everything is time and money, including the networking infrastructure **and** the cost of _serialzation/deserialization_. SOAP is more expensive than XML which is more expensive than JSON which is more expensive than binary protocols.
8. the network is homogeneous  
The network is rarely ever uniform in terms of configuration and protocols and hardware. Mobile devices multiply this confusion even further. Focus on standard protocols and try to avoid vendor lock-in. 