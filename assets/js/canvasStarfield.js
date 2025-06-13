// assets/js/canvasStarfield.js

export function initStarfield(canvas, options = {}) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let width = canvas.width;
  let height = canvas.height;

  const numStars = options.numStars || 1700;
  const radiusMin = 210;
  let radiusMax = Math.sqrt(width * width + height * height) / 1.2;
  const stars = [];

  for (let i = 0; i < numStars; i++) {
    const angle = Math.random() * Math.PI * 1.9;
    const radius = radiusMin + Math.random() * (radiusMax - radiusMin);
    const size = 0.5 + Math.random() * 1.7; // tamaño variable
    stars.push({
      angle,
      radius,
      speed: 0.001 + Math.random() * 0.003,
      size
    });
  }

  let targetSpeed = 0.001;
  let currentSpeed = targetSpeed;

  function resizeCanvas() {
    const oldRadiusMax = radiusMax;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = canvas.width;
    height = canvas.height;
    radiusMax = Math.sqrt(width * width + height * height) / 2;
    const radiusScale = radiusMax / oldRadiusMax;
    for (let star of stars) {
      star.radius = Math.min(radiusMax, star.radius * radiusScale);
    }
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function drawStar(x, y, alpha, size) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.lineWidth = size;
    ctx.moveTo(x.old, y.old);
    ctx.lineTo(x.new, y.new);
    ctx.stroke();
  }

  function animate() {
    width = canvas.width;
    height = canvas.height;
    ctx.fillStyle = "rgba(0, 10, 30, 0.2)";
    ctx.fillRect(0, 0, width, height);

    currentSpeed += (targetSpeed - currentSpeed) * 0.03;

    for (let star of stars) {
      const x0 = width / 2 + Math.cos(star.angle) * star.radius;
      const y0 = height / 2 + Math.sin(star.angle) * star.radius;
      star.angle += currentSpeed;
      const x1 = width / 2 + Math.cos(star.angle) * star.radius;
      const y1 = height / 2 + Math.sin(star.angle) * star.radius;
      drawStar({ old: x0, new: x1 }, { old: y0, new: y1 }, 0.8, star.size);
    }

    requestAnimationFrame(animate);
  }

  animate();

  return {
    setSpeed: (s) => { targetSpeed = s; }
  };
}