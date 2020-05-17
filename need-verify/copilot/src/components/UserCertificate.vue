<template>
  <el-table
    :data="certificates"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="certificateName"
      label="Certificate"
      width="20%">
    </el-table-column>
    <el-table-column
      prop="institutionName"
      label="Institution"
      width="20%">
    </el-table-column>
    <el-table-column
      prop="periodOfValidity"
      label="Validity Period"
      width="20%">
    </el-table-column>
    <el-table-column
      prop="issueDate"
      label="Issue Date"
      width="20%">
    </el-table-column>
  </el-table>
</template>

<script src="../assets/js/UserCertificate.js"></script>

<style scoped>

</style>
