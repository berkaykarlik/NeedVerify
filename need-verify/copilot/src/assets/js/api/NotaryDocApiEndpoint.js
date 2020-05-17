'use strict';

const api = require('./NeedVerifyApiClient.js')

const API_ROOT = '/api'
const API_ENDPOINT_NOTARYDOC = API_ROOT + '/notarydoc'

module.exports = {
  mixins: [api],
  methods: {
    createNotaryDoc (ownerId, docType, participantIds, callback) {
      const postData = { ownerId, docType, participantIds }
      return this.postEndpoint(postData, API_ENDPOINT_NOTARYDOC, callback)
    }
  }
}
