const yearSpan = document.querySelector(".year");
const nowDate = new Date(Date.UTC(2026, 1, 12));
const body = document.querySelector("body");

const options = {
  year: "numeric",
  month: "long",
  day: "numeric"
}

yearSpan.textContent = nowDate.toLocaleString("es-ES", options);


body.addEventListener("mousemove", (e) => {
  // Obtenemos la posición del mouse (X e Y)
  const x = e.clientX;
  const y = e.clientY;
  
  // Enviamos estas coordenadas a las variables CSS del body
  body.style.setProperty('--x', `${x}px`);
  body.style.setProperty('--y', `${y}px`);
});