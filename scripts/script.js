// ========== LECTEUR AUDIO ==========

const audio = document.getElementById('music');
const playBtn = document.getElementById('playBtn');
const playIcon = playBtn.querySelector('.icon');
const progress = document.getElementById('progress');
const musicBar = document.querySelector('.music-bar');
const timeCurrent = document.querySelector('.time-current');
const timeTotal = document.querySelector('.time-total');
const coverImg = document.querySelector('.music-cover img');

let isPlaying = false;

// Play / Pause
playBtn.addEventListener('click', togglePlay);

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playIcon.textContent = '▶';
    playBtn.classList.remove('playing');
    coverImg.classList.remove('playing');
  } else {
    audio.play();
    playIcon.textContent = '❚❚';
    playBtn.classList.add('playing');
    coverImg.classList.add('playing');
  }
  isPlaying = !isPlaying;
}

// Mise à jour de la barre de progression
audio.addEventListener('timeupdate', updateProgress);

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + '%';
  timeCurrent.textContent = formatTime(audio.currentTime);
}

// Affichage de la durée totale
audio.addEventListener('loadedmetadata', () => {
  timeTotal.textContent = formatTime(audio.duration);
});

// Seek (clic sur la barre)
musicBar.addEventListener('click', seek);

function seek(e) {
  const rect = musicBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;
  audio.currentTime = percent * audio.duration;
}

// Formater le temps
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Réinitialiser à la fin
audio.addEventListener('ended', () => {
  playIcon.textContent = '▶';
  playBtn.classList.remove('playing');
  coverImg.classList.remove('playing');
  isPlaying = false;
  progress.style.width = '0%';
  timeCurrent.textContent = '0:00';
});

// Gestion des erreurs
audio.addEventListener('error', (e) => {
  console.error('Erreur de chargement audio:', e);
  alert('Impossible de charger la musique. Vérifiez le chemin du fichier.');
});


// ========== FILTRAGE PROJETS ==========

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');

      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'grid';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});


// ========== MENU MOBILE TOGGLE ==========

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', menu.classList.contains('active'));

    // Animation de l'icône burger
    toggle.textContent = menu.classList.contains('active') ? '✕' : '☰';
  });

  // Fermer au clic sur un lien
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.textContent = '☰';
        }
      }
    });
  });

  // Fermer au clic en dehors du menu
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('active') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)) {
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }
  });
});


// ========== DÉFILEMENT INFINI DES LANGAGES ==========

document.addEventListener('DOMContentLoaded', () => {
  const langagesSection = document.querySelector('.langages');

  if (!langagesSection) return;

  // Dupliquer les icônes pour l'effet infini
  const icons = Array.from(langagesSection.children);
  icons.forEach(icon => {
    const clone = icon.cloneNode(true);
    langagesSection.appendChild(clone);
  });

  // Variables pour le défilement
  let scrollAmount = 0;
  const scrollSpeed = 1.5; // Vitesse du défilement (pixels par frame)

  function autoScroll() {
    scrollAmount += scrollSpeed;

    // Largeur d'un set complet d'icônes
    const iconWidth = icons[0].offsetWidth + 32; // width + gap
    const totalWidth = iconWidth * icons.length;

    // Reset quand on atteint la moitié (effet infini)
    if (scrollAmount >= totalWidth) {
      scrollAmount = 0;
    }

    langagesSection.style.transform = `translateX(-${scrollAmount}px)`;
    requestAnimationFrame(autoScroll);
  }

  // Démarrer l'animation
  autoScroll();

  // Pause au hover
  langagesSection.addEventListener('mouseenter', () => {
    langagesSection.style.animationPlayState = 'paused';
  });

  langagesSection.addEventListener('mouseleave', () => {
    langagesSection.style.animationPlayState = 'running';
  });
});


// ========== ANIMATIONS AU SCROLL (Intersection Observer) ==========

// Configuration de l'observateur
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Éléments à observer
document.addEventListener('DOMContentLoaded', () => {

  // About section
  const aboutImage = document.querySelector('.about-image');
  const aboutContent = document.querySelector('.about-content');

  if (aboutImage) observer.observe(aboutImage);
  if (aboutContent) observer.observe(aboutContent);

  // Project cards
  const projectCardsToObserve = document.querySelectorAll('.project-card');
  projectCardsToObserve.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Timeline cards
  const timelineCards = document.querySelectorAll('.timeline-card');
  timelineCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(card);
  });

  // Contact sections
  const contactFormWrapper = document.querySelector('.contact-form-wrapper');
  const contactInfoWrapper = document.querySelector('.contact-info-wrapper');

  if (contactFormWrapper) observer.observe(contactFormWrapper);
  if (contactInfoWrapper) observer.observe(contactInfoWrapper);

});


// ========== SMOOTH SCROLL POUR LES ANCRES ==========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Ignorer les liens qui ne pointent pas vers une section
    if (href === '#' || !href) return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});


// ========== HEADER STICKY AVEC OMBRE AU SCROLL ==========

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Ajouter une ombre quand on scroll
  if (currentScroll > 50) {
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});


// ========== FORMULAIRE DE CONTACT ==========


// ========== ANIMATION DES COMPTEURS (si présents) ==========

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 secondes
  const increment = target / (duration / 16); // 60 FPS
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Observer pour les compteurs
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      animateCounter(entry.target);
      entry.target.classList.add('counted');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(counter => {
  counterObserver.observe(counter);
});


// ========== PARALLAX SUBTIL SUR LE HERO ==========

// const hero = document.querySelector('.hero');

// if (hero) {
//   window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const heroHeight = hero.offsetHeight;

//     if (scrolled < heroHeight) {
//       hero.style.transform = `translateY(${scrolled * 0.3}px)`;
//       hero.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
//     }
//   });
// }


// ========== BOUTON RETOUR EN HAUT (optionnel) ==========

// Créer le bouton dynamiquement
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Retour en haut');
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6c63ff, #5a52d5);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  z-index: 999;
`;

document.body.appendChild(scrollToTopBtn);

// Afficher/masquer le bouton au scroll
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.visibility = 'visible';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.visibility = 'hidden';
  }
});

// Action du bouton
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Hover effect
scrollToTopBtn.addEventListener('mouseenter', () => {
  scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
  scrollToTopBtn.style.transform = 'scale(1)';
});






// ========== PERFORMANCE : Lazy Loading des images ==========

document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});
