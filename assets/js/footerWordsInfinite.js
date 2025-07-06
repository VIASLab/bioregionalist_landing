export function initInfiniteFooterWords({
  containerSelector = '.rotating-words',
  delay = 1500
} = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const wrapper = container.parentElement;
  const originalWords = [...container.querySelectorAll('span')];
  const wordHeight = originalWords[0].offsetHeight;
  const centerOffset = (wrapper.offsetHeight / 2) - (wordHeight / 2);

  // Clonar palabras para efecto continuo
  originalWords.forEach(word => {
    const clone = word.cloneNode(true);
    container.appendChild(clone);
  });

  const allWords = [...container.querySelectorAll('span')];
  const totalWords = originalWords.length;

  let index = 0;

  const loop = () => {
    // Marcar palabra activa
    allWords.forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });

    // Mover a la siguiente palabra
    container.style.transition = 'transform 0.4s ease';
    container.style.transform = `translateY(${-index * wordHeight + centerOffset}px)`;

    index++;

    // Reset sin parpadeo
    if (index >= totalWords) {
      setTimeout(() => {
        container.style.transition = 'none';
        container.style.transform = `translateY(${centerOffset}px)`;
        index = 0;

        // Volver a aplicar active en el primer ítem
        allWords.forEach((el, i) => {
          el.classList.toggle('active', i === 0);
        });
      }, delay);
    }
  };

  setInterval(loop, delay);
}
