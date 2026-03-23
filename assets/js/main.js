// ================= LOAD COMPONENT =================
async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`❌ Element #${id} not found`);
    return;
  }

  const res = await fetch(file);
  const html = await res.text();
  el.innerHTML = html;
}

// ================= LOAD PAGE =================
async function loadPage(page) {
  const res = await fetch(page);
  const html = await res.text();

  const app = document.getElementById("app");
  app.innerHTML = html;
}

// ================= ROUTER =================
async function renderPage(pageName) {
  // 1. Load page
  await loadPage(`./pages/${pageName}.html`);

  // 2. Load components AFTER page is rendered
  if (pageName === "homePage") {
    await loadComponent("hero1", "./components/hero1.html");
    await loadComponent("allCenter", "./components/allCenter.html");
    await loadComponent("eyeCareCenter", "./components/eyeCareSection.html");

    // ✅ IMPORTANT: call after everything loaded
    setTimeout(() => {
      initTabs();
    }, 0);
  }
}

// ================= INIT =================
async function init() {
  // Navbar (global)
  await loadComponent("navbar", "./components/navbar.html");

  // Default page
  await renderPage("homePage");
}
function initTabs() {
  const items = document.querySelectorAll(".acc-item");

  items.forEach((item) => {
    item.querySelector(".acc-trigger").onclick = () => {
      // Close all (single mode like Radix)
      items.forEach((i) => i.classList.remove("active"));

      // Open clicked
      item.classList.add("active");
    };
  });
}
init();
