import { watch } from "vue";
import { path } from "./useRouteObserver";
import { locale } from "../i18n/store";
import { getPage } from "../seo/pages";

export const useSeo = () => {
  watch(
    [path, locale],
    () => {
      const page = getPage(path.value);
      document.title = page.title;
      document.documentElement.lang = page.locale === "en" ? "en" : "pt-BR";
      const meta = (attribute: "name" | "property", key: string, value: string) => {
        let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
        if (!element) {
          element = document.createElement("meta");
          element.setAttribute(attribute, key);
          document.head.append(element);
        }
        element.content = value;
      };
      const link = (rel: string, href: string, language?: string) => {
        const selector = `link[rel="${rel}"]${language ? `[hreflang="${language}"]` : ""}`;
        let element = document.head.querySelector<HTMLLinkElement>(selector);
        if (!element) {
          element = document.createElement("link");
          element.rel = rel;
          document.head.append(element);
        }
        if (language) element.hreflang = language;
        element.href = href;
      };
      meta("name", "description", page.description);
      meta("name", "robots", page.kind === "not-found" ? "noindex, follow" : "index, follow, max-image-preview:large");
      link("canonical", page.canonical);
      link("alternate", page.alternates.pt, "pt-BR");
      link("alternate", page.alternates.en, "en");
      link("alternate", page.alternates.pt, "x-default");
      for (const [key, value] of Object.entries({
        title: page.title,
        description: page.description,
        url: page.canonical,
        image: page.image,
        type: "website",
        site_name: "David Budeli",
        locale: page.locale === "en" ? "en_US" : "pt_BR",
      }))
        meta("property", `og:${key}`, value);
      meta("property", "og:locale:alternate", page.locale === "en" ? "pt_BR" : "en_US");
      const imageAlt = page.kind === "project" ? page.project!.title : "David Budeli — Software Engineer";
      meta("property", "og:image:alt", imageAlt);
      meta("name", "twitter:image:alt", imageAlt);
      for (const [key, value] of Object.entries({
        card: "summary_large_image",
        title: page.title,
        description: page.description,
        image: page.image,
      }))
        meta("name", `twitter:${key}`, value);
      let schema = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
      if (!schema) {
        schema = document.createElement("script");
        schema.type = "application/ld+json";
        document.head.append(schema);
      }
      schema.textContent = JSON.stringify(page.schema);
    },
    { immediate: true },
  );
};
