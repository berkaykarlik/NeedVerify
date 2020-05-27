<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card title="Notary">
    <vs-tabs>
      <vs-tab label="My Notary Documents">
        <vs-table :data="myNotaryDocuments" style="min-height: 500px">
          <template slot="thead">
            <vs-th sort-key="document_type">Document Type</vs-th>
            <vs-th sort-key="document_info">Document Name</vs-th>
            <vs-th sort-key="creation_time">Notary Date</vs-th>
            <vs-th>Other Person</vs-th>
            <vs-th>Condition</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr
              :key="indextr"
              v-for="(document, indextr) in data"
              :style="indextr % 2 === 0 ? 'background-color: white':'background-color: #f5fafa'"
            >
              <vs-td>{{ document.document_type }}</vs-td>
              <vs-td>{{ document.document_info }}</vs-td>
              <vs-td>{{ document.creation_time }}</vs-td>
              <vs-td>{{ document.name + " " + document.surname }}</vs-td>
              <vs-td>
                <p
                  :style="document.is_approved ? 'color: #00AA00' : document.is_declined ? 'color: #EE0000' : ''"
                >{{ document.is_approved ? "Approved" : document.is_declined ? "Declined!" : "Pending"}}</p>
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
              @click="openAddDocumentDialog()"
            >Create Notary Document</vs-button>
          </div>
        </div>

        <vs-prompt
          @accept="addDocument"
          acceptText="Create"
          cancelText="Cancel"
          title="Create Notary Document"
          :active.sync="showAddDocumentDialog"
        >
          <div class="con-exemple-prompt">
            <p>Select Document Type</p>
            <v-select
              v-model="selectedDocumentType"
              :options="['Real Estate', 'Vehicle']"
              style="width: 100%; margin-top: 5px;"
            />

            <vs-input
              data-vv-validate-on="blur"
              name="name"
              label-placeholder="* Document Information"
              v-model="documentInfo"
              class="w-full mt-8"
            />

            <p class="mt-6">Contact Person</p>
            <v-select
              v-model="selectedContactFullName"
              :options="contactFullNames"
              style="width: 100%; margin-top: 5px;"
            />
          </div>
        </vs-prompt>
      </vs-tab>

      <vs-tab label="Documents To Approve">
        <vs-table :data="notaryDocumentsToApprove" style="min-height: 600px">
          <template slot="thead">
            <vs-th sort-key="document_type">Document Type</vs-th>
            <vs-th sort-key="document_info">Certificate Name</vs-th>
            <vs-th sort-key="creation_time">Certificate Date</vs-th>
            <vs-th>Document Owner</vs-th>
            <vs-th>Operations</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr
              :key="indextr"
              v-for="(document, indextr) in data"
              :style="indextr % 2 === 0 ? 'background-color: white':'background-color: #f5fafa'"
            >
              <vs-td>{{ document.document_type }}</vs-td>
              <vs-td>{{ document.document_info }}</vs-td>
              <vs-td>{{ document.creation_time }}</vs-td>
              <vs-td>{{ document.name + " " + document.surname }}</vs-td>
              <vs-td v-if="!document.is_approved && !document.is_declined">
                <vs-button
                  color="primary"
                  type="line"
                  icon-pack="feather"
                  style="float: left;"
                  @click="approveDocument(document)"
                >Approve</vs-button>

                <vs-button
                  color="primary"
                  type="line"
                  icon-pack="feather"
                  class="ml-4"
                  @click="declineDocument(document)"
                >Decline</vs-button>
              </vs-td>
              <vs-td v-else>
                <p
                  :style="document.is_approved ? 'color: #00CC00;':'color: #EE0000;'"
                >{{ document.is_approved ? "Approved" : "Declined!" }}</p>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vs-tab>
    </vs-tabs>
  </vx-card>
</template>

<script>
import moduleNotary from "@/store/notary/moduleNotary.js";
import vSelect from "vue-select";

