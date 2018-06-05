# Distributed Architecture Questions

## Q: ACID vs BASE?
## A:
ACID (Atomicity, Consistency, Isolation, Durability) is typically the classical immediate/strong consistency model guarantying validity as a single operation with immediate results. BASE (Bascally Available, Soft State, Eventual consistency) is more of a "liveness" guarantee (reads will _eventually_ return the same value), and does not make safety guarantees. Given no new updates, all nodes in the BASE model will return the same values and be in-sync.

BASE trades low-latency at the risk of returning stale data. 

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