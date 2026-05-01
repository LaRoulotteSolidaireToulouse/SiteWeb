/* LOAD COMPONENTS */
async function loadComponent(selector, file) {
  const container = document.querySelector(selector);
  const html = await fetch(file).then(res => res.text());
  container.innerHTML = html;
}

loadComponent("#header", "../components/header.html");
loadComponent("#footer", "../components/footer.html");
loadComponent("#loader-container", "../components/loader.html");
loadComponent("#modal-container", "../components/modal.html");
loadComponent("#toast-container", "../components/toast.html");

/* LOADER */
function showLoader() {
  document.getElementById("loader").classList.add("active");
}
function hideLoader() {
  document.getElementById("loader").classList.remove("active");
}

/* SPA NAVIGATION */
async function spaNavigate(url) {
  showLoader();
  const content = await fetch(url).then(res => res.text());
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const main = doc.querySelector("main");
  document.querySelector("main").innerHTML = main.innerHTML;
  window.history.pushState({}, "", url);
  hideLoader();
  animatePage();
  revealElements();
}

/* INTERCEPT LINKS */
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href.endsWith(".html")) return;
  e.preventDefault();
  spaNavigate(href);
});

/* ANIMATION */
function animatePage() {
  const main = document.querySelector("main");
  main.style.opacity = 0;
  setTimeout(() => {
    main.style.transition = "opacity 0.4s ease";
    main.style.opacity = 1;
  }, 50);
}

/* SCROLL REVEAL */
function revealElements() {
  const elements = document.querySelectorAll(".reveal");
  const trigger = window.innerHeight * 0.85;
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add("visible");
  });
}

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

/* MODAL */
function openModal(title, text) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-text").textContent = text;
  document.getElementById("modal").classList.add("active");
}
function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

/* TOAST */
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
