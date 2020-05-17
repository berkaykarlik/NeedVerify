<template>
  <el-container style="height: 100%">
    <el-card>
      <el-header style="height: 5%; max-height: 65px; min-height: 40px;">
        User Documents Page
      </el-header>

      <el-main style="height: 100%;">
        <img src="../../../shared/images/diploma.png" v-on:click="redirectToUserDiploma" height="100" width="100"/>
        <img src="../../../shared/images/certificate.png" v-on:click="redirectToUserCertificate" height="100" width="100"/>
        <img src="../../../shared/images/notaryDoc.png" v-on:click="redirectToUserNotary" height="100" width="100"/>
      </el-main>
    </el-card>
  </el-container>
</template>

<script src="../assets/js/UserMainView.js"></script>

<style scoped>

</style>
