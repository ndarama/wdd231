/* main.js */

// 1. Hamburger toggle
const hamburgerBtn = document.getElementById("hamburgerBtn");
const primaryNav = document.getElementById("primaryNav");

hamburgerBtn.addEventListener("click", () => {
  primaryNav.classList.toggle("open");
});

// 2. Dynamic year and last modified
const currentYearSpan = document.getElementById("currentyear");
currentYearSpan.textContent = new Date().getFullYear();

const lastModifiedPara = document.getElementById("lastModified");
lastModifiedPara.textContent = `Last modification: ${document.lastModified}`;

// 3. Course Array
const courses = [
  { code: "CSE 110", name: "Intro to Programming", completed: false },
  { code: "WDD 130", name: "Web Fundamentals", completed: true },
  { code: "CSE 111", name: "Data Structures", completed: false },
  { code: "CSE 210", name: "OOP Development", completed: false },
  { code: "WDD 131", name: "Frontend Dev I", completed: true },
  { code: "WDD 231", name: "Frontend Dev II", completed: false }
];

// 4. Display courses
const courseCardsContainer = document.getElementById("courseCards");

function displayCourses(courseList) {
  courseCardsContainer.innerHTML = "";
  courseList.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    // If completed, add a special class
    if (course.completed) {
      card.classList.add("completed");
    }
    card.innerHTML = `
      <p>${course.code}</p>
    `;
    courseCardsContainer.appendChild(card);
  });
}

// Show all by default
displayCourses(courses);

// Filter buttons
document.getElementById("allBtn").addEventListener("click", () => {
  displayCourses(courses);
});
document.getElementById("cseBtn").addEventListener("click", () => {
  const cseOnly = courses.filter(c => c.code.startsWith("CSE"));
  displayCourses(cseOnly);
});
document.getElementById("wddBtn").addEventListener("click", () => {
  const wddOnly = courses.filter(c => c.code.startsWith("WDD"));
  displayCourses(wddOnly);
});
