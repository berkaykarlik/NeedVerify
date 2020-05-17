<template>
  <el-container style="height: 100%">
    <el-card>
      <el-header style="height: 5%; max-height: 65px; min-height: 40px;">
        Certificate Request
      </el-header>

      <el-main style="height: 100%;">


          <el-select v-model="value" placeholder="Select Institution">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>

    //buradaki data creator Certificate tablosundaki institution nameler ile doldurulacak.

        <el-button v-on:click="handleRequestButtonClick"  type="primary" plain>Request</el-button>
      </el-main>
    </el-card>
  </el-container>
</template>

<script src="../assets/js/UserRequestCertificate.js"></script>

<style scoped>

</style>
