<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="11" class="pa-0">
        <p-container dark :color="'primary'" :title="'Withdrawal'">
          <v-row class="ma-0">
            <v-col v-if="!show" cols="12" sm="6" md="4" class="pa-1">
              <dcard :action="()=>{show = true}" :icon="'mdi-cash-minus'" :title="'Request Withdrawal'" />
              <!-- <v-btn
                depressed
                block
                color="secondary"
                class="text-subtitle-2 font-weight-normal mx-1"
                @click="show = true"
              >
                Request Withdrawal
              </v-btn> -->
            </v-col>
            <v-col v-if="show" cols="12" class="pa-0">
              <v-card flat class="transparent">
                <v-card-title
                  class="text-subtitle-2 py-0 font-weight-medium text-uppercase"
                >
                  Total Profit
                  <v-chip label color="accent ml-2">
                    <div v-if="user && user.wallet.earnings !== 0">
                      {{ currency }}{{ rateAmount(user && user.wallet.earnings) | currency }}
                    </div>
                    <div v-else>
                      {{ currency }}0.00
                    </div>
                  </v-chip>
                  <v-spacer />
                  <v-btn
                    depressed
                    outlined
                    small
                    color="secondary"
                    class="text-subtitle-2 font-weight-normal mx-1"
                    @click="back"
                  >
                    <v-icon size="20" :left="$vuetify.breakpoint.smAndUp">
                      mdi-arrow-left
                    </v-icon>
                    <span class="d-none d-sm-block text-body-2">Go Back</span>
                  </v-btn>
                </v-card-title>
              </v-card>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="submit"
                >
                  <v-row class="ma-0" no-gutters>
                    <v-col cols="12" md="6">
                      <v-row class="ma-0">
                        <v-col cols="12" class="py-0 pl-0 mb-n1 ">
                          <v-text-field
                            v-model="xAmount"
                            type="text"
                            name="amount"
                            dense
                            outlined
                            color="secondary"
                            :label="`Enter Amount (${currency})` "
                            :rules="amountRules"
                            class="text-subtitle-2 font-weight-light rounded-md"
                          />
                        </v-col>
                        <v-col cols="12" class="py-0 pl-0 mb-n1 ">
                          <v-select
                            v-model="withdrawalMethod"
                            dense
                            color="secondary"
                            :items="withdrawalMethods"
                            outlined
                            class="text-subtitle-2 font-weight-light rounded-md"
                            :rules="[(v) => !!v || 'Withdrawal Method is required']"
                            label="Withdrawal Method"
                            required
                          />
                        </v-col>
                        <!-- Bank Details -->
                        <v-col cols="12" class="py-0 pl-0 mb-n1 ">
                          <v-text-field
                            v-if="withdrawalMethod !== '' && withdrawalMethod === 'Bank Transfer'"
                            v-model="bank.name"
                            type="text"
                            name="BankName"
                            dense
                            outlined
                            color="secondary"
                            label="Bank Name"
                            :rules="bankNameRules"
                            class="text-subtitle-2 font-weight-light rounded-md"
                          />
                        </v-col>
                        <v-col cols="12" class="py-0 pl-0 mb-n1 ">
                          <v-text-field
                            v-if="withdrawalMethod !== '' && withdrawalMethod === 'Bank Transfer'"
                            v-model="bank.accName"
                            type="text"
                            name="accName"
                            dense
                            outlined
                            color="secondary"
                            label="Account Name"
                            :rules="accNameRules"
                            class="text-subtitle-2 font-weight-light rounded-md"
                          />
                        </v-col>
                        <v-col cols="12" class="py-0 pl-0 mb-n1 ">
                          <v-text-field
                            v-if="withdrawalMethod !== '' && withdrawalMethod === 'Bank Transfer'"
                            v-model="bank.accNumber"
                            type="text"
                            name="accNumber"
                            dense
                            outlined
                            color="secondary"
                            label="Account Number"
                            :rules="accNumberRules"
                            class="text-subtitle-2 font-weight-light rounded-md"
                          />
                        </v-col>
                        <v-col cols="12" class="py-0 pl-0 mb-n1 ">
                          <v-text-field
                            v-if="withdrawalMethod !== '' && withdrawalMethod === 'Bank Transfer'"
                            v-model="bank.other"
                            type="text"
                            name="accNumber"
                            dense
                            outlined
                            color="secondary"
                            label="IBAN / BIC / SWIFT Code"
                            :rules="otherRules"
                            class="text-subtitle-2 font-weight-light rounded-md"
                          />
                        </v-col>
                        <!-- Wallet Address -->
                        <v-col cols="12" class="py-0 pl-0 mb-n1 ">
                          <v-text-field
                            v-if="withdrawalMethod !== '' && withdrawalMethod !== 'Bank Transfer' && withdrawalMethod !== 'Paypal'"
                            v-model="wallet"
                            type="text"
                            name="wallet"
                            dense
                            outlined
                            color="secondary"
                            :label="`${withdrawalMethod} Address`"
                            :rules="walletRules"
                            class="text-subtitle-2 font-weight-light rounded-md"
                          />
                        </v-col>

                        <!-- Paypal Email address -->
                        <v-col cols="12" class="py-0 pl-0 mb-n1 ">
                          <v-text-field
                            v-if="withdrawalMethod !== '' && withdrawalMethod === 'Paypal'"
                            v-model="paypalAddress"
                            type="text"
                            name="papaylAddress"
                            dense
                            outlined
                            color="secondary"
                            label=" Paypal Email Address"
                            :rules="paypalAddressRules"
                            class="text-subtitle-2 font-weight-light rounded-md"
                          />
                        </v-col>
                        <v-col cols="12" class="py-0 pl-0 mb-n1 ">
                          <v-textarea
                            v-model="comment"
                            name="address"
                            type="text"
                            dense
                            rows="2"
                            outlined
                            class="text-subtitle-2 font-weight-light rounded-md"
                            color="secondary"
                            label="Your Comment (Optional)"
                            required
                          />
                        </v-col>
                        <v-col cols="12" class="py-0 pl-0 mb-n1 ">
                          <v-btn
                            depressed
                            :loading="loading.withdraw"
                            block
                            type="submit"
                            color="secondary"
                            class="text-subtitle-2 font-weight-normal "
                          >
                            Submit
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" md="6" class="d-none d-md-block">
                      <v-card light flat rounded="lg" class="white">
                        <v-card-title class="text-subtitle-1 font-weight-medium">
                          Market Prices
                        </v-card-title>
                        <v-card-text>
                          <div style="height:433px; background-color: #1D2330; overflow:hidden; box-sizing: border-box; border: 1px solid #282E3B; border-radius: 4px; text-align: right; line-height:14px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #262B38; padding: 0px; margin: 0px; width: 100%;">
                            <div style="height:413px; padding:0px; margin:0px; width: 100%;">
                              <iframe
                                src="https://widget.coinlib.io/widget?type=full_v2&theme=dark&cnt=6&pref_coin_id=1505&graph=yes"
                                width="100%"
                                height="409px"
                                scrolling="auto"
                                marginwidth="0"
                                marginheight="0"
                                frameborder="0"
                                border="0"
                                style="border:0;margin:0;padding:0;"
                              />
                            </div>
                            <div style="color: #626B7F; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;">
                              <a href="https://coinlib.io" target="_blank" style="font-weight: 500; color: #626B7F; text-decoration:none; font-size:11px">Cryptocurrency Prices</a>&nbsp;by Coinlib
                            </div>
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </p-container>
        <x-transaction v-if="!show" :filter="false" :title="'Recent Withdrawals'" class="mt-4" :type="'withdraw'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Dcard from '~/components/dcard.vue'
