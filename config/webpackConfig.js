import process from 'process';
import path from 'path'
import htmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import htmlWebpackPlugin from 'html-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin  from 'fork-ts-checker-webpack-plugin'
import { ENV, paths } from './index'

function getWebpackConfig(){
    const isDev = process.env.NODE_ENV === ENV.DEVELOPMENT
    return {
        mode: isDev? 'development': 'production',
        devtool: 'source-map',
        entry: path.join(paths.basePath, '/src/index.tsx'),
        output: {
            path: isDev? path.join(paths.basePath,'test'): paths.buildPath,
            filename: `components${isDev? '':'.'+Date.now()}.js`
        },
        optimization: {
            minimize: true,
            minimizer: [ new TerserPlugin() ]
        },
        module: {
            rules: [
                {
                    test: /\.(c|le)ss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test:   /\.svg$/,
                    loader: '@svgr/webpack',
                },
                {
                    test:    /\.(png|jpg|PNG|JPG|JPEG|GIF|jpeg|gif)$/,
                    loader:  'url-loader',   // 依赖file-loader,如果文件太大，使用file-loader移动文件
                    options: {
                        // 文件小于8kb就会转化为base64
                        limit:    8 * 1024,
                        // 关闭url-loader的es6模块化，解决html-loader的加载问题
                        esModule: false,
                        // 设置生成的hash值截取10位就好了
                        name:     '[hash:10].[ext]'
                    }
                },
                {
                    test:    /\.(woff|eot|woff2|ttf|)$/,
                    loader:  'url-loader',
                    options: {
                        limit:    20 * 1024,
                        esModule: false,
                    }
                },
                {
                    test:    /\.(tsx|ts|js)$/,
                    exclude: /node_modules/,
                    use:     [
                      {
                        loader:  'babel-loader',
                        options: {
                          presets: [
                            '@babel/preset-env',
                            // 不需要每个文件都引入React
                            [ 
                              '@babel/preset-react', {
                                'runtime': 'automatic'
                              } 
                            ],
                            '@babel/preset-typescript'
                          ],
                        }
                      }]
                },
                { // 配置 html 中的图片
                    test: /\.html?$/,
                    use: {
                        loader: 'html-loader',
                    },
                }
            ]
        },
        plugins: [
            !isDev ? new BundleAnalyzerPlugin() : null,
            new ForkTsCheckerWebpackPlugin({
              // 会影响打包效率，但是控制台会有错误提示
              async:                false,
              typescript:           {
                configFile:     'tsconfig.json'
              }
            }),
            new htmlWebpackPlugin({
              title:    'yierya', // 默认值：Webpack App
              filename: 'index.html', // 默认值： 'index.html'
              template: paths.templatePath,
              minify:   {
                collapseWhitespace:    true,// 移除空格
                removeComments:        true,// 移除注释
                removeAttributeQuotes: true // 移除属性的引号
              }
            }),
            new OptimizeCSSAssetsPlugin(),
            new CleanWebpackPlugin(),
          ].filter((item)=>item!==null),
          resolve: {
            extensions: [ '.ts', '.tsx', '.js', 'jsx' ],
          }
    }
}
export default getWebpackConfig