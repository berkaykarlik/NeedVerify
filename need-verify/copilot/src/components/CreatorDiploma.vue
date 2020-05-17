<template>
  <el-table
    :data="creator_diplomas"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="OwnerName"
      label="Owner"
      width="%20">
    </el-table-column>
    <el-table-column
      fixed
      prop="schoolName"
      label="School"
      width="%20">
    </el-table-column>
    <el-table-column
      prop="facultyName"
      label="Faculty"
      width="%20">
    </el-table-column>
    <el-table-column
      prop="departmentName"
      label="Department"
      width="%20">
    </el-table-column>
    <el-table-column
      prop="yearOfGrad"
      label="Graduation Year"
      width="%20">
    </el-table-column>
  </el-table>
</template>

<script src="../assets/js/CreatorDiploma.js"></script>

<style scoped>

</style>