export default {
  components: {
    "v-select": vSelect
  },
  data() {
    return {
      myNotaryDocuments: [],
      notaryDocumentsToApprove: [],
      allUsers: [],
      showAddDocumentDialog: false,
      selectedDocumentType: "",
      selectedContactFullName: "",
      documentInfo: ""
    };
  },
  computed: {
    contactFullNames() {
      var fullNames = [];
      this.allUsers.forEach(user => {
        fullNames.push(user.name + " " + user.surname);
      });
      return fullNames;
    }
  },
  methods: {
    openAddDocumentDialog() {
      var userObject = JSON.parse(localStorage.getItem("userObject"));
      this.$store.dispatch("notary/getAllUsers", userObject.u_id).then(() => {
        this.allUsers = this.$store.state.notary.allUsers;
        this.showAddDocumentDialog = true;
      });
      this.showAddDocumentDialog = true;
    },
    addDocument() {
      this.showAddDocumentDialog = false;

      if (
        !this.selectedDocumentType ||
        !this.selectedContactFullName ||
        !this.documentInfo
      ) {
        this.$vs.notify({
          title: "Warning!",
          text: "Please fill all fields!",
          color: "warning",
          position: "top-right"
        });
        return;
      }

      var user_to_approve_id = 0;
      this.allUsers.forEach(user => {
        if (this.selectedContactFullName == user.name + " " + user.surname) {
          user_to_approve_id = user.u_id;
        }
      });

      var userObject = JSON.parse(localStorage.getItem("userObject"));
      var payload = {
        user_id: userObject.u_id,
        user_to_approve_id: user_to_approve_id,
        document_type: this.selectedDocumentType,
        document_info: this.documentInfo
      };

      this.$store
        .dispatch("notary/addNotaryDocument", payload)
        .then(response => {
          if (response) {
            this.$vs.notify({
              title: "Successful",
              text: "Notary document added successfully.",
              color: "success",
              position: "top-right"
            });
            this.showAddDocumentDialog = false;
          } else {
            this.$vs.notify({
              title: "Error",
              text: "The operation could not be performed due to an error.",
              color: "danger",
              position: "top-right"
            });
          }
          this.$store
            .dispatch("notary/getMyNotaryDocuments", userObject.u_id)
            .then(() => {
              this.myNotaryDocuments = this.$store.state.notary.myNotaryDocuments;
              console.log(
                "myNotaryDocuments : " +
                  this.$store.state.notary.myNotaryDocuments
              );
            });
        });
    },
    approveDocument(document) {
      this.$store
        .dispatch("notary/approveDocument", document.nd_id)
        .then(response => {
          if (response) {
            this.$vs.notify({
              title: "Successful",
              text: "Document approved successfully.",
              color: "success",
              position: "top-right"
            });
            var userObject = JSON.parse(localStorage.getItem("userObject"));
            this.$store
              .dispatch("notary/getNotaryDocumentsToApprove", userObject.u_id)
              .then(() => {
                this.notaryDocumentsToApprove = this.$store.state.notary.notaryDocumentsToApprove;
                console.log(
                  "notaryDocumentsToApprove : " +
                    this.$store.state.notary.notaryDocumentsToApprove
                );
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
    declineDocument(document) {
      this.$store
        .dispatch("notary/declineDocument", document.nd_id)
        .then(response => {
          if (response) {
            this.$vs.notify({
              title: "Successful",
              text: "Document declined successfully.",
              color: "success",
              position: "top-right"
            });
            var userObject = JSON.parse(localStorage.getItem("userObject"));
            this.$store
              .dispatch("notary/getNotaryDocumentsToApprove", userObject.u_id)
              .then(() => {
                this.notaryDocumentsToApprove = this.$store.state.notary.notaryDocumentsToApprove;
                console.log(
                  "notaryDocumentsToApprove : " +
                    this.$store.state.notary.notaryDocumentsToApprove
                );
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
    if (!moduleNotary.isRegistered) {
      this.$store.registerModule("notary", moduleNotary);
      moduleNotary.isRegistered = true;
    }
    var userObject = JSON.parse(localStorage.getItem("userObject"));
    this.$store
      .dispatch("notary/getMyNotaryDocuments", userObject.u_id)
      .then(() => {
        this.myNotaryDocuments = this.$store.state.notary.myNotaryDocuments;
        console.log(
          "myNotaryDocuments : " + this.$store.state.notary.myNotaryDocuments
        );
      });

    this.$store
      .dispatch("notary/getNotaryDocumentsToApprove", userObject.u_id)
      .then(() => {
        this.notaryDocumentsToApprove = this.$store.state.notary.notaryDocumentsToApprove;
        console.log(
          "notaryDocumentsToApprove : " +
            this.$store.state.notary.notaryDocumentsToApprove
        );
      });
  }
};
</script>