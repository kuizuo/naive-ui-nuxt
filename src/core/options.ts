import { useNuxt } from "@nuxt/kit";

export function resolveOptions() {
  const nuxt = useNuxt();

  // nuxt.options.build.transpile.push(libraryName)
  const dependencies =
    process.env.NODE_ENV === "production"
      ? ["naive-ui", "vueuc", "@css-render/vue3-ssr", "@juggle/resize-observer"]
      : ["@juggle/resize-observer"];

  nuxt.options.build.transpile.push(...dependencies);

  nuxt.options.vite.optimizeDeps = {
    include:
      process.env.NODE_ENV === "development"
        ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
        : [],
  };
}
