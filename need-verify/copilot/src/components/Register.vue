<template>
  <el-container style="height: 100%">
    <el-card>
      <el-header style="height: 5%; max-height: 65px; min-height: 40px;">
        Hellllooo
      </el-header>

      <el-main style="height: 100%;">

        <el-input
          placeholder="Please enter your first name"
          v-model="firstName">
        </el-input>

        <el-input
          placeholder="Please enter your last name"
          v-model="lastName">
        </el-input>

        <el-input
          placeholder="Please enter your username"
          v-model="username">
        </el-input>

        <el-input
          placeholder="Please enter your email"
          v-model="email"
          clearable>
        </el-input>

        <el-input
          placeholder="Please input password"
          v-model="password"
          :show-password=false>
        </el-input>

        <el-select v-model="type" placeholder="Select Account Type">
          <el-option
            v-for="type in types"
            :key="type"
            :value="type">
          </el-option>
        </el-select>

        <el-button v-on:click="handleRegisterButtonClick" :disabled="isRegisterButtonDisabled" type="primary" plain>Register</el-button>
      </el-main>
    </el-card>
  </el-container>
</template>

<script src="../assets/js/Register.js"></script>

<style scoped>

</style>
