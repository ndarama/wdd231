// main.js

const hamburgerBtn = document.getElementById("hamburgerBtn");
const primaryNav = document.getElementById("primaryNav");

hamburgerBtn.addEventListener("click", () => {
  primaryNav.classList.toggle("open");
});

const currentYearSpan = document.getElementById("currentyear");
currentYearSpan.textContent = new Date().getFullYear();

const lastModifiedPara = document.getElementById("lastModified");
lastModifiedPara.textContent = `Last Update: ${document.lastModified}`;

// Course array, filtering, etc. remain the same
const courses = [
  { code: "CSE 110", name: "Intro to Programming", credits: 3, completed: false },
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "CSE 111", name: "Data Structures", credits: 3, completed: false },
  { code: "CSE 210", name: "OOP Development", credits: 3, completed: false },
  { code: "WDD 131", name: "Frontend Dev I", credits: 3, completed: true },
  { code: "WDD 231", name: "Frontend Dev II", credits: 3, completed: false }
];

const courseCardsContainer = document.getElementById("courseCards");
const totalCreditsSpan = document.getElementById("totalCredits");

function displayCourses(courseList) {
  courseCardsContainer.innerHTML = "";
  let totalCredits = 0;
  
  courseList.forEach(course => {
    totalCredits += course.credits;
    
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) {
      card.classList.add("completed");
    }
    card.innerHTML = `<p>${course.code}</p>`;
    courseCardsContainer.appendChild(card);
  });
  
  if (totalCreditsSpan) {
    totalCreditsSpan.textContent = totalCredits;
  }
}

// Initial load
displayCourses(courses);

// Filter button events
document.getElementById("allBtn").addEventListener("click", () => {
  displayCourses(courses);
});

document.getElementById("cseBtn").addEventListener("click", () => {
  const cseCourses = courses.filter(c => c.code.startsWith("CSE"));
  displayCourses(cseCourses);
});

document.getElementById("wddBtn").addEventListener("click", () => {
  const wddCourses = courses.filter(c => c.code.startsWith("WDD"));
  displayCourses(wddCourses);
});
