<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="card in cards" :key="card.name" cols="12" sm="6" md="4">
        <v-card
          flat
          dark
          rounded="lg"
          :class="card.class"
        >
          <v-card-title class="text-h6">
            <v-icon fab color="white" class="mr-3">
              {{ card.icon }}
            </v-icon>
            {{ card.name }}
          </v-card-title>

          <v-card-text>
            <div class="text-h5 white--text">
              <span v-html="user && user.currency ? user.currency : '$'" /> {{ card.amount | currency }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn :to="card.to" text class="text-caption text-capitalize ">
              {{ card.btn }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Showcase',
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
    ...mapGetters({ last: 'wallet/getLastWithdraw', wallet: 'wallet/getWallet', btc: 'wallet/getBTCValue', user: 'authentication/getUser' }),
    cards () {
      return [
        {
          name: 'Active Deposit',
          icon: 'mdi-wallet',
          amount: this.wallet.totalDeposite,
          btn: 'Withdraw Funds',
          to: 'dashboard/wallet/withdraw',
          class: 'orange-g'
        },

        {
          name: 'Balance',
          icon: 'mdi-cash-multiple',
          amount: this.wallet.earnings,
          btn: 'Total Balance',
          to: null,
          class: 'green-g'
        },
        {
          name: 'Pending Withdraw',
          icon: 'mdi-cash-multiple',
          amount: this.last.amount,
          btn: 'Pending Withdraw',
          to: null,
          class: 'blue-g'
        }
      ]
    }
  }

}
</script>

<style >
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
</style>>
