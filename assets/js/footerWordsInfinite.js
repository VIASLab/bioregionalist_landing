export function initInfiniteFooterWords({
  containerSelector = '.rotating-words',
  delay = 1500
} = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const wrapper = container.parentElement;
  const originalWords = [...container.querySelectorAll('span')];
  const total = originalWords.length;

  originalWords.forEach(word => {
    const clone = word.cloneNode(true);
    container.appendChild(clone);
  });

  requestAnimationFrame(() => {
    const allWords = container.querySelectorAll('span');
    const wordHeight = allWords[0].offsetHeight;
    const centerOffset = (wrapper.offsetHeight / 2) - (wordHeight / 2); // <-- CORRECTO
    let index = 0;
    let isResetting = false;

    const loop = () => {
      if (index >= total && !isResetting) {
        isResetting = true;
        container.style.transition = 'none';
        container.style.transform = `translateY(${centerOffset}px)`;
        index = 0;
        void container.offsetHeight;

        requestAnimationFrame(() => {
          container.style.transition = 'transform 0.4s ease';
          container.style.transform = `translateY(${-wordHeight + centerOffset}px)`;
          index = 1;
          isResetting = false;
        });
        return;
      }

      allWords.forEach((el, i) => {
        el.classList.toggle('active', i === index);
      });

      container.style.transition = 'transform 0.4s ease';
      container.style.transform = `translateY(${-index * wordHeight + centerOffset}px)`;
      index++;
    };

    loop();
    setInterval(loop, delay);
  });
}
