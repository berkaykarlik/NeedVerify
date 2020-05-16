'use strict';

const api = require('./NeedVerifyApiClient.js')

const API_ROOT = '/api'
const API_ENDPOINT_ACCOUNT = API_ROOT + '/accounts'

module.exports = {
  mixins: [api],
  methods: {
    createAccount (username, email, password, firstName, lastName, type, callback) {
      const postData = { username, email, password, firstName, lastName, type }
      return this.postEndpoint(postData, API_ENDPOINT_ACCOUNT, callback)
    }
  }
}
