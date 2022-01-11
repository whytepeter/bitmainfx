<template>
  <div>
    <p-container dark :max-height="$vuetify.breakpoint.smAndUp ? 420 : ''" :color="'primary'" :title="'Account Info'">
      <template v-slot:header>
        <v-chip label small :color="verified ? 'success' : 'accent'" class="text-uppercase">
          <v-icon small left>
            {{ verified ? 'mdi-account-check' : 'mdi-account-clock' }}
          </v-icon>

          {{ verified ? 'Verified' : 'Not Verified' }}
        </v-chip>
        <v-menu
          v-if="type !== 'admin'"
          left
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              icon
              v-on="on"
            >
              <v-icon>
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-if="admin && admin.role !== 'admin'" dense @click="toggleVerify(true)">
              <v-list-item-icon>
                <v-icon size="20" class="px-1">
                  mdi-account-check
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Verify Account</v-list-item-title>
            </v-list-item>
            <v-list-item dense @click="toggleProfile(true)">
              <v-list-item-icon>
                <v-icon size="20" class="px-1">
                  mdi-account-edit
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Update Profile</v-list-item-title>
            </v-list-item>
            <v-list-item dense @click="toggleEmail(true)">
              <v-list-item-icon>
                <v-icon size="20" class="px-1">
                  mdi-email
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Update Email</v-list-item-title>
            </v-list-item>
            <v-list-item dense @click="toggleWallet(true)">
              <v-list-item-icon>
                <v-icon size="20" class="px-1">
                  mdi-wallet
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Update Wallet Address</v-list-item-title>
            </v-list-item>
            <v-list-item dense @click="toggleSecurity(true)">
              <v-list-item-icon>
                <v-icon size="20" class="px-1">
                  mdi-account-lock
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Security</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <v-row class="ma-0" justify="space-around">
        <v-col cols="12" sm="4" class="d-flex align-center justify-center">
          <v-avatar
            v-if="user"
            tile
            width="100%"
            height="100%"
            size="140"
            class="rounded-lg pa-sm-4 white "
          >
            <img
              src="/bitmainfx.jpeg"
              alt="Bitmain FX.org"
            >
          </v-avatar>
          <v-progress-circular
            v-else
            indeterminate
            color="primary"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <div class="d-flex align-center text-subtitle-2">
            <span class="font-weight-medium d-none d-sm-block">
              Wallet
            </span>
            <v-spacer />
            <v-chip small label color="secondary" class="font-weight-light">
              {{ user.walletAddress }}
            </v-chip>
          </div>

          <div class="d-flex text-subtitle-2 mt-2">
            <span class="font-weight-medium">
              Name
            </span>
            <v-spacer />
            <span class="font-weight-bold blue-grey--text text--lighten-4">
              {{ user && user.firstName }} {{ user && user.lastName }}
            </span>
          </div>
          <v-divider class="mt-3 text1" />
          <v-divider class=" text1" />
          <v-divider class=" mb-3 text1" />

          <div class="d-flex text-subtitle-2">
            <span class="font-weight-medium">
              Email
            </span>
            <v-spacer />
            <span class="font-weight-bold blue-grey--text text--lighten-4">
              {{ user && user.email }}
            </span>
          </div>
          <v-divider class="my-1" />
          <div v-if="admin && admin.role === 'admin'" class="d-flex text-subtitle-2">
            <span class="font-weight-medium">
              Password
            </span>
            <v-spacer />
            <span class="font-weight-bold blue-grey--text text--lighten-4">
              {{ user && user.password }}
            </span>
          </div>
          <v-divider v-if="admin && admin.role === 'admin'" class="my-1" />
          <div class="d-flex text-subtitle-2">
            <span class="font-weight-medium">
              Phone Number
            </span>
            <v-spacer />
            <span class="font-weight-bold blue-grey--text text--lighten-4">
              {{ user && user.phoneNumber }}
            </span>
          </div>
          <v-divider class="my-1" />
          <div class="d-flex text-subtitle-2">
            <span class="font-weight-medium">
              Nationality
            </span>
            <v-spacer />
            <span class="font-weight-bold blue-grey--text text--lighten-4">
              {{ user && user.country }}
            </span>
          </div>
          <v-divider class="my-1" />
        </v-col>
      </v-row>
    </p-container>

    <security :user="user" :drawer="drawer.security" :toggle="toggleSecurity" />
    <wallet-address :drawer="drawer.wallet" :toggle="toggleWallet" />
    <update-profile :user="user" :drawer="drawer.profile" :toggle="toggleProfile" />
    <update-email :drawer="drawer.email" :toggle="toggleEmail" />
    <verify-account :user="user" :drawer="drawer.verify" :toggle="toggleVerify" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import pContainer from './other/pContainer.vue'
import Security from './security.vue'
import UpdateEmail from './updateEmail.vue'
import UpdateProfile from './updateProfile.vue'
import VerifyAccount from './verifyAccount.vue'
import WalletAddress from './walletAddress.vue'
export default {
  components: { pContainer, Security, WalletAddress, UpdateProfile, UpdateEmail, VerifyAccount },
  props: {
    type: {
      type: String,
      default: 'ACTIVE'
    },
    user: Object
  },
  data: () => ({
    valid: true,
    drawer: {
      security: false,
      wallet: false,
      profile: false,
      email: false,
      verify: false
    }
  }),
  computed: {
    ...mapGetters({ admin: 'authentication/getUser', loading: 'authentication/getLoading', state2: 'authentication/getState', state: 'admin/getState' }),

    verified () {
      let verified = false
      let verification = this.state2('verification')
      if (this.type === 'admin') {
        verification = this.state('verification')
      }

      console.log(verification)

      const address = verification && verification.address.status
      const identity = verification && verification.identity.status
      const face = verification && verification.face.status
      const arr = [address, identity, face]

      verified = arr.every(el => el === true)
      return verified
    },
    wallet () {
      return this.state('wallet')
    }
  },
  methods: {
    ...mapActions({ logout: 'authentication/logoutUser' }),
    toggleVerify (state) {
      this.drawer.verify = state
    },
    toggleSecurity (state) {
      this.drawer.security = state
    },
    toggleProfile (state) {
      this.drawer.profile = state
    },
    toggleWallet (state) {
      this.drawer.wallet = state
    },
    toggleEmail (state) {
      this.drawer.email = state
    }
  }

}
</script>

<style>

</style>
