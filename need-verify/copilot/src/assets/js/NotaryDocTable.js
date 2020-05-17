module.exports = {
  data: function () {
    return {
      notarydocs: null
    }
  },
  components: {},
  computed: {
    userId () {
      return null
    },
  },
  methods: {
    getAllDocumentsByUserId () {
      const self = this
      this.$api.getAllDocumentsByUserId(this.userId, function (diplomas, err) {
        if (err) {
          self.$notification.showErrorMessage(err.message)
          console.log('[error] ' + err)
          return
        }
        self.diplomas = diplomas
      })
    },
  },
  mounted: function () {
    this.getAllDocumentsByUserId()
  }
}
