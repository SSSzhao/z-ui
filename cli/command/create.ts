import * as inquirer from 'inquirer'
import { red } from 'kolorist'
import createComponent from '../shared/create-component'

const CREATE_TYPES = ['component', 'lib-entry']
// 组件分类
const DOCS_CATEGORIES = ['通用', '导航', '反馈', '数据录入', '数据显示']

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
  try {
    switch (type) {
      case 'component':
        const info = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: '（必填）请输入组件name，将用作文件名和文件夹名称',
            validate(value: string) {
              if (value.trim() === '') {
                return '组件name不能为空！'
              }
              return true
            }
          },
          {
            name: 'title',
            type: 'input',
            message: '（必填）请输入组件中文名称，将用作文档列表中显示',
            validate(value: string) {
              if (value.trim() === '') {
                return '组件名称不能为空！'
              }
              return true
            }
          },
          {
            name: 'category',
            type: 'list',
            message: '（必填）请选择组件分类，将用作文档列表分类中',
            choices: DOCS_CATEGORIES,
            default: 0
          }
        ])

        // 创建组件模板文件
        createComponent(info)
        break
      default:
        break
    }
  } catch (error) {}
}
