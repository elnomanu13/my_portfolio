const body = document.body;

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-menu a");
const siteNav = document.querySelector(".site-nav");

function closeMenu() {
  body.classList.remove("menu-open");

  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.textContent = "Menu";
  }
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.textContent = isOpen ? "Fermer" : "Menu";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 960) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!body.classList.contains("menu-open") || !siteNav) {
      return;
    }

    if (!siteNav.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("menu-open")) {
      closeMenu();
    }
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const projectGroups = document.querySelectorAll("[data-project-group]");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointerQuery = window.matchMedia("(pointer: fine)");

function setRevealDelay(elements, step) {
  elements.forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${index * step}ms`);
  });
}

setRevealDelay(document.querySelectorAll(".section-heading.reveal"), 70);
setRevealDelay(document.querySelectorAll(".projects-group .project-card"), 90);
setRevealDelay(document.querySelectorAll(".skill-card"), 80);
setRevealDelay(document.querySelectorAll(".process-card"), 90);
setRevealDelay(document.querySelectorAll(".journey-card"), 90);
setRevealDelay(document.querySelectorAll(".contact-item"), 70);

const heroTitle = document.querySelector(".hero-copy h1");

if (heroTitle && !reducedMotionQuery.matches) {
  const titleText = heroTitle.textContent.trim();
  heroTitle.setAttribute("aria-label", titleText);
  heroTitle.textContent = "";
  const words = titleText.split(/\s+/);
  let charIndex = 0;

  words.forEach((word) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "hero-word";

    [...word].forEach((character) => {
      const charSpan = document.createElement("span");
      charSpan.className = "hero-char";
      charSpan.style.setProperty("--char-index", charIndex);
      charSpan.textContent = character;
      wordSpan.appendChild(charSpan);
      charIndex += 1;
    });

    heroTitle.appendChild(wordSpan);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    projectCards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.hidden = !match;
    });

    projectGroups.forEach((group) => {
      const visibleCards = group.querySelectorAll(".project-card:not([hidden])");
      group.hidden = visibleCards.length === 0;
    });
  });
});

const bubbleWall = document.querySelector(".logo-wall");
const bubbleItems = bubbleWall ? [...bubbleWall.querySelectorAll(".logo-item")] : [];
const bubblePointer = { active: false, x: 0, y: 0 };
let bubbleAnimationFrame = 0;
let bubbleState = [];

function resetBubbleStyles() {
  if (!bubbleWall) {
    return;
  }

  bubbleWall.classList.remove("bubble-field");
  bubbleWall.style.removeProperty("--bubble-height");

  bubbleItems.forEach((item) => {
    item.style.removeProperty("width");
    item.style.removeProperty("height");
    item.style.removeProperty("transform");
    item.style.removeProperty("--bubble-size");
  });
}

function createBubbleState(width, height) {
  const columns = Math.min(3, bubbleItems.length);
  const rows = Math.ceil(bubbleItems.length / columns);

  return bubbleItems.map((item, index) => {
    const size = Math.max(74, Math.min(116, width / 7.4 + (index % 3) * 6));
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = ((width - size) / Math.max(1, columns - 1)) * column + (Math.random() * 18 - 9);
    const y = ((height - size) / Math.max(1, rows - 1)) * row + (Math.random() * 24 - 12);

    item.style.width = `${size}px`;
    item.style.height = `${size}px`;
    item.style.setProperty("--bubble-size", `${size}px`);

    return {
      item,
      size,
      x: Math.max(0, Math.min(width - size, x)),
      y: Math.max(0, Math.min(height - size, y)),
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.38,
      wobble: Math.random() * Math.PI * 2,
    };
  });
}

function animateBubbles() {
  if (!bubbleWall || !bubbleWall.classList.contains("bubble-field")) {
    return;
  }

  const width = bubbleWall.clientWidth;
  const height = bubbleWall.clientHeight;

  bubbleState.forEach((bubble) => {
    bubble.wobble += 0.018;
    bubble.x += bubble.vx + Math.sin(bubble.wobble) * 0.1;
    bubble.y += bubble.vy + Math.cos(bubble.wobble * 1.2) * 0.08;

    if (bubblePointer.active) {
      const centerX = bubble.x + bubble.size / 2;
      const centerY = bubble.y + bubble.size / 2;
      const dx = centerX - bubblePointer.x;
      const dy = centerY - bubblePointer.y;
      const distance = Math.hypot(dx, dy) || 1;

      if (distance < 120) {
        const force = (120 - distance) / 120;
        bubble.vx += (dx / distance) * force * 0.2;
        bubble.vy += (dy / distance) * force * 0.2;
      }
    }

    bubble.vx *= 0.995;
    bubble.vy *= 0.995;

    if (bubble.x <= 0 || bubble.x >= width - bubble.size) {
      bubble.vx *= -1;
      bubble.x = Math.max(0, Math.min(width - bubble.size, bubble.x));
    }

    if (bubble.y <= 0 || bubble.y >= height - bubble.size) {
      bubble.vy *= -1;
      bubble.y = Math.max(0, Math.min(height - bubble.size, bubble.y));
    }

    bubble.item.style.transform = `translate3d(${bubble.x}px, ${bubble.y}px, 0)`;
  });

  bubbleAnimationFrame = window.requestAnimationFrame(animateBubbles);
}

function initBubbleField() {
  if (!bubbleWall) {
    return;
  }

  window.cancelAnimationFrame(bubbleAnimationFrame);

  if (
    reducedMotionQuery.matches ||
    !finePointerQuery.matches ||
    window.innerWidth < 700
  ) {
    resetBubbleStyles();
    return;
  }

  bubbleWall.classList.add("bubble-field");
  const height = Math.max(320, Math.min(420, bubbleWall.clientWidth * 0.54));
  bubbleWall.style.setProperty("--bubble-height", `${height}px`);
  bubbleState = createBubbleState(bubbleWall.clientWidth, height);
  animateBubbles();
}

if (bubbleWall) {
  bubbleWall.addEventListener("mousemove", (event) => {
    const rect = bubbleWall.getBoundingClientRect();
    bubblePointer.active = true;
    bubblePointer.x = event.clientX - rect.left;
    bubblePointer.y = event.clientY - rect.top;
  });

  bubbleWall.addEventListener("mouseleave", () => {
    bubblePointer.active = false;
  });

  window.addEventListener("resize", initBubbleField);
  initBubbleField();
}

const audio = document.getElementById("music");
const playButton = document.getElementById("playBtn");
const playLabel = playButton?.querySelector(".play-label");
const playIcon = playButton?.querySelector(".play-icon");
const progress = document.getElementById("progress");
const musicBar = document.getElementById("musicBar");
const timeCurrent = document.querySelector(".time-current");
const timeTotal = document.querySelector(".time-total");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function setPlayState(isPlaying) {
  if (!playButton || !playLabel || !playIcon) {
    return;
  }

  playButton.classList.toggle("is-playing", isPlaying);
  playLabel.textContent = isPlaying ? "Pause" : "Lecture";
  playIcon.textContent = isPlaying ? "Pause" : "Play";
}

if (audio && playButton && progress && musicBar && timeCurrent && timeTotal) {
  playButton.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        setPlayState(true);
      } else {
        audio.pause();
        setPlayState(false);
      }
    } catch (error) {
      console.error("Lecture audio impossible:", error);
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    timeTotal.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progress.style.width = `${percent}%`;
    timeCurrent.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener("pause", () => setPlayState(false));
  audio.addEventListener("play", () => setPlayState(true));

  audio.addEventListener("ended", () => {
    progress.style.width = "0%";
    timeCurrent.textContent = "0:00";
    setPlayState(false);
  });

  musicBar.addEventListener("click", (event) => {
    const rect = musicBar.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    audio.currentTime = Math.max(0, Math.min(1, ratio)) * audio.duration;
  });
}

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  reveals.forEach((element) => revealObserver.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("is-visible"));
}

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const project = String(data.get("project") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !project || !message) {
      formStatus.textContent = "Merci de renseigner tous les champs.";
      formStatus.className = "form-status is-error";
      return;
    }

    const subject = encodeURIComponent(`Nouveau projet - ${project}`);
    const bodyContent = encodeURIComponent(
      [
        `Nom: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n")
    );

    formStatus.textContent =
      "Votre messagerie va s'ouvrir avec un email pre-rempli.";
    formStatus.className = "form-status is-success";

    window.location.href = `mailto:emmanuelnonokowouvi@outlook.fr?subject=${subject}&body=${bodyContent}`;
  });
}
