<template>
  <x-side-bar :loading="loading.profile" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex text3--text flex-column">
        <span class="text-h6 d-flex align-center">
          Verify Account
        </span>
      </div>
    </template>
    <v-row class="ma-0">
      <v-col v-if="!show" cols="12" :class="verified ? 'success' : 'accent'" class="d-flex rounded pa-2 mb-4 white--text">
        {{ verified ? 'Account Verified' : 'Account Not Verified' }}
        <v-spacer />
        <v-icon color="white" left size="20">
          mdi-account-clock
        </v-icon>
      </v-col>
      <v-col v-if="show" cols="12" class="py-0 d-flex align-center">
        <span class="text-subtitle-1 text3--text font-weight-medium text-capitalize">
          {{ title }}
        </span>

        <v-spacer />
        <v-btn small text color="primary" class="text-capitalize text-subtitle-2" @click="back">
          <v-icon small left>
            mdi-arrow-left
          </v-icon>
          Go back
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="!show" no-gutters class="ma-0 p-2">
      <v-col v-for="method in methods" :key="method.title" cols="12" class="my-2">
        <p-icon-card
          :icon-color="'primary'"
          outline
          :icon="method.icon"
          :title="method.title"
          :action="method.action"
        />
      </v-col>
    </v-row>
    <component :is="component" v-else />
  </x-side-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PIconCard from './other/pIconCard.vue'
import Identity from './verify/identity.vue'
import Face from './verify/face.vue'
import xSideBar from './xSideBar.vue'
import Address2 from './verify/address2.vue'

export default {
  name: 'VerifyAccount',
  components: { xSideBar, PIconCard, Identity, Address2, Face },
  filters: {
    currency (val) {
      if (val) {
        val = parseFloat(val)
        return val.toLocaleString('en-US', {
          style: 'currency',
          code: 'US',
          currency: 'USD'
        })
      } else {
      }
    }
  },
  props: ['drawer', 'toggle', 'user'],
  data: () => ({
    show: false,
    component: '',
    title: ''
  }),
  computed: {
    ...mapGetters({ loading: 'authentication/getLoading', user: 'authentication/getUser', state: 'authentication/getState' }),
    verified () {
      let verified = false
      const verification = this.state('verification')

      console.log(verification)

      const address = verification && verification.address.status
      const identity = verification && verification.identity.status
      const face = verification && verification.face.status
      const arr = [address, identity, face]

      verified = arr.every(el => el === true)
      return verified
    },
    methods () {
      return [
        {
          title: 'Proof of Identify',
          icon: 'mdi-file-document',
          action: () => {
            this.component = 'identity'
            this.show = true
            this.title = 'Identify Verification'
          }
        },
        {
          title: 'Proof of Address',
          icon: 'mdi-file-marker',
          action: () => {
            this.component = 'address-2'
            this.show = true
            this.title = 'Address Verification'
          }
        },
        {
          title: 'Face Recognition',
          icon: 'mdi-account-convert',
          action: () => {
            this.component = 'face'
            this.show = true
            this.title = 'Facial Verification'
          }
        }
      ]
    }

  },
  methods: {
    ...mapActions({ updateProfile: 'authentication/updateProfile' }),
    onFileChange () {
      if (this.file1) {
        const file = this.file1
        this.showImage = URL.createObjectURL(file)
      } else {
        this.showImage = null
      }
    },
    onFileChange2 () {
      if (this.file1) {
        const file = this.file2
        this.showImage = URL.createObjectURL(file)
      } else {
        this.showImage1 = null
      }
    },

    back () {
      this.show = false
      this.title = ''
    }

  }

}
</script>

<style>

</style>
