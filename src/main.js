import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getData from './utils/getData'

Vue.config.productionTip = false
Vue.prototype.$api = getData
Vue.prototype.$EventBus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
