<template>
  <el-container>
    <el-header style="height: 5%; max-height: 65px; min-height: 40px;">

    </el-header>

    <el-main style="height: 100%;">
      <el-input
        placeholder="Please input"
        v-model="email"
        clearable>
      </el-input>
      
      <el-input placeholder="Please input password" v-model="password" show-password></el-input>
    </el-main>
  </el-container>
</template>

<script src="../assets/js/Register.js"></script>

<style scoped>

</style>
