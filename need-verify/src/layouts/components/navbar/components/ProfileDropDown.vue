<template>
  <!-- USER META -->
  <div class="the-navbar__user-meta flex items-center" v-if="userInfo">
    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ user_displayName }}</p>
    </div>
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="con-img ml-3">
        <img
          v-if="activeUserImg"
          key="onlineImg"
          :src="activeUserImg"
          alt="user-img"
          width="32"
          height="32"
          class="rounded-full shadow-md cursor-pointer block"
        />
      </div>
      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/').catch(() => {})"
          >
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Account</span>
          </li>

          <vs-divider class="m-1"></vs-divider>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout"
          >
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    // PROFILE
    userInfo() {
      var userObject = JSON.parse(localStorage.getItem("userObject"));
      if (!userObject) {
        this.logout();
      }
      return userObject;
    },
    user_displayName() {
      return this.userInfo.name + " " + this.userInfo.surname;
    },
    activeUserImg() {
      return require("@/assets/images/portrait/small/avatar-s-11.jpg");
    }
  },
  methods: {
    logout() {
      // if user is logged in via auth0
      if (this.$auth.profile) this.$auth.logOut();

      // If JWT login
      if (localStorage.getItem("accessToken")) {
        localStorage.removeItem("accessToken");
        this.$router.push("/login").catch(() => {});
      }

      // Change role on logout. Same value as initialRole of acj.js
      this.$acl.change("admin");
      localStorage.removeItem("userInfo"); // BU SİSLİNECEK !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      localStorage.removeItem("userObject");

      // This is just for demo Purpose. If user clicks on logout -> redirect
      this.$router.push("/login").catch(() => {});
    }
  }
};
</script>
