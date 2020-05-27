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
    <vs-table :data="userCertificates" style="min-height: 600px">
      <template slot="thead">
        <vs-th sort-key="institution_name">Institution</vs-th>
        <vs-th sort-key="certificate_name">Certificate Name</vs-th>
        <vs-th sort-key="request_time">Request Time</vs-th>
        <vs-th>Condition</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr
          :key="indextr"
          v-for="(certificate, indextr) in data"
          :style="indextr % 2 === 0 ? 'background-color: white':'background-color: #f5fafa'"
        >
          <vs-td>{{certificate.institution_name }}</vs-td>
          <vs-td>{{ certificate.certificate_name }}</vs-td>
          <vs-td>{{ certificate.request_time }}</vs-td>
          <vs-td>
            <p :style="certificate.is_approved ? 'color: #00AA00' : certificate.is_declined ? 'color: #EE0000' : ''">
              {{ certificate.is_approved ? "Approved" : certificate.is_declined ? "Declined!" : "Pending"}}
              </p>
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
          @click="showCreateCertificateRequestDialog=true"
        >Create Certificate Request</vs-button>
      </div>
    </div>

    <vs-prompt
      @accept="createCertificateRequest"
      acceptText="Create Request"
      cancelText="Cancel"
      title="Create Certificate Request"
      :active.sync="showCreateCertificateRequestDialog"
    >
      <div class="con-exemple-prompt">
        <p>Select Institution</p>
        <v-select
          v-model="selectedInstitutionName"
          :options="institutionNames"
          style="width: 100%; margin-top: 5px;"
        />

        <p class="mt-6">Select Certificate</p>
        <v-select
          v-model="selectedCertificateName"
          :options="certificateNamesOfSelectedInstitution"
          style="width: 100%; margin-top: 5px;"
        />
      </div>
    </vs-prompt>
  </vx-card>
</template>


<script>
import moduleCertificates from "@/store/certificates/moduleCertificates.js";
import vSelect from "vue-select";

export default {
  components: {
    "v-select": vSelect
  },
  data() {
    return {
      userCertificates: [],
      showCreateCertificateRequestDialog: false,
      institutions: [],
      certificatesOfSelectedInstitution: [],
      selectedInstitutionName: null,
      selectedCertificateName: null
    };
  },
  watch: {
    selectedInstitutionName: function(newValue) {
      if (newValue) {
        var instId = 0;
        this.institutions.forEach(inst => {
          if (this.selectedInstitutionName == inst.institution_name) {
            instId = inst.i_id;
          }
        });
        this.selectedCertificateName = null;
        this.$store
          .dispatch("certificates/getCertificatesOfSelectedInstitution", instId)
          .then(response => {
            console.log("response: " + response);
            this.certificatesOfSelectedInstitution = response;
          });
      }
    }
  },
  computed: {
    institutionNames() {
      var names = [];
      this.institutions.forEach(inst => {
        names.push(inst.institution_name);
      });
      return names;
    },
    certificateNamesOfSelectedInstitution() {
      var names = [];
      this.certificatesOfSelectedInstitution.forEach(certificate => {
        names.push(certificate.certificate_name);
      });
      return names;
    }
  },
  methods: {
    createCertificateRequest() {
      this.showCreateCertificateRequestDialog = false;
      if (!this.selectedInstitutionName || !this.selectedCertificateName) {
        this.$vs.notify({
          title: "Warning!",
          text: "Please select institution and certificate!",
          color: "warning",
          position: "top-right"
        });
        return;
      }

      var certId = 0;
      this.certificatesOfSelectedInstitution.forEach(cert => {
        if (this.selectedCertificateName == cert.certificate_name) {
          certId = cert.c_id;
        }
      });
      var userObject = JSON.parse(localStorage.getItem("userObject"));

      var payload = {
        user_id: userObject.u_id,
        certificate_id: certId
      };
      this.$store
        .dispatch("certificates/addUserCertificate", payload)
        .then(response => {
          if (response) {
            this.$vs.notify({
              title: "Successful",
              text: "Certificate request added successfully.",
              color: "success",
              position: "top-right"
            });
            this.showCreateCertificateRequestDialog = false;
          } else {
            this.$vs.notify({
              title: "Error",
              text: "The operation could not be performed due to an error.",
              color: "danger",
              position: "top-right"
            });
          }
          this.$store
            .dispatch("certificates/getUserCertificates", userObject.u_id)
            .then(() => {
              this.userCertificates = this.$store.state.certificates.userCertificates;
              console.log("getUserCertificates : " + this.userCertificates);
            });
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
      .dispatch("certificates/getUserCertificates", userObject.u_id)
      .then(() => {
        this.userCertificates = this.$store.state.certificates.userCertificates;
        console.log("getUserCertificates : " + this.userCertificates);
      });
    this.$store.dispatch("certificates/getInstitutions").then(() => {
      this.institutions = this.$store.state.certificates.institutions;
      console.log("getInstitutions : " + this.institutions);
    });
  }
};
</script>