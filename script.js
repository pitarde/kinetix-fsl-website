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
    menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
  });
  nav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav?.classList.contains("is-open")) {
      closeMenu();
      menu.focus();
    }
  });

  // Theme: system, light, dark (same storage key as before)
  const themeButton = document.querySelector(".theme-toggle");
  const themes = ["system", "light", "dark"];
  const names = { system: "Auto", light: "Light", dark: "Dark" };
  const label = () => {
    const current = document.documentElement.dataset.theme || "system";
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    themeButton?.setAttribute("aria-label", `Theme: ${names[current]}. Switch to ${names[next]}`);
    themeButton?.setAttribute("title", `Theme: ${names[current]}`);
    const text = themeButton?.querySelector(".theme-label");
    if (text) text.textContent = names[current];
  };
  label();
  themeButton?.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme || "system";
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("kinetix-theme", next); } catch {}
    label();
  });

  // Screenshot carousel: moves slowly and loops. It stops on hover or keyboard
  // focus, has a pause button, and stays still for people who ask for less motion.
  (() => {
    const carousel = document.querySelector(".carousel");
    const track = carousel?.querySelector(".track");
    const toggle = document.querySelector(".rail-toggle");
    if (!carousel || !track || !toggle) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    Array.from(track.children).forEach((item) => {
      const copy = item.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      copy.querySelectorAll("img").forEach((img) => img.setAttribute("alt", ""));
      track.appendChild(copy);
    });
    carousel.classList.add("is-moving");
    carousel.querySelector(".rail").removeAttribute("tabindex");
    carousel.querySelector(".rail").removeAttribute("role");
    toggle.hidden = false;
    const setPaused = (paused) => {
      carousel.classList.toggle("is-paused", paused);
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.textContent = paused ? "Play the screenshots" : "Pause the screenshots";
    };
    setPaused(reduce.matches);
    toggle.addEventListener("click", () => setPaused(!carousel.classList.contains("is-paused")));
  })();

  // Release data comes from release.js (written by the release workflow).
  const release = window.KINETIX_RELEASE || {};
  let safeUrl = false;
  try { safeUrl = new URL(release.apkUrl).protocol === "https:"; } catch {}
  const ready =
    release.available === true && safeUrl &&
    Boolean(release.version && release.size) &&
    /^[a-f0-9]{64}$/i.test(release.sha256 || "");
  if (!ready) return;

  document.querySelectorAll(".install-link").forEach((link) => {
    // The header button jumps to the download details; the hero and download
    // buttons start the download.
    if (!link.closest(".site-header")) link.href = release.apkUrl;
  });
  document.querySelectorAll("[data-release-version]").forEach((el) => {
    const v = el.dataset.releaseVersion === "short" ? release.version.replace(/^Version\s+/, "") : release.version;
    el.textContent = `${v} · ${release.size}`;
  });
  const checksum = document.querySelector(".release-checksum");
  if (checksum) {
    checksum.hidden = false;
    checksum.textContent = release.sha256;
  }
})();
