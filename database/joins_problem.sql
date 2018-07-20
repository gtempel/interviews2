-- given:
CREATE TABLE `advisors` (
  `advisor_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`advisor_id`)
)

SELECT * FROM advisors;
/*
+------------+------------+-----------+
| advisor_id | first_name | last_name |
+------------+------------+-----------+
|          1 | James      | Francis   |
|          2 | Amy        | Cheng     |
|          3 | Lamar      | Alexander |
|          4 | Anita      | Woods     |
+------------+------------+-----------+
4 rows in set (0.00 sec)
*/

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `advisor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `advisor_id` (`advisor_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`advisor_id`) REFERENCES `advisors` (`advisor_id`)
);

SELECT * FROM students;

/*
+------------+------------+------------+------------+
| student_id | first_name | last_name  | advisor_id |
+------------+------------+------------+------------+
|          1 | Tanisha    | Blake      |          2 |
|          2 | Jess       | Goldsmith  |       NULL |
|          3 | Tracy      | Wu         |          3 |
|          4 | Alvin      | Grand      |          1 |
|          5 | Felix      | Zimmermann |          2 |
+------------+------------+------------+------------+
5 rows in set (0.00 sec)
*/

-- note that not all students have an advisor

-- Question:
-- give me a list of all students and their corresponding advisor
--
-- Answer: 
-- this would potentially be a LEFT JOIN, including all rows
-- of the 'left' and whatever matches on the 'right', permitting

SELECT s.first_name AS student_name, a.first_name AS advisor_name
FROM students AS s
LEFT JOIN advisors AS a ON s.advisor_id = a.advisor_id;

/*
+--------------+--------------+
| student_name | advisor_name |
+--------------+--------------+
| Alvin        | James        |
| Tanisha      | Amy          |
| Felix        | Amy          |
| Tracy        | Lamar        |
| Jess         | NULL         |
+--------------+--------------+
5 rows in set (0.01 sec)
*/

-- could also be a RIGHT JOIN if we wanted a list of students assigned to
-- advisors AND a list of advisors not assigned to students (basically, more
-- of an advisor-centric list)

SELECT s.first_name AS student_name, a.first_name AS advisor_name
FROM students AS s
RIGHT JOIN advisors AS a ON s.advisor_id = a.advisor_id;

/*
+--------------+--------------+
| student_name | advisor_name |
+--------------+--------------+
| Alvin        | James        |
| Tanisha      | Amy          |
| Felix        | Amy          |
| Tracy        | Lamar        |
| NULL         | Anita        |
+--------------+--------------+
5 rows in set (0.00 sec)
*/




-- Question:
-- pull information on students and advisors EXCLUDING students who don't have an advisor
--
-- This would be an INNER JOIN, which finds things that exist BOTH on the
-- left AND on the right; when you want to *exclude* all records that do
-- not match *both* sides of the tables being joined

SELECT s.first_name AS student_name, a.first_name AS advisor_name
FROM students AS s
INNER JOIN advisors AS a ON s.advisor_id = a.advisor_id;

/*
+--------------+--------------+
| student_name | advisor_name |
+--------------+--------------+
| Alvin        | James        |
| Tanisha      | Amy          |
| Felix        | Amy          |
| Tracy        | Lamar        |
+--------------+--------------+
4 rows in set (0.00 sec)
*/


-- QUESTION: what is full (outer) join?
-- returns *all* results from left and right tables regardless of matches
--
-- usefulness?
-- perhaps if trying to find everything INCLUDING potentially mismatched or
-- orphaned data from both tables, seeing things that might be broken on the
-- left and broken on the right. You can easily do this with left joins and
-- right joins separately and then UNION them together.
--
-- another case might be if/when you are comparing two tables to see if they
-- are identical in terms of data.


-- QUESTION: what is a cross join?
-- retrns the *cartesian product* of two tables -- each individual row of the
-- left table matched with each individual row of the right table
--
-- usefulness?
-- since it creates all possible pairings of left and right, it could be useful
-- for generating "populations" of data

