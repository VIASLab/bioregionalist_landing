const modal = document.getElementById("newsletterModal");
const trigger = document.getElementById("paperPlaneAnim"); // Trigger es el avión
const closeBtn = document.getElementById("closeModal");
const form = document.getElementById("newsletterForm");

trigger.addEventListener("click", () => {
  modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const updates = form.updates.checked;

  console.log("Submitted:", { name, email, updates });
  modal.classList.remove("active");
  alert("Thank you for subscribing!");
  form.reset();
});
