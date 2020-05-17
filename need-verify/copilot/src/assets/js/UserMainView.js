module.exports = {
  data: function () {
    return {}
  },
  components: {},
  computed: {
    userId () {
      return this.$route.params.userId
    }
  },
  methods: {
    redirectToUserDiploma () {
      this.$router.push({ path: '/diploma/' + this.userId })
    },
    redirectToUserCertificate () {
      this.$router.push({ path: '/certificate/' + this.userId })
    },
    redirectToUserNotary () {
      this.$router.push({ path: '/notary/' + this.userId })
    },
  },
  mounted: function () {}
}
