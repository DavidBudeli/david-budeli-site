import { createApp } from "vue";
import "./assets/styles/index.scss";
import App from "./App.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { resources } from "./utils/resources";
import { locale, translations } from "./i18n/store";
import { loadTranslations } from "./i18n/utils/load";

gsap.registerPlugin(ScrollTrigger);

export const prepare = async () => {
  const ready = resources.isReady
    ? Promise.resolve()
    : new Promise<void>((resolve, reject) => {
        resources.once("ready", resolve);
        resources.once("error", reject);
        if (resources.failed) reject(new Error("A 3D resource failed to load"));
      });
  const messages = await loadTranslations("common", locale.value ?? "pt");
  translations.value = messages ?? {};
  await ready;
};

export const mount = (onError: () => void) => {
  const app = createApp(App);
  app.config.errorHandler = (error) => {
    console.error(error);
    onError();
  };
  app.mount("#app");
  return app;
};
