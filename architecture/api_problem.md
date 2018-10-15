
# API Design Problem
(https://dzone.com/articles/be-the-best-api-you-can-be)

---
## Q: How would you design an API for Colleges and Students, supporting the ability to:
1. list the colleges
2. list the students at a college
3. enroll a student to a college
4. drop a student from a college
5. remove all students from a college

## A: The answer should demonstrate knowledge of identifying the resources and ignoring the actions or verbs, instead making use of the HTTP methods.
Additionally, the answer should demonstrate the knowledge of sub-resources

Look for the candidate going for a **DEFINE-FIRST** approach, where the definitions of things are being listed:
1. title
2. description
3. schema in the communication
4. openapi documentation?
5. assertions
6. standard being used/followed
7. patterns
8. goals

Look to see if the design is **CONSUMER-FIRST** approach, satisfying the needs of the caller and not just the service/web-layer.

Check for things like:
* plural nouns
* versioning support somewhere, such as in the URL path?
* proper use of the http verbs
* method `GET` path `/colleges` should get the list of all colleges
* method `GET` path `/colleges/26` should get the detail of college 26
* method `DELETE` path `/colleges/26` should delete college 26
* `GET` `/colleges/3/students` should get the list of all students from college 3
`GET`` /colleges/3/students/45` should get the details of student 45, which belongs to college 3
`DELETE` `/colleges/3/students/45` should delete student 45, which belongs to college 3
`POST` `/colleges` should create a new college and return the details of the new college created

Check to see if the candidate has thought about:
* sorting (?sort=blah)
* filtering (?type=x&location=y)
* search (?search=foobar)

---

## Q: Now someone wants to slam lots of students into a college -- maybe some college is now part of a university system and it's an import or cross-registration. What problems might occur with the API you designed above?
## A: 

1. see if the candidate notices that getting the list of students in a college might be HUGE, and have they considered pagination?
2. see if the candidate notices that there may be a need to do bulk-enrollment
3. see if the candidate notices that enrollment may not have to be synchronous, and could be done with a service/worker approach
