const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.inset = 0;
canvas.style.zIndex = -2;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

/* =========================
   Resize
========================= */
function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* =========================
   Mouse tracking
========================= */
let mouse = { x: innerWidth / 2, y: innerHeight / 2 };

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  // 🎨 add trail point
  trails.push({
    x: e.clientX,
    y: e.clientY,
    life: 1
  });
});

/* =========================
   Theme accent
========================= */
function accent() {
  return getComputedStyle(document.body)
    .getPropertyValue("--accent")
    .trim() || "#00e5ff";
}

/* =========================
   🌌 Particle depth layers
========================= */
const layers = [
  { count: 30, speed: 0.15, size: 1.5 },
  { count: 25, speed: 0.35, size: 2.2 },
  { count: 20, speed: 0.7,  size: 3.2 }
];

const particles = layers.flatMap(layer =>
  Array.from({ length: layer.count }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - 0.5) * layer.speed,
    vy: (Math.random() - 0.5) * layer.speed,
    speed: layer.speed,
    size: layer.size
  }))
);

/* =========================
   🎨 Mouse trails
========================= */
const trails = [];

function drawTrails() {
  const color = accent();

  trails.forEach((t, i) => {
    ctx.globalAlpha = t.life * 0.4;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;

    ctx.beginPath();
    ctx.arc(t.x, t.y, 6 * t.life, 0, Math.PI * 2);
    ctx.fill();

    t.life -= 0.03;
    if (t.life <= 0) trails.splice(i, 1);
  });

  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
}

/* =========================
   Animation loop
========================= */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = accent();

  particles.forEach(p => {
    // 🌌 depth-based parallax
    p.x += p.vx + (mouse.x - p.x) * p.speed / 120000;
    p.y += p.vy + (mouse.y - p.y) * p.speed / 120000;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.globalAlpha = 0.25 + p.speed;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 1;

  // 🎨 draw mouse trails LAST (on top)
  drawTrails();

  requestAnimationFrame(animate);
}

animate();
