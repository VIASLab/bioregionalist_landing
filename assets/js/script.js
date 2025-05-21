document.addEventListener("DOMContentLoaded", () => {
  const reText = document.getElementById("reText");
  const mainderText = document.getElementById("mainderText");
  const wrapper = document.querySelector(".earth-wrapper");

  let isActive = false;

  function reverseString(str) {
    return str.split("").reverse().join("");
  }

  function getEarthCanvas() {
    // Selecciona el canvas generado por Three.js con clase .earth
    return document.querySelector("#earth3d canvas.earth");
  }

  wrapper.addEventListener("mouseenter", () => {
    const earth = getEarthCanvas();
    if (!earth) {
      console.warn("Canvas no encontrado en el DOM.");
      return;
    }
    if (isActive) return;
    isActive = true;

    reText.classList.add("flipped");
    mainderText.classList.add("left-side");

    reText.style.opacity = "0";
    mainderText.style.opacity = "0";

    setTimeout(() => {
      reText.textContent = "eR";
      mainderText.textContent = reverseString("volution"); // → noitulov
      reText.style.opacity = "1";
      mainderText.style.opacity = "1";
    }, 300);
  });

  wrapper.addEventListener("mouseleave", () => {
    const earth = getEarthCanvas();
    isActive = false;

    reText.classList.remove("flipped");
    mainderText.classList.remove("left-side");

    reText.style.opacity = "0";
    mainderText.style.opacity = "0";

    setTimeout(() => {
      reText.textContent = "Re";
      mainderText.innerHTML = "generative<br>volution";
      reText.style.opacity = "1";
      mainderText.style.opacity = "1";
    }, 300);
  });
});
