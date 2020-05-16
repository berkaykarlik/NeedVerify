/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/en'
import ElementUI from 'element-ui'
import NeedVerifyVueExtensions from './util/NeedVerifyVueExtensions'
import RegisterView from './components/Register.vue'
import routes from '../routes'
import Vue from 'vue'
import VueResource from "vue-resource"
import VueRouter from 'vue-router'

Vue.use(ElementUI, { locale })
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(NeedVerifyVueExtensions) // Global mixin to extend Vue instance
Vue.config.productionTip = false

const router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  router,
  render: h => h(RegisterView)
})
