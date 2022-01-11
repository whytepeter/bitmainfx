<template>
  <v-app>
    <div>
      <v-app-bar
        fixed
        flat
        dark
        :elevate-on-scroll="true"
        height="70"
        :color="background"
      >
        <v-app-bar-nav-icon class="d-md-none" @click="drawer = true" />
        <v-toolbar-title>
          <v-btn
            height="70"
            text
            x-large
            to="/"
            class="text-upptercase font-weight-bold ml-n4"
          >
            <!-- <v-img max-width="180" src="/Bitmain FX1.png" /> -->
            <span class="text-h6">Bitmain FX </span>
          </v-btn>
        </v-toolbar-title>

        <v-spacer class="d-sm-none" />
        <v-toolbar-items flat class="hidden-sm-and-down " color="transparent">
          <v-btn
            tile
            active-class=" font-weight-medium secondary--text"
            class="indigo--text text--lighten-5 text-h6 text-capitalize home-active font-weight-light"
            text
            to="/about"
            exact
          >
            About
          </v-btn>
          <v-btn
            tile
            active-class=" font-weight-medium secondary--text"
            class="indigo--text text--lighten-5 text-h6 text-capitalize home-active font-weight-light"
            text
            to="/help"
            exact
          >
            Help
          </v-btn>
          <!-- <v-menu open-on-hover offset-y bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                tile
                active-class=" font-weight-medium secondary--text"
                class="indigo--text text--lighten-5 text-h6 text-capitalize home-active font-weight-light"
                text
                to="/trade/forex"
                exact
                v-on="on"
              >
                Trade
              </v-btn>
            </template>

            <v-list tile>
              <v-list-item to="/trade/forex" class="px-6">
                <v-list-item-title>Forex</v-list-item-title>
              </v-list-item>
              <v-list-item to="/trade/stock" class="px-6">
                <v-list-item-title>Stocks</v-list-item-title>
              </v-list-item>
              <v-list-item to="/trade/crypto" class="px-6">
                <v-list-item-title>Cryptos</v-list-item-title>
              </v-list-item>
              <v-list-item to="/trade/options" class="px-6">
                <v-list-item-title>Options</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> -->

          <!-- <v-btn
            tile
            active-class=" font-weight-medium secondary--text"
            class="indigo--text text--lighten-5 text-h6 text-capitalize home-active font-weight-light"
            text
            to="/copytrade"
            exact
          >
            Copy Trade
          </v-btn> -->
          <v-btn
            tile
            active-class=" font-weight-medium secondary--text"
            class="indigo--text text--lighten-5 text-h6 text-capitalize home-active font-weight-light"
            text
            to="/contact"
            exact
          >
            Contact Us
          </v-btn>
        </v-toolbar-items>
        <v-spacer />
        <v-btn
          to="/login"
          icon
          depressed
          color="white primary--text"
          class="text-capitalize d-md-none font-weight-regular"
        >
          <v-icon color="secondary">
            mdi-login-variant
          </v-icon>
        </v-btn>
        <v-btn
          to="/login"
          :outlined="currentRoute"
          depressed
          color="white primary--text"
          class="mx-2 text-capitalize hidden-sm-and-down font-weight-regular"
        >
          Login
        </v-btn>
        <v-btn
          to="/register"
          depressed
          color="secondary"
          class="mx-2 text-capitalize hidden-sm-and-down font-weight-regular"
        >
          Registration
        </v-btn>
      </v-app-bar>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      :left="$vuetify.breakpoint.smAndUp"
      dark
      class="primary"
    >
      <p-pattern />

      <v-list color="indigo--text text--accent-1" nav>
        <v-list-item class="pa-4">
          <v-avatar tile size="100" class="">
            <img src="/bitmainfx.jpeg" max-width="70" alt="Bitmain FX">
          </v-avatar>
        </v-list-item>
        <div style="width:100%" class="pa-1 secondary rounded-tl rounded-tr" />
        <v-list-item-group
          active-class="primary--text text-darken-4 text--secondary-4"
        >
          <v-list-item
            v-for="link in mainLinks"
            :key="link.name"
            dark
            exact
            :to="link.route"
            class="home-active"
            active-class="secondary--text font-weight-medium"
          >
            <v-list-item-icon>
              <v-icon left size="20" class="px-1">
                {{ link.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <!-- <v-list-item>
          <v-spacer />
          <v-btn
            to="/login"
            depressed
            color="primary"
            class="text-capitalize mr-2"
          >
            Login
          </v-btn>
          <v-btn
            to="/register"
            depressed
            title
            color="primary"
            class="text-capitalize"
          >
            Sign Up
          </v-btn>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>

    <v-main :class="padding">
      <popup :top="false" />
      <p-alert />
      <v-slide-y-transition mode="out-in">
        <nuxt />
      </v-slide-y-transition>
    </v-main>

    <v-footer
      id="contact"
      style="min-height:300px"
      color="white"
      class="d-flex justify-center px-0 py-6"
    >
      <v-row
        no-gutterss
        justify="center"
        class="mt-n10 align-center ma-0 pa-4 px-md-16"
      >
        <v-col cols="12" md="4" class="text-center text-sm-left">
          <div class="primary--text text-h6 text-md-h4 font-weight-medium">
            Bitmain FX
          </div>
          <div>
            <v-btn
              href="mailto:info@bitmainfx.online"
              text
              class="text-lowercase font-weight-light text-subtitle-1  px-1"
            >
              <v-icon left size="20" color="primary">
                mdi-email
              </v-icon>
              info@bitmainfx.online
            </v-btn>
          </div>
          <div class="d-flex align-center justify-center justify-sm-start">
            <v-btn
              v-for="social in socials"
              :key="social.name"
              target="_blank"
              href="social.link"
              color="primary"
              class="social-hover"
              :style="social.name === 'telegram' ? 'transform:rotate(-45deg)' : ''"
              small
              icon
              fab
              depressed
            >
              <v-icon>
                {{ social.icon }}
              </v-icon>
            </v-btn>
          </div>
          <div class="primary--text  mt-4">
            © 2016-2021 All Rights reserved.
          </div>
        </v-col>
        <v-col cols="12" md="8">
          <div
            class="d-flex justify-center justify-sm-start align-center ml-n2 mb-2"
          >
            <v-btn
              to="/legal"
              text
              color="secondary"
              class="text-subtitle-1 mx-2 font-weight-light text-capitalize px-1"
            >
              Legal Information
            </v-btn>
            <v-btn
              to="/terms"
              text
              color="secondary"
              class="text-subtitle-1 mx-2 font-weight-light text-capitalize px-1"
            >
              Terms & Conditions
            </v-btn>
          </div>
          <p class="text1--text text-justify">
            The Transactions offered by this Website can be executed only by
            fully competent adults. Transactions with financial instruments
            offered on the Website involve substantial risk and trading may be
            very risky. If you make Transactions with the financial instruments
            offered on this Website, you might incur substantial losses or even
            lose everything in your Account. Before you decide to start
            Transactions with the financial instruments offered on the Website,
            you must review the Service Agreement and Risk Disclosure
            Information.
          </p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import pAlert from '~/components/other/pAlert.vue'
import Popup from '~/components/other/popup.vue'
import PPattern from '~/components/other/pPattern.vue'
export default {
  components: { pAlert, Popup, PPattern },
  data: () => ({
    scrollPosition: null,
    drawer: false,
    socials: [
      {
        name: 'facebook',
        to: 'https://www.facebook.com/bitmainfxltd',
        icon: 'mdi-facebook'
      },
      // {
      //   name: 'twitter',
      //   to: 'https://twitter.com',
      //   icon: 'mdi-twitter'
      // },
      {
        name: 'instagram',
        to: 'https://www.instagram.com/trusted._investment_ltd/',
        icon: 'mdi-instagram'
      },
      {
        name: 'telegram',
        to: 't.me/bitmainfxltd',
        icon: 'mdi-send'
      },
      {
        name: 'whatsapp',
        to: 'https://wa.me/+12039367064',
        icon: 'mdi-whatsapp'
      }
    ],

    mainLinks: [
      { name: 'Sign In', route: '/login', icon: 'mdi-account' },
      { name: 'Sign Up', route: '/register', icon: 'mdi-account-plus' },
      { name: 'About Us', route: '/about', icon: 'mdi-account-group' },
      { name: 'Help Center', route: '/help', icon: 'mdi-forum' },
      { name: 'Contact Us', route: '/contact', icon: 'mdi-email-outline' },
      // {
      //   name: 'Trade Forex',
      //   route: '/trade/forex',
      //   icon: 'mdi-text-box-outline'
      // },
      // { name: 'Trade Crypto', route: '/trade/crypto', icon: 'mdi-copyright' },
      // {
      //   name: 'Trade Stock',
      //   route: '/trade/stock',
      //   icon: 'mdi-file-table-box-outline '
      // },
      // {
      //   name: 'Trade Options',
      //   route: '/trade/options',
      //   icon: 'mdi-car-brake-worn-linings'
      // },
      // { name: 'Copy Trade', route: '/copytrade', icon: 'mdi-content-copy' },
      { name: 'Privacy Policy', route: '/policy', icon: 'mdi-lock-check' },
      {
        name: 'Terms & Conditions',
        route: '/terms',
        icon: 'mdi-file-document-outline'
      }
    ]
  }),
  computed: {
    currentRoute () {
      let route = this.$route.name
      route = route.split('-')[0]
      const condition = route.includes('trade') || route === 'contact'
      return condition
    },
    background () {
      return this.currentRoute && this.scrollPosition < 50
        ? 'transparent'
        : 'primary'
    },
    padding () {
      return this.currentRoute && this.scrollPosition < 50 ? 'pt-0' : 'pt-10'
    }
  },

  created () {
    this.$store.dispatch('controller/initCurrency')
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    updateScroll () {
      this.scrollPosition = window.scrollY
    }
  }
}
</script>

<style scoped>
.footer-color {
  background-color: #1f2050;
  color: rgba(255, 255, 255, 0.877);
}
.opacity {
  opacity: 0.9;
}
.opacity-h {
  opacity: 0.7;
}
.v-btn:before {
  background-color: transparent;
}

.social-hover:hover {
  color: #01579b;
}

.home-active {
  transition: all 0.3s ease-in-out;
}
.home-active:hover {
  border-bottom: 4px soli#01579B;
}
</style>
