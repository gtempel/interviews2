# Microservices Problem

## Q: Have a need for a [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) endpoint that will be for a document store (images, whatever). How would you architect this?

## A:
Think about data store, API vs api gateway, synchronous vs asynchronous, event driven, etc.

## Changes to the problem:

* we need to know who/what/when about the request
* make the data bigger (takes longer)
* make it WAY BIGGER
* no longer going to put/post images there, they'll land in the store...how to we know about them?
* if candidate gets to async, how do we know when it's done?
* we need an auditing service that'll also know when the data's been asked for, and when it's done.

