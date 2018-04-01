import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'


// ===== Router Setup =====
import { routes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history',  // for nicer url's
  // linkActiveClass: 'active'     could do this to change css class applied to all <router-link>'s (which by default become <a>'s)
})


// ===== Vuex =====
import store from './store/store'


// ===== Filters =====
Vue.filter('currency', value => {
  return '$' + value.toLocaleString()
})


// ==== Global Variable ====
Vue.prototype.$firebase_url = 'https://stock-trader-1234.firebaseio.com/'


// ===== Main App Setup =====
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
