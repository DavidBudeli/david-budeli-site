// The readable HTML is the default experience for everyone, not a bot-only page.
// Import the cinematic app only when the user's device and preferences allow it.
const fallback = document.querySelector<HTMLElement>(".readable-shell");
const english = document.documentElement.lang.startsWith("en");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const readableMode = new URL(window.location.href).searchParams.get("view") === "readable";
let started = false;

const canUseWebGL = () => {
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
};

const actions = fallback?.querySelector(".readable-actions");
const control = document.createElement("button");
control.type = "button";
control.textContent = english ? "Enable 3D experience" : "Ativar experiência 3D";
const status = document.createElement("p");
status.setAttribute("role", "status");
actions?.append(control, status);

const restoreReadable = () => {
  // Reload the current route, so its own generated HTML remains accurate.
  const url = new URL(window.location.href);
  url.searchParams.set("view", "readable");
  window.location.replace(url);
};

const start = async () => {
  if (started) return;
  started = true;
  control.disabled = true;
  status.textContent = english
    ? "Loading the interactive experience. You can keep reading below."
    : "Carregando a experiência interativa. Você pode continuar lendo abaixo.";
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const interactive = await import("./interactive");
    await Promise.race([
      interactive.prepare(),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("3D loading timeout")), 20000);
      }),
    ]);
    if (timer) clearTimeout(timer);
    const app = interactive.mount(restoreReadable);
    fallback?.remove();
    document.body.classList.remove("is-loading");
    if (window.location.hash) {
      setTimeout(
        () => document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView(),
        300,
      );
    }
    window.addEventListener("webglcontextlost", restoreReadable, { once: true, capture: true });
    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) {
        app.unmount();
        restoreReadable();
      }
    });
  } catch (error) {
    if (timer) clearTimeout(timer);
    console.warn("Interactive experience unavailable; keeping the readable version.", error);
    document.body.classList.remove("is-loading");
    control.hidden = true;
    status.textContent = english
      ? "The accessible version remains available. All projects and contact links work without 3D."
      : "A versão acessível continua disponível. Todos os projetos e contatos funcionam sem 3D.";
  }
};

if (fallback?.dataset.pageKind === "not-found") {
  control.remove();
  status.remove();
} else if (!canUseWebGL()) {
  control.hidden = true;
  status.textContent = english
    ? "Accessible version: WebGL is unavailable on this device."
    : "Versão acessível: WebGL não está disponível neste dispositivo.";
} else {
  control.addEventListener("click", () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("view");
    window.history.replaceState(null, "", url);
    void start();
  });
  if (!reducedMotion.matches && !readableMode) void start();
}
