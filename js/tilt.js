function initTilt(el){
  let rect = el.getBoundingClientRect();

  el.style.transition = "transform 0.12s ease-out";
  el.style.willChange = "transform";

  el.addEventListener("mouseenter", () => {
    rect = el.getBoundingClientRect();
  });

  el.addEventListener("mousemove", e => {
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rx = (y - rect.height/2) / 10;
    const ry = (x - rect.width/2) / 10;

    el.style.transform =
      `rotateX(${-rx}deg) rotateY(${ry}deg) translateZ(12px)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform =
      "rotateX(0deg) rotateY(0deg) translateZ(0)";
  });
}
