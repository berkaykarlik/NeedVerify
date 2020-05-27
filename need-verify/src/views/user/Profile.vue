<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card title="Your Account">
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
        <vs-input class="w-full mt-4" label="Ad" v-model="name" />

        <vs-input class="w-full mt-4" label="Soyad" v-model="surname" />
      </div>

      <div class="vx-col md:w-1/2 w-full">
        <vs-input class="w-full mt-4" label="E-Posta" v-model="email" disabled />

        <vs-input class="w-full mt-4" label="Telefon" v-model="phone" :disabled="phoneVerified" />
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button
            class="ml-auto mt-2"
            @click="saveChanges"
            :disabled="!dataChanged"
          >Değişiklikleri Kaydet</vs-button>
          <vs-button
            class="ml-4 mt-2"
            type="border"
            color="warning"
            :disabled="!dataChanged"
            @click="loadData"
          >Temizle</vs-button>
          <vs-button class="ml-4 mt-2" type="border" @click="resetPassword">Şifre Yenile</vs-button>
        </div>
      </div>
    </div>


    <vx-card v-if="showVerifiyMessage" title="Telefon Numaranızı Onaylayın!" class="mt-12">
      <vs-alert color="warning" active="true">
        - Telefon numarası, e-posta hesabında yaşanan herhangi bir sıkıntıda, hesabınızı kurtarmak için kullanılmaktadır.
        Telefon onay zorunluluğu, DHY ve TUS atama simülasyonlarında kötü amaçlı kullanıcıların diğer kişilerin bilgilerine bir şekilde ulaşsalar dahi,
        birden fazla hesap açarak süreci manipüle etmesini zorlaştırmaktadır. Uygulamadaki bazı özellikleri kullanılabilmek için telefon numarasını onaylamanız gerekmektedir.
        <br />
        - Telefonunuza gelen mesajdaki onay linkine tıkladıktan sonra profil sayfanızı güncelleyerek onaylanma işlemini kontrol edebilirsiniz.
        <br />
        - 24 saat içerisinde en fazla 5 defa onay linki talebinde bulunabilirsiniz.
      </vs-alert>
      <div class="vx-col w-full justify-end">
        <vs-button
          class="ml-auto ml-4 mt-4 flex flex-wrap items-center justify-end"
          type="border"
          @click="sendPhoneVerificationMessage"
        >Onay Mesajı Gönder</vs-button>
      </div>
    </vx-card>

  </vx-card>
</template>

<script>
import vSelect from "vue-select";

export default {
  components: {
    vSelect
  },
  data() {
    return {
      user: null,
      name: "",
      surname: "",
      email: "",
      phone: "",
      phoneVerified: true
    };
  },
  computed: {
    dataChanged() {
      if (this.user == null) {
        return false;
      }
      return (
        this.user.name != this.name.trim() ||
        this.user.surname != this.surname.trim() ||
        this.user.phone.replace(/\s+/g, "") != this.phone.trim()
      );
    },
    showVerifiyMessage() {
      return (
        this.phoneVerified == false &&
        this.user != null &&
        this.user.phone.length > 2
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
    phone: function(newValue) {
      newValue = newValue.trim();
      if (this.phone.length < 2) {
        this.phone = "05";
      } else {
        if (
          newValue.length > 0 &&
          this.isInt(newValue[newValue.length - 1]) == false
        ) {
          newValue = newValue.substring(0, newValue.length - 1);
        }
        if (newValue.length > 11) {
          newValue = newValue.substring(0, 11);
        }
        if (
          this.isInt(newValue) &&
          newValue.includes(".") == false &&
          newValue.includes(",") == false
        ) {
          this.phone = newValue;
        } else {
          this.phone = "05";
        }
      }
    }
  },
  methods: {
    saveChanges() {
      if (this.name.length > 40 || this.surname.length > 40) {
        this.showError("Daha kısa ad-soyad girin!");
        return;
      }

      if (this.phone.length > 2) {
        if (this.phone.length != 11 || this.isInt(this.phone) == false) {
          this.showError("Telefon numarası formatı hatalı!");
          return;
        }
      }
      var formattedPhone = "";
      if (this.phone.length == 11) {
        formattedPhone =
          this.phone.substring(0, 4) +
          " " +
          this.phone.substring(4, 7) +
          " " +
          this.phone.substring(7, 9) +
          " " +
          this.phone.substring(9, 11);
      }

      const payload = {
        email: this.user.email,
        name: this.name,
        surname: this.surname,
        phone: formattedPhone
      };
      this.$store.dispatch("auth/updateUser", payload).then(response => {
        if (response) {
          this.$store
            .dispatch(
              "auth/fetchUser",
              JSON.parse(localStorage.getItem("userObject")).email
            )
            .then(() => {
              this.loadData();
              this.$vs.notify({
                title: "İşlem başarılı",
                text: "Kullanıcı bilgileriniz yenilendi.",
                color: "success",
                position: "top-right"
              });
            });
        } else {
          this.showError("Oluşan bir sorundan dolayı bilgiler güncellenemedi!");
        }
      });
    },
    showError(errorMessage) {
      this.$vs.notify({
        title: "Hata!",
        text: errorMessage,
        color: "danger",
        position: "top-right"
      });
    },
    loadData() {
      this.user = JSON.parse(localStorage.getItem("userObject"));
      this.name = this.user.name;
      this.surname = this.user.surname;
      this.email = this.user.email;
      this.phone = this.user.phone.replace(/\s+/g, "");
      this.phoneVerified = this.user.phone_verified != 0;
    },
    sendPhoneVerificationMessage() {
      console.log("sendPhoneVerificationMessage");
      this.$store
        .dispatch("auth/sendPhoneVerificationMessage")
        .then(response => {
          if (response) {
            this.$vs.notify({
              title: "Bilgilendirme!",
              text: "Onay mesajı telefonunuza gönderildi.",
              color: "success",
              position: "top-right"
            });
          } else {
            this.showError(
              "Oluşan bir sorundan dolayı onay mesajı gönderilemedi"
            );
          }
        });
    },
    resetPassword() {
      var email = JSON.parse(localStorage.getItem("userObject")).email;
      this.$store
        .dispatch("auth/sendResetPasswordCode", email)
        .then(response => {
          if (response) {
            this.$router.push("/reset-password").catch(() => {});
          } else {
            this.showError(
              "Oluşan bir sorundan dolayı şifre yenileme kodu gönderilemedi"
            );
          }
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
    this.$store
      .dispatch(
        "auth/fetchUser",
        JSON.parse(localStorage.getItem("userObject")).email
      )
      .then(() => {
        this.loadData();
      });
  }
};
</script>
