module.exports = {
  data: function () {
    return {
      certificates: null
    }
  },
  components: {},
  computed: {
    userId () {
      return null
    },
  },
  methods: {
    getAllCertificatesByUserId () {
      const self = this
      this.$api.getAllCertificatesByUserId(this.userId, function (certificates, err) {
        if (err) {
          self.$notification.showErrorMessage(err.message)
          console.log('[error] ' + err)
          return
        }
        self.certificates = certificates
      })
    },
  },
  mounted: function () {
    this.getAllCertificatesByUserId()
  }
}
