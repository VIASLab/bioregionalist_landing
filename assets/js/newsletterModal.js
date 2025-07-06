const modal = document.getElementById("newsletterModal");
const plane = document.getElementById("paperPlaneAnim");
const closeBtn = document.getElementById("closeModal");
const form = document.getElementById("newsletterForm");

plane.addEventListener("ready", () => {
  plane.play(); // Inicia la animación
});

plane.addEventListener('frame', (e) => {
  if (e.detail.frame >= 62) {
    plane.pause();
    plane.classList.add('idle');
  }
});

// Click sobre el avión abre el modal
plane.addEventListener("click", () => modal.classList.add("active"));
closeBtn.addEventListener("click", () => modal.classList.remove("active"));

// Manejo del formulario
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const updates = form.updates.checked;
  console.log("Submitted:", { name, email, updates });
  modal.classList.remove("active");
  alert("Gracias por suscribirte :)");
  form.reset();
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

