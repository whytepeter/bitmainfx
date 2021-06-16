<template>
  <v-card

    dark
    rounded="lg"
    flat
    max-width="350"
    max-height="200"
    class="orange-g"
  >
    <v-card-title class="text-h6">
      <v-icon fab color="white" class="mr-3">
        mdi-wallet
      </v-icon>
      Total Earnings
    </v-card-title>

    <v-card-text class="d-flex flex-column justify-space-around pt-2">
      <div class="text-h3 white--text mb-2">
        <span v-html="user && user.currency ? user.currency : '$'" /> {{ wallet.earnings | currency }}
      </div>

      <div class="text-button d-flex alig-center">
        <v-icon fabs class="mr-2">
          mdi-bitcoin
        </v-icon>
        {{ btc | currency }} <span class="font-weight-medium">BTC</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'WalletCard',
  filters: {

    currency (val) {
      if (val) {
        return val.toLocaleString()
      } else {

      }
    }
  },
  data: () => ({

  }),
  computed: {
    ...mapGetters({ wallet: 'wallet/getWallet', btc: 'wallet/getBTCValue', user: 'authentication/getUser' })
  }

}
</script>

<style>
.v-card.orange-g {
    background: linear-gradient(to bottom, #F2C94C,#F2994A);
    box-shadow: 0, 8px 32px 4px hsla(28, 87%, 62%, 0.3);
}
.v-card.blue-g {
    background: linear-gradient(to bottom, #56CCF2,#222DDE);
    box-shadow: 0, 8px 32px 4px hsl(236, 74%, 50%, 0.3);
}
.v-card.green-g {
    background: linear-gradient(to bottom, #13FB73,#0E933B);
    box-shadow: 0, 8px 32px 4px hsl(140, 83%, 32%, 0.3);
}
</style>
