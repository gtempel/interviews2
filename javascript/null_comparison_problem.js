/*
Q: 
What is a potential pitfall with using typeof bar === "object" to 
determine if bar is an object? How can this pitfall be avoided?

A: 
null is always an object, so you'd have to check null. Now what 
if bar is a function? an array?

There's an alternative that'll always return false for null, array, 
and functions but true for objects:
*/
(bar !== null) && (bar.constructor === Object)
