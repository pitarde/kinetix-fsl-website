(() => {
  let theme = "system";
  try {
    theme = localStorage.getItem("kinetix-theme") || "system";
  } catch {}
  if (!["light", "dark", "system"].includes(theme)) theme = "system";
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.add("js");
})();
