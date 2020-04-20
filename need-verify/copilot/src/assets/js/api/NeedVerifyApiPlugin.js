'use strict'

import Vue from 'vue'

const ACCOUNT_API_ENDPOINT_METHODS = require('./AccountApiEndpoint')

const apiMixins = new Vue({
  mixins: [
    ACCOUNT_API_ENDPOINT_METHODS
  ]
})

module.exports = apiMixins
