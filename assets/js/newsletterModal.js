const modal = document.getElementById("newsletterModal");
const plane = document.getElementById("paperPlaneAnim");
const planeStatic = document.getElementById("planeStatic");
const closeBtn = document.getElementById("closeModal");
const form = document.getElementById("newsletterForm");

let loopCount = 0;
let maxLoops = 3;

plane.addEventListener("ready", () => {
  plane.play();
});

plane.addEventListener("loop", () => {
  loopCount++;
  if (loopCount >= maxLoops) {
    plane.style.display = "none";
    planeStatic.style.display = "block";
  }
});

planeStatic.addEventListener("click", () => {
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





