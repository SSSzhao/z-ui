import * as inquirer from 'inquirer'
import { red } from 'kolorist'

const CREATE_TYPES = ['component', 'lib-entry']

export async function onCreate(args = { type: '' }) {
  console.log(args)
  // 判断用户是否输入type
  let { type } = args
  // 为输入，提示用户重新输入，给用户列表去选择
  if (!type) {
    const result = await inquirer.prompt([
      {
        name: 'type',
        // 交互方式为列表
        type: 'list',
        // 提示信息
        message: '请选择创建的类型',
        // 选项列表,
        choices: CREATE_TYPES,
        default: 0
      }
    ])

    type = result.type
  }

  // 输入错误，重新输入
  if (!CREATE_TYPES.includes(type)) {
    console.log(red(`当前类型仅支持：${CREATE_TYPES.join(',')}`))

    return onCreate()
  }

  // 输入则创建对应的内容
}
