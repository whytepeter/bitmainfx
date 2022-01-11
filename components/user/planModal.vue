<template>
  <div class="text-center">
    <v-dialog v-model="plan.open" persistent width="500">
      <v-card>
        <v-card-title

          class="headline"
          primary-title
        >
          {{ plan.name }} Package

          <v-spacer />
          <div class="text-subtitle-1">
            <span class="secondary--text"> Total Bal.</span>
            <span class="font-weight-medium">${{ wallet.totalDeposite | currency }}</span>
          </div>
        </v-card-title>
        <v-card-subtitle />
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col cols="12">
              You are about to invest in
              <span class="font-weight-bold ">{{ plan.name }}</span> package
              with withdrawal commission of
              <span class="font-weight-bold">${{ plan.withdrawCommission | currency }}</span>
            </v-col>
            <v-col cols="12">
              <div class="text-subtitle-2 font-weight-bold">
                Minimum capital:
                <span>${{ plan.minimum | currency }}</span>
              </div>
              <div class="text-subtitle-2 font-weight-bold">
                Maximum capital:
                <span>${{ plan.maximum | currency }}</span>
              </div>
            </v-col>
            <v-col cols="12" class=" mt-0 mb-2 px-3 py-0 text-right text-caption error--text">
              <span>{{ error }}</span>
            </v-col>
            <v-col cols="12" class="my-0 py-0">
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="amount"
                  type="number"
                  name="amount"
                  dense
                  outlined

                  :rules="amountRules"
                  required=""
                  label="Enter Amount to Invest"
                />
              </v-form>
            </v-col>
            <v-col cols="12" class="my-0 py-0 d-flex justify-space-end align-center">
              <v-spacer />
              <v-btn depressed color="error" class="mr-2" @click="cancel">
                cancel
              </v-btn>
              <v-btn

                depressed
                color="primary"
                :loading="loading.investment"
                @click="proceed"
              >
                Proceed
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {

  filters: {
    currency (val) {
      if (val) {
        return val.toLocaleString()
      } else {

      }
    }
  },
  props: {
    plan: {
      type: Object,

      default: () => ({
        open: false,
        name: 'name',
        days: 0,
        minimun: 0,
        maximun: 0,
        withdrawCommission: 0
      })
    }
  },

  data: () => ({
    error: null,
    valid: true,

    amount: '',
    amountRules: [
      v => !!v || 'Amount  is required',
      v => !isNaN(Number(v)) || 'E-mail must be valid'
    ]
  }),

  computed: {
    ...mapGetters({ wallet: 'wallet/getWallet', loading: 'wallet/getLoading', user: 'authentication/getUser', modal: 'wallet/getModal' })
  },

  methods: {
    ...mapActions({ invest: 'wallet/investFund' }),
    ...mapMutations({ setModal: 'authentication/SET_MODAL' }),

    proceed () {
      if (this.$refs.form.validate()) {
        // check if funds is ennough
        if (this.amount <= this.wallet.totalDeposite) {
          if (this.amount >= this.plan.minimum) {
            if (this.amount <= this.plan.maximum) {
              const investment = {
                name: this.plan.name,
                amount: parseInt(this.amount),
                // duration: this.plan.days,
                withdrawCommission: this.plan.withdrawCommission,
                date: this.getDate('current'),
                elapse: this.getDate('add', this.plan.days)
              }
              this.invest(investment)
              if (this.modal) {
                this.plan.open = false
                this.error = null
                this.reset()
                this.resetValidation()
              }
            } else {
              this.error = `Amount must not be greater than $${this.plan.maximum}`
            }
          } else {
            this.error = `Amount must not be less than $${this.plan.minimum}`
          }
        } else {
          this.error = 'You do not have enough fund'
        }
      } return false
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
    },

    cancel () {
      console.log('cancel ' + this.plan.name)
      this.plan.open = false
      this.error = null
      this.reset()
      this.resetValidation()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style>
</style>
