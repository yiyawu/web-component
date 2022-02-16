import { clearConsole, formatMessage } from './'
import { Stats } from 'webpack'
import { STATUS } from '../../config/index'
import chalk from 'chalk'

export default function errorDispose(stats:Stats) : STATUS {
  clearConsole()
  const { errors, warnings } = stats.toJson({ all: false, warnings: true, errors: true })
  
  // 项目存在错误信息
  if (errors?.length) {
    console.log(chalk.red(`----------代码中存在${errors.length}条错误，编译无法通过----------`))
    errors.forEach(item=> {
      console.log(item)
      console.log(formatMessage(item?.message))
    })
    return STATUS.ERROR
  }

  // 项目存在警告信息
  if (warnings?.length) {
    console.log(chalk.red(`----------代码中存在${warnings.length}条警告，编译无法通过----------`))
    warnings.forEach(item => {
      console.log(formatMessage(item?.message))
    })
    return STATUS.ERROR
  }

  return STATUS.SUCCESS

}