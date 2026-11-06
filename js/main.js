"use strict";

/* Content configuration. Add your real contact details before publication. */
const siteConfig = {
  email: "",
  phone: "",
  socialLinks: [
    // { label: 'Behance', url: 'https://www.behance.net/your-profile' },
    // { label: 'LinkedIn', url: 'https://www.linkedin.com/in/your-profile/' },
  ],
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const header = document.querySelector(".header");
let previousHeaderY = Math.max(0, window.scrollY);
let headerDirection = 0;
let headerTravel = 0;

/* A little travel hysteresis prevents the header flickering on small reversals. */
function updateHeader() {
  const maxY = Math.max(0, document.documentElement.scrollHeight - innerHeight);
  const y = Math.max(0, Math.min(maxY, window.scrollY));
  const delta = y - previousHeaderY;
  previousHeaderY = y;
  header.classList.toggle("is-at-top", y <= 16);
  const introRect = workIntro.getBoundingClientRect();
  const headerLine = header.offsetHeight / 2;
  header.classList.toggle(
    "is-over-light-intro",
    workIntro.classList.contains("is-revealed") &&
      introRect.top <= headerLine &&
      introRect.bottom > headerLine,
  );
  const pinned =
    menuToggle.getAttribute("aria-expanded") === "true" ||
    !!header.querySelector(":focus-visible");
  if (y < header.offsetHeight + 32 || pinned) {
    header.classList.remove("is-hidden");
    headerDirection = 0;
    headerTravel = 0;
    return;
  }
  if (!delta) return;
  const direction = Math.sign(delta);
  headerTravel =
    direction === headerDirection
      ? headerTravel + Math.abs(delta)
      : Math.abs(delta);
  headerDirection = direction;
  if (headerTravel >= (direction < 0 ? 8 : 18)) {
    header.classList.toggle("is-hidden", direction > 0);
    headerTravel = 0;
  }
}
header.addEventListener("focusin", () => {
  header.classList.remove("is-hidden");
  headerTravel = 0;
});

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".header")) closeMenu();
});
window.matchMedia("(min-width: 1051px)").addEventListener("change", closeMenu);

/* The theme bootstrap has already set the root attribute before first paint. */
const themeToggle = document.querySelector(".theme-toggle");
function updateThemeControl() {
  const light = document.documentElement.dataset.theme === "light";
  themeToggle.setAttribute("aria-checked", String(light));
  themeToggle.title = light ? "Włącz tryb ciemny" : "Włącz tryb jasny";
  document.querySelector('meta[name="theme-color"]').content = light
    ? "#ffffff"
    : "#101110";
}
themeToggle.addEventListener("click", () => {
  const theme =
    document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("augustynowicz-theme", theme);
  } catch {
    /* The current selection still applies. */
  }
  updateThemeControl();
  requestSceneUpdate();
});
updateThemeControl();

/* Filters retain the large project scenes in normal document order. */
const projectCards = [...document.querySelectorAll(".case-study")];
const workIntro = document.querySelector(".work-intro");
let workIntroRevealed = false;
const projectNavigation = document.querySelector(".project-navigation");
const previousProject = document.querySelector("#previous-project");
const nextProject = document.querySelector("#next-project");
let navigationTarget = null;
let currentStopIndex = 0;
const precedingSections = [
  ...document.querySelectorAll(".hero, #o-mnie, .work-intro"),
];
const followingSections = [
  ...document.querySelectorAll("#klienci, #specjalizacje, #proces, #kontakt"),
];

function navigationStops(visible) {
  return [...precedingSections, ...visible, ...followingSections];
}
function navigationLabel(target, direction) {
  if (!target) return direction < 0 ? "Poprzednia sekcja" : "Następna sekcja";
  const project = target.classList.contains("case-study");
  const name = target
    .querySelector(
      project ? "h3" : target === workIntro ? "#work-title" : "h1, h2",
    )
    .innerText.replace(/\s+/g, " ")
    .trim();
  const action = project
    ? direction < 0
      ? "Poprzedni projekt"
      : "Następny projekt"
    : direction < 0
      ? "Poprzednia sekcja"
      : "Następna sekcja";
  return `${action}: ${name}`;
}

