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
        val = parseFloat(val)
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
          name: 'Total Profit',
          icon: 'mdi-cash-multiple',
          amount: this.wallet.earnings,
          btn: 'profit',
          to: null,
          class: 'green-g'
        },
        {
          name: 'Referral Bonus',
          icon: 'mdi-cash-multiple',
          amount: this.wallet.referral,
          btn: 'Referral Bonus',
          to: null,
          class: 'pink-g'
        },
        {
          name: 'Withdraw',
          icon: 'mdi-cash-multiple',
          amount: this.wallet.withdraw,
          btn: 'Withdraw',
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
    background: linear-gradient(to bottom, #f7e43a,#eb8022);
    box-shadow: 0, 8px 32px 4px hsla(28, 86%, 53%, 0.3);
}
.v-card.blue-g {
    background: linear-gradient(to bottom, #56CCF2,#222DDE);
    box-shadow: 0, 8px 32px 4px hsl(236, 74%, 50%, 0.3);
}
.v-card.green-g {
    background: linear-gradient(to bottom, #03fa6a,#048524);
    box-shadow: 0, 8px 32px 4px rgba(2, 92, 32, 0.3);
}
.v-card.pink-g {
   background: linear-gradient(to bottom, #e72f57,#47001b);
    box-shadow: 0, 8px 32px 4px rgba(109, 5, 83, 0.3);
}
</style>>
