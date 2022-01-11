<template>
  <p-container dark :color="'primary'" title="Affiliate Program">
    <template v-slot:header>
      <v-spacer />
      Earnings
      <v-chip outlined label color="secondary" class="ml-2">
        <span
          v-if="user && user.wallet.earnings !== 0"
        >{{ currency
        }}{{ rateAmount(user && user.wallet.earnings) | currency }}</span>
        <span v-else>{{ currency }}0.00</span>
      </v-chip>
    </template>
    <v-divider light />
    <v-row class="ma-0">
      <v-col
        cols="6"
        class="text-left d-flex flex-column flex-sm-row text-subtitle-2 align-sm-center "
      >
        <span>Affiliate Link</span>
        <v-btn
          small
          outlined
          color="accent"
          class="ml-2"
          @click="
            copy(
              `https://iqptionscompany.com/register/${user && user.referralID}`
            )
          "
        >
          <v-icon left small>
            mdi-content-copy
          </v-icon>
          <span
            style="width:50px"
            class="text-truncate"
          >https://bitmainfx.com/register/{{
            user && user.referralID
          }}</span>
        </v-btn>
      </v-col>
      <v-col
        cols="6"
        class="text-left d-flex flex-column flex-sm-row text-subtitle-2 align-sm-center "
      >
        <v-spacer />
        <span>Referrals</span>
        <v-chip outlined label color="accent" class="ml-2">
          <span v-if="referrals.length">
            {{ referrals.length | currency }}
          </span>
          <span v-else>0</span>
        </v-chip>
      </v-col>
      <v-col
        v-for="referral in referrals"
        :key="referral.email"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card light flat rounded="lg">
          <v-card-text class="py-1 text2--text">
            <div class="text-subtitle-1 font-weight-medium">
              {{ referral.name }}
            </div>
            <div class="text-subtitle-2 mt-n1">
              {{ referral.email }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </p-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import pContainer from './other/pContainer.vue'
export default {
  components: { pContainer },
  filters: {
    currency (val) {
      if (val) {
        return val.toLocaleString()
      } else {
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      state: 'controller/getState'
    }),
    currency () {
      const arr = this.state('currency')
      let currency
      if (this.user) {
        arr &&
          arr.forEach((el) => {
            if (
              this.user &&
              this.user.currency.toLowerCase() === el.name.toLowerCase()
            ) {
              currency = el.symbol
            }
          })
      } else {
        currency = '$'
      }
      return currency
    },
    referrals () {
      const arr = []
      // arr = this.state('referrals')
      return arr
    }
  },
  methods: {
    ...mapActions({ initAlert: 'controller/initAlert' }),
    async copy (payload) {
      await navigator.clipboard.writeText(payload)
      // alert('Wallet Address copied to clipboard')
      this.initAlert({
        is: true,
        persistence: true,
        type: 'info',
        message: 'Referral Code copied to clipboard'
      })
    },
    rateAmount (payload) {
      console.log(this.user)
      const arr = this.state('currency')
      let amount
      if (this.user) {
        arr &&
          arr.forEach((el) => {
            if (
              this.user &&
              this.user.currency.toLowerCase() === el.name.toLowerCase()
            ) {
              amount = parseFloat(parseFloat(payload) / el.rate)
            }
          })
      } else {
        amount = payload
      }

      console.log(amount)
      return amount
    }
  }
}
</script>

<style></style>