function updateProjectNumbers() {
  const visible = projectCards.filter((card) => !card.hidden);
  visible.forEach((card, index) => {
    const number = card.querySelector(".project-number");
    number.querySelector("[data-project-index]").textContent = String(
      index + 1,
    ).padStart(2, "0"); // taste-skill-ignore: requested project counters
    number.querySelector("[data-project-total]").textContent = String(
      visible.length,
    ).padStart(2, "0"); // taste-skill-ignore: requested project counters
    number.setAttribute(
      "aria-label",
      `Projekt ${index + 1} z ${visible.length}`,
    );
  });
}

function updateProjectNavigation(visible) {
  const stops = navigationStops(visible);
  // Short section introductions must remain their own stop when aligned to the top.
  const focusLine = Math.min(window.innerHeight * 0.2, 120);
  let index = 0;
  stops.forEach((stop, position) => {
    if (stop.getBoundingClientRect().top <= focusLine) index = position;
  });
  if (navigationTarget) {
    if (Math.abs(navigationTarget.getBoundingClientRect().top) < 3)
      navigationTarget = null;
    else index = stops.indexOf(navigationTarget);
  }
  currentStopIndex = index;
  previousProject.disabled = index <= 0;
  nextProject.disabled = !stops.length || index >= stops.length - 1;
  previousProject.title = navigationLabel(stops[index - 1], -1);
  nextProject.title = navigationLabel(stops[index + 1], 1);
  previousProject.setAttribute("aria-label", previousProject.title);
  nextProject.setAttribute("aria-label", nextProject.title);
}

function navigateProject(direction) {
  const visible = projectCards.filter((card) => !card.hidden);
  const stops = navigationStops(visible);
  const base = navigationTarget
    ? stops.indexOf(navigationTarget)
    : currentStopIndex;
  const target = stops[base + direction];
  if (!target) return;
  scrollToStop(target);
}
function scrollToStop(target) {
  navigationTarget = target;
  updateProjectNavigation(projectCards.filter((card) => !card.hidden));
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY,
    behavior: motionEnabled ? "smooth" : "instant",
  });
}
previousProject.addEventListener("click", () => navigateProject(-1));
nextProject.addEventListener("click", () => navigateProject(1));
projectNavigation.hidden = false;
updateProjectNumbers();
window.addEventListener(
  "wheel",
  () => {
    navigationTarget = null;
  },
  { passive: true },
);
window.addEventListener(
  "touchstart",
  () => {
    navigationTarget = null;
  },
  { passive: true },
);
document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest(".project-navigation")) navigationTarget = null;
});
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("is-active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach((card) => {
      card.hidden =
        button.dataset.filter !== "all" &&
        !card.dataset.category.split(" ").includes(button.dataset.filter);
    });
    const count = projectCards.filter((card) => !card.hidden).length;
    document.querySelector("#filter-status").textContent =
      count +
      (count === 1 ? " projekt demonstracyjny" : " projekty demonstracyjne");
    navigationTarget = null;
    updateProjectNumbers();
    requestSceneUpdate();
    const first = projectCards.find((card) => !card.hidden);
    if (first) {
      // Start after the filtered layout and any native anchor scroll settle.
      requestAnimationFrame(() => {
        first.querySelector("h3").focus({ preventScroll: true });
        scrollToStop(first);
      });
    }
  });
});

/* Motion respects the system preference until the visitor explicitly changes it. */
const motionToggle = document.querySelector(".motion-toggle");
let savedMotion = null;
try {
  savedMotion = localStorage.getItem("augustynowicz-motion");
} catch {
  /* Storage may be unavailable on local files. */
}
let motionEnabled =
  savedMotion === "full" ||
  (savedMotion !== "reduced" && !reducedMotion.matches);

const serviceAnimations = new Map();
let frameRequested = false;
const cursorLight = document.querySelector(".cursor-light");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
let lightFrame = 0;
let lightVisible = false;
let lightX = 0,
  lightY = 0,
  targetX = 0,
  targetY = 0,
  previousLightTime = 0;

