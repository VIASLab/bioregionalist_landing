/*import { initStarfield } from './canvasStarfield.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('starCanvas');
  const cssStarfield = document.getElementById('cssStarfield');
  const mainInteractionZone = document.getElementById('mainInteractionZone');
  const rFlipper = document.getElementById('rFlipper');
  const eFlipper = document.getElementById('eFlipper');
  const textGroupRight = document.getElementById('textGroupRight');
  const earth3dElement = document.getElementById('earth3d');
  const siteFooter = document.querySelector('.site-footer');
  const volution = document.getElementById('volution');
  const reContainer = document.getElementById('reContainer');


  if (
    !canvas || !cssStarfield || !mainInteractionZone ||
    !rFlipper || !eFlipper ||
    !textGroupRight || !earth3dElement || !volution || !reContainer
  ) {
    console.error("Error: Elementos clave no encontrados. Revisa IDs.");
    return;
  }

  let starfieldInstance = initStarfield(canvas);
  starfieldInstance?.setSpeed?.(0.0005);

  let isActiveState = false;

  const activateScene = () => {
    if (isActiveState) return;
    isActiveState = true;

    starfieldInstance?.setSpeed(-0.015);
    cssStarfield.classList.add('is-active');
    canvas.classList.add('active');

    rFlipper.classList.add('is-flipped');
    eFlipper.classList.add('is-flipped');

    textGroupRight.classList.add('gen-hidden');
    volution.classList.add('to-left');
    reContainer.classList.add('reverse-order');

    earth3dElement.classList.add('is-pulsing');
    siteFooter.classList.add('is-hidden');
  };

  const deactivateScene = () => {
    if (!isActiveState) return;
    isActiveState = false;

    starfieldInstance?.setSpeed(0.0005);
    cssStarfield.classList.remove('is-active');
    canvas.classList.remove('active');

    rFlipper.classList.remove('is-flipped');
    eFlipper.classList.remove('is-flipped');

    textGroupRight.classList.remove('gen-hidden');
    volution.classList.remove('to-left');
    reContainer.classList.remove('reverse-order');

    earth3dElement.classList.remove('is-pulsing');
    siteFooter.classList.remove('is-hidden');
  };

  const elementsToTrigger = [mainInteractionZone, reContainer];
  elementsToTrigger.forEach(el => {
    el.addEventListener('mouseenter', activateScene);
    el.addEventListener('mouseleave', deactivateScene);
  });
});

import { initInfiniteFooterWords } from './footerWordsInfinite.js';

document.addEventListener("DOMContentLoaded", () => {
  // ... tu código existente ...
  initInfiniteFooterWords(); // inicia el loop infinito
});
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { initStarfield } from './canvasStarfield.js';
import { setRotationActive } from './earth3d.js';
import { initInfiniteFooterWords } from './footerWordsInfinite.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('starCanvas');
  const cssStarfield = document.getElementById('cssStarfield');
  const mainInteractionZone = document.getElementById('mainInteractionZone');
  const rFlipper = document.getElementById('rFlipper');
  const eFlipper = document.getElementById('eFlipper');
  const textGroupRight = document.getElementById('textGroupRight');
  const earth3dElement = document.getElementById('earth3d');
  const siteFooter = document.querySelector('.site-footer');
  const volution = document.getElementById('volution');
  const reContainer = document.getElementById('reContainer');

  if (!canvas || !cssStarfield || !mainInteractionZone || !rFlipper || !eFlipper || !textGroupRight || !earth3dElement || !volution || !reContainer) {
    console.error("Error: Elementos clave no encontrados. Revisa IDs.");
    return;
  }

  // Utilidad para alternar visibilidad
  const toggleVisibility = (el, show) => {
    el.classList.toggle('visible', show);
    el.classList.toggle('hidden', !show);
  };

  // Estado inicial
  textGroupRight.classList.remove('gen-hidden');
  toggleVisibility(volution, false);

  const starfieldInstance = initStarfield(canvas);
  starfieldInstance?.setSpeed?.(0.0005);

 let stopRightTimeout;

const activateRight = () => {
  clearTimeout(stopRightTimeout); // limpiar si había un tiempo previo

  setRotationActive(true);
  starfieldInstance?.setSpeed(-0.013); // velocidad rápida inicial
  cssStarfield.classList.add('is-active');
  canvas.classList.add('active');

  rFlipper.classList.add('is-flipped');
  eFlipper.classList.add('is-flipped');

  textGroupRight.classList.add('gen-hidden');
  toggleVisibility(volution, true);

  reContainer.classList.add('reverse-order');
  earth3dElement.classList.add('is-pulsing');
  siteFooter.classList.add('is-hidden');

  // Luego de 3 segundos, reducir la velocidad
  stopRightTimeout = setTimeout(() => {
    starfieldInstance?.setSpeed(-0.0006); // velocidad más suave
  }, 3000);
};

let stopLeftTimeout;

const activateLeft = () => {
  clearTimeout(stopLeftTimeout); // limpiar si había un tiempo previo

  setRotationActive(false);
  starfieldInstance?.setSpeed(0.013); // velocidad inicial positiva (izquierda)
  cssStarfield.classList.remove('is-active');
  canvas.classList.remove('active');

  rFlipper.classList.remove('is-flipped');
  eFlipper.classList.remove('is-flipped');

  textGroupRight.classList.remove('gen-hidden');
  toggleVisibility(volution, false);

  reContainer.classList.remove('reverse-order');
  earth3dElement.classList.remove('is-pulsing');
  siteFooter.classList.remove('is-hidden');

  // Luego de 3 segundos, desacelerar
  stopLeftTimeout = setTimeout(() => {
    starfieldInstance?.setSpeed(0.0006); // velocidad mínima
  }, 3000);
};


  let previousSide = null;
  document.addEventListener('mousemove', (e) => {
    const half = window.innerWidth / 2;
    const currentSide = e.clientX > half ? 'right' : 'left';

    if (currentSide !== previousSide) {
      previousSide = currentSide;

      if (currentSide === 'right') {
        activateRight();
      } else {
        activateLeft();
      }
    }
  });

  initInfiniteFooterWords();
});
