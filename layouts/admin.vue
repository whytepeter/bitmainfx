<template>
  <v-app v-if="user">
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
          to="/admin/account"
          depressed
          text
          class="text-capitalize logo "
        >
          <span class="mr-2 d-none d-sm-flex">
            {{ user !== null ? user.username : "username" }}</span>
          <v-badge
            v-if="user !== null"
            content="admin"
            value="admin"
            color="info"
            overlap
          >
            <v-avatar class="profile rounded-circle" color="grey" size="36">
              <v-img :src="user.photoURL" />
            </v-avatar>
          </v-badge>
          <v-badge v-else content="admin" value="admin" color="info" overlap>
            <v-avatar size="30" color="indigo">
              <v-icon x-large dark>
                mdi-account-circle
              </v-icon>
            </v-avatar>
          </v-badge>
        </v-btn>
      </v-app-bar>
    </div>

    <v-navigation-drawer v-model="drawer" mobile-breakpoint="1200" clipped app>
      <v-list>
        <v-list-item
          v-for="link in sideLinks"
          :key="link.name"
          :to="link.route"
          active-class="blue lighten-5 primary--text"
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
      <v-list>
        <v-list-item link exact @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-3">
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <nuxt />
        </keep-alive>
      </v-slide-y-transition>
    </v-main>

    <v-footer color="grey lighten-2" class="d-flex justify-center">
      <div style="margin:10px">
        <div class="text-overline text-center">
          Copyright © 2013 CryptoFund. All Rights Reserved.
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    messages: 2,

    drawer: false,
    permanent: true,
    activePage: 'Dashboard',

    sideLinks: [
      { name: 'Dashboard', route: '/admin', icon: 'mdi-view-dashboard' },
      { name: 'Users', route: '/admin/users', icon: 'mdi-account-group' },
      { name: 'Account', route: '/admin/account', icon: 'mdi-account-box' }
      // { name: 'Investments', route: '/admin/investment', icon: 'mdi-cash-minus' },
      // { name: 'Withdraw', route: '/admin/withdraw', icon: 'mdi-cash-minus' }
      // { name: 'Support', route: '/dashboard/support', icon: 'mdi-phone' }
    ]
  }),

  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),

    currentYear () {
      const d = new Date()
      return d.getFullYear()
    }
  },
  created () {
    this.$store.dispatch('authentication/handleAuthStateChanged')
    this.$store.dispatch('users/initUsers')
  },
  methods: {
    switchPage (page) {
      this.activePage = page
    },

    logout () {
      this.$store.dispatch('authentication/logoutUser')
    }
  }
}
</script>

<style scoped>
.logo.v-btn:before {
  background-color: transparent;
}
</style>
