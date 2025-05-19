document.addEventListener("DOMContentLoaded", () => {
  const scene = document.getElementById("scene");
  const reText = document.getElementById("reText");
  const mainderText = document.getElementById("mainderText");

  function reverseString(str) {
    return str.split("").reverse().join("");
  }

  reText.addEventListener("mouseenter", () => {
    scene.classList.add("inverted");

    reText.style.transition = "opacity 0.5s ease";
    mainderText.style.transition = "opacity 0.5s ease";
    reText.style.opacity = "0";
    mainderText.style.opacity = "0";

    setTimeout(() => {
      reText.textContent = "eR";
      mainderText.textContent = reverseString("volution");
      reText.style.opacity = "1";
      mainderText.style.opacity = "1";
    }, 300);
  });

  reText.addEventListener("mouseleave", () => {
    scene.classList.remove("inverted");

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
