import { localizePath } from "../../seo/pages";

import type { Locale } from "../types";

export const changeLocale = (newLocale: Locale) => {
  // Each language has its own server-rendered URL, canonical and hreflang.
  window.location.assign(
    localizePath(window.location.pathname, newLocale) + window.location.search + window.location.hash,
  );
};
