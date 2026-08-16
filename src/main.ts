import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './design.css'
import './styles/marketing.css'
import './styles/app.css'
import App from './App.vue'
import router from './router'

createApp(App).use(createPinia()).use(router).mount('#app')
