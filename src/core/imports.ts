import { addImports } from '@nuxt/kit'
import { libraryName } from '../config'
import { ModuleOptions } from '../module'

export function resolveImports (config: ModuleOptions) {
  const { imports } = config

  imports.forEach((item) => {
    addImports({
      name: item,
      // as: item,
      from: libraryName
    })
  })
}
