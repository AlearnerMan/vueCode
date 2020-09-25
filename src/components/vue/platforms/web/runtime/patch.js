/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)
// nodeOps 是Vue为了跨平台兼容性 对所有节点做了封装 例如nodeOps.createTextNode()在浏览器端等同于document.createTextNode()
export const patch: Function = createPatchFunction({ nodeOps, modules })
