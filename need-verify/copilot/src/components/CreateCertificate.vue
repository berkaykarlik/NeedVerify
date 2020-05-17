<template>
  <el-container style="height: 100%">
    <el-card>
      <el-header style="height: 5%; max-height: 65px; min-height: 40px;">
        Create new certificate
      </el-header>

      <el-main style="height: 100%;">

        <el-input
          placeholder="Certificate Name"
          v-model="certificateName">
        </el-input>

        <el-input
          placeholder="Description"
          v-model="description">
        </el-input>

        <el-input
          placeholder="Date"
          v-model="date">
        </el-input>

        <el-button v-on:click="handleCreateCertificateButtonClick" :disabled="isCreateCertificateButtonDisabled" type="primary" plain>Create</el-button>
      </el-main>
    </el-card>
  </el-container>
</template>

<script src="../assets/js/CreateCertificate.js"></script>

<style scoped>

</style>
