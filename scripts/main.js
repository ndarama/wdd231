/**********************
  main.js
**********************/

/* 1. Hamburger Toggle */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const primaryNav = document.getElementById("primaryNav");

hamburgerBtn.addEventListener("click", () => {
  primaryNav.classList.toggle("open");
});

/* 2. Dynamic Footer Dates */
const currentYearSpan = document.getElementById("currentyear");
currentYearSpan.textContent = new Date().getFullYear();

const lastModifiedPara = document.getElementById("lastModified");
lastModifiedPara.textContent = `Last Modification: ${document.lastModified}`;

/* 3. Courses Array with images */
const courses = [
  {
    code: "CSE 110",
    name: "Intro to Programming",
    credits: 3,
    completed: false,
    image: "images/Imagecourse.png"
  },
  {
    code: "WDD 130",
    name: "Web Fundamentals",
    credits: 3,
    completed: true,
    image: "images/Imagecourse.png"
  },
  {
    code: "CSE 111",
    name: "Data Structures",
    credits: 3,
    completed: false,
    image: "images/Imagecourse.png"
  },
  {
    code: "CSE 210",
    name: "OOP Development",
    credits: 3,
    completed: false,
    image: "images/Imagecourse.png"
  },
  {
    code: "WDD 131",
    name: "Frontend Dev I",
    credits: 3,
    completed: true,
    image: "images/Imagecourse.png"
  },
  {
    code: "WDD 231",
    name: "Frontend Dev II",
    credits: 3,
    completed: false,
    image: "images/Imagecourse.png"
  }
];

/* 4. Display & Filter Logic */
const courseCardsContainer = document.getElementById("courseCards");
const totalCreditsSpan = document.getElementById("totalCredits");

function displayCourses(courseList) {
  courseCardsContainer.innerHTML = "";
  let totalCredits = 0;

  courseList.forEach(course => {
    totalCredits += course.credits;
    
    // Create the card
    const card = document.createElement("div");
    card.classList.add("course-card");
    
    // Mark completed if needed
    if (course.completed) {
      card.classList.add("completed");
    }
    
    // Build the card's HTML
    card.innerHTML = `
      <img 
        src="${course.image}" 
        alt="${course.name} Image" 
        class="course-image"
      >
      <p>${course.code}</p>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
      <p>Completed: ${course.completed ? "Yes" : "No"}</p>
    `;
    
    courseCardsContainer.appendChild(card);
  });

  // Update total credits
  if (totalCreditsSpan) {
    totalCreditsSpan.textContent = totalCredits;
  }
}

// Show all courses by default on page load
displayCourses(courses);

// 5. Filter Buttons
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
