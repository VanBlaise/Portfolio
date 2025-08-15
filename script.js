// ===== Animated Typing Effect =====
const typingElement = document.getElementById("typing");
const typingTexts = [
  "Frontend Developer 💻",
  "Aspiring Data Scientist 📊",
  "Trader 📈",
  "Creative Problem Solver 🎯"
];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = typingTexts[typingIndex];
  typingElement.textContent = currentText.slice(0, charIndex);

  if (!isDeleting && charIndex < currentText.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
    } else {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % typingTexts.length;
      setTimeout(typeEffect, 200);
    }
  }
}
typeEffect();


// ===== Theme Toggle =====
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});


// ===== Fade-in on Scroll =====
const fadeSections = document.querySelectorAll(".fade-section");

function checkFade() {
  fadeSections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      section.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", checkFade);
checkFade();


// ===== Project Filtering =====
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach(card => {
      card.style.display =
        filter === "all" || card.dataset.category === filter
          ? "block"
          : "none";
    });
  });
});
