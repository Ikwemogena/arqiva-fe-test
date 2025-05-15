import { createApp } from 'vue'

import App from './App.vue'
import { useDirectives } from './composables/useDirectives'
import router from './router'
import './assets/main.css'

const { vDebounce } = useDirectives()

createApp(App).use(router).directive('debounce', vDebounce).mount('#app')
