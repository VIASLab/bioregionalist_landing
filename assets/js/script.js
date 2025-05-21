document.addEventListener("DOMContentLoaded", () => {
  const reText = document.getElementById("reText");
  const mainderText = document.getElementById("mainderText");
  const wrapper = document.querySelector(".earth-wrapper");

  // Control desde el módulo externo
  import('./assets/js/canvasStarfield.js').then(({ initStarfield }) => {
    const canvas = document.getElementById("starCanvas");
    const starfield = initStarfield(canvas);

    wrapper.addEventListener("mouseenter", () => {
      starfield.setSpeed(-0.02); // gira rápido a la izquierda

      reText.classList.add("flipped");
      mainderText.classList.add("left-side");

      reText.style.opacity = "0";
      mainderText.style.opacity = "0";

      setTimeout(() => {
        reText.textContent = "eR";
        mainderText.textContent = "noitulov";
        reText.style.opacity = "1";
        mainderText.style.opacity = "1";
      }, 300);
    });

    wrapper.addEventListener("mouseleave", () => {
      starfield.setSpeed(0.001); // gira lento a la derecha

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
});
