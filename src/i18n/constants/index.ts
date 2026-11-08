export const LOCALES = {
  en: {
    iso: "en-US",
    name: "English",
  },
  pt: {
    iso: "pt-BR",
    name: "Português",
  },
} as const satisfies Record<
  string,
  {
    name: string;
    iso: string;
  }
>;

export const LOCALE_DEFAULT: keyof typeof LOCALES = "pt";
