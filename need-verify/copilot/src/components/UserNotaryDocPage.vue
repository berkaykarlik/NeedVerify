<template>
  <el-container>
    <el-aside >
      <el-button   v-on:click="handleCreateNotaryDocButtonClick"  type="primary" plain>Create Notary Document</el-button>
    </el-aside>
    <el-main>
    <el-header>My Notary Documents</el-header>
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
      <el-table-column
        label="Operations">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleApprove(scope.$index, scope.row)">Approve</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-main>
  </el-container>
</template>

<script src="../assets/js/UserNotaryDocPage.js"></script>

<style scoped>

</style>
