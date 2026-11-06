"use strict";

/* Shared interactions for the standalone, static case-study pages. */
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let savedMotion = null;
  try {
    savedMotion = localStorage.getItem("augustynowicz-motion");
  } catch {
    /* Local files remain usable. */
  }
  function applyMotion() {
    root.dataset.motion =
      savedMotion === "full" ||
      (savedMotion !== "reduced" && !reducedMotion.matches)
        ? "full"
        : "reduced";
  }
  applyMotion();
  reducedMotion.addEventListener("change", applyMotion);

  function updateThemeControl() {
    const light = root.dataset.theme === "light";
    toggle.setAttribute("aria-checked", String(light));
    toggle.title = light ? "Włącz tryb ciemny" : "Włącz tryb jasny";
    document.querySelector('meta[name="theme-color"]').content = light
      ? "#ffffff"
      : "#101110";
  }
  toggle.addEventListener("click", () => {
    const theme = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = theme;
    try {
      localStorage.setItem("augustynowicz-theme", theme);
    } catch {
      /* Apply the current choice without storage. */
    }
    updateThemeControl();
  });
  updateThemeControl();

  // Keep settings consistent when a visitor switches between portfolio tabs.
  window.addEventListener("storage", (event) => {
    if (event.key === "augustynowicz-theme") {
      root.dataset.theme = event.newValue === "light" ? "light" : "dark";
      updateThemeControl();
    }
    if (event.key === "augustynowicz-motion") {
      savedMotion = event.newValue;
      applyMotion();
    }
  });

  let requested = false;
  function updateProgress() {
    requested = false;
    const length = document.documentElement.scrollHeight - window.innerHeight;
    const progress =
      length > 0 ? Math.min(1, Math.max(0, window.scrollY / length)) : 0;
    root.style.setProperty("--reading-progress", progress.toFixed(4));
  }
  function requestProgress() {
    if (requested) return;
    requested = true;
    requestAnimationFrame(updateProgress);
  }
  window.addEventListener("scroll", requestProgress, { passive: true });
  window.addEventListener("resize", requestProgress, { passive: true });
  window.addEventListener("pageshow", requestProgress);
  requestProgress();
  document.querySelector("[data-year]").textContent = new Date().getFullYear();
})();
