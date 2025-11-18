// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page-section');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetPage = link.getAttribute('data-page');
    
    // Update active link
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    // Show target section
    sections.forEach(section => {
      section.classList.remove('active');
      if (section.id === targetPage) {
        section.classList.add('active');
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  html.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '☀️ Modo Claro';
}

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  
  if (currentTheme === 'dark') {
    html.removeAttribute('data-theme');
    themeToggle.textContent = '🌙 Modo Oscuro';
    localStorage.setItem('theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️ Modo Claro';
    localStorage.setItem('theme', 'dark');
  }
});

// Smooth animations on load
window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

// Add scroll-to-top button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '↑';
scrollBtn.style.cssText = `
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
`;
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.opacity = '1';
  } else {
    scrollBtn.style.opacity = '0';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollBtn.addEventListener('mouseenter', () => {
  scrollBtn.style.transform = 'scale(1.1)';
});

scrollBtn.addEventListener('mouseleave', () => {
  scrollBtn.style.transform = 'scale(1)';
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  const currentSection = document.querySelector('.page-section.active');
  const currentIndex = Array.from(sections).indexOf(currentSection);
  
  if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
    navLinks[currentIndex + 1].click();
  } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
    navLinks[currentIndex - 1].click();
  }
});

// Add progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  width: 0%;
  transition: width 0.1s;
  z-index: 9999;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  progressBar.style.width = scrolled + '%';
});
