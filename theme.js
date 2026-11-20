(() => {
  let theme = "system";
  try {
    theme = localStorage.getItem("kinetix-theme") || "system";
  } catch {}
  if (!["light", "dark", "system"].includes(theme)) theme = "system";
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.add("js");
})();

// Language: a person who chose Filipino keeps seeing it at the home address "/" (lang.js swaps the page in place),
// so the English page stays hidden until the swap is done. Falls back to showing it after 3 seconds.
(() => {
  let lang = null;
  try {
    lang = localStorage.getItem("kinetix-lang");
  } catch {}
  const home = location.pathname === "/" || location.pathname === "/index.html";
  if (lang === "fil" && home && document.documentElement.lang === "en") {
    document.documentElement.classList.add("lang-swapping");
    setTimeout(() => document.documentElement.classList.remove("lang-swapping"), 3000);
  }
})();
