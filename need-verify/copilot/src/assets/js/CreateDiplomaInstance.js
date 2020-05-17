module.exports = {
  data: function () {
    return {
      schoolName: null,
      facultyName: null,
      departmentName: null,
      YearOfGrad: null,
    }
  },
  components: {},
  computed: {
    isCreateDiplomaButtonDisabled () {
      return (!this.schoolName || !this.facultyName || !this.departmentName || !this.YearOfGrad)
    }
  },
  methods: {
    handleCreateDiplomaButtonClick () {
      /*
      const self = this
      this.$api.createAccount(this.username, this.email, this.password, this.firstName, this.lastName, this.type, function (err) {
        if (err) {
          self.$notification.showErrorMessage(err.message)
          console.log('[error] ' + err)
          return
        }

        self.$notification.showSuccessMessage('Account created successfully.')
      })
    */
    },
  },
  mounted: function () {}
}
