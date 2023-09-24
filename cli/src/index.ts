import { Command } from 'commander'
import { onCreate } from '../command/create'

const cmd = new Command()

// 注册命令、参数
// tsnd ./src/index.ts create
cmd
  .command('create')
  .description('创建一个组件模板或配置文件')
  // 添加命令参数-t | --type, <type>表面为必选参数
  .option('-t --type <type>', '可选值为：component | lib-entry')
  // 注册回调函数
  .action(onCreate)

// 执行命令行参数的解析
cmd.parse()

console.log('hello zz-ui')
