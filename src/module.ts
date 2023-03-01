import {
  addComponent,
  addImports,
  addPluginTemplate,
  defineNuxtModule,
  extendViteConfig,
} from "@nuxt/kit"
import naive from "naive-ui"
import { name, version } from "../package.json"

const naiveComponents = Object.keys(naive).filter((name) =>
  /^N[A-Z]*/.test(name)
)

const naiveComposables = [
  "useDialog",
  "useDialogReactiveList",
  "useLoadingBar",
  "useMessage",
  "useNotification",
  "useThemeVars",
]

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "naiveUI",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {},
  hooks: {
    "prepare:types": ({ tsConfig, references }) => {
      tsConfig.compilerOptions!.types.push("naive-ui/volar")
      references.push({
        types: "naive-ui/volar",
      })
    },
  },
  setup(options, nuxt) {
    // add imports for naive-ui components
    naiveComponents.forEach((name) => {
      addComponent({
        export: name,
        name: name,
        filePath: "naive-ui",
      })
    })

    // add imports for naive-ui composables
    naiveComposables.forEach((name) => {
      addImports({
        name: name,
        as: name,
        from: "naive-ui",
      })
    })

    addPluginTemplate({
      filename: "naive-ui-plugin.mjs",
      getContents: () => {
        return `import { setup } from '@css-render/vue3-ssr'
          import { defineNuxtPlugin } from '#app'

          export default defineNuxtPlugin((nuxtApp) => {
            if (process.server) {
              const { collect } = setup(nuxtApp.vueApp)
              const originalRenderMeta = nuxtApp.ssrContext?.renderMeta
              nuxtApp.ssrContext = nuxtApp.ssrContext || {}
              nuxtApp.ssrContext.renderMeta = () => {
                if (!originalRenderMeta) {
                  return {
                    headTags: collect(),
                  }
                }
                const originalMeta = originalRenderMeta()
                if ('then' in originalMeta) {
                  return originalMeta.then((resolvedOriginalMeta) => {
                    return {
                      ...resolvedOriginalMeta,
                      headTags: resolvedOriginalMeta.headTags + collect(),
                    }
                  })
                }
                else {
                  return {
                    ...originalMeta,
                    headTags: originalMeta.headTags + collect(),
                  }
                }
              }
            }
          })`
      },
    })

    // Transpile naive modules
    if (process.env.NODE_ENV === "production") {
      nuxt.options.build.transpile.push(
        "naive-ui",
        "vueuc",
        "@css-render/vue3-ssr",
        "@juggle/resize-observer"
      )
    } else {
      nuxt.options.build.transpile.push("@juggle/resize-observer")
    }
  },
})
