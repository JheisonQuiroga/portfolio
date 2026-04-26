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
let animationId;
let isPaused = false;
let scrollSpeed = 0.2; // Velocidad suave de movimiento
let currentScroll = 0; // Posición actual del scroll

if (carousel && carouselNav && cards.length > 0) {
  // Render dinámico de dots según cantidad de tarjetas
  carouselNav.innerHTML = "";
  cards.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "carousel__dot";
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
    dots.forEach((dot, index) => {
      dot.classList.toggle("carousel__dot--active", index === activeIndex);
    });
  };

  const animate = () => {
    if (!isPaused) {
      currentScroll += scrollSpeed;
      const maxScroll = getMaxScroll();

      // Reiniciar suavemente si llega al final del scroll real
      if (currentScroll >= maxScroll) {
        currentScroll = 0;
      }

      carousel.scrollLeft = currentScroll;
      setActiveDot(getClosestCardIndex());
    }
    animationId = requestAnimationFrame(animate);
  };

  // Iniciar animación
  animate();

  // Pausar al pasar el mouse
  carousel.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  carousel.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  // Permitir interacción con los dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      isPaused = true;
      const targetScroll = getTargetScrollByIndex(index);
      currentScroll = targetScroll;
      setActiveDot(index);

      carousel.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });

      // Reanudar después de un breve momento
      setTimeout(() => {
        isPaused = false;
      }, 2000);
    });
  });

  // Sincronizar si el usuario hace scroll manual (opcional)
  carousel.addEventListener("scroll", () => {
    currentScroll = carousel.scrollLeft;
    setActiveDot(getClosestCardIndex());
  });

  // Ajustar referencias al cambiar tamaño de pantalla
  window.addEventListener("resize", () => {
    currentScroll = Math.min(currentScroll, getMaxScroll());
    setActiveDot(getClosestCardIndex());
  });
}
