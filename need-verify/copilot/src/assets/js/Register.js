module.exports = {
  data: function () {
    return {
      username: null,
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      type: null,
      types: ["Creator", "User"]
    }
  },
  components: {},
  computed: {
    isRegisterButtonDisabled () {
      return (!this.username || !this.email || !this.password || !this.firstName || !this.lastName || !this.type)
    }
  },
  methods: {
    handleRegisterButtonClick () {
      const self = this
      this.$api.createAccount(this.username, this.email, this.password, this.firstName, this.lastName, this.type, function (err) {
        if (err) {
          self.$notification.showErrorMessage(err.message)
          console.log('[error] ' + err)
          return
        }

        self.$notification.showSuccessMessage('Account created successfully.')
      })
    },
  },
  mounted: function () {}
}
