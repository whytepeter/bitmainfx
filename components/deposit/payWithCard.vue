<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
    <v-row class="ma-0" no-gutters>
      <v-col cols="12" class=" mb-2 py-0 pr-md-3  ">
        <span
          v-if="paymentMethod === 'Bank Transfer' || paymentMethod === 'Paypal'"
          class="text-body-2 info--text font-weight-medium "
        >
          Contact
          <a
            href="mailto:info@bitmainfx.online"
            class="secondary--text"
          >info@bitmainfx.online</a>
          for {{ paymentMethod }} payment
        </span>
        <span v-else class="text-caption info--text font-weight-medium">
          Click the icon below to copy the wallet address and procced to payment
        </span>
      </v-col>

      <v-col cols="12" class=" pt-0 pr-md-3 mb-2">
        <v-btn
          style="width:100%"
          color="accent"
          depressed
          small
          @click="copy(wallet.address)"
        >
          <span style="width:100%" class="text-truncate text-caption">{{
            wallet
          }}</span>
          <v-icon color="" small right>
            mdi-content-copy
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" class="py-0 pr-md-3 mb-n1 ">
        <v-text-field
          v-model="xAmount"
          type="text"
          name="amount"
          dense
          outlined
          color="secondary"
          :label="`Enter Amount (${currency})`"
          :rules="amountRules"
          class="text-subtitle-2 font-weight-light rounded-md"
        />
      </v-col>
      <v-col cols="12" class="py-0 pr-md-3 mb-n1 ">
        <v-select
          v-model="paymentMethod"
          dense
          color="secondary"
          :items="paymentMethods"
          outlined
          class="text-subtitle-2 font-weight-light rounded-md"
          :rules="[v => !!v || 'Payment Method is required']"
          label="Payment Method"
          required
        />
      </v-col>
      <v-col cols="12" class="py-0 pr-md-3 mb-n1 ">
        <v-btn
          depressed
          block
          type="submit"
          color="secondary"
          class="text-subtitle-2 font-weight-normal "
        >
          Proceed to Payment
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    valid: true,
    amount: '',
    amountRules: [v => !!v || 'Amount is required'],
    paymentMethod: '',
    paymentMethods: [
      'Bitcoin.com',
      'Coinmama.com',
      'Yellowcard.io',
      'Remitano.com',
      'Luno.com',
      'Cex.io',
      'Cashapp.com',
      'Paxful.com',
      'Paypal',
      'Bank Transfer'
    ]
  }),
  computed: {
    ...mapGetters({
      user: 'authentication/getUser',
      loading: 'controller/getLoading',
      state: 'admin/getState',
      state2: 'controller/getState'
    }),
    currency () {
      const arr = this.state2('currency')
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
    wallet () {
      const wallets = this.state('wallet')
      let address
      wallets.forEach((el) => {
        if (el.name.toLowerCase() === 'bitcoin') {
          address = el.address
        }
      })
      return address
    },
    xAmount: {
      get () {
        let val = parseInt(this.amount)
        val = val.toLocaleString()
        if (val === 'NaN') {
          return ''
        } else {
          return `${val}`
        }
      },
      set (val) {
        // check if the first Character is $ and remove it

        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.amount = val
        }
      }
    }
  },

  methods: {
    ...mapActions({
      setAlert: 'controller/initAlert',
      submitProof: 'controller/submitProof'
    }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const card = {
          amount: this.xAmount,
          paymentMethod: this.paymentMethod
        }

        const link = {
          'Bitcoin.com': 'https://buy.bitcoin.com',
          'Coinmama.com': 'https://www.coinmama.com',
          'Cashapp.com': 'https://cash.app/',
          'Paxful.com': 'https://paxful.com/?r=9ekKX7x6zQX',
          'Luno.com': 'https://www.luno.com/',
          'Cex.io': 'https://www.cex.io/',
          'Remitano.com': 'https://remitano.com/btc/ng/buy',
          'Yellowcard.io': 'https://Yellowcard.io/'
        }

        console.log(card)
        window.open(link[this.paymentMethod])
        this.clear()
      }
    },

    rateAmount (payload) {
      console.log(this.user)
      const arr = this.state2('currency')
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
    },
    clear () {
      this.amount = ''
      this.walletAddress = ''
      this.paymentMethod = ''
      this.resetValidation()
    },

    reset () {
      this.$refs.form.reset()
    },

    resetValidation () {
      this.$refs.form.resetValidation()
    },

    async copy (payload) {
      await navigator.clipboard.writeText(payload)
      // alert('Wallet Address copied to clipboard')
      this.setAlert({
        is: true,
        persistence: true,
        type: 'info',
        message: 'Wallet Address copied to clipboard'
      })
    },

    getDate (get, days) {
      const currentDate = new Date()
      let newDate

      function addDays (days) {
        const result = new Date(currentDate)
        result.setDate(result.getDate() + days)
        return formatDate(result)
      }

      function formatDate (date) {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ]
        return `${date.getDate()} ${
          months[date.getMonth()]
        }, ${date.getFullYear()}`
      }

      if (get === 'add') {
        newDate = addDays(days)
      } else if (get === 'current') {
        newDate = formatDate(currentDate)
      }
      return newDate
    }
  }
}
</script>

<style></style>
