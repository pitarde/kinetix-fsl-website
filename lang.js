// Language switch without a visible /fil/ address.
// At "/" the Filipino page is fetched and swapped in place, so the address stays "https://kinetixfsl.app/".
// /fil/ still exists (links, search engines, no-JavaScript visitors). The choice is remembered in localStorage.
(() => {
  const KEY = "kinetix-lang";
  const get = () => {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  };
  const set = (value) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
  };
  const home = location.pathname === "/" || location.pathname === "/index.html";
  const isFil = document.documentElement.lang === "fil";

  const swap = async (target) => {
    const response = await fetch(target, { credentials: "same-origin" });
    if (!response.ok) throw new Error("status " + response.status);
    const html = await response.text();
    document.open();
    document.write(html);
    document.close();
  };

  if (!home && isFil) set("fil"); // someone who opened /fil/ chose Filipino

  const link = document.querySelector("a.lang-switch");
  if (link)
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button) return;
      set(isFil ? "en" : "fil");
      if (!home) return; // on /fil/ the link is a plain link to "/"
      event.preventDefault();
      swap(isFil ? "/" : "/fil/").catch(() => {
        location.href = link.href;
      });
    });

  if (home && !isFil && get() === "fil")
    swap("/fil/").catch(() => document.documentElement.classList.remove("lang-swapping"));
})();
