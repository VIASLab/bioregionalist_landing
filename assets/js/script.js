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

let rotationTimeout = null;

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

  let starfieldInstance = initStarfield(canvas);
  starfieldInstance?.setSpeed?.(0.0005);

  let isActiveState = false;

  const activateScene = () => {
    if (isActiveState) return;
    isActiveState = true;

    setRotationActive(true);

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

    // Desactivar rotación después de 6 segundos
    clearTimeout(rotationTimeout);
    rotationTimeout = setTimeout(() => {
      deactivateScene();
    }, 3000);
  };

  const deactivateScene = () => {
    if (!isActiveState) return;
    isActiveState = false;

    setRotationActive(false);

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

  let previousSide = 'left';
  document.addEventListener('mousemove', (e) => {
    const half = window.innerWidth / 2;
    const currentSide = e.clientX > half ? 'right' : 'left';
    if (currentSide !== previousSide) {
      previousSide = currentSide;
      if (currentSide === 'right') {
        activateScene();
      } else {
        deactivateScene();
      }
    }
  });

  initInfiniteFooterWords();
});