import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { resolveImports, resolveComponents, resolveOptions } from './core'
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
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    resolveOptions()

    addPlugin(resolver.resolve('./runtime/plugin'))

    nuxt.options.imports.autoImport !== false && resolveImports(options)
    nuxt.options.components !== false && resolveComponents(options)
  }
})
