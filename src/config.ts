
import * as AllComponents from 'naive-ui/es/components'
import { ModuleOptions } from './module'

export const libraryName = 'naive-ui'

const allComponents = Object.keys(AllComponents)
  .filter(name => /^N[A-Z]*/.test(name))

// Object.keys(AllComponents).filter(name => /^use[A-Z]/.test(name))
const allImports = [
  'useDialog',
  'useDialogReactiveList',
  'useLoadingBar',
  'useMessage',
  'useNotification'
]

export const defaults: ModuleOptions = {
  components: allComponents,
  imports: allImports
}
