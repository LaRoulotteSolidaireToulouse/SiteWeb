/* ===========================
   HEADER / FOOTER INJECTION
   =========================== */

async function loadComponent(selector, file) {
  const container = document.querySelector(selector);
  const html = await fetch(file).then(res => res.text());
  container.innerHTML = html;
}

/* Inject components */
loadComponent("#header", "../components/header.html");
loadComponent("#footer", "../components/footer.html");

/* ===========================
   SPA NAVIGATION
   =========================== */

async function spaNavigate(url) {
  const content = await fetch(url).then(res => res.text());
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const main = doc.querySelector("main");
  document.querySelector("main").innerHTML = main.innerHTML;

  window.history.pushState({}, "", url);
  animatePage();
}

/* Intercept links */
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href.endsWith(".html")) return;

  e.preventDefault();
  spaNavigate(href);
});

/* ===========================
   ANIMATION
   =========================== */

function animatePage() {
  const main = document.querySelector("main");
  main.style.opacity = 0;
  setTimeout(() => {
    main.style.transition = "opacity 0.4s ease";
    main.style.opacity = 1;
  }, 50);
}

/* ===========================
   MOBILE MENU
   =========================== */

document.addEventListener("click", () => {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  if (!toggle) return;

  toggle.onclick = () => {
    menu.classList.toggle("open");
  };
});
