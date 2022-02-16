import process from 'process'
import os from 'os'
import chalk from 'chalk'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import detect from 'detect-port'
import inquirer from 'inquirer'
import { ENV, paths, STATUS } from '../config/index'
import getWebpackConfig from '../config/webpackConfig'
import { errorDispose, clearConsole } from './utils'

// 设置当前环境为开发环境
process.env.NODE_ENV = ENV.DEVELOPMENT

/** 程序入口
 * @param port 端口号
 */
async function start(port: number) {
  // 获取端口号
  const allowPort = await choosePort(port)
  if (allowPort !== -1) {
    const host = getHost()
    startServer(host, allowPort)
  } else {
    console.log('已退出程序')
  }
}

/** 获取当前设备的ip地址
 * @returns 
 */
function getHost(): string {

  const IPV4Arr: string[] = []
  const networkInfo = os.networkInterfaces()

  //@ts-ignore
  Object.values(networkInfo).forEach(infoArr => {
    if (Array.isArray(infoArr)) {
      infoArr.forEach(({ family, address }) => {
        if (family === 'IPv4' && address.includes('192.168.')) {
          IPV4Arr.push(address)
        }
      })
    }
  })

  return IPV4Arr[0]
}

/** 检查端口号是否被占用
 * @param port 
 * @returns 
 */
function choosePort(port: number): Promise<number> {
  return detect(port).then((_port) => new Promise(resolve => {
    if (port === _port) {
      resolve(port)
    } else {
      inquirer.prompt({
        type:    'confirm',
        message: `端口${port}被占用,是否使用 ${_port} 端口`,
        name:    'port',
        default: true // 默认值
      }).then(answer => {
        if (answer.port) {
          resolve(_port)
        } else {
          resolve(-1)
        }
      })
    }
  }))
}

/** 启动程序
 * @param host 
 * @param port 
 */
function startServer(host: string, port: number) {
  // @ts-ignore
  const compiler = webpack(getWebpackConfig())

  compiler.hooks.invalid.tap('invalid', () => {
    clearConsole()
    console.log('Compiling...')
  })

  compiler.hooks.done.tap('done', stats => {
    if (errorDispose(stats) === STATUS.SUCCESS){
      console.log(chalk.green('编译通过!!!', `请访问:http://${host}:${port}`))
    }
  })

  const server = new WebpackDevServer({
    // 避免控制台一直报sockjs-node/info
    port,
    hot:            true,
    host:           host,
    open:           false,
    client: {
      overlay:        {
        //@ts-ignore
        warnings: true,
        errors:   true
      },
    },
    historyApiFallback: { disableDotRule: true },
    static: {
      publicPath:         '/',
    }
  },compiler)

  server.listen(port, 'localhost', function (err) {
    console.log('启动成功')
  })

}

start(7004)