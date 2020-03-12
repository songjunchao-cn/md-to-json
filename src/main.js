import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  dateFormat
} from '@/utils/format.js'

Vue.config.productionTip = false
Vue.prototype.$dateFormat = dateFormat

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')