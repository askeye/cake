import Vue from 'vue'
import App from './App.vue'
import router from './router'
import rem from './assets/js/rem'
import './plugins/vant'
import Topbar from './components/Topbar.vue'
import Footer from './components/Footer.vue'
import Phone from './components/Phone.vue'
import Password from './components/Password.vue'
import Code from './components/Code.vue'
import Backtop from './components/Backtop.vue'
import Menus from './components/Menus.vue'
import axios from 'axios'
import store from './store'

Vue.use(rem)
Vue.prototype.axios=axios


Vue.config.productionTip = false
Vue.component('Topbar', Topbar)
Vue.component('Footer', Footer)
Vue.component('Phone', Phone)
Vue.component('Password', Password)
Vue.component('Code', Code)
Vue.component('Backtop', Backtop)
Vue.component('Menus', Menus)



new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app')
