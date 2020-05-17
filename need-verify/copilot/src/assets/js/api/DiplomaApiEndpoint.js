'use strict';

const api = require('./NeedVerifyApiClient.js')

const API_ROOT = '/api'
const API_ENDPOINT_DIPLOMA = API_ROOT + '/diploma'

module.exports = {
  mixins: [api],
  methods: {
    getAllDiplomasByUserId (userId, callback) {
      return this.getEndpoint(API_ENDPOINT_DIPLOMA + '/:userId', callback)
    }
  }
}
