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
    <creator-notary v-if="isCreator()"></creator-notary>
    <user-notary v-else></user-notary>
  </div>
</template>

<script>
import userNotary from "./UserNotary.vue";
import creatorNotary from "./CreatorNotary.vue";

export default {
  data() {
    return {};
  },
    components: {
    userNotary,
    creatorNotary,
  },
  methods: {
    isCreator() {
      var userObject = JSON.parse(localStorage.getItem("userObject"));
      return userObject != null && userObject.is_creator > 0;
    }
  },

};
</script>