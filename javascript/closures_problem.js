/*
Q: 
what's a closure, and what are the three scopes?

A: 
inner function with access to the variables in the outer (enclosing)
scope chain. There are three scopes:

variable in its own scope
variables in the enclosing scope
global variables



Q: 
what's the significance of, and reason for, wrapping the entire 
content of a JavaScript source file with a function block?

(function() { 
    // ....
})()

A: 
creates a closure around the entire contents of the file, creating 
a private namespace that helps avoid clashes. It also allows for an 
easily referenced alias for a global variable.

*/
