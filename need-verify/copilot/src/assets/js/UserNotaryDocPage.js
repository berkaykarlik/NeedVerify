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
  handleApprove (index, row) {
    console.log(index, row);
  },
  handleCreateNotaryDocButtonClick () {
    console.log("clicked create");
  },
  mounted: function () {
    this.getAllDocumentsByUserId()
  }
}
