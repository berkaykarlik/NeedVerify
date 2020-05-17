<template>
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
    <el-button v-on:click="handleCreateNotaryDocButtonClick"  type="primary" plain>Create Notary Document</el-button>
    <el-button v-on:click="handleMyNotaryDocsButtonClick"  type="primary" plain>My Notary Documents</el-button>
    <el-button v-on:click="handleApproveDocsButtonClick"  type="primary" plain>Approve Documents</el-button>
  </el-col>
</template>

<script src="../assets/js/UserNotaryDocPage.js"></script>

<style scoped>

</style>
