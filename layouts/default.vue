<template>
  <v-app>
    <div>
      <v-app-bar fixed flat color="primary">
        <v-toolbar-title>
          <v-btn height="60" text x-large to="/" class="font-weight-bold rounded-xl">
            <v-img max-width="90" src="crypto.jpeg" />
          </v-btn>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items flat class="hidden-sm-and-down" color="transparent">
          <v-btn
            v-for="link in mainLinks"
            :key="link.name"
            dark
            tile=""
            active-class="home-active"
            class="font-weight-medium font-weight-regular text-subtitle-2"
            text
            :to="link.route"
            exact
          >
            {{ link.name }}
          </v-btn>
        </v-toolbar-items>
        <v-spacer />
        <v-btn
          to="/login"
          text
          depressed
          color="secondary"
          class=" rounded-tr-lg rounded-bl-lg text-capitalize hidden-sm-and-down"
        >
          Login
        </v-btn>
        <v-btn
          to="/register"
          depressed
          title
          color="secondary"
          class=" rounded-tr-lg rounded-bl-lg text-capitalize hidden-sm-and-down"
        >
          Sign Up
        </v-btn>

        <v-app-bar-nav-icon dark @click="drawer = true" />
      </v-app-bar>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      style="opacity: .9"
      color="primary"
      fixed
      temporary
      :right="$vuetify.breakpoint.smAndUp"
      :bottom="$vuetify.breakpoint.smAndDown"
    >
      <v-list dark nav>
        <v-list-item-group
          active-class="secondary--text text-darken-4 text--accent-4"
        >
          <v-list-item
            v-for="link in mainLinks"
            :key="link.name"
            exact
            :to="link.route"
          >
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-icon>
          <v-spacer />
          <v-btn
            to="/login"
            depressed
            color="accent"
            class=" rounded-tr-lg rounded-bl-lg text-capitalize  mr-2"
          >
            Login
          </v-btn>
          <v-btn
            to="/register"
            depressed
            title
            color="secondary"
            class=" rounded-tr-lg rounded-bl-lg text-capitalize "
          >
            Sign Up
          </v-btn>
        </v-list-item-icon>
      </v-list>
    </v-navigation-drawer>

    <v-main class="pt-14 primary">
      <v-slide-y-transition mode="out-in">
        <nuxt />
      </v-slide-y-transition>
    </v-main>

    <popup />
    <v-footer
      id="contact"
      style="min-height:300px"
      color="primary"
      class="d-flex justify-center pt-0"
    >
      <v-row class="secondary mt-n6" style="height:4px" />
      <v-row>
        <v-col cols="12" md="6" class="py-0 ">
          <v-list dark three-line color="transparent ">
            <v-list-item
              class="d-flex flex-column flex-md-row text-center text-md-left "
            >
              <v-list-item-icon class="mx-auto mx-md-2" />
              <v-list-item-content>
                <v-list-item-title class="headline ">
                  <v-icon color="secondary" x-large>
                    mdi-adjust
                  </v-icon>
                  Bitmain FX
                </v-list-item-title>
                <div class="text-subtitle-1 font-weight-light opacity-h">
                  Has been in existence since 2019 and we are going stronger and
                  bigger on daily basis because it was founded with patriotic
                  and sincere mind.
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col md="2" />
        <v-col cols="12" md="4" class="text-center  text-md-left mb-4">
          <div class="text-center">
            <v-btn
              color="secondary"
              depressed
              href="https://wa.me/+13478685900"
              target="_blank"
              icon
              fab
            >
              <v-icon large>
                mdi-whatsapp
              </v-icon>
              <span class="mx-2">whatsapp</span>
            </v-btn>
          </div>
          <div class="white--text text-center font-weight-light opacity-h">
            Contact us: support@bitmainfx.online
          </div>
          <div class="white--text text-center font-weight-light opacity-h">
            Call us: +44 744 141 8996
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="footer-color">
        <v-col cols="12" class="text-center font-weight-light">
          Copyright © 2019 Bitmain FX  All Rights Reserved.
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import popup from '~/components/popup.vue'
export default {
  components: { popup },
  data: () => ({
    drawer: false,
    socialLink: [
      {
        name: 'facebook',
        to: 'https://facebook.com',
        icon: 'mdi-facebook'
      },
      {
        name: 'twitter',
        to: 'https://twitter.com',
        icon: 'mdi-twitter'
      },
      {
        name: 'instagram',
        to: 'https://instagram.com',
        icon: 'mdi-instagram'
      },
      {
        name: 'whatsapp',
        to: 'https://wa.me/+27639279824',
        icon: 'mdi-whatsapp'
      }
    ],

    mainLinks: [
      { name: 'Home', route: '/' },
      { name: 'About Us', route: '/about' },
      { name: 'FAQ', route: '/faq' },
      { name: 'Terms & Policy', route: '/policy' },
      { name: 'Contact Us', route: '/contact' }
    ]
  }),
  created () {

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
  color: #6200eaec;
}

.home-active {
  transition: all 0.3s ease-in-out;
  border-bottom: 4px solid #ffff;
}
</style>
