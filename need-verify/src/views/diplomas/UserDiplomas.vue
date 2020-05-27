<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card title="Diplomas">
    <vs-table :data="userDiplomas" style="min-height: 600px">
      <template slot="thead">
        <vs-th sort-key="school_name">University Name</vs-th>
        <vs-th sort-key="faculty_name">Faculty Name</vs-th>
        <vs-th sort-key="department_name">Department Name</vs-th>
        <vs-th sort-key="graduation_year">Graduation Year</vs-th>
        <vs-th>Condition</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr
          :key="indextr"
          v-for="(diploma, indextr) in data"
          :style="indextr % 2 === 0 ? 'background-color: white':'background-color: #f5fafa'"
        >
          <vs-td>{{ diploma.school_name }}</vs-td>
          <vs-td>{{ diploma.faculty_name }}</vs-td>
          <vs-td>{{ diploma.department_name }}</vs-td>
          <vs-td>{{ diploma.graduation_year }}</vs-td>
          <vs-td>
            <p
              :style="diploma.is_approved ? 'color: #00AA00' : diploma.is_declined ? 'color: #EE0000' : ''"
            >{{ diploma.is_approved ? "Approved" : diploma.is_declined ? "Declined!" : "Pending"}}</p>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <div class="flex flex-wrap justify-between items-center" style="margin-top: 25px;">
      <div></div>
      <div class="flex flex-wrap items-center justify-between">
        <vs-button
          color="primary"
          type="border"
          icon-pack="feather"
          icon="icon-add"
          @click="openCreateDiploma()"
        >Create Diploma Request</vs-button>
      </div>
    </div>

    <vs-prompt
      @accept="createDiplomaRequest"
      acceptText="Create Request"
      cancelText="Cancel"
      title="Create Diploma Request"
      :active.sync="showCreateDiplomaRequestDialog"
    >
      <p>Select University</p>
      <v-select
        v-model="selectedSchoolName"
        :options="schoolNames"
        style="width: 100%; margin-top: 5px;"
      />
      <p class="mt-4">Select Faculty</p>
      <v-select
        v-model="selectedFacultyName"
        :options="facultyNames"
        style="width: 100%; margin-top: 5px;"
      />
      <p class="mt-4">Select Department</p>
      <v-select
        v-model="selectedDepartmentName"
        :options="departmentNames"
        style="width: 100%; margin-top: 5px;"
      />

      <p class="mt-4">Select Graduation Year</p>
      <v-select
        v-model="graduationYear"
        :options="graduationYearOptions"
        style="width: 100%; margin-top: 5px;"
      />
    </vs-prompt>
  </vx-card>
</template>


<script>
import moduleDiplomas from "@/store/diplomas/moduleDiplomas.js";
import vSelect from "vue-select";

export default {
  components: {
    "v-select": vSelect
  },
  data() {
    return {
      userDiplomas: [],
      showCreateDiplomaRequestDialog: false,
      allDiplomas: [],
      selectedSchoolName: "",
      selectedFacultyName: "",
      selectedDepartmentName: "",
      graduationYear: ""
    };
  },

  watch: {
    selectedSchoolName: function() {
      this.selectedFacultyName = "";
      this.selectedDepartmentName = "";
    },
    selectedFacultyName: function() {
      this.selectedDepartmentName = "";
    }
  },

  computed: {
    graduationYearOptions() {
      var years = [];
      var i;
      for (i = 2020; i > 1960 ; i--) {
        years.push(i);
      }
      return years;
    },
    schoolNames() {
      var schoolNames = [];
      this.allDiplomas.forEach(diploma => {
        if (schoolNames.includes(diploma.school_name) == false) {
          schoolNames.push(diploma.school_name);
        }
      });
      return schoolNames;
    },
    facultyNames() {
      var facultyNames = [];
      this.allDiplomas.forEach(diploma => {
        if (
          this.selectedSchoolName == null ||
          this.selectedSchoolName.length == 0 ||
          (diploma.school_name == this.selectedSchoolName &&
            facultyNames.includes(diploma.faculty_name) == false)
        ) {
          facultyNames.push(diploma.faculty_name);
        }
      });
      return facultyNames;
    },
    departmentNames() {
      var departmentNames = [];
      this.allDiplomas.forEach(diploma => {
        if (
          this.selectedFacultyName == null ||
          this.selectedFacultyName.length == 0 ||
          (diploma.faculty_name == this.selectedFacultyName &&
            departmentNames.includes(diploma.department_name) == false)
        ) {
          departmentNames.push(diploma.department_name);
        }
      });
      return departmentNames;
    }
  },
  methods: {
    openCreateDiploma() {
      console.log("openCreateDiploma");
      this.$store.dispatch("diplomas/getAllDiplomas").then(() => {
        this.allDiplomas = this.$store.state.diplomas.allDiplomas;
        console.log("allDiplomas : " + this.$store.state.diplomas.allDiplomas);
      });
      this.showCreateDiplomaRequestDialog = true;
    },
    createDiplomaRequest() {
      this.showCreateDiplomaRequestDialog = true;
      this.selectedSchoolName =
        this.selectedSchoolName == null ? "" : this.selectedSchoolName.trim();
      this.selectedFacultyName =
        this.selectedFacultyName == null ? "" : this.selectedFacultyName.trim();
      this.selectedDepartmentName =
        this.selectedDepartmentName == null
          ? ""
          : this.selectedDepartmentName.trim();

      if (!this.selectedSchoolName || !this.selectedFacultyName || !this.selectedDepartmentName || !this.graduationYear) {
        this.$vs.notify({
          title: "Warning!",
          text: "Please fill all fields!",
          color: "warning",
          position: "top-right"
        });
        return;
      }

    var diploma_id = 0;
    this.allDiplomas.forEach((diploma) => {
      if(diploma.school_name == this.selectedSchoolName && diploma.faculty_name == this.selectedFacultyName && diploma.department_name == this.selectedDepartmentName){
        diploma_id = diploma.d_id;
      }
    });

      var userObject = JSON.parse(localStorage.getItem("userObject"));

      var payload = {
        user_id: userObject.u_id,
        diploma_id: diploma_id,
        graduation_year: this.graduationYear,
      };

      this.$store
        .dispatch("diplomas/addUserDiploma", payload)
        .then(response => {
          if (response) {
            this.$vs.notify({
              title: "Successful",
              text: "Diploma request added successfully.",
              color: "success",
              position: "top-right"
            });
            this.showCreateDiplomaRequestDialog = false;
          } else {
            this.$vs.notify({
              title: "Error",
              text: "The operation could not be performed due to an error.",
              color: "danger",
              position: "top-right"
            });
          }
          this.$store
            .dispatch("diplomas/getUserDiplomas", userObject.u_id)
            .then(() => {
              this.userDiplomas = this.$store.state.diplomas.userDiplomas;
              console.log("userDiplomas : " + this.userDiplomas);
            });
        });
    },
    isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10)) &&
        !(value + "").includes(".") &&
        !(value + "").includes(",")
      );
    }
  },
  created() {
    if (!moduleDiplomas.isRegistered) {
      this.$store.registerModule("diplomas", moduleDiplomas);
      moduleDiplomas.isRegistered = true;
    }
    var userObject = JSON.parse(localStorage.getItem("userObject"));
    this.$store
      .dispatch("diplomas/getUserDiplomas", userObject.u_id)
      .then(() => {
        this.userDiplomas = this.$store.state.diplomas.userDiplomas;
        console.log("getUserDiplomas : " + this.userDiplomas);
      });
  }
};
</script>