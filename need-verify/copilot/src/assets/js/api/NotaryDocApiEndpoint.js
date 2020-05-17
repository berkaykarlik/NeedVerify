'use strict';

const api = require('./NeedVerifyApiClient.js')

const API_ROOT = '/api'
const API_ENDPOINT_DIPLOMA = API_ROOT + '/notarydoc'

module.exports = {
  mixins: [api],
  methods: {
    getAllDocumentsByUserId (userId, callback) {
      return this.getEndpoint(API_ENDPOINT_DIPLOMA + '/:userId', callback)
    }
  }
}
