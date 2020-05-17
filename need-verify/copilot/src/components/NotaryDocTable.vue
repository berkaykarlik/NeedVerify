<template>
  <el-table
    :data="notarydocs"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="Document Type"
      label="Document Type"
      width="%20">
    </el-table-column>
    <el-table-column
      prop="Date Created"
      label="Date Created"
      width="%20">
    </el-table-column>
    <el-table-column
      prop="People Approved"
      label="People Approved"
      width="%20">
    </el-table-column>
  </el-table>
</template>

<script src="../assets/js/NotaryDocTable.js"></script>

<style scoped>

</style>
