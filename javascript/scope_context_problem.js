/*
Q: 
Consider the following, and what gets logged to the console for each button click:

https://medium.com/coderbyte/a-tricky-javascript-interview-question-asked-by-google-and-amazon-48d212890703
*/

for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}

/*
    Alternatively, if you don't want to test with buttons and such
    and want to demonstrate that the problem exists w/out dealing
    with browser DOM:
*/
// interviewer: what will the following code output?
const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log('Index: ' + i + ', element: ' + arr[i]);
  }, 3000);
}


/*
A:
(BONUS POINTS: execution contexts, specifics about variables, 
internal scope properties, IIFE -- immediately invoked function expression)

For the first problem, with the button click:
5

For the 2nd problem, with the timeout function:
"Index: 4, element: undefined" each time

This is because "var i" is global, and that the value is set to 4 by the end of the
loop, and the function() is referencing the global.

This can be addressed by passing the i as a parameter into the function(), or by
using "let i" so it's a local context

*/

// solution 1
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', (function(i) {
    return function() { console.log(i); };
  })(i));
  document.body.appendChild(btn);
}

// solution 2
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  (function (i) {
    btn.addEventListener('click', function() { console.log(i); });
  })(i);
  document.body.appendChild(btn);
}

// solution 3
// more work than needed, since we don't care about the actual
// array elements and are really concerned about the index
['a', 'b', 'c', 'd', 'e'].forEach(function (value, i) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function() { console.log(i); });
  document.body.appendChild(btn);
});

// solution 4
// switch "var i" to "let i" which keeps it local
for (let i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}