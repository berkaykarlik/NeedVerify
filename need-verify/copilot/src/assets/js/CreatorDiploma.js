module.exports = {
  data: function () {
    return {
      creator_diplomas: null
    }
  },
  components: {},
  computed: {
    creatorId () {
      return null
    },
  },
  methods: {
    getAllDiplomasByCreatorId () {
      const self = this
      this.$api.getAllDiplomasByCreatorId(this.creatorId, function (CreatedDiplomas, err) {
        if (err) {
          self.$notification.showErrorMessage(err.message)
          console.log('[error] ' + err)
          return
        }
        self.creator_diplomas = CreatedDiplomas
      })
    },
  },
  mounted: function () {
    this.getAllDiplomasByCreatorId()
  }
}
