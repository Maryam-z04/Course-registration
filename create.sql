CREATE TABLE Courses (
    course_code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    credit_hours INT,
    description TEXT
);

CREATE TABLE Requisites (
    req_code INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(10) NOT NULL,
    is_corequisite BOOLEAN NOT NULL,
    FOREIGN KEY (course_code) REFERENCES Courses(course_code)
);

CREATE TABLE Student (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    major_name VARCHAR(50),
    FOREIGN KEY (major_name) REFERENCES Major(major_name)
);

CREATE TABLE Admin (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Major (
    major_name VARCHAR(50) PRIMARY KEY
);

CREATE TABLE Sections (
    crn VARCHAR(10) PRIMARY KEY,
    sec_num INT NOT NULL,
    instructor VARCHAR(100),
    days VARCHAR(10),
    start_time TIME,
    finish_time TIME,
    course_code VARCHAR(10) NOT NULL,
    FOREIGN KEY (course_code) REFERENCES Courses(course_code)
);

CREATE TABLE Takes (
    student_id INT,
    course_code VARCHAR(10),
    PRIMARY KEY (student_id, course_code),
    FOREIGN KEY (student_id) REFERENCES Student(user_id),
    FOREIGN KEY (course_code) REFERENCES Courses(course_code)
);

CREATE TABLE Requires (
    course_code VARCHAR(10),
    major_name VARCHAR(50),
    PRIMARY KEY (course_code, major_name),
    FOREIGN KEY (course_code) REFERENCES Courses(course_code),
    FOREIGN KEY (major_name) REFERENCES Major(major_name)
);

CREATE TABLE Completed (
    student_id INT,
    course_code VARCHAR(10),
    PRIMARY KEY (student_id, course_code),
    FOREIGN KEY (student_id) REFERENCES Student(user_id),
    FOREIGN KEY (course_code) REFERENCES Courses(course_code)
);