import pContainer from '~/components/other/pContainer.vue'
import XTransaction from '~/components/other/xTransaction.vue'
export default {
  name: 'Deposit',
  components: { pContainer, XTransaction, Dcard },
  layout: 'dashboard',
  filters: {
    currency (val) {
      if (val) {
        return val.toLocaleString()
      } else {
      }
    }
  },
  data: () => ({
    show: false,
    valid: true,
    wallet: '',
    walletRules: [v => !!v || 'Wallet Address is required'],
    paypalAddress: '',
    paypalAddressRules: [v => !!v || 'Paypal Address is required'],

    bank: {
      name: '',
      accNumber: '',
      accName: '',
      other: ''
    },
    bankNameRules: [v => !!v || 'Bank Name is required'],
    accNumberRules: [v => !!v || 'Account Number is required'],
    accNameRules: [v => !!v || 'Acc Name is required'],
    otherRules: [v => !!v || 'This field is required'],

    amount: '',
    amountRules: [v => !!v || 'Amount is required'],
    comment: '',
    commentRules: [v => !!v || 'Amount is required'],
    withdrawalMethod: '',
    withdrawalMethods: ['Bitcoin', 'Ethereum', 'Perfect Money', 'Litecoin', 'Payeer', 'Paypal', 'Bank Transfer']

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
    ...mapActions({ initAlert: 'controller/initAlert', withdrawalRequest: 'controller/withdrawalRequest' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const amount = parseInt(this.xAmount.split(',').join(''))
        if (this.checkBalance(amount)) {
          const payload = {
            amount,
            method: this.withdrawalMethod,
            comment: this.comment,
            date: this.getDate('current'),
            status: 'pending'
          }
          if (this.withdrawalMethod === 'Bank Transfer') {
            payload.bank = this.bank
          } else if (this.withdrawalMethod === 'Paypal') {
            payload.paypalAddress = this.paypalAddress
          } else {
            // const name = `${this.withdrawalMethod}Address`
            payload.wallet = this.wallet
          }

          console.log(payload)
          this.withdrawalRequest(payload)
          this.clear()
        }
      }
    },
    rateAmount (payload) {
      console.log(this.user)
      const arr = this.state2('currency')
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
      const balance = this.rateAmount(this.user && this.user.wallet.earnings)
      // console.log(amount)
      // console.log(balance)
      if (amount <= 10) {
        this.initAlert({
          is: true,
          type: 'error',
          message: `Amount must be greater than ${this.currency}10`
        })
        return false
      } else if (amount > balance) {
        this.initAlert({
          is: true,
          type: 'error',
          message: "You don't have enough fund to perform this transaction"
        })
        return false
      } else {
        return true
      }
    },

    back () {
      this.show = false
      this.amount = ''
      this.comment = ''
    },

    clear () {
      this.amount = ''
      this.comment = ''
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
