// Sample data (replace this with your actual data)
const sampleData = [
    {
        "course_code": "NGN 110",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Fall",
        "year": 1,
        "x": 0,
        "y": 0
    },
    {
        "course_code": "MTH 103",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Fall",
        "year": 1,
        "x": 0,
        "y": 80
    },
    {
        "course_code": "GER-SCI 1",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Fall",
        "year": 1,
        "x": 0,
        "y": 160
    },
    {
        "course_code": "GER-CORE 1",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Fall",
        "year": 1,
        "x": 0,
        "y": 240
    },
    {
        "course_code": "WRI 101",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Fall",
        "year": 1,
        "x": 0,
        "y": 320
    },
    {
        "course_code": "CMP 120",
        "prerequisites": [
            "NGN 110"
        ],
        "corequisites": [],
        "semester": "Spring",
        "year": 1,
        "x": 150,
        "y": 40
    },
    {
        "course_code": "MTH 104",
        "prerequisites": [
            "MTH 103"
        ],
        "corequisites": [],
        "semester": "Spring",
        "year": 1,
        "x": 150,
        "y": 120
    },
    {
        "course_code": "GER-SCI 2",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Spring",
        "year": 1,
        "x": 150,
        "y": 200
    },
    {
        "course_code": "GER-CORE 2",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Spring",
        "year": 1,
        "x": 150,
        "y": 280
    },
    {
        "course_code": "WRI 102",
        "prerequisites": [
            "WRI 101"
        ],
        "corequisites": [],
        "semester": "Spring",
        "year": 1,
        "x": 150,
        "y": 360
    },
    {
        "course_code": "COE 221",
        "prerequisites": [
            "CMP 120"
        ],
        "corequisites": [],
        "semester": "Fall",
        "year": 2,
        "x": 450,
        "y": 0
    },
    {
        "course_code": "CMP 220",
        "prerequisites": [
            "CMP 120"
        ],
        "corequisites": [],
        "semester": "Fall",
        "year": 2,
        "x": 450,
        "y": 80
    },
    {
        "course_code": "MTH 221",
        "prerequisites": [
            "MTH 104"
        ],
        "corequisites": [],
        "semester": "Fall",
        "year": 2,
        "x": 450,
        "y": 160
    },
    {
        "course_code": "MTH 213",
        "prerequisites": [
            "MTH 103"
        ],
        "corequisites": [],
        "semester": "Fall",
        "year": 2,
        "x": 450,
        "y": 240
    },
    {
        "course_code": "ENG 204",
        "prerequisites": [
            "WRI 102"
        ],
        "corequisites": [],
        "semester": "Fall",
        "year": 2,
        "x": 450,
        "y": 320
    },
    {
        "course_code": "STA 201",
        "prerequisites": [
            "MTH 103"
        ],
        "corequisites": [],
        "semester": "Spring",
        "year": 2,
        "x": 600,
        "y": 40
    },
    {
        "course_code": "IEN 301",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Spring",
        "year": 2,
        "x": 600,
        "y": 120
    },
    {
        "course_code": "CMP 305",
        "prerequisites": [
            "CMP 220"
        ],
        "corequisites": [
            "MTH 213"
        ],
        "semester": "Spring",
        "year": 2,
        "x": 600,
        "y": 200
    },
    {
        "course_code": "CMP 256",
        "prerequisites": [
            "CMP 220"
        ],
        "corequisites": [],
        "semester": "Spring",
        "year": 2,
        "x": 600,
        "y": 280
    },
    {
        "course_code": "CMP 235",
        "prerequisites": [
            "WRI 102"
        ],
        "corequisites": [],
        "semester": "Spring",
        "year": 2,
        "x": 600,
        "y": 360
    },
    {
        "course_code": "COE 251",
        "prerequisites": [
            "CMP 120",
            "COE 221"
        ],
        "corequisites": [],
        "semester": "Fall",
        "year": 3,
        "x": 900,
        "y": 0
    },
    {
        "course_code": "CMP 340",
        "prerequisites": [
            "STA 201",
            "CMP 305"
        ],
        "corequisites": [],
        "semester": "Fall",
        "year": 3,
        "x": 900,
        "y": 80
    },
    {
        "course_code": "CMP 320",
        "prerequisites": [
            "CMP 305"
        ],
        "corequisites": [],
        "semester": "Fall",
        "year": 3,
        "x": 900,
        "y": 160
    },
    {
        "course_code": "GER-SCI 3",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Fall",
        "year": 3,
        "x": 900,
        "y": 240
    },
    {
        "course_code": "ENG 207",
        "prerequisites": [
            "ENG 204"
        ],
        "corequisites": [],
        "semester": "Fall",
        "year": 3,
        "x": 900,
        "y": 320
    },
    {
        "course_code": "CMP 310",
        "prerequisites": [
            "COE 251",
            "CMP 305"
        ],
        "corequisites": [],
        "semester": "Spring",
        "year": 3,
        "x": 1050,
        "y": 40
    },
    {
        "course_code": "COE 371",
        "prerequisites": [
            "COE 221",
            "MTH 104"
        ],
        "corequisites": [],
        "semester": "Spring",
        "year": 3,
        "x": 1050,
        "y": 120
    },
    {
        "course_code": "CMP 333",
        "prerequisites": [
            "CMP 305"
        ],
        "corequisites": [],
        "semester": "Spring",
        "year": 3,
        "x": 1050,
        "y": 200
    },
    {
        "course_code": "CMP 321",
        "prerequisites": [
            "CMP 305",
            "CMP 256"
        ],
        "corequisites": [],
        "semester": "Spring",
        "year": 3,
        "x": 1050,
        "y": 280
    },
    {
        "course_code": "MTH 343",
        "prerequisites": [
            "MTH 221"
        ],
        "corequisites": [],
        "semester": "Spring",
        "year": 3,
        "x": 1050,
        "y": 360
    },
    {
        "course_code": "GER-CORE 3",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Spring",
        "year": 3,
        "x": 1050,
        "y": 440
    },
    {
        "course_code": "MJE XXX 1",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Fall",
        "year": 4,
        "x": 1350,
        "y": 0
    },
    {
        "course_code": "MJE XXX 2",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Fall",
        "year": 4,
        "x": 1350,
        "y": 80
    },
    {
        "course_code": "COE 420",
        "prerequisites": [
            "CMP 305",
            "CMP 256"
        ],
        "corequisites": [],
        "semester": "Fall",
        "year": 4,
        "x": 1350,
        "y": 160
    },
    {
        "course_code": "CMP 490",
        "prerequisites": [
            "CMP 235",
            "ENG 207"
        ],
        "corequisites": [
            "CMP 420"
        ],
        "semester": "Fall",
        "year": 4,
        "x": 1350,
        "y": 240
    },
    {
        "course_code": "FRE XXX 1",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Fall",
        "year": 4,
        "x": 1350,
        "y": 320
    },
    {
        "course_code": "FRE XXX 2",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Fall",
        "year": 4,
        "x": 1350,
        "y": 400
    },
    {
        "course_code": "GER-CORE 4",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Spring",
        "year": 4,
        "x": 1500,
        "y": 40
    },
    {
        "course_code": "MJE XXX 3",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Spring",
        "year": 4,
        "x": 1500,
        "y": 120
    },
    {
        "course_code": "FRE XXX 3",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Spring",
        "year": 4,
        "x": 1500,
        "y": 200
    },
    {
        "course_code": "CMP 491",
        "prerequisites": [
            "CMP 490"
        ],
        "corequisites": [],
        "semester": "Spring",
        "year": 4,
        "x": 1500,
        "y": 280
    },
    {
        "course_code": "MJE XXX 4",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Spring",
        "year": 4,
        "x": 1500,
        "y": 360
    },
    {
        "course_code": "GER-CORE 5",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Spring",
        "year": 4,
        "x": 1500,
        "y": 440
    },
    {
        "course_code": "CMP 397",
        "prerequisites": [],
        "corequisites": [],
        "semester": "Summer",
        "year": 3,
        "x": 1200,
        "y": 0
    }
];
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const svg = d3.select("#degree-plan").attr("width", 2000).attr("height", 500);

