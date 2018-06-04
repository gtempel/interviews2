# Static Analysis & Metrics

## Q: What is static analysis and what's it good for?

## A:
Get a view onto/into the complexity, maintainability,and possibly performance of the code without actually running it.


---

## Q: ABC metric?

## A: 
assignments, branches, conditionals

Can actually be represented as a 3d-vecor, magnitude: | abc | = sqrt(a^2 + b^2 + c^2)

---

## Q: Halstead complexity?

## A: 
operators, operands, total operators, total operands

---
## Q: Cyclomatic complexity

## A: 
number of linearly independent paths through the logic by computing a control flow graph


---

## Q: CRAP index?

## A: change risk analysis and prediction
It's designed to analyze and predict the amount of effor, pain, and time required to maintain an existing body of code. 

CRAP(m) = complexity(m)<sup>2</sup> * (1 - coverage(m)/100)<sup>3</sup> + complexity(m)

The more a block of code is covered by unit tests the lower the CRAP index.