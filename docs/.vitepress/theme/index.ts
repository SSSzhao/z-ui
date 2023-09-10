import DefaultTheme from 'vitepress/theme'
import HelloWorld from '../../../src/components/HelloWorld.vue'
import Test from '../../../src/components/Test'
import type {App} from 'vue'

import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import {registerComponents} from './register-components'


export default {
  ...DefaultTheme,
  // 扩展应用程序实例
  enhanceApp({app}:{app:App<never>}) {
    registerComponents(app)
    app.component('HelloWorld', HelloWorld)
    app.component('Test', Test)
  }
}