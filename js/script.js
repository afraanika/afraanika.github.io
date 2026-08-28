document.getElementById("year").textContent = new Date().getFullYear();

const hero = document.querySelector(".hero");
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("main .section");
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 10;
  hero.classList.toggle("scrolled", scrolled);
  backToTop.classList.toggle("visible", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("in-view");
      entry.target.querySelectorAll(".skill-fill").forEach((fill) => fill.classList.add("filled"));

      const link = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
      if (link) {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));