function hideCursorLight() {
  cursorLight.classList.remove("is-visible");
  lightVisible = false;
  if (lightFrame) cancelAnimationFrame(lightFrame);
  lightFrame = 0;
  previousLightTime = 0;
}
function moveCursorLight(time) {
  const delta = Math.min(time - (previousLightTime || time - 16), 50);
  previousLightTime = time;
  const easing = 1 - Math.exp(-delta / 65);
  lightX += (targetX - lightX) * easing;
  lightY += (targetY - lightY) * easing;
  cursorLight.style.transform = `translate3d(${lightX.toFixed(2)}px,${lightY.toFixed(2)}px,0)`;
  if (Math.abs(targetX - lightX) + Math.abs(targetY - lightY) > 0.2)
    lightFrame = requestAnimationFrame(moveCursorLight);
  else {
    lightFrame = 0;
    previousLightTime = 0;
  }
}
document.addEventListener(
  "pointermove",
  (event) => {
    if (!motionEnabled || !finePointer.matches || event.pointerType === "touch")
      return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (!lightVisible) {
      lightX = targetX;
      lightY = targetY;
      lightVisible = true;
      cursorLight.classList.add("is-visible");
    }
    if (!lightFrame) lightFrame = requestAnimationFrame(moveCursorLight);
  },
  { passive: true },
);
document.documentElement.addEventListener("pointerleave", hideCursorLight);
window.addEventListener("blur", hideCursorLight);
finePointer.addEventListener("change", hideCursorLight);

function updateMotionPreference() {
  document.documentElement.dataset.motion = motionEnabled ? "full" : "reduced";
  motionToggle.setAttribute("aria-pressed", String(motionEnabled));
  motionToggle.setAttribute(
    "aria-label",
    motionEnabled ? "Ogranicz animacje" : "Włącz pełne animacje",
  );
  motionToggle.querySelector("span").textContent = motionEnabled
    ? "Wyłącz"
    : "Włącz";
  finishServiceAnimations();
  if (!motionEnabled) hideCursorLight();
  document.getAnimations().forEach((animation) => {
    if (!motionEnabled) animation.cancel();
  });
  requestSceneUpdate();
}
motionToggle.addEventListener("click", () => {
  motionEnabled = !motionEnabled;
  savedMotion = motionEnabled ? "full" : "reduced";
  try {
    localStorage.setItem("augustynowicz-motion", savedMotion);
  } catch {
    /* The current choice still applies. */
  }
  updateMotionPreference();
});
reducedMotion.addEventListener("change", () => {
  if (savedMotion) return;
  motionEnabled = !reducedMotion.matches;
  updateMotionPreference();
});

/* One passive scroll listener and one frame per update; no scroll hijacking. */
function requestSceneUpdate() {
  if (frameRequested) return;
  frameRequested = true;
  requestAnimationFrame(updateScenes);
}
/* One entry gesture starts the complete one-second palette change. */
function updateWorkIntro(height) {
  const top = workIntro.getBoundingClientRect().top;
  const ready = workIntro.classList.contains("is-palette-ready");
  const forcedLight =
    document.documentElement.dataset.theme === "light" || !motionEnabled;
  let revealed = workIntroRevealed;
  if (forcedLight) revealed = true;
  else if (top <= height - 16) revealed = true;
  else if (top >= height - 4) revealed = false;
  // A small hysteresis prevents repeated restarts at the viewport edge.
  if (ready && revealed === workIntroRevealed) return;
  workIntroRevealed = revealed;
  workIntro.classList.toggle("is-revealed", revealed);
  if (!ready) {
    // Commit the initial palette before enabling fades, including restored scroll positions.
    void workIntro.offsetWidth;
    workIntro.classList.add("is-palette-ready");
  }
}
function updateScenes() {
  frameRequested = false;
  const height = window.innerHeight;
  updateWorkIntro(height);
  updateHeader();
  const desktop = window.innerWidth > 800;
  const visible = projectCards.filter((card) => !card.hidden);
  updateProjectNavigation(visible);
  visible.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.bottom < -100 || rect.top > height + 100) return;
    const progress = Math.max(
      -1,
      Math.min(1, (height / 2 - (rect.top + rect.height / 2)) / height),
    );
    card.querySelectorAll("[data-parallax]").forEach((piece) => {
      const distance = motionEnabled
        ? progress * Number(piece.dataset.parallax) * (desktop ? 65 : 25)
        : 0;
      piece.style.setProperty("--parallax-y", distance.toFixed(2) + "px");
    });
  });
}
window.addEventListener("scroll", requestSceneUpdate, { passive: true });
window.addEventListener("resize", requestSceneUpdate, { passive: true });
window.addEventListener("pageshow", requestSceneUpdate);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) requestSceneUpdate();
  else hideCursorLight();
});

