import { ref } from "vue";
import { localeFromPath } from "../seo/pages";

import type { Locale } from "./types";

export const locale = ref<Locale | null>(
  localeFromPath(typeof window !== "undefined" ? window.location.pathname : "/"),
);
export const translations = ref<Record<string, string>>({});
