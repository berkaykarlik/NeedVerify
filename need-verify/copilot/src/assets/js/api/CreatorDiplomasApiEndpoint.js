'use strict';

const api = require('../../../../../../../NeedVerify/need-verify/copilot/src/assets/js/api/NeedVerifyApiClient.js')

const API_ROOT = '/api'
const API_ENDPOINT_CREATOR_DIPLOMA = API_ROOT + '/creatorDiplomas'

module.exports = {
  mixins: [api],
  methods: {
    getAllDiplomasByUserId (userId, callback) {
      return this.getEndpoint(API_ENDPOINT_CREATOR_DIPLOMA + '/:creatorId', callback)
    }
  }
}
