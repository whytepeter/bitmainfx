<template>
  <v-row class="ma-0 py-4" no-gutters>
    <v-col cols="12" class="py-0 pr-md-3 mb-n1 ">
      <v-select
        v-model="paymentMethod"
        dense
        color="secondary"
        :items="paymentMethods"
        outlined
        class="text-subtitle-2 font-weight-light rounded-md"
        :rules="[(v) => !!v || 'Payment Method is required']"
        label="Choose a payment method"
        required
      />
    </v-col>
    <v-col v-if="paymentMethod !== ''" cols="12" class=" mb-2 py-0 pr-md-3  ">
      <span class="text-body-2 text-sm-subtitle-2 info--text font-weight-medium">
        Click the icon below to copy the wallet address or scan the QR-code and procced to payment
      </span>
    </v-col>
    <v-col v-if="paymentMethod !== ''" cols="12" class="text-center pt-0 pr-md-3 mb-4">
      <v-avatar tile size="140" class="white pa-2 mx-auto ma-2 rounded-md">
        <img :src="wallet.photoURL" max-width="100" :alt="wallet.name">
      </v-avatar>
    </v-col>
    <v-col v-if="paymentMethod !== ''" cols="12" class=" pt-0 pr-md-3 mb-4">
      <v-btn
        style="width:100%"
        color="secondary"
        depressed
        small
        @click="copy(wallet.address)"
      >
        <span style="width:100%" class="text-truncate text-caption">{{ wallet.address }}</span>
        <v-icon color="" small right>
          mdi-content-copy
        </v-icon>
      </v-btn>
    </v-col>
    <v-col v-if="paymentMethod !== ''" cols="12" class=" mb-2 py-0 pr-md-3  ">
      <span class="text-caption info--text font-weight-medium">
        NB: After payment has been made, submit proof of payment and wait for confirmation
      </span>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {

  data: () => ({
    paymentMethod: ''

  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser', loading: 'controller/getLoading', state: 'admin/getState' }),
    wallet () {
      const wallets = this.state('wallet')
      let wallet = ''
      wallets && wallets.forEach((el) => {
        if (this.paymentMethod === el.name) {
          wallet = el
          console.log(el.photoURL)
        }
      })

      return wallet
    },

    paymentMethods () {
      const wallets = this.state('wallet')
      const methods = []
      wallets && wallets.forEach((el) => {
        methods.push(el.name)
      })
      return methods
    }
  },
  methods: {
    ...mapActions({ setAlert: 'controller/initAlert' }),
    async copy (payload) {
      await navigator.clipboard.writeText(payload)
      // alert('Wallet Address copied to clipboard')
      this.setAlert({
        is: true,
        persistence: true,
        type: 'info',
        message: 'Wallet Address copied to clipboard'
      })
    }
  }
}
</script>

<style>

</style>
