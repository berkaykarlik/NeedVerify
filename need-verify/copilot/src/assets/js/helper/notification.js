'use strict'

import Vue from 'vue'

const NOTIFICATION_TITLE_ERROR = 'Error'
const NOTIFICATION_TITLE_SUCCESS = 'Success'
const NOTIFICATION_TITLE_WARNING = 'Warning'
const NOTIFICATION_TITLE_INFO = 'Info'

const notification = new Vue({
  methods: {
    showErrorMessage (message) {
      this.$notify.error({
        title: NOTIFICATION_TITLE_ERROR,
        message: message ? message : "Please try again."
      });
    },
    showSuccessMessage (message) {
      this.$notify(
        {title: NOTIFICATION_TITLE_SUCCESS, message, type: 'success'});
    },
    showWarningMessage (message) {
      this.$notify(
        {title: NOTIFICATION_TITLE_WARNING, message, type: 'warning'});
    },
    showInfoMessage (message) {
      this.$notify.info({title: NOTIFICATION_TITLE_INFO, message});
    },
  }
})

module.exports = notification
