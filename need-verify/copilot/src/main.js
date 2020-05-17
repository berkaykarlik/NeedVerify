/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/en'
import ElementUI from 'element-ui'
import NeedVerifyVueExtensions from './util/NeedVerifyVueExtensions'
import Register from './components/Register'
import UserDiploma from './components/UserDiploma'
import Vue from 'vue'
import VueResource from "vue-resource"

Vue.use(ElementUI, { locale })
Vue.use(VueResource);
Vue.use(NeedVerifyVueExtensions) // Global mixin to extend Vue instance
Vue.config.productionTip = false

const routes = {
  '/': Register,
  '/diploma/:userId': UserDiploma
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute]
    }
  },
  render (h) { return h(this.ViewComponent) }
})
