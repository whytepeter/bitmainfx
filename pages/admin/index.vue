<template>
  <v-container class="pa-0">
    <v-row justify="center" no-gutters class="ma-0">
      <!-- <v-col cols="12">
        <v-card dark flat tile color="primary">
          <p-pattern />
          <v-card-text class="text-center">
            <div>
              <span class="text-subtitle-1 white--text">Total Revenue</span>
            </div>
            <div v-if="user && user.wallet.deposit !== 0" class="text-h6 text-sm-h4 font-weight-bold white--text my-1">
              {{ user && user.wallet.deposit | currency }}
            </div>
            <div class="text-h6 text-sm-h4 font-weight-bold white--text my-1">
              $0.00
            </div>
          </v-card-text>
        </v-card>
      </v-col> -->

      <v-col cols="12" class="pa-0">
        <v-card flat tile color="transparent">
          <p-pattern v-if="daf" />
          <v-card-text class="d-flex">
            <div class="d-flex flex-column">
              <span class="text-subtitle-1 text2--text">Admin</span>
              <span class="text-h6 text2--text font-weight-light">Welcome, {{ user && user.firstName }} {{ user && user.lastName }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-for="(wallet, i) in wallets"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        class="pa-2"
      >
        <x-wallet-card :type="wallet.type" :icon="wallet.icon" :title="wallet.title" :amount="wallet.amount" :number="wallet.number" />
      </v-col>
      <v-col cols="12" class="my-2" />
      <x-transaction :title="'All Transactions'" :type="'all'" />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import XTransaction from '~/components/other/xTransaction.vue'
import xWalletCard from '~/components/other/xWalletCard.vue'
export default {
  name: 'Admin',
  components: { xWalletCard, XTransaction },
  layout: 'admin',
  data: () => ({}),
  computed: {
    ...mapGetters({ user: 'authentication/getUser', state: 'admin/getState' }),
    wallets () {
      return [
        {
          title: 'Total Users',
          type: 'number',
          icon: 'mdi-account-multiple',
          number: this.state('users') && this.state('users').length
        },
        {
          title: 'Deposit Request',
          type: 'number',
          icon: 'mdi-cash-plus',
          number: this.state('deposits') && this.state('deposits').length
        },
        {
          title: 'Withdrawal Request',
          type: 'number',
          icon: 'mdi-cash-minus',
          number: this.state('withdraws') && this.state('withdraws').length
        }
        // {
        //   title: 'Loan Request',
        //   type: 'number',
        //   icon:'',
        //   number: this.state('loans') && this.state('loans').length
        // }
      ]
    }
  },
  methods: {}

}
</script>

<style>

</style>
