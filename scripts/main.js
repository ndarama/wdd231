// JavaScript for dynamic elements and interactivity

// Dynamically display the current year in the footer
const currentYearElement = document.getElementById("currentyear");
currentYearElement.textContent = new Date().getFullYear();

// Dynamically display the last modified date in the footer
const lastModifiedElement = document.getElementById("lastModified");
lastModifiedElement.textContent = `Last Update: ${document.lastModified}`;

// Toggle the hamburger menu for small screens
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Course filtering logic
const courses = [
    { code: "CSE 110", name: "Introduction to Programming", completed: true },
    { code: "WDD 130", name: "Web Frontend Development I", completed: true },
    { code: "CSE 111", name: "Programming with JavaScript", completed: true },
    { code: "CSE 210", name: "Object-Oriented Programming", completed: false },
    { code: "WDD 131", name: "Web Frontend Development II", completed: false },
    { code: "WDD 231", name: "Advanced Web Development", completed: false },
];

const courseContainer = document.getElementById("courseContainer");

function displayCourses(filteredCourses) {
    courseContainer.innerHTML = ""; // Clear existing courses

    filteredCourses.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.className = `course-card ${course.completed ? "completed" : "not-completed"}`;
        courseCard.textContent = `${course.code} - ${course.name}`;
        courseContainer.appendChild(courseCard);
    });
}

function filterCourses(filter) {
    let filteredCourses;

    if (filter === "all") {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.code.startsWith(filter));
    }

    displayCourses(filteredCourses);
}

// Initialize with all courses displayed
displayCourses(courses);

// Buttons to filter courses
const filterButtons = document.querySelectorAll(".filter-buttons button");
filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const filter = e.target.textContent;
        filterCourses(filter === "All" ? "all" : filter);
    });
});
