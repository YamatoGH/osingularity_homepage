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
	}, 7000);
});




// ヘッダーにページ読み込み後に現在ページのリンクに .active を付与
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a');
  const path = window.location.pathname;   // 例: '/company.html' や '/index.html'
  const hash = window.location.hash;       // 例: '#contact'

  links.forEach(link => {
    const href = link.getAttribute('href');

    // 会社概要ページ
    if (href === './company.html' && path.endsWith('company.html')) {
      link.classList.add('active');
    }
    // お問い合わせアンカー
    else if (href === '#contact' && hash === '#contact') {
      link.classList.add('active');
    }
    // それ以外（トップページ）
    else if (href === '#top' && (!hash || hash === '' || hash === '#top')) {
      link.classList.add('active');
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const indicator = document.querySelector('.nav-indicator');
  const links = document.querySelectorAll('nav a');

  function moveIndicator() {
    // まず active クラスは既存のロジックで付いている前提
    const active = document.querySelector('nav a.active');
    if (!active) {
      indicator.style.width = '0';
      return;
    }
    const rect = active.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    // nav 内でのオフセットを計算
    const left = rect.left - navRect.left;
    const width = rect.width;
    indicator.style.left = `${left}px`;
    indicator.style.width = `${width}px`;
  }

  // ページ読み込み時
  moveIndicator();
  // 画面幅が変わったときも再計算
  window.addEventListener('resize', moveIndicator);
});



document.addEventListener('DOMContentLoaded', () => {
	const logo = document.querySelector('.top_hero__logo');
	const hero  = document.querySelector('.top_hero');

	if (logo && hero) {
		logo.addEventListener('animationend', (e) => {
			// blackhole-cool アニメが終わったら wave を発火
			if (e.animationName === 'blackhole-appear') {
				hero.classList.add('wave');
			}
		});
	}
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


	setTimeout(() => {
		bgVideo.play().catch(err => {
			console.warn('自動再生できませんでした:', err);
		});
	}, 6000);
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
  carouselInterval = setInterval(updateCarousel, 7000);  // 7秒ごとに更新
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




