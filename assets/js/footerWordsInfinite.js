export function initInfiniteFooterWords({
  containerSelector = '.rotating-words',
  delay = 1500
} = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const wrapper = container.parentElement;
  const originalWords = [...container.querySelectorAll('span')];
  const total = originalWords.length;

  // Duplicar para el loop
  originalWords.forEach(word => {
    const clone = word.cloneNode(true);
    container.appendChild(clone);
  });

  requestAnimationFrame(() => {
    const wordHeight = wrapper.offsetHeight;
    let index = 0;

    const loop = () => {
      if (index >= total) {
        container.style.transition = 'none';
        container.style.transform = 'translateY(0)';
        index = 0;
        void container.offsetWidth;
      }

      container.querySelectorAll('span').forEach((el, i) => {
        el.classList.toggle('active', i === index);
      });

      index++;
      container.style.transition = 'transform 0.5s ease';
      container.style.transform = `translateY(-${index * wordHeight}px)`;
    };

    setInterval(loop, delay);
    loop();
  });
}

initInfiniteFooterWords();