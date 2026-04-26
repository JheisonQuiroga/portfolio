const yearSpan = document.querySelector(".year");
const nowDate = new Date(Date.UTC(2026, 1, 12));
const body = document.querySelector("body");

const options = {
  year: "numeric",
  month: "long",
  day: "numeric"
}

// Actualización del año en el footer
yearSpan.textContent = nowDate.toLocaleString("es-ES", options);

// Efecto de spotlight siguiendo al mouse
body.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  body.style.setProperty('--x', `${x}px`);
  body.style.setProperty('--y', `${y}px`);
});

// Manejo de navegación activa
const navItems = document.querySelectorAll(".nav__item");
const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    // Remover clases activas de todos
    navItems.forEach(item => item.classList.remove("nav__item--active"));
    navLinks.forEach(l => l.classList.remove("nav__link--active"));

    // Agregar a los seleccionados
    navItems[index].classList.add("nav__item--active");
    link.classList.add("nav__link--active");
  });
});

// Lógica del carrusel (Movimiento constante y fluido)
const carousel = document.querySelector(".skills__carousel");
const carouselNav = document.querySelector(".carousel__nav");
const cards = carousel ? carousel.querySelectorAll(".skill__card") : [];
let isPaused = false;
let currentIndex = 0;
let autoplayTimeoutId;

if (carousel && carouselNav && cards.length > 0) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const autoplayDelay = 3800;
  const resumeDelay = 2400;

  // Render dinámico de dots según cantidad de tarjetas
  carouselNav.innerHTML = "";
  cards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel__dot";
    dot.setAttribute("aria-label", `Ir a ${cards[index].querySelector(".skill__name")?.textContent || `tecnologia ${index + 1}`}`);
    if (index === 0) {
      dot.classList.add("carousel__dot--active");
    }
    carouselNav.appendChild(dot);
  });

  const dots = carouselNav.querySelectorAll(".carousel__dot");

  const getMaxScroll = () => Math.max(0, carousel.scrollWidth - carousel.clientWidth);

  const getTargetScrollByIndex = (index) => {
    const card = cards[index];
    if (!card) return 0;
    const centerOffset = (carousel.clientWidth - card.clientWidth) / 2;
    const centeredTarget = card.offsetLeft - centerOffset;
    return Math.max(0, Math.min(centeredTarget, getMaxScroll()));
  };

  const getClosestCardIndex = () => {
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((_, index) => {
      const target = getTargetScrollByIndex(index);
      const distance = Math.abs(carousel.scrollLeft - target);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  const setActiveDot = (activeIndex) => {
    currentIndex = activeIndex;
    dots.forEach((dot, index) => {
      dot.classList.toggle("carousel__dot--active", index === activeIndex);
    });
  };

  const goToCard = (index, behavior = "smooth") => {
    const normalizedIndex = ((index % cards.length) + cards.length) % cards.length;
    const targetScroll = getTargetScrollByIndex(normalizedIndex);
    carousel.scrollTo({
      left: targetScroll,
      behavior
    });
    setActiveDot(normalizedIndex);
  };

  const clearAutoplay = () => {
    clearTimeout(autoplayTimeoutId);
  };

  const scheduleAutoplay = (delay = autoplayDelay) => {
    clearAutoplay();
    if (isPaused || prefersReducedMotion) {
      return;
    }

    autoplayTimeoutId = setTimeout(() => {
      goToCard(currentIndex + 1);
      scheduleAutoplay();
    }, delay);
  };

  const pauseAutoplay = () => {
    isPaused = true;
    clearAutoplay();
  };

  const resumeAutoplay = (delay = resumeDelay) => {
    isPaused = false;
    scheduleAutoplay(delay);
  };

  goToCard(0, "auto");
  scheduleAutoplay();

  // Pausar al pasar el mouse
  carousel.addEventListener("mouseenter", () => {
    pauseAutoplay();
  });

  carousel.addEventListener("mouseleave", () => {
    resumeAutoplay(1200);
  });

  carousel.addEventListener("touchstart", pauseAutoplay, { passive: true });
  carousel.addEventListener("touchend", () => {
    resumeAutoplay();
  }, { passive: true });

  carousel.addEventListener("focusin", pauseAutoplay);
  carousel.addEventListener("focusout", () => {
    resumeAutoplay();
  });

  // Permitir interacción con los dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      pauseAutoplay();
      goToCard(index);
      resumeAutoplay(4200);
    });
  });

  // Sincronizar si el usuario hace scroll manual
  carousel.addEventListener("scroll", () => {
    setActiveDot(getClosestCardIndex());
  });

  // Ajustar referencias al cambiar tamaño de pantalla
  window.addEventListener("resize", () => {
    goToCard(currentIndex, "auto");
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pauseAutoplay();
      return;
    }

    resumeAutoplay(800);
  });
}
