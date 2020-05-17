'use strict';

const api = require('./NeedVerifyApiClient.js')

const API_ROOT = '/api'
const API_ENDPOINT_CERTIFICATE = API_ROOT + '/certificate'

module.exports = {
  mixins: [api],
  methods: {
    getAllCertificatesByUserId (userId, callback) {
      return this.getEndpoint(API_ENDPOINT_CERTIFICATE + '/:userId', callback)
    }
  }
}
