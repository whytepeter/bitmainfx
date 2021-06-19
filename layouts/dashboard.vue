<template>
  <v-app v-if="user && !user.isDelete">
    <div>
      <v-app-bar app clipped-left flat dark color="primary">
        <v-app-bar-nav-icon dark @click="drawer = true" />
        <v-toolbar-title>
          <v-btn
            height="60"
            text
            x-large
            to="/"
            class="font-weight-bold rounded-xl"
          >
            <v-img max-width="60" src="bitmainfx.png" />
          </v-btn>
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          rounded
          to="/dashboard/profile"
          depressed
          text
          class="text-capitalize logo "
        >
          <span class="mr-2 d-none d-sm-flex">
            {{ user !== null ? user.username : "username" }}</span
          >

          <v-avatar
            v-if="user !== null"
            class="profile rounded-circle"
            color="grey"
            size="36"
          >
            <v-img :src="user.photoURL" />
          </v-avatar>
          <v-avatar v-else size="30" color="indigo">
            <v-icon x-large dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </v-btn>
      </v-app-bar>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      dark
      mobile-breakpoint="1200"
      class="primary"
      clipped
      app
    >
      <v-list>
        <v-list-item
          v-for="link in sideLinks"
          :key="link.name"
          :to="link.route"
          exact
          link
          nav
          @click="switchPage(link.name)"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list shaped>
        <v-list-item link exact @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="primary lighten-1 rounded-xl">
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <nuxt />
        </keep-alive>
      </v-slide-y-transition>
    </v-main>
    <popup />
    <v-footer color="grey lighten-2" class="d-flex justify-center">
      <div style="margin:10px">
        <div class="text-overline">
          Copyright © 2013 BitmainFX. All Rights Reserved.
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import popup from "~/components/popup.vue";
export default {
  components: { popup },

  data: () => ({
    messages: 2,

    drawer: false,
    permanent: true,
    activePage: "Dashboard",

    sideLinks: [
      { name: "Dashboard", route: "/dashboard", icon: "mdi-view-dashboard" },
      { name: "Profile", route: "/dashboard/profile", icon: "mdi-account-box" },
      {
        name: "Fund Wallet",
        route: "/dashboard/wallet/fund",
        icon: "mdi-cash-plus"
      },
      {
        name: "Withdraw",
        route: "/dashboard/wallet/withdraw",
        icon: "mdi-cash-minus"
      }
      // { name: 'Support', route: '/dashboard/support', icon: 'mdi-phone' }
    ]
  }),
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
        }
      ]
    };
  },

  computed: {
    ...mapGetters({ user: "authentication/getUser" }),

    currentYear() {
      const d = new Date();
      return d.getFullYear();
    }
  },
  created() {
    this.$store.dispatch("authentication/handleAuthStateChanged");
  },
  methods: {
    switchPage(page) {
      this.activePage = page;
    },

    logout() {
      this.$store.dispatch("authentication/logoutUser");
    }
  }
};
</script>

<style scoped>
.logo.v-btn:before {
  background-color: transparent;
}
</style>