svg.selectAll("*").remove();

svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 2000)
    .attr("height", 500)
    .style("fill", "white")
    .on("mouseover", () => setHoveredCourse(null))

let registered_courses = []

let get_registered_courses = () => {
    fetch("/student/registered_courses", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        registered_courses = data
        console.log(registered_courses)
        drawDegreePlan()
    })
}

let register_course = (course_code) => {
    
    fetch("/student/register_course", {
        method: "POST",
        body: JSON.stringify({course_code}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        get_registered_courses()
        update_completed_credits()
    })
    .catch((error) => {
        console.error("Error:", error);
    });
    
}

let drop_course = (course_code) => {
    fetch("/student/drop_course", {
        method: "POST",
        body: JSON.stringify({course_code}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        response.json()
        get_registered_courses()
        update_completed_credits()
    })
    
}

let update_completed_credits = () => {
    fetch("/student/completed_credits", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        // put the data h3#completed-credits element
        const completedCredits = document.querySelector("#completed-credits");
        completedCredits.innerText = data;
    })
}

window.get_sections = async function(course_code) {
    fetch("/student/sections", {
        method: "POST",
        body: JSON.stringify({course_code}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        // put the data in the select#sections element
        const sections = document.querySelector("#sections");
        // remove all the options from the select#sections element except the first one
        sections.querySelectorAll("option").forEach((option, index) => {
            if (index !== 0) {
                option.remove();
            }
        });
        current_sections = data;
        data.forEach((section) => {
            const option = document.createElement("option");
            option.value = section.crn;
            // inner text of instructor, days, start_time, finish_time
            // also format the datetime object to only display time in AM/PM it's given like 13:45:00
            option.innerText = `${section.instructor} | ${section.days} | ${section.start_time} | ${section.finish_time}`;
            sections.appendChild(option);
        });
        // set #sel-crs-name to course_name split it at "(" and take the first part
        const courseName = document.querySelector("#sel-crs-name");
        courseName.innerText = data[0].course_name.split("(")[0];
        // add course_code in parentheses after the course_name
        courseName.innerText += ` (${data[0].course_code})`;
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

function findAllPrerequisites(courseCode) {
    const course = sampleData.find(c => c.course_code === courseCode);
    if (!course || !course.prerequisites || course.prerequisites.length === 0) return [];

    return course.prerequisites;
}

function findAllPrerequisitesRecursive(courseCode, prerequisites = []) {
    const course = sampleData.find(c => c.course_code === courseCode);
    if (!course || !course.prerequisites || course.prerequisites.length === 0) return prerequisites;

    course.prerequisites.forEach(prerequisite => {
        prerequisites.push(prerequisite);
        findAllPrerequisitesRecursive(prerequisite, prerequisites);
    });

    return prerequisites;
}

const colors = ["#FFD6CC", "#CCD6FF", "#FFFFCC", "#E5FFCC", "", "#CCFFE5", "", "#CCE5FF", "#CCD6FF", "#E5CCFF"];
const semesterColors = {};
const semesters = [...new Set(sampleData.map(course => course.semester))];

semesters.forEach((semester, index) => {
    semesterColors[semester] = colors[index];
});
let d = false
function drawDegreePlan() {
    svg.selectAll("rect.course-rect").remove();
    svg.selectAll("text.course-label").remove();
    svg.selectAll("#arrow").remove();
    // remove defs
    svg.selectAll("defs").remove();

    sampleData.forEach(course => {
        const isHovered = hoveredCourse && hoveredCourse.course_code === course.course_code;
        const isPrerequisite = hoveredCourse && findAllPrerequisitesRecursive(hoveredCourse.course_code).includes(course.course_code);
        let opacity = 1;
        
        if (hoveredCourse) {
            opacity = (isPrerequisite || isHovered) ? 1 : 0.35;
        }
        let color = "skyblue"
        // check if course is registered
        if(registered_courses.includes(course.course_code)) {
            color = "#3ade52"
        } else {
            color = semesterColors[course.semester]
        }
        if(!d || 1) {
            svg.append("rect")
                .attr("class", "course-rect")
                .attr("x", course.x)
                .attr("y", course.y)
                .attr("width", 100)
                .attr("height", 50)
                .attr("course_code", course.course_code)
                .style("fill", color)
                .style("opacity", opacity)
                .on("mouseenter", () => setHoveredCourse(course))
                .on("contextmenu", (e) => {
                    e.preventDefault();
                    // if course in registered_courses, drop it
                    // else register it
                    if(registered_courses.includes(course.course_code)) {
                        drop_course(course.course_code)
                    } else {
                        register_course(course.course_code)
                    }
                })
                .on("mousedown", () => {
                    get_sections(course.course_code)
                })
            svg.append("text")
                .attr("class", "course-label")
                .attr("x", course.x + 50)
                .attr("y", course.y + 25)
                .attr("course_code", course.course_code)
                .attr("text-anchor", "middle")
                .text(course.course_code)
                .style("opacity", opacity)
                .on("mouseenter", () => setHoveredCourse(course))
                .on("mousedown", () => {
                    get_sections(course.course_code)
                })
        }

    });
    d = true

    if (hoveredCourse) {
        const offsetY = 0;

        const drawArrow = (start, end) => {
            const markerWidth = 10;
            const markerHeight = 10;
            const arrowPoints = `0,0 ${markerWidth},${markerHeight / 2} 0,${markerHeight}`;
            const arrowId = 'arrow';

            svg.append('defs')
                .append('marker')
                .attr('id', arrowId)
                .attr('viewBox', [0, 0, markerWidth, markerHeight])
                .attr('refX', markerWidth / 2)
                .attr('refY', markerHeight / 2)
                .attr('markerWidth', markerWidth)
                .attr('markerHeight', markerHeight)
                .attr('orient', 'auto-start-reverse')
                .append('polygon')
                .attr('points', arrowPoints);

            svg.append('line')
                .attr('id', arrowId)
                .attr('x1', start[0])
                .attr('y1', start[1])
                .attr('x2', end[0])
                .attr('y2', end[1])
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('marker-end', `url(#${arrowId})`);
        };

        const drawPrerequisiteArrows = (courseCode) => {
            const course = sampleData.find(c => c.course_code === courseCode);
            const prerequisites = findAllPrerequisites(courseCode);

            if (prerequisites.length === 0) return;

            prerequisites.forEach(prerequisite => {
                const prerequisiteCourse = sampleData.find(c => c.course_code === prerequisite);
                if (prerequisiteCourse) {
                    if (course.x < prerequisiteCourse.x) {
                        drawArrow([course.x + 100, course.y + 25], [prerequisiteCourse.x, prerequisiteCourse.y + 25]);
                    } else if (course.x > prerequisiteCourse.x) {
                        drawArrow([course.x, course.y + 25], [prerequisiteCourse.x + 100, prerequisiteCourse.y + 25]);
                    } else if (course.y < prerequisiteCourse.y) {
                        drawArrow([course.x + 50, course.y + 50], [prerequisiteCourse.x + 50, prerequisiteCourse.y]);
                    } else if (course.y > prerequisiteCourse.y) {
                        drawArrow([course.x + 50, course.y], [prerequisiteCourse.x + 50, prerequisiteCourse.y + 50]);
                    }
                    drawPrerequisiteArrows(prerequisite);
                }
            });
        }

        drawPrerequisiteArrows(hoveredCourse.course_code);
    }
}

let hoveredCourse = null;

function setHoveredCourse(course) {
    if(course === hoveredCourse) return;
    hoveredCourse = course;
    drawDegreePlan();
    
}

// Initialize the degree plan
drawDegreePlan();
register_course('NGN 110')
get_sections('NGN 110')