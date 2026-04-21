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
const dots = document.querySelectorAll(".carousel__dot");
let animationId;
let isPaused = false;
let scrollSpeed = 0.5; // Velocidad suave de movimiento
let currentScroll = 0; // Posición actual del scroll

if (carousel && dots.length > 0) {
  const animate = () => {
    if (!isPaused) {
      currentScroll += scrollSpeed;

      // Reiniciar suavemente si llega al final del scroll real
      if (currentScroll >= (carousel.scrollWidth - carousel.clientWidth)) {
        currentScroll = 0;
      }

      carousel.scrollLeft = currentScroll;

      // Actualizar dots basado en la posición actual
      const card = carousel.querySelector(".skill__card");
      const itemWidth = card.offsetWidth + 20;
      const activeIndex = Math.round(currentScroll / itemWidth);

      dots.forEach((dot, index) => {
        dot.classList.toggle("carousel__dot--active", index === activeIndex);
      });
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
      const card = carousel.querySelector(".skill__card");
      const itemWidth = card.offsetWidth + 20;
      currentScroll = itemWidth * index;

      carousel.scrollTo({
        left: currentScroll,
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
    if (isPaused) {
      currentScroll = carousel.scrollLeft;
    }
  });
}