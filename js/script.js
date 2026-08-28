document.getElementById("year").textContent = new Date().getFullYear();

const hero = document.querySelector(".hero");
const tiles = document.querySelectorAll("main .tile");
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  hero.classList.toggle("scrolled", window.scrollY > 10);
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
