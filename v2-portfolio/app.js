/* ========= Theme (auto + manual) ========= */
(function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  // load saved or infer from system
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') {
    root.setAttribute('data-theme', saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
  // icon
  toggle.textContent = root.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggle.textContent = next === 'dark' ? '☀️' : '🌙';
  });
})();

/* ========= Typewriter ========= */
(function typewriter() {
  const el = document.getElementById('typewriter');
  const cursor = document.querySelector('.cursor');
  const phrases = [
    'Frontend Developer',
    'Aspiring Data Scientist',
    'Trader',
    'Creative Problem Solver'
  ];
  let p = 0, i = 0, deleting = false;

  function tick() {
    const text = phrases[p];
    el.textContent = text.slice(0, i);
    if (!deleting && i < text.length) {
      i++;
      setTimeout(tick, 75);
    } else if (!deleting && i === text.length) {
      deleting = true;
      setTimeout(tick, 900);
    } else if (deleting && i > 0) {
      i--;
      setTimeout(tick, 40);
    } else {
      deleting = false;
      p = (p + 1) % phrases.length;
      setTimeout(tick, 220);
    }
  }
  // cursor blink already via CSS, start typing:
  tick();
})();

/* ========= Scroll reveal ========= */
(function revealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section, .card, .hero .hero-left, .hero .hero-right, .carousel')
    .forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
})();

/* ========= Carousel (Skills) ========= */
(function skillsCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.querySelectorAll('.slide'));
  const prev = document.querySelector('.carousel .prev');
  const next = document.querySelector('.carousel .next');
  const dotsWrap = document.querySelector('.dots');

  let index = 0;
  let autoTimer;

  function buildDots() {
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', 'Go to slide ' + (i+1));
      if (i === 0) b.classList.add('active');
      b.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(b);
    });
  }

  function updateDots() {
    dotsWrap.querySelectorAll('button').forEach((b, i) => {
      b.classList.toggle('active', i === index);
    });
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
    restartAuto();
  }

  function nextSlide() { goTo(index + 1); }
  function prevSlide() { goTo(index - 1); }

  function autoPlay() { autoTimer = setInterval(nextSlide, 4500); }
  function restartAuto() { clearInterval(autoTimer); autoPlay(); }

  buildDots();
  autoPlay();
  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);
})();

/* ========= Project tilt + glare ========= */
(function tiltCards() {
  const cards = document.querySelectorAll('.tilt');
  cards.forEach(card => {
    const glare = card.querySelector('.card-glare');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = x - rect.width / 2;
      const cy = y - rect.height / 2;
      const rotateX = (+cy / 24);
      const rotateY = (-cx / 24);

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      const mx = (x / rect.width) * 100;
      const my = (y / rect.height) * 100;
      glare && glare.style.setProperty('--mx', `${mx}%`);
      glare && glare.style.setProperty('--my', `${my}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
  });
})();
