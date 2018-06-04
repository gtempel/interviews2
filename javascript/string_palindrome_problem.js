/*

Q: 
Easy way to tell if a string is a palindrome?

Given these strings, determine which ones are palindromes:
*/

let testStrings = [
    "racecar",
    "rotator",
    "Civic",
    "foobar",
    "canoe",
    "kayak",
    "My hovercraft is full of eels",
    "Rats live on no evil star",
    "So many dynamos",
    "Senile felines",
    "UFO Tofu"
];

/*
A: 
Look for case insensitivity, whitespace handling, etc

*/
function isPalindrome(str) {
    str = str.replace(/\W/g, '').toLowerCase();
    return (str == str.split('').reverse().join(''));
} 
