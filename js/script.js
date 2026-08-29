document.getElementById("year").textContent = new Date().getFullYear();

const topbar = document.querySelector(".topbar");
const tiles = document.querySelectorAll("main .tile");
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  topbar.classList.toggle("scrolled", window.scrollY > 10);
  backToTop.classList.toggle("visible", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const tileObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add("in-view"), index * 40);
      tileObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
);

tiles.forEach((tile) => tileObserver.observe(tile));

// Diagram lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector(".lightbox-img");
const lightboxClose = lightbox.querySelector(".lightbox-close");

document.querySelectorAll("[data-lightbox]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    lightboxImg.src = link.dataset.lightbox;
    lightboxImg.alt = link.dataset.lightboxAlt || "";
    lightbox.hidden = false;
  });
});

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
});

// Click-to-play publication videos
document.querySelectorAll(".pub-video").forEach((button) => {
  button.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = button.dataset.embedSrc;
    iframe.title = button.dataset.embedTitle;
    iframe.allow = "autoplay";
    iframe.allowFullscreen = true;
    button.replaceWith(iframe);
  });
});

// Animated stat counters
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.countTo, 10);
      const duration = 900;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.round(progress * target);
        el.textContent = `${value}+`;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll("[data-count-to]").forEach((el) => statObserver.observe(el));
