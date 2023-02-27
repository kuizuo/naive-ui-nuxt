import { addComponent } from "@nuxt/kit"
import { libraryName } from "../config"
import { ModuleOptions } from '../module'

export function resolveComponents(config: ModuleOptions) {
  const { components } = config

  components.forEach((item) => {
    addComponent({
      export: item,
      name: item,
      filePath: libraryName,
    })
  })
}
