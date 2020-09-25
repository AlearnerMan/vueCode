/* @flow */

import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'

// 这个里面返回的不是 ast render函数吗？？？ 
const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }
