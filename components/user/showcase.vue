<template>
  <v-row class="ma-0">
    <v-col v-for="card in cards" :key="card.name" cols="12" sm="6" md="3">
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
              {{ card.icon }}
            </v-icon>
          </div>
          <v-spacer />
          <div class="d-flex text-h6 flex-column align-end">
            <div class="primary--text">
              ${{ card.amount | currency }}
            </div>
            <div class="font-weight-medium text-subtitle-1">
              {{ card.name }}
            </div>
            <v-btn :to="card.to" text color="secondary" class="text-caption text-capitalize px-1">
              {{ card.btn }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
