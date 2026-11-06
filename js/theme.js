/* Apply the saved theme before CSS paints, including when opened as a local file. */
(() => {
  let theme = "dark";
  try {
    if (localStorage.getItem("augustynowicz-theme") === "light")
      theme = "light";
  } catch {
    /* A local file can still use the default theme without storage. */
  }
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content =
    theme === "light" ? "#ffffff" : "#101110";
})();
