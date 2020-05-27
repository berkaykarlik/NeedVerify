<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div>
    <creator-certificates v-if="isCreator()"></creator-certificates>
    <user-certificates v-else></user-certificates>
  </div>
</template>

<script>
import userCertificates from "./UserCertificates.vue";
import creatorCertificates from "./CreatorCertificates.vue";

export default {
  data() {
    return {};
  },
    components: {
    userCertificates,
    creatorCertificates,
  },
  methods: {
    isCreator() {
      var userObject = JSON.parse(localStorage.getItem("userObject"));
      return userObject != null && userObject.is_creator > 0;
    }
  },

};
</script>