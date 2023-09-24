/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const fsExtra = require('fs-extra')
const version = require('../package.json').version
// 引入vite导出的build方法
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')

// 基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})

// 入口文件
const entryFile = path.resolve(__dirname, './entry.ts')
// 组件目录
const componentsDir = path.resolve(__dirname, '../src')
// 输出目录
const outputDir = path.resolve(__dirname, '../build')
// rollup 配置
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    exports: 'named',
    globals: {
      vue: 'Vue'
    }
  }
}

// 生成package.json
const createPackageJson = name => {
  // 预设
  const fileStr = JSON.stringify(
    {
      name: name ? name : '@zzwoo/zz-ui',
      version,
      main: name ? 'index.umd.js' : 'zz-ui.umd.js',
      module: name ? 'index.js' : 'zz-ui.js',
      author: 'Z',
      description: 'zz-ui',
      repository: {
        type: 'git',
        url: 'git+https://github.com/57code/zz-ui.git'
      },
      keywords: ['vue3', '组件库', 'tsx', 'UI'],
      license: 'ISC',
      bugs: {
        url: 'https://github.com/SSSzhao/zz-ui/issues'
      }
    },
    null,
    2
  )

  if (name) {
    // 单个组件，输出对应的package.json
    fsExtra.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      'utf-8'
    )
  } else {
    // 全量
    fsExtra.outputFile(
      path.resolve(outputDir, 'package.json'),
      fileStr,
      'utf-8'
    )
  }
}

// 执行创建

const buildSingle = async name => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(componentsDir, name),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd']
        },
        outDir: path.resolve(outputDir, name)
      }
    })
  )

  createPackageJson(name)
}

// 全量构建
const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: entryFile,
          name: 'zz-ui',
          fileName: 'zz-ui',
          formats: ['es', 'umd']
        },
        outDir: outputDir
      }
    })
  )

  createPackageJson()
}

const buildLib = async () => {
  await buildAll()

  // 按需打包
  fs.readdirSync(componentsDir)
    .filter(name => {
      const componentDir = path.resolve(componentsDir, name)
      const isDir = fs.lstatSync(componentDir).isDirectory()
      return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })
    .forEach(async name => {
      await buildSingle(name)
    })
}

buildLib()
