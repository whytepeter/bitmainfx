<template>
  <v-container>
    <v-row v-if="alert.is" no-gutters justify="center" style="width:100%; position: fixed; top: 4.2rem; left:0; z-index:2">
      <v-col cols="12" md="10" :class="[alert.is ? 'animate__animated animate__fadeInDown' : 'animate__animated animate__fadeOutUp' ]">
        <v-alert
          :type="alert.type"
          border="top"
          dark
        >
          {{ alert.message }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <!-- <v-col cols="12">
        <v-expansion-panels dark accordion>
          <v-expansion-panel class="primary">
            <v-expansion-panel-header>
              <span class="font-weight-medium text-subtitle-2">Withdraw Notification</span>
              <v-spacer />
              <v-icon v-if="notifications.withdraw.length" :color="status(notifications.withdraw[0].status).color">
                mdi-alert-circle
              </v-icon>
            </v-expansion-panel-header>
            <v-expansion-panel-content v-if="notifications.withdraw.length" class="primary">
              <v-card v-for="(notif, i) in notifWithdraw" :key="i" color="primary lighten-1" class="mb-1" outlined>
                <v-card-text>
                  {{ notif.text }}
                  <v-spacer />
                  <strong>Date: {{ notif.date }}</strong>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col> -->
      <v-col cols="12" class="pa-0">
        <v-card flat dark color="transparent" class="pa-0">
          <v-card-title class="text-subtitle-1 font-weight-medium py-0">
            Withdraw
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <wallet-card />
              </v-col>
              <v-col cols="12" md="6">
                <v-card light flat class="white  px-md-4">
                  <v-card-title class="text-subtitle-1 font-weight-medium">
                    Withdraw to wallet
                  </v-card-title>

                  <v-card-text>
                    <v-form @submit.prevent>
                      <!-- <div v-if="showAlert" class="text-caption info--text mb-2">
                        Before you can withdraw, you have to reinvest
                      </div> -->
                      <div class="text-caption error--text mb-2">
                        {{ error }}
                      </div>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-select
                            v-model="paymentMethod"
                            dense
                            color="secondary"
                            :items="paymentMethods"
                            outlined
                            :rules="[(v) => !!v || 'Payment Method is required']"
                            label="Payment Method"
                            required
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="amount"
                            type="number"
                            name="amount"
                            outlined
                            dense
                            color="secondary"
                            label="Enter Amount"
                            required
                          />
                        </v-col>
                        <v-col v-if="paymentMethod !== 'Bank Transfer'" cols="12">
                          <v-text-field
                            v-model="walletAddress"
                            type="text"
                            name="walletAddress"
                            outlined
                            dense
                            color="secondary"
                            label="Wallet Address"
                            :rules="walletAddressRules"
                            required
                          />
                        </v-col>
                        <v-col v-if="paymentMethod === 'Bank Transfer'" cols="12">
                          <v-text-field
                            v-model="bank"
                            type="text"
                            name="Bank"
                            outlined
                            dense
                            color="secondary"
                            label="Bank"
                            required
                            :rules="bankRules"
                          />
                        </v-col>
                        <v-col v-if="paymentMethod === 'Bank Transfer'" cols="12">
                          <v-text-field
                            v-model="accName"
                            type="text"
                            name="accName"
                            outlined
                            dense
                            color="secondary"
                            label="Account Name"
                            required
                            :rules="accNameRules"
                          />
                        </v-col>
                        <v-col v-if="paymentMethod === 'Bank Transfer'" cols="12">
                          <v-text-field
                            v-model="accNumber"
                            type="text"
                            name="accNumber"
                            outlined
                            dense
                            color="secondary"
                            label="Account Number"
                            required
                            :rules="accNumberRules"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="password"
                            type="password"
                            name="password"
                            outlined
                            dense
                            color="secondary"
                            label="Password"
                            required
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-btn depressed :loading="loading.withdraw" color="secondary" @click="submit">
                            Proceed
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="12" md="6">
        <v-card flat color="white">
          <v-card-title class="text-subtitle-1 font-weight-medium">
            Send Proof of payment
          </v-card-title>
          <v-form @submit.prevent>
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    v-model="commission.walletAddress"
                    type="text"
                    name="walletAddress"
                    outlined
                    dense
                    color="secondary"
                    prepend-icon="mdi-bitcoin"
                    label="Wallet Address"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="commission.amount"
                    type="text"
                    name="amount"
                    outlined
                    dense
                    color="secondary"
                    prepend-icon="mdi-cash"
                    label="Enter Amount"
                  />
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    v-model="commission.photo"
                    dense
                    type="file"
                    name="image"
                    chips
                    color="secondary"
                    outlined
                    label="Upload Image"
                    prepend-icon="mdi-camera"
                  />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn depressed color="error" class="mr-2" @click="clear">
                    Cancel
                  </v-btn>
                  <v-btn :loading="loading.commission" depressed color="secondary" @click="proceed">
                    Submit
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col cols="12">
        <v-card flat color="white">
          <v-card-title class="text-subtitle-1 font-weight-medium">
            My Withdraw
            <v-spacer />
          </v-card-title>
          <v-data-table
            mobile
            :headers="table.headers"
            :items="table.info"
            :search="table.search"
          >
            <template v-slot:item.status="{ item }">
              <v-chip :color="getColor(item.status)" dark>
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import walletCard from '../../../components/walletCard'

export default {
  name: 'Withdraw',
  layout: 'dashboard',
  components: {
    walletCard
  },
  data: () => ({
    show: false,
    dialog: false,
    paymentMethod: '',
    walletAddress: '',
    walletAddressRules: [v => !!v || 'Wallet Address is required'],
    bank: '',
    bankRules: [v => !!v || 'Bank is required'],
    accName: '',
    accNameRules: [v => !!v || 'Account Name is required'],
    accNumber: '',
    accNumberRules: [v => !!v || 'Account Number is required'],
    paymentMethods: ['Bitcoin', 'Ethereum', 'Dash', 'Litecoin', 'Perfect Money', 'Bank Transfer'],
    amount: '',
    password: '',
    error: '',

    commission: {
      photo: [],
      walletAddress: '',
      amount: ''
    }

  }),

  computed: {
    ...mapGetters({ notifications: 'wallet/getNofitications', alert: 'authentication/getAlert', info: 'wallet/getWithdrawStatus', user: 'authentication/getUser', wallet: 'wallet/getWallet', invest: 'wallet/getInvestmentStatus', loading: 'wallet/getLoading' }),
    table () {
      console.log(this.info)
      return {
        headers: [
          {
            text: 'Wallet Address',
            align: 'start',
            sortable: false,
            value: 'walletAddress'
          },
          { text: 'Amount', value: 'amount' },
          { text: 'Payment Method', value: 'paymentMethod' },
          { text: 'Date', value: 'date' },
          { text: 'Commission', value: 'commission' },
          { text: 'Status', value: 'status' }

        ],
        info: this.info
      }
    },
    notifWithdraw () {
      return this.notifications.withdraw
    }
  },
  methods: {
    ...mapActions({ withdraw: 'wallet/withdrawFund', sentCommission: 'wallet/sentCommission' }),

    getColor (status) {
      if (status === 'Success' || status === 'success') {
        return 'success'
      } else if (status === 'Pending' || status === 'pending') {
        return 'warning'
      } else if (status === 'Ongoing' || status === 'ongoing') {
        return 'info'
      }
    },

    status (type) {
      if (type === 'pending' || type === 'Pending') {
        return {
          color: 'accent',
          icon: 'mdi-alert-circle'
        }
      } else if (type === 'ongoing' || type === 'Ongoing') {
        return {
          color: 'info',
          icon: 'mdi-dots-horizontal-circle'
        }
      } else if (type === 'success' || type === 'Success') {
        return {
          color: 'success',
          icon: 'mdi-check-circle'
        }
      } else if (type === null) {
        return {
          color: 'transparent',
          icon: ''
        }
      } else {
        return {
          color: '',
          icon: ''
        }
      }
    },
    submit () {
      if (this.user !== null) {
        console.log(this.wallet.earnings)
        console.log(this.amount)
        if (this.password === this.user.password) {
          if (this.amount > 0) {
            if (this.amount <= parseInt(this.wallet.earnings)) {
              const commission = 300
              const details = {
                walletAddress: this.walletAddress,
                bank: this.bank,
                accName: this.accName,
                accNumber: this.accNumber,
                paymentMethod: this.paymentMethod,
                amount: parseInt(this.amount),
                date: this.getDate('current'),
                commission,
                status: 'Pending'
              }
              this.withdraw(details)
              this.error = ''
              this.alert('Your withdraw was successful and its pending. You are required to reinvest before your withdrawal request will be approved. Thank you')
            } else {
              this.error = 'Not enough fund'
            }
          } else {
            this.error = 'Amount must be greater than 0'
          }
        } else {
          this.error = 'Password is incorrect'
        }
      } else {
        console.log('You must be authenticated to perform this action')
      }
    },
    proceed () {
      this.commission.date = this.getDate('current')
      this.sentCommission(this.commission)
    },
    clear () {
      this.commission.amount = ''
      this.commission.walletAddress = ''
      this.commission.photo = []
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

  },
  head () {
    return {
      title: 'Withdraw Funds',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Withdraw you earnings from your account'
        }
      ]
    }
  }

}
</script>

<style>
.border {
  border: 1px solid #ddd;
  border-radius: 3px;
}
</style>
