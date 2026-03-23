import { useEffect } from "react";

function createPetals(container, count = 28) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'petal';

    const size = 12 + Math.random() * 16;
    el.style.width = size + 'px';
    el.style.height = size * 1.25 + 'px';

    el.style.left = Math.random() * 100 + 'vw';

    const yStart = Math.random() * 100 + 'vh';
    const yEnd = Math.random() * 100 + 'vh';
    const r0 = Math.random() * 360 + 'deg';
    const r1 = (Math.random() * 360 + 180) + 'deg';
    const op = 0.5 + Math.random() * 0.5;

    el.style.setProperty('--y-start', yStart);
    el.style.setProperty('--y-end', yEnd);
    el.style.setProperty('--r0', r0);
    el.style.setProperty('--r1', r1);
    el.style.setProperty('--op', op);

    el.style.animationDuration = (7 + Math.random() * 9) + 's';
    el.style.animationDelay = -(Math.random() * 14) + 's';

    container.appendChild(el);
  }
}

export default function RosePetals() {
  useEffect(() => {
    const container = document.querySelector('.petal-container');
    if (!container) return;

    createPetals(container, 28);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div className="petal-container absolute inset-0 pointer-events-none overflow-hidden"></div>
  );
}