/* Exactly one service can be active; closing and opening remain smooth. */
const serviceDetails = [...document.querySelectorAll(".service-list details")];
// Native exclusive grouping remains available when JavaScript is disabled.
serviceDetails.forEach((details) => details.removeAttribute("name"));

function finishServiceAnimations() {
  serviceAnimations.forEach(({ animation, expanded }, details) => {
    animation.cancel();
    details.open = expanded;
    details.classList.remove("is-closing");
    details.querySelector(".service-body").style.height = "";
  });
  serviceAnimations.clear();
}

function setServiceExpanded(details, expanded) {
  const body = details.querySelector(".service-body");
  const previous = serviceAnimations.get(details);
  if (!details.open && !expanded && !previous) return;
  const start = details.open ? body.getBoundingClientRect().height : 0;
  if (previous) previous.animation.cancel();
  if (!motionEnabled || !body.animate) {
    details.open = expanded;
    details.classList.remove("is-closing");
    body.style.height = "";
    serviceAnimations.delete(details);
    return;
  }
  details.classList.toggle("is-closing", !expanded);
  details.open = true;
  body.style.height = "auto";
  const end = expanded ? body.scrollHeight : 0;
  body.style.height = start + "px";
  const animation = body.animate(
    [{ height: start + "px" }, { height: end + "px" }],
    { duration: 420, easing: "cubic-bezier(.22,.8,.22,1)", fill: "both" },
  );
  serviceAnimations.set(details, { animation, expanded });
  animation.onfinish = () => {
    if (serviceAnimations.get(details)?.animation !== animation) return;
    details.open = expanded;
    details.classList.remove("is-closing");
    body.style.height = "";
    animation.cancel();
    serviceAnimations.delete(details);
  };
}

serviceDetails.forEach((details) => {
  details.addEventListener("click", (event) => {
    // Keep links, media controls and text selection usable inside the whole-card hit area.
    if (
      event.target.closest("a, button, input, select, textarea, video, audio")
    )
      return;
    if (!event.target.closest("summary") && window.getSelection()?.toString())
      return;
    event.preventDefault();
    const previous = serviceAnimations.get(details);
    const expanded = previous ? !previous.expanded : !details.open;
    if (expanded)
      serviceDetails.forEach((other) => {
        if (other !== details) setServiceExpanded(other, false);
      });
    setServiceExpanded(details, expanded);
  });
});
window.addEventListener("resize", finishServiceAnimations, { passive: true });

updateMotionPreference();

/* Contact values are optional; no invented address, number or profile. */
if (siteConfig.email) {
  const email = document.createElement("a");
  email.href =
    "mailto:" +
    siteConfig.email +
    "?subject=" +
    encodeURIComponent("Porozmawiajmy o projekcie");
  email.textContent = siteConfig.email;
  document.querySelector('[data-contact="email"]').replaceChildren(email);
}
if (siteConfig.phone) {
  const phone = document.createElement("a");
  phone.href = "tel:" + siteConfig.phone.replace(/[^+0-9]/g, "");
  phone.textContent = siteConfig.phone;
  document.querySelector('[data-contact="phone"]').replaceChildren(phone);
}
if (siteConfig.socialLinks.length) {
  const socials = document.createElement("div");
  socials.className = "contact-socials";
  siteConfig.socialLinks.forEach(({ label, url }) => {
    if (!url.startsWith("https://")) return;
    const icon = [...document.querySelectorAll("[data-social]")].find(
      (item) => item.dataset.social === label.toLowerCase(),
    );
    if (icon) {
      const profile = document.createElement("a");
      profile.className = icon.className;
      profile.href = url;
      profile.target = "_blank";
      profile.rel = "noopener noreferrer";
      profile.setAttribute("aria-label", label + " — otwórz profil");
      profile.title = label;
      profile.append(...icon.childNodes);
      icon.replaceWith(profile);
    }
    const link = document.createElement("a");
    link.href = url;
    link.textContent = label;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    socials.append(link);
  });
  if (socials.childElementCount)
    document.querySelector('[data-contact="social"]').replaceChildren(socials);
}
document.querySelector("#year").textContent = new Date().getFullYear();
