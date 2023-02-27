import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { resolveImports, resolveComponents } from './core'
import { defaults, libraryName } from './config'

export interface ModuleOptions {
  components: string[]
  imports: string[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: libraryName,
    configKey: 'naiveUI',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults,
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/plugin'))

    nuxt.options.imports.autoImport !== false && resolveImports(options)
    nuxt.options.components !== false && resolveComponents(options)

    nuxt.options.build.transpile.push(
      ...(process.env.NODE_ENV === "production"
        ? ["naive-ui", "vueuc", "@css-render/vue3-ssr", "@juggle/resize-observer"]
        : ["@juggle/resize-observer"]));

    nuxt.options.vite.optimizeDeps = {
      include: process.env.NODE_ENV === "development"
        ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
        : []
    }
  }
})
