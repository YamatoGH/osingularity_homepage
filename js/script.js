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
