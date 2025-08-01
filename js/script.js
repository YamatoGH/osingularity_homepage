window.addEventListener("DOMContentLoaded", () => {
	const loader   = document.getElementById("logo-loader");
	const logoVid  = document.getElementById("logo-video");
	const title    = document.querySelector(".top_hero h2");
	const logo     = document.querySelector(".top_hero__logo");
	const header   = document.querySelector(".top_header");
	const hero     = document.querySelector(".top_hero");
	const bgVideo  = document.querySelector(".top_hero__bg-video");

	// ── アニメ開始までの遅延（秒） ──
	const delays = {
		typewriter:  0,    // 0秒後にタイプライター
		logo:        1.5,  // 1.5秒後にロゴ
		header:      3,  // 3秒後にヘッダー
		wave:        2.5,  // 2.5秒後に波紋
		bgVideoPlay: 2.6   // 2.6秒後に背景動画再生
	};

	function startAnimations() {
		// 1) ローダーをフェードアウト
		if (loader) {
			loader.style.transition = "opacity 1s";
			loader.style.opacity    = "0";
			setTimeout(() => loader.style.display = "none", 1000);
		}

		// 2) タイプライター
		if (title) {
			setTimeout(() => title.classList.add("typing"), delays.typewriter * 1000);
		}

		// 3) ロゴ
		if (logo) {
			setTimeout(() => logo.classList.add("blackhole-appear"), delays.logo * 1000);
		}

		// 4) ヘッダー降下
		if (header) {
			setTimeout(() => header.classList.add("slide-down"), delays.header * 1000);
		}

		// 5) 波紋エフェクト
		if (hero) {
			setTimeout(() => hero.classList.add("wave"), delays.wave * 1000);
		}

		// 6) 背景動画再生
		if (bgVideo) {
			setTimeout(() => {
				bgVideo.style.visibility = "visible";
				bgVideo.style.opacity    = "1";
				bgVideo.play().catch(() => {});
			}, delays.bgVideoPlay * 1000);
		}
	}

	// ── 初回のみ、動画終了をトリガーにアニメ開始 ──
	if (!localStorage.getItem("hasVisited")) {
		localStorage.setItem("hasVisited", "true");
		if (logoVid) {
			logoVid.play().catch(() => {});
			logoVid.addEventListener("ended", startAnimations);
		} else {
			startAnimations();
		}
	} else {
		// 再訪時は即時最終状態で
		if (loader)  loader.style.display = "none";
		if (title)   title.classList.add("typing-end");
		if (logo)    logo.classList.add("blackhole-end");
		if (header)  header.classList.add("slide-down");
		if (hero)    hero.classList.add("wave");
		if (bgVideo) {
			bgVideo.style.visibility = "visible";
			bgVideo.style.opacity    = "1";
			bgVideo.play().catch(() => {});
		}
	}
});





// ── ハンバーガーメニューの開閉 ──
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navList   = document.querySelector('.nav-list');

   hamburger.addEventListener('click', () => {
     // ボタンの見た目切り替え（× ↔ 三本線）
     hamburger.classList.toggle('open');
     // メニューのスライドイン／アウト
     navList.classList.toggle('open');
   });
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



// ── “Strength” セクションの 3D 回転する玉 ──
const items = document.querySelectorAll('.carousel-item');
const total = items.length;

let radius;
/**
 * 画面幅に応じて回転半径を動的に設定
 * （元の updateRadius）:contentReference[oaicite:4]{index=4}
 */
function updateRadius() {
  const w = window.innerWidth;
  if (w < 480) {
    radius = 130;
  } else if (w < 768) {
    radius = 170;
  } else {
    radius = 200;
  }
}
// 初期計算
updateRadius();

/**
 * リサイズ時は「位置だけ再計算」してインデックスは進めない
 * ここを updateCarousel から repositionCarousel 呼び出しに変更 :contentReference[oaicite:5]{index=5}
 */
window.addEventListener("resize", () => {
  updateRadius();
  repositionCarousel();
});

let currentIndex = 0;
let carouselInterval;

/**
 * ① 位置再計算のみ行う関数（インデックスは進めない）
 */
function repositionCarousel() {
  const angleStep = (2 * Math.PI) / total;
  for (let i = 0; i < total; i++) {
    const baseAngle = i * angleStep;
    const angle     = baseAngle - currentIndex * angleStep;
    const x         = Math.sin(angle) * radius;
    const z         = Math.cos(angle) * radius;
    items[i].style.transform =
      `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px)`;
    items[i].style.zIndex = Math.round(z + radius);
  }
}

/**
 * ② オートスライド用：位置再計算＋インデックス進行
 * （元の updateCarousel）:contentReference[oaicite:6]{index=6}
 */
function updateCarousel() {
  repositionCarousel();
  currentIndex = (currentIndex + 1) % total;
}

/**
 * ③ 自動再生ループを開始
 * （元の startCarousel）:contentReference[oaicite:7]{index=7}
 */
function startCarousel() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(updateCarousel, 5000);
}
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





// 会社概要ページのMVVのフェードイン
document.addEventListener('DOMContentLoaded', () => {
  const mvvSections = document.querySelectorAll(
    '.company_mission, .company_vision, .company_value'
  );

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  mvvSections.forEach(sec => observer.observe(sec));
});
