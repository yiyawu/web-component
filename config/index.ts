import path from 'path'

const basePath = path.normalize(__dirname + `${path.sep}..`)

export enum ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

export enum STATUS {
  SUCCESS,
  ERROR
}

export const paths = {
  // 整个项目的基础路径
  basePath,
  // 项目的入口
  src:             path.join(basePath, 'src'),
  srcPath:         path.join(basePath, 'src/index.tsx'),
  // 打包输出入口
  buildPath:       path.join(basePath, 'build'),
  // node_modules
  nodeModulesPath: path.join(basePath, 'node_modules'),
  // devServer contentBase
  contentBase:     path.join(basePath, 'public'),
  // typesript入口
  tsRootPath:      path.join(basePath, 'node_modules/typescript/lib/typescript.js'),
  // typesript配置文件
  tsConfig:        path.join(basePath, 'tsconfig.json'),
  // html template 路径
  templatePath:     path.join(basePath, 'env/index.html'),
}