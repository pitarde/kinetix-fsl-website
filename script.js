(() => {
  const nav = document.querySelector("#primary-nav");
  const menu = document.querySelector(".menu-toggle");
  const closeMenu = () => {
    menu?.setAttribute("aria-expanded", "false");
    menu?.setAttribute("aria-label", "Open navigation");
    nav?.classList.remove("is-open");
  };
  menu?.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    nav.classList.toggle("is-open", open);
  });
  nav
    ?.querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav?.classList.contains("is-open")) {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-wrap")) closeMenu();
  });
  const themeButton = document.querySelector(".theme-toggle");
  const themes = ["system", "light", "dark"];
  const updateThemeLabel = () => {
    const current = document.documentElement.dataset.theme || "system";
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    const visibleLabel =
      current === "system" ? "Auto" : current === "light" ? "Light" : "Dark";
    const label = `Theme: ${visibleLabel}. Switch to ${next}`;
    themeButton?.setAttribute("aria-label", label);
    themeButton?.setAttribute("title", label);
    const text = themeButton?.querySelector(".theme-label");
    if (text) text.textContent = `Theme: ${visibleLabel}`;
  };
  updateThemeLabel();
  themeButton?.addEventListener("click", () => {
    const next =
      themes[
        (themes.indexOf(document.documentElement.dataset.theme) + 1) %
          themes.length
      ];
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("kinetix-theme", next);
    } catch {}
    updateThemeLabel();
  });
  const dialog = document.querySelector("#coming-soon");
  let trigger;
  const release = window.KINETIX_RELEASE || {};
  let safeUrl = false;
  try {
    safeUrl = new URL(release.apkUrl).protocol === "https:";
  } catch {}
  const ready =
    release.available === true &&
    safeUrl &&
    Boolean(release.version && release.size) &&
    /^[a-f0-9]{64}$/i.test(release.sha256 || "");
  document.querySelectorAll(".install-link").forEach((link) => {
    if (ready) {
      link.href = release.apkUrl;
      link.querySelector("span").textContent = "Download APK";
      return;
    }
    link.setAttribute("aria-haspopup", "dialog");
    link.addEventListener("click", (e) => {
      if (!dialog?.showModal) return;
      e.preventDefault();
      trigger = link;
      dialog.showModal();
      document.body.classList.add("dialog-open");
    });
  });
  dialog
    ?.querySelectorAll(".dialog-close, .dialog-done")
    .forEach((button) =>
      button.addEventListener("click", () => dialog.close()),
    );
  dialog?.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        dialog.close();
    }
  });
  dialog?.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    trigger?.focus();
  });
  if (ready) {
    document
      .querySelectorAll("[data-release-status]")
      .forEach((el) => (el.textContent = "Official Android APK"));
    document
      .querySelectorAll("[data-release-availability]")
      .forEach((el) => (el.textContent = "Available now"));
    document
      .querySelectorAll("[data-release-version]")
      .forEach(
        (el) => (el.textContent = `${release.version} · ${release.size}`),
      );
    const checksum = document.querySelector(".release-checksum");
    if (checksum) {
      checksum.hidden = false;
      checksum.textContent = `SHA-256: ${release.sha256}`;
    }
    const footnote = document.querySelector(".release-footnote");
    if (footnote)
      footnote.textContent = "Check the release details before installing.";
  }
})();

// section-location-observer: keep location feedback aligned with the reading area.
(() => {
  const links = [...document.querySelectorAll('#primary-nav a[href^="#"]')];
  const sections = links
    .map((link) => ({
      link,
      section: document.querySelector(link.getAttribute("href")),
    }))
    .filter((item) => item.section);
  if (!sections.length) return;

  const update = () => {
    const marker = window.innerHeight * 0.3;
    const current = sections.find((item) => {
      const rect = item.section.getBoundingClientRect();
      return rect.top <= marker && rect.bottom > marker;
    });
    sections.forEach((item) => {
      if (item === current) item.link.setAttribute("aria-current", "location");
      else item.link.removeAttribute("aria-current");
    });
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
