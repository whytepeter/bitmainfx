<template>
  <v-card
    flat
    light
    class="py-0"
  >
    <v-progress-linear
      color="secondary"
      :value="100"
    />
    <v-card-text class="pb-1 text-subtitle-1 d-flex align-center">
      <div>
        <v-icon large fab color="secondary" class="mr-3">
          mdi-wallet
        </v-icon>
      </div>
      <v-spacer />
      <div class="d-flex text-h6 flex-column align-end">
        <div class="primary--text">
          ${{ wallet.earnings | currency }}
        </div>
        <div class="font-weight-medium text-subtitle-1">
          Total Earnings
        </div>
        <div class="text-button d-flex alig-center">
          <v-icon fabs class="mr-2">
            mdi-bitcoin
          </v-icon>
          {{ btc | currency }} <span class="font-weight-medium">BTC</span>
        </div>
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
