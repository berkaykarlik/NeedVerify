<template>
  <el-container style="height: 100%">
    <el-card>
      <el-header style="height: 5%; max-height: 65px; min-height: 40px;">
      </el-header>
      Create a Diploma
      <el-main style="height: 100%;">

        <el-input
          placeholder="Please enter School Name"
          v-model="schoolName">
        </el-input>

        <el-input
          placeholder="Please enter the Faculty Name"
          v-model="facultyName">
        </el-input>

        <el-input
          placeholder="Please enter Department Name"
          v-model="departmentName">
        </el-input>

        <el-input
          placeholder="Please enter Year of Graduation"
          v-model="YearOfGrad"
          :show-password=false>
        </el-input>

        <el-button v-on:click="handleCreateDiplomaButtonClick" :disabled="isCreateDiplomaButtonDisabled" type="primary" plain>Create Diploma</el-button>
      </el-main>
    </el-card>
  </el-container>
</template>

<script src="../assets/js/CreateDiplomaInstance.js"></script>

<style scoped>

</style>
