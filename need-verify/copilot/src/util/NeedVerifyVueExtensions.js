'use strict'

const notificationHelper = require('../assets/js/helper/notification')
const ponyExpressApiPlugin = require('../assets/js/api/NeedVerifyApiPlugin')

const NeedVerifyVueExtensions = {
  install: function (Vue, options) {

    // 1. add global method or property
    Vue.myGlobalMethod = function () {
      // some logic ...
    }

    // 2. add a global asset
    Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
        // some logic ...
      }
    })

    // Instance methods
    // Plugins
    Vue.prototype.$api = ponyExpressApiPlugin
    Vue.prototype.$notification = notificationHelper
  }
}

export default NeedVerifyVueExtensions
