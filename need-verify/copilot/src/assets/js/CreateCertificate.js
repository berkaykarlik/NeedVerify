module.exports = {
  data: function () {
    return {
      certificateName: null,
      description: null,
      date: null,
    }
  },
  components: {},
  computed: {
    isCreateCertificateButtonDisabled () {
      return (!this.certificateName || !this.description || !this.date)
    }
  },
  methods: {
    handleCreateCertificateButtonClick () {
      const self = this
      this.$api.createCertificate(this.certificateName, this.description, this.date, function (err) {
        if (err) {
          self.$notification.showErrorMessage(err.message)
          console.log('[error] ' + err)
          return
        }

        self.$notification.showSuccessMessage('Certificate created successfully.')
      })
    },
  },
  mounted: function () {}
}
