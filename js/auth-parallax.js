const bg = document.querySelector(".parallax");

window.addEventListener("mousemove", e => {
  const x = (e.clientX / innerWidth - 0.5) * 20;
  const y = (e.clientY / innerHeight - 0.5) * 20;
  bg.style.transform = `translate(${x}px, ${y}px)`;
});
