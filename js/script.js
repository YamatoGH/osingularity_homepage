// ロゴ動画が終わったらローディング画面を消す
window.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("logo-video");
  const loader = document.getElementById("logo-loader");

  if (video) {
    video.addEventListener("ended", () => {
      loader.style.transition = "opacity 1s";
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 1000);
    });
  }
});



const items = document.querySelectorAll('.carousel-item');
const total = items.length;
const radius = 200; // 奥行きの半径(px)
let currentIndex = 0;
let carouselInterval;  // ← ここで interval ID を保持

function updateCarousel() {
  const angleStep = (2 * Math.PI) / total;
  for (let i = 0; i < total; i++) {
    const baseAngle = i * angleStep;
    const currAngle = currentIndex * angleStep;
    const angle = baseAngle - currAngle;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    items[i].style.transform = 
      `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px)`;
    items[i].style.zIndex = Math.round(z + radius);
  }
  currentIndex = (currentIndex + 1) % total;
}

function startCarousel() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(updateCarousel, 3000);
}

function stopCarousel() {
  clearInterval(carouselInterval);
}

// ── ホバーで停止／再開 ──
items.forEach(item => {
  item.addEventListener('mouseenter', stopCarousel);
  item.addEventListener('mouseleave', startCarousel);
});

// 初期表示＋タイマー開始
updateCarousel();
startCarousel();




