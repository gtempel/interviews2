/*
Q:
Create a function that, given a DOM element, will visit
the element itself and ALL descendants.
*/

/*
A:
classic depth-first search
*/

function Traverse(domElement, domCallback) {
    domCallback(domElement);
    var list = domElement.children;
    for (var i = 0; i < list.length; i++) {
        Traverse(list[i], domCallback); // recursion here
    }
}
