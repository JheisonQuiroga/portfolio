const yearSpan = document.querySelector(".year");
const nowDate = new Date(Date.UTC(2026, 1, 12));

const options = {
  year: "numeric",
  month: "long",
  day: "numeric"
}

yearSpan.textContent = nowDate.toLocaleString("es-ES", options);