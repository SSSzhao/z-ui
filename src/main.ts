import { createApp } from 'vue'
import './index.scss'
import App from './App.vue'
import button from './button'

// 使用全量导出
import ZUI from '../build/button/'

createApp(App).use(ZUI).mount('#app')
