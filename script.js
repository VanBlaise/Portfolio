/* ===== TYPING EFFECT ===== */
const typingElement = document.querySelector("#typing");
const roles = ["Frontend Developer", "Trader", "Aspiring Data Scientist"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 120;

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex--);
    typingSpeed = 60;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex++);
    typingSpeed = 120;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 1000; // pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 300; // pause before typing new
  }

  setTimeout(typeEffect, typingSpeed);
}

typeEffect();

/* ===== THEME TOGGLE ===== */
const themeToggle = document.querySelector("#theme-toggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
});

/* ===== PROJECT FILTER ===== */
const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-filter");

    projects.forEach(project => {
      if (category === "all" || project.getAttribute("data-category") === category) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });
});

/* ===== SCROLL REVEAL ===== */
const sections = document.querySelectorAll(".fade-section");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // initial check
