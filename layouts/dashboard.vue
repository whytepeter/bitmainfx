<template>
  <v-app v-if="user" class="grey lighten-3" style="position: relative;">
    <!-- <div>
      <v-app-bar
        fixed
        flat
        app
        elevation
        outlined
        color="white"
      >
        <v-app-bar-nav-icon class="primary--text " @click.stop="mini = !mini, drawer = true" />
        <v-toolbar-items flat color="transparent white--text">
          <v-btn
            tile=""
            color=""
            class="font-weight-regular"
            text
            exact
          >
            {{ activePage }}
          </v-btn>
        </v-toolbar-items>
        <v-spacer />
        <span class="text-subtitle-1 font-weight-medium primary-text">{{ user && user.firstName }} {{ user && user.lastName }}</span>
        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              icon
              fab
              color="primary"
              v-on="on"
            >
              <v-icon>
                fas fa-user-circle
              </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-if="user && user.role === 'admin'" dense to="/admin/" @click="switchPage('Dashboard')">
              <v-list-item-icon>
                <v-icon size="20" class="px-1">
                  mdi-account-tie
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item>

            <v-list-item dense to="/dashboard/account" @click="switchPage('Account')">
              <v-list-item-icon>
                <v-icon size="20" class="px-1">
                  mdi-account
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>

            <v-divider />
            <v-list-item dense @click="logout">
              <v-list-item-icon>
                <v-icon size="20" class="px-1">
                  fas fa-sign-out-alt
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div> -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
      dark
      src="/bg/pattern.png"
      width="220"
      mobile-breakpoint="700"
      class="primary"
    >
      <v-list-item class="px-2 white ">
        <v-list-item-avatar large class="ml-n1">
          <v-img src="/bitmainfx.png" />
        </v-list-item-avatar>
        <v-list-item-title class="pa-2 primary--text font-weight-bold">
          Bitmain FX
        </v-list-item-title>

        <v-btn
          icon
          color="primary"
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider />
      <v-list tile>
        <v-list-item
          v-for="link in sideLinks"
          :key="link.name"
          :to="link.route"
          :href="link.link"
          exact
          link

          @click="switchPage(link.name)"
        >
          <v-list-item-icon>
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list class="font-weight-medium">
        <v-list-item class="" @click="logout">
          <v-list-item-icon>
            <v-icon color="error">
              fas fa-sign-out-alt
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="error--text">
              Logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <p-side-bar />

    <v-main class="primary darken-1 openSans text2--text pb-12">
      <!-- This code alerts the user if he/she is offline -->
      <!-- <v-card v-if="$nuxt.isOffline" tile flat dark color="secondary">
        <v-card-text class="py-1">
          <v-icon

            color="white"
            size="36"
            left
          >
            mdi-wifi-strength-alert-outline
          </v-icon>
          Unable to verify your Internet connection
        </v-card-text>
      </v-card> -->
      <p-loading />
      <p-alert />
      <popup />
      <v-card v-if="$nuxt.isOffline" tile flat dark color="warning">
        <v-card-text class="py-1">
          <v-icon color="white" size="36" left>
            mdi-wifi-strength-alert-outline
          </v-icon>
          Unable to verify your Internet connection
        </v-card-text>
      </v-card>
      <v-idle
        v-if="false"
        :reminders="[10]"
        :duration="10"
        @idle="onidle"
        @remind="onremind"
      />
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <nuxt />
        </keep-alive>
      </v-slide-y-transition>
    </v-main>

    <v-footer fixed class="pa-0 ">
      <v-bottom-navigation
        background-color="white ml-6"
        active-class="secondary--text"
        shift
        class="d-block d-sm-none d-flex justity-space-around ml-n1"
      >
        <v-btn
          v-for="link in bottomLinks"
          :key="link.name"
          @click="goto(link.name, link.route)"
        >
          <span>{{ link.slug }}</span>
          <v-icon>
            {{ link.icon }}
          </v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import PAlert from '~/components/other/pAlert.vue'
