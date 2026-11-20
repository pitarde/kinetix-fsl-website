(() => {
  // Words the script puts on the page. The Filipino page (lang="fil") gets its own.
  const FIL = document.documentElement.lang === "fil";
  const T = FIL
    ? {
        openNav: "Buksan ang menu",
        closeNav: "Isara ang menu",
        theme: (name, next) => `Tema: ${name}. Lumipat sa ${next}`,
        themeTitle: (name) => `Tema: ${name}`,
        names: { system: "Awtomatiko", light: "Maliwanag", dark: "Madilim" },
        version: "Bersyon",
        pauseVideo: "I-pause ang video",
        playVideo: "I-play ang video",
      }
    : {
        openNav: "Open navigation",
        closeNav: "Close navigation",
        theme: (name, next) => `Theme: ${name}. Switch to ${next}`,
        themeTitle: (name) => `Theme: ${name}`,
        names: { system: "Auto", light: "Light", dark: "Dark" },
        version: "Version",
        pauseVideo: "Pause the video",
        playVideo: "Play the video",
      };
  const nav = document.querySelector("#primary-nav");
  const menu = document.querySelector(".menu-toggle");
  const closeMenu = () => {
    menu?.setAttribute("aria-expanded", "false");
    menu?.setAttribute("aria-label", T.openNav);
    nav?.classList.remove("is-open");
  };
  menu?.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? T.closeNav : T.openNav);
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
  const names = T.names;
  const label = () => {
    const current = document.documentElement.dataset.theme || "system";
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    themeButton?.setAttribute("aria-label", T.theme(names[current], names[next]));
    themeButton?.setAttribute("title", T.themeTitle(names[current]));
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

  // Looping app videos: they play only while on screen, each has its own pause
  // button, and they stay still (poster picture) for people who ask for less motion.
  (() => {
    const videos = document.querySelectorAll("video.loop-video");
    if (!videos.length) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
    const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
    videos.forEach((video) => {
      let userPaused = reduce.matches;
      let visible = false;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "vid-toggle";
      const sync = () => {
        button.innerHTML = userPaused ? PLAY : PAUSE;
        button.setAttribute("aria-label", userPaused ? T.playVideo : T.pauseVideo);
        if (userPaused || !visible) video.pause();
        else video.play().catch(() => {});
      };
      button.addEventListener("click", () => {
        userPaused = !userPaused;
        sync();
      });
      video.insertAdjacentElement("afterend", button);
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        sync();
      }, { threshold: 0.35 }).observe(video);
      sync();
    });
  })();

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
      toggle.textContent = paused ? toggle.dataset.play || "Play the screenshots" : toggle.dataset.pause || "Pause the screenshots";
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
    const plain = release.version.replace(/^Version\s+/, "");
    const v = el.dataset.releaseVersion === "short" ? plain : `${T.version} ${plain}`;
    el.textContent = `${v} · ${release.size}`;
  });
  const checksum = document.querySelector(".release-checksum");
  if (checksum) {
    checksum.hidden = false;
    checksum.textContent = release.sha256;
  }
})();
