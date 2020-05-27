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
    <creator-diplomas v-if="isCreator()"></creator-diplomas>
    <user-diplomas v-else></user-diplomas>
  </div>
</template>

<script>
import userDiplomas from "./UserDiplomas.vue";
import creatorDiplomas from "./CreatorDiplomas.vue";

export default {
  data() {
    return {};
  },
    components: {
    userDiplomas,
    creatorDiplomas,
  },
  methods: {
    isCreator() {
      var userObject = JSON.parse(localStorage.getItem("userObject"));
      return userObject != null && userObject.is_creator > 0;
    }
  },

};
</script>