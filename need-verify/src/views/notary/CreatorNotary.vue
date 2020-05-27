<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card title="Notary">
    creator
  </vx-card>
</template>

<script>
import moduleNotary from "@/store/notary/moduleNotary.js";

export default {
  data() {
    return {};
  },
  methods: {
    
  },
  created() {
    if (!moduleNotary.isRegistered) {
      this.$store.registerModule("notary", moduleNotary);
      moduleNotary.isRegistered = true;
    }
  }
};
</script>