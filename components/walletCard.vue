<template>
  <v-card
    dark
    rounded="lg"
    flat
    max-width="350"
    max-height="200"
    class="orange-g"
  >
    <v-card-title class="headline">
      <v-icon large fab color="secondary" class="mr-3">
        mdi-wallet
      </v-icon>
      Total Earnings
    </v-card-title>

    <v-card-text class="d-flex flex-column justidy-space-around pt-2">
      <div class="text-h3 white--text mb-2">
        $ {{ wallet.earnings | currency }}
      </div>

      <div class="text-button d-flex alig-center">
        <v-icon fabs color="secondary" class="mr-2">
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
  data: () => ({}),
  computed: {
    ...mapGetters({ wallet: 'wallet/getWallet', btc: 'wallet/getBTCValue' })
  }
}
</script>

<style>
.v-card.orange-g {
  background: linear-gradient(to bottom, #0e1129, #161b41);
  box-shadow: 0, 8px 32px 4px hsla(28, 87%, 62%, 0.3);
}
.v-card.blue-g {
  background: linear-gradient(to bottom, #56ccf2, #222dde);
  box-shadow: 0, 8px 32px 4px hsl(236, 74%, 50%, 0.3);
}
.v-card.green-g {
  background: linear-gradient(to bottom, #13fb73, #0e933b);
  box-shadow: 0, 8px 32px 4px hsl(140, 83%, 32%, 0.3);
}
</style>
