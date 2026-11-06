"use strict";

/* Original procedural satin: no video, textures, libraries or external requests. */
(() => {
  const hero = document.querySelector(".hero");
  const canvas = document.querySelector("#hero-canvas");
  const root = document.documentElement;
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
  });
  let visible = true;
  let frame = 0;
  let elapsed = 0;
  let lastTime = 0;
  let lastPaint = 0;
  let ready = false;
  let program;
  let uniforms;
  let pointerX = 0,
    pointerY = 0,
    targetX = 0,
    targetY = 0;

  const vertex = `
    attribute vec2 aPosition;
    void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
  `;
  const fragment = `
    precision mediump float;
    uniform vec2 uResolution;
    uniform vec2 uPointer;
    uniform float uTime;
    uniform float uLight;
    void main() {
      vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
      vec2 p = uv * 0.85 + vec2(0.35, -0.3) + uPointer * 0.035;
      float t = uTime * 0.055;
      for (int i = 0; i < 3; i++) {
        float k = float(i) + 1.0;
        p += vec2(sin(p.y * 1.25 + t + k), cos(p.x * 1.35 - t * 0.75 + k)) * (0.20 / k);
      }
      float field = p.y * 1.6 + sin(p.x * 1.65 + t) * 1.05 + cos(p.y * 1.3 - p.x * 0.6 + t * 0.7) * 0.6;
      float silk = 0.5 + 0.5 * sin(field * 2.2);
      float body = pow(silk, 3.0);
      float edge = pow(silk, 28.0);
      float glow = pow(silk, 9.0);
      float sides = smoothstep(0.1, 1.3, length(uv * vec2(0.55, 0.8) - vec2(0.1, 0.15)));
      float topLight = smoothstep(0.32, 0.95, gl_FragCoord.y / uResolution.y);
      float light = (body * 0.14 + glow * 0.10 + edge * 0.25) * (0.24 + sides * 0.76) * topLight;
      vec3 dark = vec3(0.063, 0.067, 0.063) + vec3(0.8, 0.72, 0.17) * light;
      vec3 pale = mix(vec3(1.0), vec3(0.78, 0.72, 0.28), light * 0.75);
      float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453) - 0.5;
      vec3 color = mix(dark, pale, uLight) + grain * mix(0.012, 0.004, uLight) * topLight;
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function initialize() {
    if (!gl) return;
    const shaders = [
      compile(gl.VERTEX_SHADER, vertex),
      compile(gl.FRAGMENT_SHADER, fragment),
    ];
    if (shaders.some((shader) => !shader)) return;
    program = gl.createProgram();
    shaders.forEach((shader) => gl.attachShader(program, shader));
    gl.linkProgram(program);
    shaders.forEach((shader) => gl.deleteShader(shader));
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    const vertices = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    uniforms = Object.fromEntries(
      ["uResolution", "uPointer", "uTime", "uLight"].map((name) => [
        name,
        gl.getUniformLocation(program, name),
      ]),
    );
    ready = true;
    hero.classList.add("has-webgl");
    resize();
    updatePlayback();
  }

  function paint() {
    if (!ready) return;
    gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
    gl.uniform2f(uniforms.uPointer, pointerX, pointerY);
    gl.uniform1f(uniforms.uTime, elapsed);
    gl.uniform1f(uniforms.uLight, root.dataset.theme === "light" ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function resize() {
    const { width, height } = hero.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 1.25, 1200 / width);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    if (ready) gl.viewport(0, 0, canvas.width, canvas.height);
    paint();
  }

  function tick(time) {
    elapsed += Math.min((time - (lastTime || time)) / 1000, 0.06);
    lastTime = time;
    if (time - lastPaint >= 1000 / 30) {
      pointerX += (targetX - pointerX) * 0.025;
      pointerY += (targetY - pointerY) * 0.025;
      paint();
      lastPaint = time;
    }
    frame = requestAnimationFrame(tick);
  }

  function updatePlayback() {
    const running =
      root.dataset.motion === "full" && visible && !document.hidden;
    hero.classList.toggle("is-ambient-running", running);
    if (running && ready && !frame) frame = requestAnimationFrame(tick);
    if (!running && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    if (!running) {
      lastTime = 0;
      paint();
    }
  }

  hero.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType === "touch" || root.dataset.motion !== "full")
        return;
      const box = hero.getBoundingClientRect();
      targetX = ((event.clientX - box.left) / box.width - 0.5) * 2;
      targetY = ((event.clientY - box.top) / box.height - 0.5) * 2;
    },
    { passive: true },
  );
  hero.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
  });
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    updatePlayback();
  }).observe(hero);
  new ResizeObserver(resize).observe(hero);
  new MutationObserver(() => {
    paint();
    updatePlayback();
  }).observe(root, {
    attributes: true,
    attributeFilter: ["data-theme", "data-motion"],
  });
  document.addEventListener("visibilitychange", updatePlayback);
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    ready = false;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    hero.classList.remove("has-webgl");
  });
  canvas.addEventListener("webglcontextrestored", initialize);
  initialize();
  updatePlayback();
})();
