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


// トップページのヘッダーのスライドダウン
document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('.top_header');
	if (!header) return;
	setTimeout(() => {
		header.classList.add('slide-down');
	}, 8000);
});




// ヒーローセクションの動画をアイコン表示後に表示&再生 
document.addEventListener('DOMContentLoaded', () => {
	const bgVideo = document.querySelector('.top_hero__bg-video');

	// 確実に一旦停止＆隠しておく
	bgVideo.pause();
	bgVideo.style.visibility = 'hidden';
	bgVideo.style.opacity = '0';

	// 動画が再生を始めたらフェードイン表示
	bgVideo.addEventListener('playing', () => {
		bgVideo.style.visibility = 'visible';
		bgVideo.style.opacity = '1';
	});

	// 7秒後に再生をスタート
	setTimeout(() => {
		bgVideo.play().catch(err => {
			console.warn('自動再生できませんでした:', err);
		});
	}, 7400);
});



// トップページのサービス一覧のアイテムがスクロールでフェードインで表示されるようにする
document.addEventListener('DOMContentLoaded', () => {
	const items = document.querySelectorAll('.top_service__list .top_service__item');
	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in-view');
				obs.unobserve(entry.target);
			}
		});
	}, { threshold: 0.1 });
	items.forEach(item => observer.observe(item));
});



// 強みの回転する玉
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


// oboard_land_benefitのカードがスクロールで横からフェードインで表示されるようにする
document.addEventListener('DOMContentLoaded', () => {
	const cards = document.querySelectorAll(
	  '.oboard_land_benefit .oboard_land_benefit_card_list .oboard_land_benefit_card'
	);
	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in-view');
				obs.unobserve(entry.target);
			}
		});
	}, { threshold: 0.1 });

	cards.forEach(card => observer.observe(card));
});




