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

