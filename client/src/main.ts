import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import {useDirectives} from "./composables/useDirectives.ts";

const {vDebounce} = useDirectives()

createApp(App).use(router).directive('debounce', vDebounce).mount('#app')
