// =====================
// CURSEUR PERSONNALISÉ
// =====================
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';

  // Léger délai pour l'anneau (effet traîne)
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
  }, 60);
});

// Agrandir le curseur au survol des liens et boutons
document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '56px';
    ring.style.height = '56px';
    ring.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.opacity = '0.5';
  });
});

// =====================
// NAVIGATION ACTIVE
// =====================
// Met en surbrillance le lien nav de la section visible
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach((section) => observer.observe(section));

// =====================
// PROJETS GITHUB
// =====================

fetch('https://api.github.com/users/joshualardy/repos?sort=updated&per_page=6')
  .then(res => res.json())
  .then(repos => {
    const grid = document.querySelector('#projets .grid');
    if (!grid) return;

    repos.forEach(repo => {
      grid.innerHTML += `
        <div class="card">
          <div class="card-body">
            <p class="card-type">GitHub</p>
            <h3>${repo.name}</h3>
            <p>${repo.description || 'Aucune description.'}</p>
            <a href="${repo.html_url}" class="card-link" target="_blank" rel="noopener noreferrer">
              Voir sur GitHub →
            </a>
          </div>
        </div>`;
    });
  })
  .catch(err => {
    console.error('Erreur lors du chargement des dépôts GitHub :', err);
  });
