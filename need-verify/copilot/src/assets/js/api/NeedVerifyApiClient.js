'use strict'

const LOCALHOST_SERVER_URL = 'http://localhost:3000'
const httpResponseHelper = require('../helper/http_response')

module.exports = {
  computed: {
    http () {
      return this.$http
    },
    serverUrl () {
      return LOCALHOST_SERVER_URL
    }
  },
  methods: {
    deleteEndpoint (deleteData, endpoint, callback) {
      const urlTemplate = this.serverUrl + endpoint
      const self = this
      this.http.delete(urlTemplate, deleteData)
        .then((response) => {
          if (httpResponseHelper.isFailedRequestStatus(response.status)) {
            console.log('[error][deleteEndpoint] failed')
            return callback('{ error: "no success status code"}')
          }

          callback(null, response.body.data)
        })
        .catch(error => {
          console.log('[error][deleteEndpoint] ' + endpoint + 'catch:' + JSON.stringify(error))
          self.handleAPIError(error, callback)
        })
    },
    getEndpoint (endpoint, callback) {
      const urlTemplate = this.serverUrl + endpoint
      const self = this
      this.http.get(urlTemplate)
        .then(response => {
          if (httpResponseHelper.isFailedRequestStatus(response.status)) {
            console.log('[error][getEndpoint] while ' + endpoint)
            return callback('{ error: "no success status code"}')
          }

          // paged response has nested data structure
          callback(null, response.body.data.data ? response.body.data.data : response.body.data)
        })
        .catch(error => {
          console.log('[error][getEndpoint] ' + endpoint + 'catch:' + JSON.stringify(error))
          self.handleAPIError(error, callback)
        })
    },
    handleAPIError (error, callback) {
      if (error.hasOwnProperty('body')) {
        if (error.body == "") {
          return callback({ message: 'Connection problem, please try again.' })
        }
        if (error.body.error) {
          return callback(error.body.error)
        }

        return callback(error.body)
      }

      return callback(error)
    },
    postEndpoint (postData, endpoint, callback) {
      const urlTemplate = this.serverUrl + endpoint
      const self = this
      this.http.post(urlTemplate, postData)
        .then((response) => {
          if (httpResponseHelper.isFailedRequestStatus(response.status)) {
            console.log('[error][postEndpoint] failed')
            return callback('{ error: "no success status code"}')
          }
          callback(null, response.body.data)
        })
        .catch(error => {
          console.log('[error][postEndpoint] ' + endpoint + 'catch:' + JSON.stringify(error))
          self.handleAPIError(error, callback)
        })
    }
  }
}
