<template>
  <v-app>
    <v-main class="grey lighten-3">
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <nuxt />
        </keep-alive>
      </v-slide-y-transition>
    </v-main>
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
      { name: 'Dashboard', route: '/dashboard', icon: 'mdi-view-dashboard' },
      { name: 'Profile', route: '/dashboard/profile', icon: 'mdi-account-box' },
      {
        name: 'Fund Wallet',
        route: '/dashboard/wallet/fund',
        icon: 'mdi-cash-plus'
      },
      {
        name: 'Withdraw',
        route: '/dashboard/wallet/withdraw',
        icon: 'mdi-cash-minus'
      }
      // { name: 'Support', route: '/dashboard/support', icon: 'mdi-phone' }
    ]
  }),
  head () {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),

    currentYear () {
      const d = new Date()
      return d.getFullYear()
    }
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
