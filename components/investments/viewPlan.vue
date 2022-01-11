<template>
  <x-side-bar class="" :loading="loading.investment" :drawer="drawer" :toggle="toggle">
    <template v-slot:header class="">
      <div class="d-flex text3--text flex-column">
        <span class="text-h6 d-flex align-center">
          {{ plan && plan.name }} Plan
        </span>
      </div>
    </template>
    <v-row class="ma-0 ">
      <v-col cols="12" class="d-flex rounded secondary white--text text-subtitle-1 font-weight-medium">
        <span>Wallet Balance</span>
        <v-spacer />
        <div v-if="user && user.wallet.deposit !== 0" class="white--text font-weight-medium">
          {{ currency }}{{ rateAmount(user && user.wallet.deposit) | currency }}
        </div>
        <div v-else class="white--text font-weight-medium">
          $0.00
        </div>
      </v-col>
      <v-col cols="12" class="d-flex rounded  text-subtitle-2 font-weight-medium">
        <span>Min Amount</span>
        <v-spacer />
        <div class=" font-weight-medium">
          {{ currency }}{{ rateAmount(plan.range && plan.range.from) | currency }}
        </div>
      </v-col>
      <v-col cols="12" class="py-0 d-flex rounded  text-subtitle-2 font-weight-medium">
        <span>Max Amount</span>
        <v-spacer />
        <div class=" font-weight-medium">
          {{ currency }}{{ rateAmount(plan.range && plan.range.to) | currency }}
        </div>
      </v-col>
    </v-row>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
    >
      <v-row no-gutters class="ma-0 pt-4">
        <v-col cols="12" class="py-0">
          <v-text-field
            v-model="xAmount"
            name="amount"
            outlined
            color="primary"
            :label="`Enter Amount (${currency})`"
            required
            class="text-subtitle-2 font-weight-light "
            :rules="amountRules"
          />
        </v-col>

        <v-col cols="12" class="py-0 d-flex align-center">
          <v-spacer />
          <v-btn
            block
            depressed
            type="submit"
            :loading="loading.investment"
            color="primary"
            class=" rounded text-subtitle-2 font-weight-regular"
          >
            Invest
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </x-side-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import xSideBar from '../xSideBar.vue'

export default {
  components: { xSideBar },
  filters: {
    currency (val) {
      if (val) {
        val = parseInt(val)
        return val.toLocaleString()
      } else {
      }
    }
  },
  props: ['drawer', 'toggle', 'plan'],

  data: () => ({
    valid: true,
    amount: '',
    amountRules: [
      v => !!v || 'Amount is required']
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser', loading: 'controller/getLoading', state: 'controller/getState' }),
    currency () {
      const arr = this.state('currency')
      let currency
      if (this.user) {
        arr && arr.forEach((el) => {
          if (this.user && (this.user.currency).toLowerCase() === (el.name).toLowerCase()) {
            currency = el.symbol
          }
        })
      } else {
        currency = '$'
      }
      return currency
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
    ...mapActions({ initAlert: 'controller/initAlert', updatePassword: 'authentication/updatePassword', invest: 'controller/invest' }),
    submit () {
      this.$refs.form.validate()
      const amount = parseInt(this.xAmount.split(',').join(''))
      console.log(amount)
      if (this.checkBalance(amount)) {
        if (amount < this.rateAmount(this.plan.range.from)) {
          this.initAlert({
            is: true,
            type: 'error',
            persistence: true,
            message: `Amount must be greater than ${this.currency}${this.rateAmount(this.plan.range.from)}`
          })
          return false
        } else {
          const payload = {
            amount,
            plan: this.plan.name,
            date: this.getDate('current'),
            maturityDate: this.getDate('add', this.plan.days),
            status: 'ongoing'
          }
          console.log(payload)
          this.invest(payload)
          // this.clear()
        }
      }
    },
    rateAmount (payload) {
      console.log(this.user)
      const arr = this.state('currency')
      let amount
      if (this.user) {
        arr && arr.forEach((el) => {
          if (this.user && (this.user.currency).toLowerCase() === (el.name).toLowerCase()) {
            amount = parseFloat(parseFloat(payload) / el.rate)
          }
        })
      } else {
        amount = payload
      }

      console.log(amount)
      return amount
    },
    checkBalance (amount) {
      const balance = this.rateAmount(this.user && this.user.wallet.deposit)
      // console.log(amount)
      // console.log(balance)
      if (amount <= 10) {
        this.initAlert({
          is: true,
          type: 'error',
          persistence: true,
          message: `Amount must be greater than ${this.currency}10`
        })
        return false
      } else if (amount > balance) {
        this.initAlert({
          is: true,
          type: 'error',
          persistence: true,
          message: "You don't have enough fund to perform this transaction"
        })
        return false
      } else {
        return true
      }
    },
    clear () {
      this.xAmount = '0'
      this.reset()
      this.resetValidation()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
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
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December']
        return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
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

<style>

</style>
