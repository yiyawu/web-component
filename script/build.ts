import process from 'process'
import webpack from 'webpack'
import chalk from 'chalk'
import { ENV, paths, STATUS } from '../config/index'
import getWebpackConfig from '../config/webpackConfig'
import { errorDispose } from './utils'

// 设置当前环境为开发环境
process.env.NODE_ENV = ENV.PRODUCTION

/** 程序入口 */
function build() {
  //@ts-ignore
  const compiler = webpack(getWebpackConfig())

  compiler.run((err, stats) => {
    if(errorDispose(stats) === STATUS.SUCCESS){
      console.log('打包成功！打包路径为：', chalk.green(paths.buildPath))
    }
  })
}

build()