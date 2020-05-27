<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card title="Certificates">
    <vs-tabs>
      <vs-tab label="My Certificates">
        <vs-table :data="certificates" style="min-height: 500px">
          <template slot="thead">
            <vs-th sort-key="institution_name">Institution</vs-th>
            <vs-th sort-key="certificate_name">Certificate Name</vs-th>
            <vs-th sort-key="creation_date">Certificate Date</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr
              :key="indextr"
              v-for="(certificate, indextr) in data"
              :style="indextr % 2 === 0 ? 'background-color: white':'background-color: #f5fafa'"
            >
              <vs-td>{{certificate.institution_name }}</vs-td>
              <vs-td>{{ certificate.certificate_name }}</vs-td>
              <vs-td>{{ certificate.creation_date }}</vs-td>
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
              @click="showAddCertificateDialog=true"
            >Add Certificate</vs-button>
          </div>
        </div>

        <vs-prompt
          @accept="addCertificate"
          acceptText="Add Certificate"
          cancelText="Cancel"
          title="Add New Certificate"
          :active.sync="showAddCertificateDialog"
        >
          <div class="con-exemple-prompt">
            <p>Institution Name</p>
            <v-select
              v-model="selectedInstitutionName"
              :options="institutionNames"
              style="width: 100%; margin-top: 5px;"
            />

            <vs-input
              data-vv-validate-on="blur"
              name="name"
              label-placeholder="* Certificate Name"
              v-model="certificateName"
              class="w-full mt-10"
            />

            <vs-input
              data-vv-validate-on="blur"
              name="info"
              label-placeholder="* Certificate Information"
              v-model="certificateInfo"
              class="w-full mt-10"
            />

            <div style="display: flex;" class="mt-12">
              <p style="float: left; color: #aaaaaa; width: 200px" class="mt-3">Certificate Date:</p>
              <datepicker
                placeholder="Certificate Date"
                format="dd MM yyyy"
                v-model="certificateDate"
                class="w-full"
              ></datepicker>
            </div>
          </div>
        </vs-prompt>
      </vs-tab>

      <vs-tab label="Certificate Requests">
        <vs-table :data="requests" style="min-height: 500px">
          <template slot="thead">
            <vs-th sort-key="name">Requesting Person</vs-th>
            <vs-th sort-key="certificate_name">Certificate Name</vs-th>
            <vs-th sort-key="request_time">Request Time</vs-th>
            <vs-th>Operations</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr
              :key="indextr"
              v-for="(request, indextr) in data"
              :style="indextr % 2 === 0 ? 'background-color: white':'background-color: #f5fafa'"
            >
              <vs-td>{{request.name + " " + request.name }}</vs-td>
              <vs-td>{{ request.certificate_name }}</vs-td>
              <vs-td>{{ request.request_time }}</vs-td>
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
import moduleCertificates from "@/store/certificates/moduleCertificates.js";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    Datepicker,
    "v-select": vSelect
  },
  data() {
    return {
      certificates: [],
      requests: [],
      institutions: [],
      showAddCertificateDialog: false,
      certificateName: "",
      certificateInfo: "",
      certificateDate: null,
      selectedInstitutionName: null
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
    addCertificate() {
      this.showAddCertificateDialog = true;
      this.certificateName =
        this.certificateName == null ? "" : this.certificateName.trim();
      this.certificateInfo =
        this.certificateInfo == null ? "" : this.certificateInfo.trim();

      var instId = 0;
      this.institutions.forEach(inst => {
        if (this.selectedInstitutionName == inst.institution_name) {
          instId = inst.i_id;
        }
      });
      if (
        !this.certificateName ||
        !this.certificateInfo ||
        !this.certificateDate ||
        this.instId == 0
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
        institution_id: instId,
        certificate_name: this.certificateName,
        certificate_info: this.certificateInfo,
        certificate_date:
          this.certificateDate.getFullYear() +
          ":" +
          (this.certificateDate.getMonth() + 1) +
          ":" +
          this.certificateDate.getDate()
      };
      this.$store
        .dispatch("certificates/addCertificate", payload)
        .then(response => {
          if (response) {
            this.$vs.notify({
              title: "Successful",
              text: "Certificate added successfully.",
              color: "success",
              position: "top-right"
            });
            this.showAddCertificateDialog = false;
          } else {
            this.$vs.notify({
              title: "Error",
              text: "The operation could not be performed due to an error.",
              color: "danger",
              position: "top-right"
            });
          }
          this.$store
            .dispatch("certificates/getCreatorCertificates", userObject.u_id)
            .then(() => {
              this.certificates = this.$store.state.certificates.creatorCertificates;
              console.log("getCreatorCertificates : " + this.certificates);
            });
        });
    },
    approveRequest(request) {
      this.$store
        .dispatch("certificates/approveRequest", request.uc_id)
        .then(response => {
          if (response) {
            this.$vs.notify({
              title: "Successful",
              text: "Certificate approved successfully.",
              color: "success",
              position: "top-right"
            });
            var userObject = JSON.parse(localStorage.getItem("userObject"));
            this.$store
              .dispatch("certificates/getCertificateRequests", userObject.u_id)
              .then(() => {
                this.requests = this.$store.state.certificates.certificateRequests;
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
        .dispatch("certificates/declineRequest", request.uc_id)
        .then(response => {
          if (response) {
            this.$vs.notify({
              title: "Successful",
              text: "Certificate declined successfully.",
              color: "success",
              position: "top-right"
            });
            var userObject = JSON.parse(localStorage.getItem("userObject"));
            this.$store
              .dispatch("certificates/getCertificateRequests", userObject.u_id)
              .then(() => {
                this.requests = this.$store.state.certificates.certificateRequests;
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
    }
  },
  created() {
    if (!moduleCertificates.isRegistered) {
      this.$store.registerModule("certificates", moduleCertificates);
      moduleCertificates.isRegistered = true;
    }
    var userObject = JSON.parse(localStorage.getItem("userObject"));
    this.$store
      .dispatch("certificates/getCreatorCertificates", userObject.u_id)
      .then(() => {
        this.certificates = this.$store.state.certificates.creatorCertificates;
        console.log("getCreatorCertificates : " + this.certificates);
      });

    this.$store
      .dispatch("certificates/getCertificateRequests", userObject.u_id)
      .then(() => {
        this.requests = this.$store.state.certificates.certificateRequests;
        console.log("getCertificateRequests : " + this.requests);
      });

    this.$store.dispatch("certificates/getInstitutions").then(() => {
      this.institutions = this.$store.state.certificates.institutions;
      console.log("getInstitutions : " + this.institutions);
    });
  }
};
</script>