import PLoading from '~/components/other/pLoading.vue'
import Popup from '~/components/other/popup.vue'

export default {
  components: { PAlert, PLoading, Popup },
  data: () => ({
    tab: null,
    messages: 2,
    drawer: true,
    mini: true,
    permanent: true,
    color: 'secondary',

    sideLinks: [
      { name: 'Home', route: '/dashboard/home', icon: 'mdi-home-variant' },
      {
        name: 'My Account',
        slug: 'Account',
        route: '/dashboard/account',
        icon: 'mdi-account'
      },
      {
        name: 'My Investment',
        slug: 'Investment',
        route: '/dashboard/investment',
        icon: 'mdi-finance'
      },
      {
        name: 'Make Deposit',
        slug: 'Deposit',
        route: '/dashboard/deposit',
        icon: 'mdi-cash-plus'
      },

      // {
      //   name: 'Apply For Loan ',
      //   slug: 'Loan',
      //   route: '/dashboard/loan',
      //   icon: 'mdi-cash-check'
      // },
      {
        name: 'Withdrawal',
        slug: 'Withdrawal',
        route: '/dashboard/withdraw',
        icon: 'mdi-cash-minus'
      },
      {
        name: 'Support',
        slug: 'support',
        route: '',
        link: 'https://www.tidio.com/talk/lljsbyqeamlncjekrrk8iqgzvakct10y',
        icon: 'mdi-face-agent'
      }

    ],

    bottomLinks: [
      { name: 'Home', route: '/dashboard/home', icon: 'mdi-home-variant' },

      {
        name: 'My Investment',
        slug: 'Investment',
        route: '/dashboard/investment',
        icon: 'mdi-finance'
      },
      {
        name: 'Make Deposit',
        slug: 'Deposit',
        route: '/dashboard/deposit',
        icon: 'mdi-cash-plus'
      },
      {
        name: 'Withdrawal',
        slug: 'Withdrawal',
        route: '/dashboard/withdraw',
        icon: 'mdi-cash-minus'
      },

      {
        name: 'My Account',
        slug: 'Account',
        route: '/dashboard/account',
        icon: 'mdi-account'
      }

    ]

  }),

  head () {
    return {

      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Karla:wght@200;300;500;700;800&family=Open+Sans:wght@300;400;600&display=swap'
        },
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css'
        },
        {
          rel: 'stylesheet',
          href:
            'https://use.fontawesome.com/releases/v5.15.1/css/all.css'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({ user: 'authentication/getUser', activePage: 'controller/getActivePage', sideBar: 'controller/getSideBar' })

  },
  created () {
    this.$store.dispatch('authentication/handleAuth')
    if (this.$vuetify.breakpoint.xsOnly) {
      this.drawer = false
    }
  },
  methods: {
    ...mapMutations({ setActivePage: 'controller/setActivePage' }),
    ...mapActions({ initAlert: 'controller/initAlert' }),
    switchPage (page) {
      this.setActivePage(page)
    },
    goto (page, to) {
      this.$router.push(to)
      this.setActivePage(page)
    },

    logout () {
      this.$store.dispatch('authentication/logoutUser')
    },
    onidle () {
      // this.logout()
      this.initAlert({
        is: true,
        type: 'info',
        timer: 0,
        message: 'You have been logged out'
      })
    },
    onremind (time) {
      console.log(time)
      // this.initAlert({
      //   is: true,
      //   persistence: true,
      //   timer: time,
      //   type: 'info',
      //   message: 'Due to inactivity you will be logged out in'
      // })
    }
  }
}
</script>

<style scoped>
.logo.v-btn:before {
  background-color: transparent;
}

.relative {
  position:relative;
}
.absolute {
  width:100vw;
  position:absolute;
  z-index: 99;
  top:0;
  left:0
}

.karla {
font-family: 'Karla', sans-serif;
}
.openSans {
font-family: 'Open Sans', sans-serif;
}
.dmSans {
  font-family: 'DM Sans', sans-serif;
}

@media only screen and (max-width: 600px) {

}
</style>
