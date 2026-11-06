"use strict";

/* Native horizontal scrolling: touch, trackpad, keyboard, arrows and mouse drag. */
(() => {
  const section = document.querySelector(".clients");
  if (!section) return;
  const track = section.querySelector(".clients-track");
  const cards = [...section.querySelectorAll(".client-card")];
  const controls = section.querySelector(".clients-navigation");
  const previous = section.querySelector("[data-clients-previous]");
  const next = section.querySelector("[data-clients-next]");
  let pending = false;
  let drag = null;

  function instant() {
    return document.documentElement.dataset.motion === "reduced";
  }
  function update() {
    pending = false;
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    const position = Math.max(0, Math.min(max, track.scrollLeft));
    previous.disabled = position < 2;
    next.disabled = position >= max - 2;
    section.style.setProperty("--clients-progress", max ? position / max : 0);
    const visible = track.scrollWidth
      ? track.clientWidth / track.scrollWidth
      : 1;
    section.style.setProperty("--clients-visible", `${visible * 100}%`);
    section.style.setProperty(
      "--clients-travel",
      `${((1 - visible) / visible) * 100}%`,
    );
  }
  function requestUpdate() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  }
  function move(direction) {
    const width = cards[0]?.getBoundingClientRect().width || track.clientWidth;
    const target =
      Math.round(track.scrollLeft / width) * width + direction * width;
    track.scrollTo({
      left: target,
      behavior: instant() ? "instant" : "smooth",
    });
  }
  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  track.addEventListener("scroll", requestUpdate, { passive: true });
  track.addEventListener("keydown", (event) => {
    if (event.target !== track) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      track.scrollTo({
        left: event.key === "Home" ? 0 : track.scrollWidth,
        behavior: instant() ? "instant" : "smooth",
      });
    }
  });
  track.addEventListener("pointerdown", (event) => {
    if (
      event.pointerType !== "mouse" ||
      event.button !== 0 ||
      event.target.closest("a, button")
    )
      return;
    drag = {
      id: event.pointerId,
      x: event.clientX,
      left: track.scrollLeft,
      moved: false,
    };
  });
  track.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const distance = event.clientX - drag.x;
    if (!drag.moved && Math.abs(distance) < 5) return;
    if (!drag.moved) {
      drag.moved = true;
      track.classList.add("is-dragging");
      track.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    track.scrollLeft = drag.left - distance;
  });
  function finishDrag(event) {
    if (!drag || event.pointerId !== drag.id) return;
    const pointer = drag.id;
    drag = null;
    track.classList.remove("is-dragging");
    if (track.hasPointerCapture(pointer)) track.releasePointerCapture(pointer);
    requestUpdate();
  }
  track.addEventListener("pointerup", finishDrag);
  track.addEventListener("pointercancel", finishDrag);
  track.addEventListener("lostpointercapture", finishDrag);
  track.addEventListener("pointerleave", (event) => {
    if (drag && !drag.moved) finishDrag(event);
  });
  window.addEventListener("blur", () => {
    drag = null;
    track.classList.remove("is-dragging");
  });
  const observer = new ResizeObserver(requestUpdate);
  observer.observe(track);
  controls.hidden = false;
  update();
})();
