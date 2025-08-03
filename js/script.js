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



// トップページのスライドショーのスライド要素を複製して無限ループにする
window.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.top_strength__gallery');
  if (!gallery) return;

  const track = gallery.querySelector('.slide-track');
  // ── ① 「元スライド群」をスナップショット
  const originals = Array.from(track.children);
  const count     = originals.length;

  // ── ② 各アイテムの幅＋右マージンを計測
  const style     = getComputedStyle(originals[0]);
  const itemWidth = originals[0].getBoundingClientRect().width
                    + parseFloat(style.marginRight);
  const cycleW    = itemWidth * count;

  // ── ③ 必要な「セット数」を算出して複製
  const galleryW  = gallery.getBoundingClientRect().width;
  //   表示領域＋１サイクル分をカバーするセット数
  const setsNeeded = Math.ceil((galleryW + cycleW) / cycleW);

  for (let i = 0; i < setsNeeded; i++) {
    originals.forEach(item => track.appendChild(item.cloneNode(true)));
  }

  // ── ④ requestAnimationFrame でシームレススクロール
  let offset = 0;
  const speed = 0.5; // px/frame。お好みで調整可。

  function tick() {
    offset = (offset + speed) % cycleW;
    track.style.transform = `translateX(-${offset}px)`;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
});







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
