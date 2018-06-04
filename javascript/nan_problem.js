/*

Q: 
What is NaN? 
What's its type? 
How can you *reliably* test if a value is equal to NaN?


A: 
it's "not a number", 
amazingly it's type is "number", 
and when compared to anything (even itself) it yields false
*/
results = NaN === NaN;
console.log('NaN === NaN: ' + results);

/*
There is the built-in isNaN(), but that will have issues when a 
non-number argument is coerced to a number, then compared.

*/
let list = [NaN, 1, 'foo', 'false', false, true];
for (let value of list) {
    console.log('Comparing ' + value + ' === NaN: ' + (value === NaN));
}

/*
More reliably, you can do:
*/
value !== value; // true ONLY if value is NaN. ES6 also provides Number.isNaN() which is reliable.

for (let value of list) {
    console.log('Comparing ' + value + ' !== ' + value + ': ' + (value !== value));
}

