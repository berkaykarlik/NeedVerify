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
    <vs-tabs>
      <vs-tab label="My Diplomas">
        <vs-table :data="diplomas" style="min-height: 500px">
          <template slot="thead">
            <vs-th sort-key="school_name">University Name</vs-th>
            <vs-th sort-key="faculty_name">Faculty Name</vs-th>
            <vs-th sort-key="department_name">Department Name</vs-th>
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
              @click="showAddDiplomaDialog=true"
            >Add diploma</vs-button>
          </div>
        </div>

        <vs-prompt
          @accept="addDiploma"
          acceptText="Add diploma"
          cancelText="Cancel"
          title="Add New diploma"
          :active.sync="showAddDiplomaDialog"
        >
          <div class="con-exemple-prompt">
            <vs-input
              data-vv-validate-on="blur"
              name="name"
              label-placeholder="* University Name"
              v-model="schoolName"
              class="w-full mt-8"
            />
            <vs-input
              data-vv-validate-on="blur"
              name="name"
              label-placeholder="* Faculty Name"
              v-model="facultyName"
              class="w-full mt-8"
            />
            <vs-input
              data-vv-validate-on="blur"
              name="name"
              label-placeholder="* Department Name"
              v-model="departmentName"
              class="w-full mt-8"
            />
          </div>
        </vs-prompt>
      </vs-tab>

      <vs-tab label="Diploma Requests">
        <vs-table :data="requests" style="min-height: 600px">
          <template slot="thead">
            <vs-th sort-key="name">Requesting Person</vs-th>
            <vs-th sort-key="school_name">School</vs-th>
            <vs-th sort-key="faculty_name">Faculty</vs-th>
            <vs-th sort-key="department_name">Department</vs-th>
            <vs-th sort-key="graduation_year">Graduation Year</vs-th>
            <vs-th>Operations</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr
              :key="indextr"
              v-for="(request, indextr) in data"
              :style="indextr % 2 === 0 ? 'background-color: white':'background-color: #f5fafa'"
            >
              <vs-td>{{request.name + " " + request.surname }}</vs-td>
              <vs-td>{{ request.school_name }}</vs-td>
              <vs-td>{{ request.faculty_name }}</vs-td>
              <vs-td>{{ request.department_name }}</vs-td>
              <vs-td>{{ request.graduation_year }}</vs-td>
              <vs-td v-if="!request.is_approved && !request.is_declined">
                <vs-button
                  color="primary"
                  type="line"
                  icon-pack="feather"
                  style="float: left;"
                  @click="approveRequest(request)"
                >Approve</vs-button>

                <vs-button
                  color="primary"
                  type="line"
                  icon-pack="feather"
                  class="ml-4"
                  @click="declineRequest(request)"
                >Decline</vs-button>
              </vs-td>
              <vs-td v-else>
                <p
                  :style="request.is_approved ? 'color: #00CC00;':'color: #EE0000;'"
                >{{ request.is_approved ? "Approved" : "Declined!" }}</p>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vs-tab>
    </vs-tabs>
  </vx-card>
</template>

<script>
import moduleDiplomas from "@/store/diplomas/moduleDiplomas.js";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    Datepicker,
    "v-select": vSelect
  },
  data() {
    return {
      diplomas: [],
      requests: [],

      showAddDiplomaDialog: false,

      schoolName: "",
      facultyName: "",
      departmentName: ""
    };
  },
  computed: {
    institutionNames() {
      var names = [];
      this.institutions.forEach(inst => {
        names.push(inst.institution_name);
      });
      return names;
    }
  },
  methods: {
    addDiploma() {
      this.showAddDiplomaDialog = true;
      this.schoolName =
        this.schoolName == null ? "" : this.schoolName.trim();
      this.facultyName =
        this.facultyName == null ? "" : this.facultyName.trim();
        this.departmentName =
        this.departmentName == null ? "" : this.departmentName.trim();

      if (
        !this.schoolName ||
        !this.facultyName ||
        !this.departmentName 
      ) {
        this.$vs.notify({
          title: "Warning!",
          text: "Please fill all fields!",
          color: "warning",
          position: "top-right"
        });
        return;
      }
      var userObject = JSON.parse(localStorage.getItem("userObject"));

      var payload = {
        user_id: userObject.u_id,
        school_name: this.schoolName,
        faculty_name: this.facultyName,
        department_name: this.departmentName,
      };
      this.$store.dispatch("diplomas/addDiploma", payload).then(response => {
        if (response) {
          this.$vs.notify({
            title: "Successful",
            text: "Diploma added successfully.",
            color: "success",
            position: "top-right"
          });
          this.showAddDiplomaDialog = false;
        } else {
          this.$vs.notify({
            title: "Error",
            text: "The operation could not be performed due to an error.",
            color: "danger",
            position: "top-right"
          });
        }
        this.$store
          .dispatch("diplomas/getCreatorDiplomas", userObject.u_id)
          .then(() => {
            this.diplomas = this.$store.state.diplomas.creatorDiplomas;
            console.log("getCreatorDiplomas : " + this.diplomas);
          });
      });
    },
    approveRequest(request) {
      this.$store
        .dispatch("diplomas/approveRequest", request.ud_id)
        .then(response => {
          if (response) {
            this.$vs.notify({
              title: "Successful",
              text: "Diploma approved successfully.",
              color: "success",
              position: "top-right"
            });
            var userObject = JSON.parse(localStorage.getItem("userObject"));
            this.$store
              .dispatch("diplomas/getdiplomaRequests", userObject.u_id)
              .then(() => {
                this.requests = this.$store.state.diplomas.diplomaRequests;
              });
          } else {
            this.$vs.notify({
              title: "Error",
              text: "The operation could not be performed due to an error.",
              color: "danger",
              position: "top-right"
            });
          }
        });
    },
    declineRequest(request) {
      this.$store
        .dispatch("diplomas/declineRequest", request.ud_id)
        .then(response => {
          if (response) {
            this.$vs.notify({
              title: "Successful",
              text: "Diploma declined successfully.",
              color: "success",
              position: "top-right"
            });
            var userObject = JSON.parse(localStorage.getItem("userObject"));
            this.$store
              .dispatch("diplomas/getDiplomaRequests", userObject.u_id)
              .then(() => {
                this.requests = this.$store.state.diplomas.diplomaRequests;
              });
          } else {
            this.$vs.notify({
              title: "Error",
              text: "The operation could not be performed due to an error.",
              color: "danger",
              position: "top-right"
            });
          }
        });
    },
  },
  created() {
    if (!moduleDiplomas.isRegistered) {
      this.$store.registerModule("diplomas", moduleDiplomas);
      moduleDiplomas.isRegistered = true;
    }
    var userObject = JSON.parse(localStorage.getItem("userObject"));
    this.$store
      .dispatch("diplomas/getCreatorDiplomas", userObject.u_id)
      .then(() => {
        this.diplomas = this.$store.state.diplomas.creatorDiplomas;
      });

    this.$store
      .dispatch("diplomas/getDiplomaRequests", userObject.u_id)
      .then(() => {
        this.requests = this.$store.state.diplomas.diplomaRequests;
      });
  }
};
</script>