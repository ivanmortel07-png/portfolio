// ===== Portfolio script - Ivan Angelo T. Mortel =====

// --- mobile menu toggle ---
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// close the menu after clicking a link (for mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// --- navbar shadow + back to top button on scroll ---
const navbar = document.getElementById('navbar');
const toTop = document.getElementById('to-top');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  toTop.classList.toggle('show', window.scrollY > 500);
  highlightNav();
});

// --- highlight the nav link of the section you're currently on ---
const sections = document.querySelectorAll('section');

function highlightNav() {
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// --- typing effect in the hero ---
const words = ['Aspiring Web Developer', 'UI/UX Enthusiast', 'Future IT Professional'];
const typingEl = document.getElementById('typing');
let wordIndex = 0;
let charIndex = words[0].length;
let deleting = true;

function typeEffect() {
  const word = words[wordIndex];

  if (deleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingEl.textContent = word.substring(0, charIndex);

  let speed = deleting ? 50 : 100;

  if (!deleting && charIndex === word.length) {
    speed = 1800; // pause when the word is complete
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

setTimeout(typeEffect, 2000);

// --- animate skill bars when they show up on screen ---
const bars = document.querySelectorAll('.progress');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width;
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

bars.forEach(bar => observer.observe(bar));

// --- popup for project screenshots ---
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.getElementById('close-modal');

function openModal(src) {
  modalImg.src = src;
  modal.classList.add('open');
}

document.querySelectorAll('.project-img').forEach(img => {
  img.addEventListener('click', () => openModal(img.src));
});

document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    openModal(link.getAttribute('href'));
  });
});

closeModal.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modal.classList.remove('open');
});

// --- contact form ---
// no backend yet so it just opens your email app with the message filled in
const form = document.getElementById('contact-form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value || 'Message from your portfolio';
  const message = document.getElementById('message').value;

  const body = `Hi Ivan,\n\n${message}\n\nFrom: ${name} (${email})`;
  window.location.href = `mailto:ivanmortel07@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  alert('Thanks for reaching out! Your email app will open so you can send the message.');
  form.reset();
});

// --- auto update the year in the footer ---
document.getElementById('year').textContent = new Date().getFullYear();
