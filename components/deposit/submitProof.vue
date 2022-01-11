<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="submit"
  >
    <v-row class="ma-0" no-gutters>
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
          :rules="[(v) => !!v || 'Payment Method is required']"
          label="Payment Method Used"
          required
        />
      </v-col>
      <v-col cols="12" class="py-0 pr-md-3 mb-n1 ">
        <v-file-input
          v-model="photo"
          dense
          type="file"
          name="image"
          chips
          outlined
          class="text-subtitle-2 font-weight-light rounded-md"
          required
          :rules="[v => !!v || 'Proof  is required']"
          label="Upload Image"
          prepend-icon="mdi-camera"
        />
      </v-col>
      <v-col cols="12" class="py-0 pr-md-3 mb-n1 ">
        <v-btn
          depressed
          block
          type="submit"
          :loading="loading.deposit"
          color="secondary"
          class="text-subtitle-2 font-weight-normal "
        >
          Submit
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
    paymentMethods: ['Bitcoin.com', 'Coinmama.com', 'Yellowcard.io', 'Remitano.com', 'Luno.com', 'Cashapp.com', 'Paxful.com', 'Paypal', 'Bank Transfer', 'Other'],
    photo: null
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser', loading: 'controller/getLoading', state: 'admin/getState', state2: 'controller/getState' }),
    currency () {
      const arr = this.state2('currency')
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
    wallet () {
      return this.state('wallet')
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
    ...mapActions({ setAlert: 'controller/initAlert', submitProof: 'controller/submitProof' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const amount = parseInt(this.xAmount.split(',').join(''))

        const proof = {
          amount,
          paymentMethod: this.paymentMethod,
          date: this.getDate('current'),
          status: 'pending'
        }

        const payload = {
          proof,
          photo: this.photo
        }
        console.log(payload)
        this.submitProof(payload)
        this.clear()
      }
    },
    clear () {
      this.amount = ''
      this.paymentMethod = ''
      this.photo = null
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
