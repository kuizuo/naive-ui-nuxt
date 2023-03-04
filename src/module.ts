import {
  addComponent,
  addImports,
  addPlugin,
  addPluginTemplate,
  createResolver,
  defineNuxtModule,
  extendViteConfig,
} from "@nuxt/kit"
import { fileURLToPath } from "url"
import naive from "naive-ui"
import { name, version } from "../package.json"

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
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url))

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolve(runtimeDir, "naive.server"))

    const naiveComponents = Object.keys(naive).filter((name) =>
      /^N[A-Z]*/.test(name)
    )
    // add imports for naive-ui components
    naiveComponents.forEach((name) => {
      addComponent({
        export: name,
        name: name,
        filePath: "naive-ui",
      })
    })

    const naiveComposables = [
      "useDialog",
      "useDialogReactiveList",
      "useLoadingBar",
      "useMessage",
      "useNotification",
      "useThemeVars",
    ]

    // add imports for naive-ui composables
    naiveComposables.forEach((name) => {
      addImports({
        name: name,
        as: name,
        from: "naive-ui",
      })
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
