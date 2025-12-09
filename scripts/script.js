// Récupération des éléments
const audio = document.getElementById('music');
const playBtn = document.getElementById('playBtn');
const playIcon = playBtn.querySelector('.icon');
const progress = document.getElementById('progress');
const musicBar = document.querySelector('.music-bar');
const timeCurrent = document.querySelector('.time-current');
const timeTotal = document.querySelector('.time-total');

let isPlaying = false;

// --- PLAY / PAUSE ---
playBtn.addEventListener('click', togglePlay);

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playIcon.textContent = '▶';
    playBtn.classList.remove('playing');
  } else {
    audio.play();
    playIcon.textContent = '❚❚';
    playBtn.classList.add('playing');
  }
  isPlaying = !isPlaying;
}

// --- MISE À JOUR DE LA BARRE DE PROGRESSION ---
audio.addEventListener('timeupdate', updateProgress);

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + '%';

  // Mise à jour du timer
  timeCurrent.textContent = formatTime(audio.currentTime);
}

// --- AFFICHAGE DE LA DURÉE TOTALE ---
audio.addEventListener('loadedmetadata', () => {
  timeTotal.textContent = formatTime(audio.duration);
});

// --- SEEK (clic sur la barre pour avancer/reculer) ---
musicBar.addEventListener('click', seek);

function seek(e) {
  const rect = musicBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;
  audio.currentTime = percent * audio.duration;
}

// --- FORMATER LE TEMPS (secondes → mm:ss) ---
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// --- RÉINITIALISER LE BOUTON À LA FIN DE LA PISTE ---
audio.addEventListener('ended', () => {
  playIcon.textContent = '▶';
  playBtn.classList.remove('playing');
  isPlaying = false;
  progress.style.width = '0%';
  timeCurrent.textContent = '0:00';
});

// --- GESTION DES ERREURS ---
audio.addEventListener('error', (e) => {
  console.error('Erreur de chargement audio:', e);
  alert('Impossible de charger la musique. Vérifiez le chemin du fichier.');
});


// ROTATION IMAGE

const coverImg = document.querySelector('.music-cover img');

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
    coverImg.classList.add('playing'); // rotation
  }
  isPlaying = !isPlaying;
}


// SCRIPT POUR FILTRER LES PROJETS PAR CATEGORIES

// Récupération des éléments
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Gestion du clic sur les boutons de filtre
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Retirer la classe active de tous les boutons
    filterBtns.forEach(b => b.classList.remove('active'));

    // Ajouter la classe active au bouton cliqué
    btn.classList.add('active');

    // Récupérer la catégorie filtrée
    const filterValue = btn.getAttribute('data-filter');

    // Filtrer les projets
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');

      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'grid';
        // Animation d'apparition
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



// small menu toggle (add a <button class="nav-toggle" aria-label="Menu mobile">☰</button> in the nav if not present)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', menu.classList.contains('active'));
  });

  // close menu when clicking a link (mobile)
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
