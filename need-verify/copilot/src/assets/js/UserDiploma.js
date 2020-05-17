module.exports = {
  data: function () {
    return {
      diplomas: null
    }
  },
  components: {},
  computed: {
    userId () {
      return null
    },
  },
  methods: {
    getAllDiplomasByUserId () {
      const self = this
      this.$api.getAllDiplomasByUserId(this.userId, function (diplomas, err) {
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
    this.getAllDiplomasByUserId()
  }
}
