(function () {
  const book = document.getElementById("book");
  const bookShell = document.getElementById("bookShell");
  const guestName = document.getElementById("guestName");
  const eventDate = document.getElementById("eventDate");
  const eventTime = document.getElementById("eventTime");
  const eventPlace = document.getElementById("eventPlace");
  const rsvpLink = document.getElementById("rsvpLink");
  const timelineEl = document.getElementById("timeline");
  const colorSwatches = document.getElementById("colorSwatches");
  const dressMessage = document.getElementById("dressMessage");
  const dressNote = document.getElementById("dressNote");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  const carouselImage = document.getElementById("carouselImage");
  const carouselDots = document.getElementById("carouselDots");
  const carouselPrev = document.getElementById("carouselPrev");
  const carouselNext = document.getElementById("carouselNext");
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  const cfg = window.INVITACION || {};

  const PAGES_DESKTOP = ["details", "timeline", "photos", "dress", "notes", "confirm"];
  const PAGES_MOBILE = [
    "mensaje",
    "details",
    "timeline",
    "photos",
    "dress",
    "notes",
    "confirm",
  ];

  function isMobileLayout() {
    return window.matchMedia("(max-width: 719px)").matches;
  }

  function getPages() {
    return isMobileLayout() ? PAGES_MOBILE : PAGES_DESKTOP;
  }

  function readGuest() {
    const params = new URLSearchParams(window.location.search);
    const raw =
      params.get("para") ||
      params.get("nombre") ||
      params.get("name") ||
      "";
    const cleaned = raw.trim().replace(/\+/g, " ");
    if (!cleaned) return cfg.invitadoPorDefecto || "ti";
    try {
      return decodeURIComponent(cleaned);
    } catch {
      return cleaned;
    }
  }

  function capitalizeName(name) {
    if (!name || name === "ti") return name;
    return name
      .split(/\s+/)
      .map((part) =>
        part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : part
      )
      .join(" ");
  }

  const guest = capitalizeName(readGuest());
  if (guestName) guestName.textContent = guest;
  document.title = `Mis 15 años · Paulina — Para ${guest === "ti" ? "ti" : guest}`;

  if (cfg.dia) eventDate.textContent = cfg.dia;
  if (cfg.hora) eventTime.textContent = cfg.hora;
  if (cfg.lugarLinea1) {
    const lines = [cfg.lugarLinea1, cfg.lugarLinea2, cfg.salon].filter(Boolean);
    eventPlace.innerHTML = lines.join("<br />");
  }

  if (cfg.rsvp) {
    rsvpLink.hidden = false;
    rsvpLink.href = cfg.rsvp;
  }

  const eventTarget = new Date(
    cfg.eventoISO || "2026-08-08T19:00:00-05:00"
  ).getTime();
  const cdDays = document.getElementById("cdDays");
  const cdHours = document.getElementById("cdHours");
  const cdMins = document.getElementById("cdMins");
  const cdSecs = document.getElementById("cdSecs");
  const countdownLabel = document.querySelector(".countdown-label");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function updateCountdown() {
    if (!cdDays) return;
    const diff = eventTarget - Date.now();
    if (diff <= 0) {
      cdDays.textContent = "0";
      cdHours.textContent = "00";
      cdMins.textContent = "00";
      cdSecs.textContent = "00";
      if (countdownLabel) countdownLabel.textContent = "¡Es hoy!";
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    cdDays.textContent = String(days);
    cdHours.textContent = pad(hours);
    cdMins.textContent = pad(mins);
    cdSecs.textContent = pad(secs);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  function renderTimeline() {
    const items = Array.isArray(cfg.historia) ? cfg.historia : [];
    timelineEl.innerHTML = items
      .map(
        (item, index) => `
      <li class="timeline-item${item.hoy ? " is-today" : ""}" style="--i:${index}">
        <span class="timeline-dot" aria-hidden="true"></span>
        <div class="timeline-card">
          <span class="timeline-year">${item.anio || ""}</span>
          <h3 class="timeline-title">${item.titulo || ""}</h3>
          <p class="timeline-text">${item.texto || ""}</p>
        </div>
      </li>`
      )
      .join("");
  }

  function renderDressCode() {
    const vest = cfg.vestimenta || {};
    if (vest.mensaje) dressMessage.textContent = vest.mensaje;
    if (vest.nota) dressNote.textContent = vest.nota;

    const colors = Array.isArray(vest.colores) ? vest.colores : [];
    colorSwatches.innerHTML = colors
      .map(
        (item, index) => `
      <li class="swatch" style="--i:${index}">
        <span class="swatch-dot" style="background:${item.color}" title="${item.nombre}"></span>
        <span class="swatch-name">${item.nombre}</span>
      </li>`
      )
      .join("");
  }

  function renderNotes() {
    const notes = cfg.recomendaciones || {};
    const punctualidadText = document.getElementById("punctualidadText");
    const sobresText = document.getElementById("sobresText");
    const esperamosText = document.getElementById("esperamosText");
    const whatsappBtn = document.getElementById("whatsappBtn");

    if (notes.puntualidad && punctualidadText) {
      punctualidadText.textContent = notes.puntualidad;
    }
    if (notes.sobres && sobresText) {
      sobresText.textContent = notes.sobres;
    }
    if (notes.esperamos && esperamosText) {
      esperamosText.textContent = notes.esperamos;
    }

    if (whatsappBtn) {
      if (cfg.whatsappLink) {
        whatsappBtn.href = cfg.whatsappLink;
      } else {
        const phone = String(cfg.whatsapp || "").replace(/[^\d]/g, "");
        const message = encodeURIComponent(
          cfg.whatsappMensaje ||
            "Hola! Confirmo mi asistencia a los 15 de Paulina"
        );
        if (phone) {
          whatsappBtn.href = `https://wa.me/${phone}?text=${message}`;
        }
      }
    }
  }

  const photos = Array.isArray(cfg.fotos) ? cfg.fotos : [];
  let photoIndex = 0;
  let carouselTimer = null;
  const CAROUSEL_MS = 3200;

  function showPhoto(index, { resetTimer = true } = {}) {
    if (!photos.length || !carouselImage) return;
    photoIndex = ((index % photos.length) + photos.length) % photos.length;
    carouselImage.classList.add("is-fading");
    setTimeout(() => {
      carouselImage.src = photos[photoIndex];
      carouselImage.classList.remove("is-fading");
    }, 160);

    if (carouselDots) {
      carouselDots.querySelectorAll(".carousel-dot").forEach((dot, i) => {
        dot.classList.toggle("is-active", i === photoIndex);
      });
    }

    if (resetTimer && getPages()[pageIndex] === "photos" && opened) {
      startCarouselAutoplay();
    }
  }

  function stopCarouselAutoplay() {
    if (carouselTimer) {
      clearInterval(carouselTimer);
      carouselTimer = null;
    }
  }

  function startCarouselAutoplay() {
    stopCarouselAutoplay();
    if (!photos.length) return;
    carouselTimer = setInterval(() => {
      showPhoto(photoIndex + 1, { resetTimer: false });
    }, CAROUSEL_MS);
  }

  function renderCarousel() {
    if (!carouselDots) return;
    carouselDots.innerHTML = photos
      .map(
        (_, i) =>
          `<button type="button" class="carousel-dot${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="Foto ${i + 1}"></button>`
      )
      .join("");

    if (photos[0]) carouselImage.src = photos[0];

    carouselDots.addEventListener("click", (event) => {
      const dot = event.target.closest(".carousel-dot");
      if (!dot) return;
      event.stopPropagation();
      showPhoto(Number(dot.dataset.index));
    });
  }

  renderTimeline();
  renderDressCode();
  renderNotes();
  renderCarousel();

  let opened = false;
  let pageIndex = 0;
  let currentPageId = "details";

  function syncBookClasses() {
    const page = getPages()[pageIndex];
    const pastMensaje = page !== "mensaje";

    book.classList.toggle("show-details", pastMensaje && page !== undefined);
    book.classList.toggle(
      "show-timeline",
      page === "timeline" ||
        page === "photos" ||
        page === "dress" ||
        page === "notes" ||
        page === "confirm"
    );
    book.classList.toggle(
      "show-photos",
      page === "photos" ||
        page === "dress" ||
        page === "notes" ||
        page === "confirm"
    );
    book.classList.toggle(
      "show-dresscode",
      page === "dress" || page === "notes" || page === "confirm"
    );
    book.classList.toggle("show-notes", page === "notes" || page === "confirm");
    book.classList.toggle("show-confirm", page === "confirm");
  }

  function syncArrows() {
    const pages = getPages();
    if (!opened) {
      btnPrev.hidden = true;
      btnNext.hidden = true;
      bookShell.classList.remove("has-arrows");
      return;
    }

    bookShell.classList.add("has-arrows");
    btnPrev.hidden = false;
    btnNext.hidden = false;
    btnPrev.disabled = false;
    btnPrev.setAttribute(
      "aria-label",
      pageIndex <= 0 ? "Cerrar libro" : "Página anterior"
    );
    btnNext.disabled = pageIndex >= pages.length - 1;
  }

  function setPage(index) {
    const pages = getPages();
    pageIndex = Math.max(0, Math.min(pages.length - 1, index));
    currentPageId = pages[pageIndex];
    syncBookClasses();
    syncArrows();

    if (pages[pageIndex] === "photos") {
      startCarouselAutoplay();
    } else {
      stopCarouselAutoplay();
    }
  }

  function openBook() {
    if (opened) return;
    opened = true;
    book.classList.add("is-open");
    book.setAttribute("aria-label", "Invitación abierta");
    startMusic();
    setPage(0);
  }

  function closeBook() {
    if (!opened) return;
    stopCarouselAutoplay();
    opened = false;
    pageIndex = 0;
    book.classList.remove(
      "is-open",
      "show-details",
      "show-timeline",
      "show-photos",
      "show-dresscode",
      "show-notes",
      "show-confirm"
    );
    syncArrows();
    book.setAttribute("aria-label", "Abrir invitación");
    book.setAttribute("tabindex", "0");
  }

  function goNext() {
    if (!opened) {
      openBook();
      return;
    }
    const pages = getPages();
    if (pageIndex < pages.length - 1) setPage(pageIndex + 1);
  }

  function goPrev() {
    if (!opened) return;
    if (pageIndex <= 0) {
      closeBook();
      return;
    }
    setPage(pageIndex - 1);
  }

  book.addEventListener("click", (event) => {
    if (event.target.closest("a, button, .carousel")) {
      return;
    }
    if (!opened) openBook();
  });

  book.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      if (!opened) {
        event.preventDefault();
        openBook();
      }
    }
  });

  btnNext.addEventListener("click", (event) => {
    event.stopPropagation();
    goNext();
  });

  btnPrev.addEventListener("click", (event) => {
    event.stopPropagation();
    goPrev();
  });

  let musicStarted = false;
  let musicMuted = false;

  function syncMusicToggle() {
    if (!musicToggle) return;
    musicToggle.classList.toggle("is-muted", musicMuted || !musicStarted);
    musicToggle.setAttribute(
      "aria-label",
      musicMuted || !musicStarted
        ? "Reproducir música"
        : "Silenciar música"
    );
  }

  function startMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 0.55;
    const play = bgMusic.play();
    if (play && typeof play.then === "function") {
      play
        .then(() => {
          musicStarted = true;
          musicMuted = false;
          syncMusicToggle();
        })
        .catch(() => {
          musicStarted = false;
          musicMuted = true;
          syncMusicToggle();
        });
    } else {
      musicStarted = true;
      musicMuted = false;
      syncMusicToggle();
    }
  }

  syncMusicToggle();

  if (musicToggle) {
    musicToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      if (!bgMusic) return;
      if (!musicStarted) {
        startMusic();
        return;
      }
      musicMuted = !musicMuted;
      bgMusic.muted = musicMuted;
      if (!musicMuted) bgMusic.play().catch(() => {});
      syncMusicToggle();
    });
  }

  /* Intentar arrancar con el primer toque en cualquier parte */
  document.addEventListener(
    "pointerdown",
    () => {
      if (!musicStarted) startMusic();
    },
    { once: true }
  );

  if (carouselPrev) {
    carouselPrev.addEventListener("click", (event) => {
      event.stopPropagation();
      showPhoto(photoIndex - 1);
    });
  }

  if (carouselNext) {
    carouselNext.addEventListener("click", (event) => {
      event.stopPropagation();
      showPhoto(photoIndex + 1);
    });
  }

  let touchStartX = 0;
  const carousel = document.getElementById("carousel");
  if (carousel) {
    carousel.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.changedTouches[0].screenX;
      },
      { passive: true }
    );
    carousel.addEventListener(
      "touchend",
      (event) => {
        const delta = event.changedTouches[0].screenX - touchStartX;
        if (Math.abs(delta) < 40) return;
        if (delta < 0) showPhoto(photoIndex + 1);
        else showPhoto(photoIndex - 1);
      },
      { passive: true }
    );
  }

  window.addEventListener("resize", () => {
    if (!opened) return;
    const pages = getPages();
    let idx = pages.indexOf(currentPageId);
    if (idx < 0) idx = pages.indexOf("details");
    if (idx < 0) idx = 0;
    setPage(idx);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
  });
})();
