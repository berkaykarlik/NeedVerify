module.exports = {
  data: function () {
    return {
      certificates: null
    }
  },
  components: {},
  computed: {
    creatorId () {
      return this.$route.params.creatorId
    },
  },
  methods: {
    getAllCertificatesByCreatorId () {
      const self = this
      this.$api.getAllCertificatesByCreatorId(this.userId, function (certificates, err) {
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
    this.getAllCertificatesByCreatorId()
  }
}
