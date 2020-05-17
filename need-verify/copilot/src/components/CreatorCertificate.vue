<template>
  <el-table
    :data="certificates"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="name"
      label="Certificate Name"
      width="%25">
    </el-table-column>
    <el-table-column
      prop="description"
      label="Description"
      width="%25">
    </el-table-column>
    <el-table-column
      prop="date"
      label="Date"
      width="%25">
    </el-table-column>
  </el-table>
</template>

<script src="../assets/js/CreatorCertificate.js"></script>

<style scoped>

</style>
