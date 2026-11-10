import { localizePath, localeFromPath } from "../seo/pages";

export const useRouter = () => {
  const push = (path: string) => {
    if (typeof window !== "undefined") {
      // The intercepted pushState in useRoute.ts will automatically trigger path updates
      window.history.pushState(null, "", localizePath(path, localeFromPath(window.location.pathname)));
    }
  };

  const replace = (path: string) => {
    if (typeof window !== "undefined") {
      // The intercepted replaceState in useRoute.ts will automatically trigger path updates
      window.history.replaceState(null, "", localizePath(path, localeFromPath(window.location.pathname)));
    }
  };

  const back = () => {
    if (typeof window !== "undefined") {
      window.history?.back?.();
    }
  };

  return {
    push,
    replace,
    back,
  };
};
