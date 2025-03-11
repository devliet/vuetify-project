/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
//  import './assets/main.css'
// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import { createPinia } from 'pinia'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(createPinia())

registerPlugins(app)

app.mount('#app')
