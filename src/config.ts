
import naive from 'naive-ui'
import { ModuleOptions } from './module'

export const libraryName = 'naive-ui'

const allComponents = Object.keys(naive)
  .filter(name => /^N[A-Z]*/.test(name))

// Object.keys(AllComponents).filter(name => /^use[A-Z]/.test(name))
const allImports = [
  'useDialog',
  'useDialogReactiveList',
  'useLoadingBar',
  'useMessage',
  'useNotification',
  'useThemeVars',
]

export const defaults: ModuleOptions = {
  components: allComponents,
  imports: allImports
}
