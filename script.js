
/* =========================================
   DWI PUJI AGUSTIN — ENCHANTED PORTFOLIO
   JavaScript: Animations, Music & Interactions
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // 1. SELECT HTML ELEMENTS
  // =====================================

  const starField = document.querySelector(".star-field");
  const musicToggle = document.getElementById("musicToggle");
  const backgroundMusic = document.getElementById("backgroundMusic");
  const clickSound = document.getElementById("clickSound");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.querySelector(".nav-menu");
  const backToTop = document.getElementById("backToTop");
  const discoverButton = document.getElementById("discoverButton");
  const toast = document.getElementById("toast");
  const currentYear = document.getElementById("currentYear");


  // =====================================
  // 2. CURRENT YEAR IN FOOTER
  // =====================================

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  // =====================================
  // 3. FLOATING BACKGROUND STARS
  // =====================================

  if (starField) {
    const starSymbols = ["✦", "✧", "⋆", "·"];
    const numberOfStars = 35;

    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement("span");

      star.className = "star";
      star.textContent =
        starSymbols[Math.floor(Math.random() * starSymbols.length)];

      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.fontSize = `${8 + Math.random() * 13}px`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.animationDuration = `${2 + Math.random() * 4}s`;

      starField.appendChild(star);
    }
  }


  // =====================================
  // 4. TOAST NOTIFICATION
  // =====================================

  let toastTimer;

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }


  // =====================================
  // 5. MAGICAL CLICK PARTICLES
  // =====================================

  function createMagicBurst(x, y, amount = 8) {
    const symbols = ["✦", "✧", "♡", "⋆"];

    for (let i = 0; i < amount; i++) {
      const particle = document.createElement("span");

      particle.className = "click-particle";
      particle.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      const dx = (Math.random() - 0.5) * 130;
      const dy = (Math.random() - 0.5) * 130;

      particle.style.setProperty("--dx", `${dx}px`);
      particle.style.setProperty("--dy", `${dy}px`);
      particle.style.animationDelay = `${Math.random() * 100}ms`;

      document.body.appendChild(particle);

      particle.addEventListener("animationend", () => {
        particle.remove();
      }, { once: true });
    }
  }

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const clickable = target.closest(
      "button, .primary-button, .secondary-button, " +
      ".contact-button, .skill-card, .timeline-card"
    );

    if (!clickable) return;

    createMagicBurst(event.clientX, event.clientY, 7);
  });


  // =====================================
  // 6. ENCHANTED CURSOR SPRINKLE TRAIL
  // Sprinkle mengikuti setiap gerakan mouse
  // =====================================

  const sprinkleSymbols = [
    "✦", "✧", "♡", "⋆", "✿", "˚", "✩"
  ];

  const sprinkleColors = [
    "#f4a6c1",
    "#e8c5ff",
    "#f8d98b",
    "#fff1d6",
    "#ffffff"
  ];

  let lastSprinkleX = 0;
  let lastSprinkleY = 0;
  let sprinkleDistance = 0;
  let sprinkleCount = 0;

  function createCursorSprinkle(x, y) {
    const sparkle = document.createElement("span");

    sparkle.className = "cursor-sprinkle";

    sparkle.textContent =
      sprinkleSymbols[
        Math.floor(Math.random() * sprinkleSymbols.length)
      ];

    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    sparkle.style.color =
      sprinkleColors[
        Math.floor(Math.random() * sprinkleColors.length)
      ];

    sparkle.style.setProperty(
      "--drift-x",
      `${Math.random() * 60 - 30}px`
    );

    sparkle.style.setProperty(
      "--drift-y",
      `${-12 - Math.random() * 38}px`
    );

    sparkle.style.setProperty(
      "--spin",
      `${Math.random() * 240 - 120}deg`
    );

    sparkle.style.fontSize = `${9 + Math.random() * 13}px`;

    document.body.appendChild(sparkle);
    sprinkleCount++;

    sparkle.addEventListener("animationend", () => {
      sparkle.remove();
      sprinkleCount--;
    }, { once: true });
  }

  document.addEventListener("pointermove", (event) => {
    // Hindari efek mouse pada perangkat layar sentuh
    if (event.pointerType === "touch") return;

    const x = event.clientX;
    const y = event.clientY;

    const dx = x - lastSprinkleX;
    const dy = y - lastSprinkleY;

    sprinkleDistance += Math.hypot(dx, dy);

    // Batasi partikel aktif agar website tetap ringan
    if (sprinkleDistance >= 9 && sprinkleCount < 45) {
      createCursorSprinkle(x, y);
      sprinkleDistance = 0;
    }

    lastSprinkleX = x;
    lastSprinkleY = y;
  }, { passive: true });


  // =====================================
  // 7. BACKGROUND MUSIC
  // =====================================

  let musicIsPlaying = false;

  if (backgroundMusic) {
    backgroundMusic.volume = 0.25;
  }

  if (musicToggle && backgroundMusic) {
    musicToggle.setAttribute("aria-pressed", "false");

    musicToggle.addEventListener("click", async () => {
      if (!musicIsPlaying) {
        try {
          await backgroundMusic.play();

          musicIsPlaying = true;
          musicToggle.textContent = "♫ Music On";
          musicToggle.setAttribute("aria-pressed", "true");

          showToast("A little music for your magical journey. ♪");
        } catch (error) {
          showToast(
            "Musik belum dapat diputar. Periksa file fantasy-music.mp3."
          );
          console.error("Audio playback error:", error);
        }
      } else {
        backgroundMusic.pause();

        musicIsPlaying = false;
        musicToggle.textContent = "♫ Music Off";
        musicToggle.setAttribute("aria-pressed", "false");

        showToast("Music paused. Enjoy the quiet magic. ✧");
      }
    });

    backgroundMusic.addEventListener("pause", () => {
      musicIsPlaying = false;
      musicToggle.textContent = "♫ Music Off";
      musicToggle.setAttribute("aria-pressed", "false");
    });

    backgroundMusic.addEventListener("play", () => {
      musicIsPlaying = true;
      musicToggle.textContent = "♫ Music On";
      musicToggle.setAttribute("aria-pressed", "true");
    });
  }


  // =====================================
  // 8. CLICK SOUND EFFECT
  // =====================================

  if (clickSound) {
    clickSound.volume = 0.4;
  }

  document.addEventListener("click", (event) => {
    if (!clickSound) return;

    const target = event.target;

    if (!(target instanceof Element)) return;

    const clickable = target.closest(
      "button, .primary-button, .secondary-button, .contact-button"
    );

    if (!clickable) return;

    // Music button only controls music
    if (clickable.id === "musicToggle") return;

    clickSound.currentTime = 0;

    clickSound.play().catch(() => {
      // Abaikan jika browser belum dapat memutar audio
    });
  });


  // =====================================
  // 9. MOBILE NAVIGATION
  // =====================================

  if (menuToggle && navMenu) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup navigasi" : "Buka navigasi"
      );
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-label", "Buka navigasi");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      }
    });
  }


  // =====================================
  // 10. BACK TO TOP BUTTON
  // =====================================

  function updateBackToTop() {
    if (!backToTop) return;

    if (window.scrollY > 450) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  // =====================================
  // 11. DISCOVER MY WORLD BUTTON
  // =====================================

  if (discoverButton) {
    discoverButton.addEventListener("click", () => {
      createMagicBurst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        24
      );

      showToast("Welcome to my creative universe! ✨");

      const aboutSection = document.getElementById("about");

      if (aboutSection) {
        setTimeout(() => {
          aboutSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 350);
      }
    });
  }


  // =====================================
  // 12. REVEAL SECTIONS ON SCROLL
  // =====================================

  const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .about-symbol, " +
    ".timeline-item, .skill-card, .schedule-wrapper, .contact-card"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal-ready");
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("revealed");
    });
  }


  // =====================================
  // 13. SMOOTH SCROLL FOR INTERNAL LINKS
  // =====================================

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const destination = document.querySelector(href);

      if (destination) {
        event.preventDefault();

        destination.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  // =====================================
  // 14. WELCOME MESSAGE
  // =====================================

  setTimeout(() => {
    showToast("Welcome to my portfolio. Make yourself at home. ✧");
  }, 1200);

  console.log(
    "%c✧ Welcome to Dwi Puji Agustin's Creative Portfolio ✧",
    "color: #b65f7d; font-size: 14px; font-weight: bold;"
  );

});

/* ✨ MAGIC CLICK EFFECT */
document.addEventListener("click", function (event) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  // Efek muncul saat frame, kartu, tombol, atau bagian section diklik
  const frame = target.closest(
    "button, a, img, article, section, " +
    ".about-card, .skill-card, .timeline-card, .contact-card, " +
    ".hero, .hero-image, .profile-frame, .about-symbol, .schedule-wrapper"
  );

  if (!frame) return;

  const symbols = ["✦", "✧", "♡", "🦋", "✿", "⋆", "💗", "✨"];
  const colors = ["#f4a6c1", "#e8c5ff", "#f8d98b", "#ffffff"];

  for (let i = 0; i < 16; i++) {
    const item = document.createElement("span");
    item.className = "magic-pop";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    item.style.left = event.clientX + "px";
    item.style.top = event.clientY + "px";
    item.style.color = colors[Math.floor(Math.random() * colors.length)];

    item.style.setProperty("--x", (Math.random() - 0.5) * 220 + "px");
    item.style.setProperty("--y", (Math.random() - 0.5) * 220 + "px");
    item.style.setProperty("--rotate", (Math.random() * 360) + "deg");
    item.style.fontSize = (14 + Math.random() * 16) + "px";

    document.body.appendChild(item);
    item.addEventListener("animationend", () => item.remove(), { once: true });
  }

  // Kilauan melingkar di sekitar titik klik
  const ring = document.createElement("span");
  ring.className = "magic-ring";
  ring.style.left = event.clientX + "px";
  ring.style.top = event.clientY + "px";
  document.body.appendChild(ring);
  ring.addEventListener("animationend", () => ring.remove(), { once: true });
});

