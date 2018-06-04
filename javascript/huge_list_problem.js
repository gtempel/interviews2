/*
Q:
What's bad about this approach:

*/
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};


/*
A:
It'll blow up with a stack overflow eventually, when the
array list is too large.

Q:
how can it be fixed AND still retain the recursive pattern?
*/
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        setTimeout( nextListItem, 0);
    }
};

/*
This makes the event loop handle the recursion, not the stack. 
This will work regardless of the size of the list.
*/

