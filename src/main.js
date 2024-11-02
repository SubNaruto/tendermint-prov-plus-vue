import Vue from 'vue/dist/vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import qs from 'qs'
import axios from "axios"

axios.defaults.withCredentials = true;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter)

Vue.prototype.$bus = new Vue()
Vue.prototype.$qs = qs


const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

new Vue({
  el: "#app",
  router: router,
  components: {
    App: App
  }
})