/* ✨ MAGIC CLICK EFFECT */
document.addEventListener("click", function (event) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  // Efek muncul saat frame, kartu, tombol, atau bagian section diklik
  const frame = target.closest(
    "button, a, img, article, section, " +
    ".about-card, .skill-card, .timeline-card, .contact-card, " +
    ".hero, .hero-image, .profile-frame, .about-symbol, .schedule-wrapper"
  );

  if (!frame) return;

  const symbols = ["✦", "✧", "♡", "🦋", "✿", "⋆", "💗", "✨"];
  const colors = ["#f4a6c1", "#e8c5ff", "#f8d98b", "#ffffff"];

  for (let i = 0; i < 16; i++) {
    const item = document.createElement("span");
    item.className = "magic-pop";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    item.style.left = event.clientX + "px";
    item.style.top = event.clientY + "px";
    item.style.color = colors[Math.floor(Math.random() * colors.length)];

    item.style.setProperty("--x", (Math.random() - 0.5) * 220 + "px");
    item.style.setProperty("--y", (Math.random() - 0.5) * 220 + "px");
    item.style.setProperty("--rotate", (Math.random() * 360) + "deg");
    item.style.fontSize = (14 + Math.random() * 16) + "px";

    document.body.appendChild(item);
    item.addEventListener("animationend", () => item.remove(), { once: true });
  }

  // Kilauan melingkar di sekitar titik klik
  const ring = document.createElement("span");
  ring.className = "magic-ring";
  ring.style.left = event.clientX + "px";
  ring.style.top = event.clientY + "px";
  document.body.appendChild(ring);
  ring.addEventListener("animationend", () => ring.remove(), { once: true });
});
