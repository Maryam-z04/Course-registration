-- Join Query: List of Students and their Majors

SELECT Student.name, Student.major_name
FROM Student
JOIN Major ON Student.major_name = Major.major_name;
-- Description: This query retrieves the names of students along with their respective majors by joining the Student and Major tables.

-- Normal Query: Courses with More Than 3 Credit Hours

SELECT course_code, name
FROM Courses
WHERE credit_hours > 3;
-- Description: This query fetches course codes and names for all courses that have more than 3 credit hours from the Courses table.

-- Join Query: Course Details and their Prerequisites/Co-requisites

SELECT Courses.course_code, Courses.name, Requisites.is_corequisite
FROM Courses
JOIN Requisites ON Courses.course_code = Requisites.course_code;
-- Description: This query joins the Courses and Requisites tables to provide a list of courses along with a flag indicating whether their requisites are co-requisites.

-- Join Query: Students Enrolled in a Specific Course

SELECT Student.name, Takes.course_code
FROM Student
JOIN Takes ON Student.user_id = Takes.student_id
WHERE Takes.course_code = 'CS101';
-- Description: This query lists the names of students enrolled in a specific course (e.g., 'CS101') by joining Student and Takes tables.

-- Join Query: Instructor Names for Each Course Section

SELECT Sections.crn, Sections.instructor
FROM Sections
JOIN Courses ON Sections.course_code = Courses.course_code;
-- Description: This query provides the instructor names for each course section by joining the Sections and Courses tables.

-- Normal Query: List of All Majors

SELECT major_name
FROM Major;
-- Description: This query simply retrieves a list of all majors available in the Major table.

-- Join Query: Course Requirements for Each Major

SELECT Major.major_name, Requires.course_code
FROM Major
JOIN Requires ON Major.major_name = Requires.major_name;
-- Description: This query joins the Major and Requires tables to display which courses are required for each major.