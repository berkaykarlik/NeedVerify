<!-- =========================================================================================
    File Name: Register.vue
    Description: Register Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/register.jpg" alt="register" class="mx-auto" />
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
              <div class="px-8 pt-8 register-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Sign Up</h4>
                </div>
                <div class="clearfix">
                  <div class="vx-row" style="margin: 0 -1rem;">
                    <div class="vx-col md:w-1/2 w-full mb-2">
                      <vs-input
                        data-vv-validate-on="blur"
                        name="name"
                        label-placeholder="* Name"
                        v-model="name"
                        class="w-full"
                      />
                    </div>
                    <div class="vx-col md:w-1/2 w-full mb-2">
                      <vs-input
                        data-vv-validate-on="blur"
                        name="Surname"
                        label-placeholder="* Surname"
                        v-model="surname"
                        class="w-full"
                      />
                    </div>
                  </div>

                  <vs-input
                    data-vv-validate-on="blur"
                    name="e-posta"
                    type="email"
                    label-placeholder="* Email Address"
                    v-model="email"
                    class="w-full mt-6"
                  />

                  <vs-input
                    ref="password"
                    type="password"
                    data-vv-validate-on="blur"
                    name="password"
                    label-placeholder="* Password"
                    v-model="password"
                    class="w-full mt-6"
                  />

                  <vs-input
                    ref="phone"
                    type="phone"
                    data-vv-validate-on="blur"
                    name="telefon"
                    label-placeholder="Identity Number"
                    v-model="identityNumber"
                    class="w-full mt-6"
                  />

                  <datepicker
                    placeholder="Select Birthday"
                    v-model="birthDate"
                    :disabledDates="disabledDates"
                    class="w-full mt-6"
                  ></datepicker>

                  <div id="button-field">
                    <vs-button type="border" to="/login" class="mt-6">Login Page</vs-button>
                    <vs-button
                      class="float-right mt-6"
                      @click="register"
                      :disabled="!validateForm"
                    >Register</vs-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
   
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      identityNumber: "",
      birthDate: null,
      disabledDates: {
        to: new Date(new Date().getFullYear() - 75, new Date().getMonth(), 1), // Disable all dates up to specific date
        from: new Date(new Date().getFullYear() - 15, new Date().getMonth(), 1) // Disable all dates after specific date
      }
    };
  },
  computed: {
    validateForm() {
      return (
        this.name.trim() != "" &&
        this.surname.trim() != "" &&
        this.email.trim() != "" &&
        this.password.trim() != "" &&
        this.identityNumber.trim() != ""
      );
    }
  },
  watch: {
    name: function(newValue) {
      this.name = newValue.toLocaleUpperCase("tr-TR");
    },
    surname: function(newValue) {
      this.surname = newValue.toLocaleUpperCase("tr-TR");
    },
    email: function(newValue) {
      this.email = newValue.toLocaleLowerCase("tr-TR");
    },
    identityNumber: function(newValue) {
      newValue = newValue.trim();
      if (
        newValue.length > 0 &&
        this.isInt(newValue[newValue.length - 1]) == false
      ) {
        newValue = newValue.substring(0, newValue.length - 1);
      }
      if (
        this.isInt(newValue) &&
        newValue.includes(".") == false &&
        newValue.includes(",") == false
      ) {
        this.identityNumber = newValue;
      } else {
        this.identityNumber = "";
      }
    }
  },
  methods: {
    isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10)) &&
        !(value + "").includes(".") &&
        !(value + "").includes(",")
      );
    },
    checkLogin() {
      if (this.$store.state.auth.isUserLoggedIn()) {
        this.$vs.notify({
          title: "Warning",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning"
        });
        return false;
      }
      return true;
    },
    register() {
      if (!this.validateForm || !this.checkLogin()) return;

      if (
        this.email.includes("@") == false ||
        this.email.includes(".") == false ||
        this.email.endsWith(".") ||
        this.email.startsWith("@") ||
        this.email.indexOf("@") + 1 == this.email.indexOf(".") ||
        this.email.length < 5
      ) {
        this.showError("Wrong email format!");
        return;
      }

      if (this.password.length < 6) {
        this.showError("Password must have a minimum of 6 characters!");
        return;
      }

      if (this.isInt(this.identityNumber) == false) {
        this.showError("Identity number format is incorrect!");
        return;
      }

      var birthDateText = this.birthDate
        ? this.birthDate.toISOString().substring(0, 10)
        : null;

      var name = this.name.trim();
      var surname = this.surname.trim();
      if (!birthDateText || !name || !surname) {
        this.showError("Please fill all fields!");
        return;
      }

      const payload = {
        name: name,
        surname: surname,
        email: this.email,
        password: this.password,
        identity_number: this.identityNumber,
        birth_date: birthDateText
      };

      this.$store
        .dispatch("auth/isEmailAvailable", this.email)
        .then(response => {
          if (response == false) {
            this.$store
              .dispatch("auth/registerUser", payload)
              .then(response => {
                if (response) {
                  this.name = "";
                  this.surname = "";
                  this.email = "";
                  this.password = "";
                  this.identityNumber = "";

                  this.$vs.dialog({
                    color: this.colorAlert,
                    title: "Successful",
                    text: "Your NeedVerify account has been successfully created. You can login to the application by going to the login page.",
                    accept: () => {
                      this.$router.push("/login").catch(() => {});
                    },
                    acceptText: "Login"
                  });
                } else {
                  this.showError(
                    "The operation could not be performed due to an error!"
                  );
                }
              });
          } else {
            this.showError("The email address you entered is already in use!");
          }
        });
    },
    showError(errorMessage) {
      this.$vs.notify({
        title: "Error!",
        text: errorMessage,
        color: "danger",
        position: "top-right"
      });
    }
  }
};
</script>

<style lang="scss">
.register-tabs-container {
  min-height: 517px;

  .con-tab {
    padding-bottom: 23px;
  }
}
#button-field {
  margin-bottom: 20px;
}
</style>
