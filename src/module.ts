import {
  addComponent,
  addImportsSources,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from "@nuxt/kit"
import { fileURLToPath } from "url"
import naive from "naive-ui"
import { name, version } from "../package.json"

export interface ModuleOptions {
}

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
    addPlugin(resolve(runtimeDir, "plugin"))

    // add imports for naive-ui components
    const naiveComponents = Object.keys(naive).filter((name) =>
      /^(N[A-Z]|n-[a-z])/.test(name)
    );

    naiveComponents.forEach((name) => {
      addComponent({
        export: name,
        name: name,
        filePath: "naive-ui",
      })
    })

    // add imports for naive-ui composables
    const naiveComposables = [
      'useDialog',
      'useMessage',
      'useNotification',
      'useLoadingBar',
    ]

    addImportsSources([
      {
        from: 'naive-ui',
        imports: naiveComposables,
      },
    ])

    // Transpile naive modules
    if (nuxt.options.dev) {
      nuxt.options.build.transpile.push('@juggle/resize-observer')
      nuxt.options.vite.optimizeDeps?.include?.push(
        'naive-ui',
        'vueuc',
        'date-fns-tz/esm/formatInTimeZone',
      )
    }
    else {
      nuxt.options.build.transpile.push(
        'naive-ui',
        'vueuc',
        '@css-render/vue3-ssr',
        '@juggle/resize-observer',
        'date-fns',
      )
    }
  },
})

