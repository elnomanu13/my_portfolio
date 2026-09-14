const body = document.body;

const navToggle = document.querySelector(".nav-toggle");
const navToggleIcon = document.querySelector(".nav-toggle-icon");
const navLinks = document.querySelectorAll(".nav-menu a, .nav-panel a");
const siteNav = document.querySelector(".site-nav");

function closeMenu() {
  body.classList.remove("menu-open");

  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
  }
  if (navToggleIcon) {
    navToggleIcon.setAttribute("data-lucide", "menu");
    lucide.createIcons({ nodes: [navToggleIcon] });
  }
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    if (navToggleIcon) {
      navToggleIcon.setAttribute("data-lucide", isOpen ? "x" : "menu");
      lucide.createIcons({ nodes: [navToggleIcon] });
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
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

    filterButtons.forEach((item) => {
      item.classList.remove("is-active", "bg-primary", "text-on-primary");
      item.classList.add("text-on-surface-variant");
    });
    button.classList.add("is-active", "bg-primary", "text-on-primary");
    button.classList.remove("text-on-surface-variant");

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

// Logo Wall Marquee - Pure CSS smooth scrolling with mouse pause support


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

// Initialize Lucide icons
if (typeof lucide !== "undefined") {
  lucide.createIcons();
}

