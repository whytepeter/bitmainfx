<template>
  <v-container>
    <v-row
      v-if="alert.is && alert.type !== 'Primary'"
      no-gutters
      justify="center"
      style=" width:100%; position: fixed; top: 4.2rem; left:0; z-index:2"
    >
      <v-col
        cols="12"
        md="10"
        :class="[
          alert.is
            ? 'animate__animated animate__fadeInDown'
            : 'animate__animated animate__fadeOutUp'
        ]"
      >
        <v-alert :type="alert.type" border="top" dark>
          {{ alert.message }}
          <v-spacer />
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-snackbar
        v-if="alert.type === 'Primary'"
        v-model="alert.is"
        top
        right
        :color="alert.type"
      >
        {{ alert.text }}
      </v-snackbar>
      <v-snackbar v-else v-model="alert.is" :color="alert.type">
        {{ alert.text }}
      </v-snackbar>

      <v-col cols="12">
        <v-card dark color="primary">
          <v-card-title>
            Fund Wallet
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <wallet-card />
              </v-col>
              <v-col cols="12" md="6">
                <v-card dark color="primary lighten-1 px-md-4" flat>
                  <v-card-title>
                    Copy Wallet Address
                  </v-card-title>
                  <v-card-text>
                    <span
                      style="max-width:80%"
                      class=" rounded pa-2  address-style text-truncate"
                    >
                      {{ adminWallet }}
                    </span>
                    <v-btn
                      outlined
                      small
                      style="max-width:20%"
                      color="accent"
                      class=" mt-1 mb-2 ml-2 "
                      @click="copy(adminWallet)"
                    >
                      copy
                    </v-btn>
                    <div class="text-caption error--text">
                      Transfer/Deposit to the company's wallet above and upload
                      you proof of payment by filling payment form.
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="between">
      <v-col cols="12" md="6">
        <v-row no-gutters>
          <v-col cols="12">
            <v-card dark color="primary">
              <v-card-title>
                Select Payment Methods
              </v-card-title>
              <v-divider />
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card color="primary lighten-3" class="card" @click="method = 'card'">
                      <v-card-text class="d-flex align-center justify-start">
                        <v-icon left color="accent">
                          mdi-credit-card-check
                        </v-icon>
                        <div>
                          Credit Card/Debit Card
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-card color="primary lighten-3" class="card" @click="method = 'bitcoin'">
                      <v-card-text class="d-flex align-center justify-start">
                        <v-icon left color="accent">
                          mdi-bitcoin
                        </v-icon>
                        <div>
                          Bitcoin
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <v-card color="primary lighten-3" class="card" @click="method = 'bank'">
                      <v-card-text class="d-flex align-center justify-start">
                        <v-icon left color="accent">
                          mdi-bank
                        </v-icon>
                        <div>
                          Bank Deposit
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col v-if="method === 'bank'" cols="12">
            <v-card dark class="primary px-md-4" flat>
              <v-card-title class="text-subtitle-1 d-flex">
                Request Bank Details
                <v-spacer />
                <v-btn :loading="loading.request" depressed color="accent primary--text" @click="sendRequest">
                  Send Request
                </v-btn>
              </v-card-title>
              <v-card-text />
            </v-card>
          </v-col>
          <v-col v-if="method === 'bank'" cols="12">
            <v-card dark color="primary">
              <v-card-title>
                Send Proof of payment
              </v-card-title>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  class="pb-2"
                >
                  <v-row no-gutters>
                    <v-col cols="6">
                      <v-text-field
                        v-model="bank.amount"
                        type="text"
                        name="amount"
                        outlined
                        dense
                        color="secondary"
                        :rules="required"
                        label="Enter Amount"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="bank.bankName"
                        type="text"
                        name="bankName"
                        outlined
                        dense
                        color="secondary"
                        :rules="required"
                        label="Bank"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="bank.accountNumber"
                        type="text"
                        name="accountNumber"
                        outlined
                        dense
                        color="secondary"
                        :rules="required"
                        label="Account Number"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="bank.accountName"
                        type="text"
                        name="accountName"
                        outlined
                        dense
                        color="secondary"
                        :rules="required"
                        label="Account Name"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        v-model="bank.photo"
                        dense
                        type="file"
                        name="image"
                        chips
                        outlined
                        required
                        :rules="photoRules"
                        label="Upload Image"
                        prepend-icon="mdi-camera"
                      />
                    </v-col>

                    <v-col cols="12" class="text-right">
                      <v-btn depressed color="error" class="mr-2" @click="clear">
                        Cancel
                      </v-btn>
                      <v-btn
                        :loading="loading.fund"
                        depressed
                        color="accent"
                        @click="submit"
                      >
                        Submit
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col v-if="method === 'card'" cols="12">
            <v-card dark class="primary px-md-4" flat>
              <v-card-title>
                Copy Wallet Address
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" class="pa-0">
                    <span
                      style="max-width:80%"
                      class=" rounded pa-2  address-style text-truncate"
                    >
                      {{ adminWallet }}
                    </span>
                    <v-btn
                      outlined
                      small
                      style="max-width:20%"
                      color="accent"
                      class=" mt-1 mb-2 ml-2 "
                      @click="copy(adminWallet)"
                    >
                      copy
                    </v-btn>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <v-btn href="https://buy.bitcoin.com/" target="_blank" depressed color="accent">
                      Pay with card
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col v-if="method === 'bitcoin'" cols="12">
            <v-card dark color="primary">
              <v-card-title>
                Send Proof of payment
              </v-card-title>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="pb-2  "
              >
                <v-card-text>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                        v-model="payment.walletAddress"
                        type="text"
                        name="walletAddress"
                        outlined
                        dense
                        color="secondary"
                        :rules="walletAddressRules"
                        prepend-icon="mdi-bitcoin"
                        label="Wallet Address"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="payment.amount"
                        type="text"
                        name="amount"
                        outlined
                        dense
                        color="secondary"
                        :rules="amountRules"
                        prepend-icon="mdi-cash"
                        label="Enter Amount"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        v-model="payment.photo"
                        dense
                        type="file"
                        name="image"
                        chips
                        outlined
                        required
                        :rules="photoRules"
                        label="Upload Image"
                        prepend-icon="mdi-camera"
                      />
                    </v-col>

                    <v-col cols="12" class="text-right">
                      <v-btn depressed color="error" class="mr-2" @click="clear">
                        Cancel
                      </v-btn>
                      <v-btn
                        :loading="loading.fund"
                        depressed
                        color="accent"
                        @click="submit"
                      >
                        Submit
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <v-card dark color="primary">
          <v-card-title>Crypto Market Price</v-card-title>
          <v-card-text>
            <div
              style="height:433px; background-color: #FFFFFF; overflow:hidden; box-sizing: border-box; border: 1px solid #56667F; border-radius: 4px; text-align: right; line-height:14px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #56667F; padding: 0px; margin: 0px; width: 100%;"
            >
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
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card
          dark
          color="primary"
        >
          <v-card-title>
            Capital Status
            <v-spacer />
          </v-card-title>
          <v-data-table
            dark
            class="primary"
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import walletCard from '../../../components/walletCard'

export default {
  name: 'Withdraw',
  layout: 'dashboard',
  components: {
    walletCard
  },
  data: () => ({
    method: '',
    valid: true,
    payment: {
      type: 'wallet',
      photo: null,
      walletAddress: '',
      amount: ''
    },
    bank: {
      type: 'bank',
      amount: '',
      photo: null,
      bankName: '',
      accountName: '',
      accountNumber: ''
    },
    required: [v => !!v || 'This field  is required'],
    amountRules: [v => !!v || 'amount  is required'],
    walletAddressRules: [v => !!v || 'walletAddress  is required'],
    photoRules: [v => !!v || 'Proof  is required']
  }),

  computed: {
    ...mapGetters({
      adminWallet: 'authentication/getAdminWallet',
      alert: 'authentication/getAlert',
      loading: 'wallet/getLoading',
      info: 'wallet/getProofDetails'
    }),
    table () {
      return {
        headers: [
          {
            text: 'Wallet Address',
            align: 'start',
            sortable: false,
            value: 'walletAddress'
          },
          { text: 'Bank', value: 'bankName' },
          { text: 'Amount', value: 'amount' },
          { text: 'Date ', value: 'date' },
          { text: 'Status', value: 'status' }
        ],
        info: this.info
      }
    }
  },

  methods: {
    ...mapMutations({ setAlert: 'authentication/SET_ALERT' }),
    ...mapActions({
      notifyMe: 'authentication/notifyWhyte',
      fundWallet: 'wallet/fundWallet',
      sendRequest: 'wallet/sendRequest'

    }),

    async copy (payload) {
      await navigator.clipboard.writeText(payload)
      this.initAlert('success', 'Wallet Address copied to clipboard')
    },

    getColor (status) {
      if (status === 'Success' || status === 'success') {
        return 'success'
      } else if (status === 'Pending' || status === 'pending') {
        return 'warning'
      } else if (status === 'Ongoing' || status === 'ongoing') {
        return 'info'
      }
    },

    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        this.payment.date = this.getDate('current')
        this.bank.date = this.getDate('current')

        const method = {
          bitcoin: this.payment,
          bank: this.bank
        }
        this.fundWallet(method[this.method])
      }
    },

    clear () {
      this.payment.amount = ''
      this.payment.walletAddress = ''
      this.payment.photo = []

      this.isProof = false
    },
    initAlert (type, text) {
      this.setAlert({
        is: true,
        type,
        text
      })
      setTimeout(() => {
        this.setAlert({
          is: false,
          type: '',
          text: ''
        })
      }, 5000)
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
  },
  head () {
    return {
      title: 'Fund Wallet',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Fund your Bitcotran wallet'
        }
      ]
    }
  }
}
</script>

<style>
.address-style {
  border: 1px solid #dddd;
}
.border {
  border: 1px solid #ddd;
  border-radius: 3px;
}
.card {
  transition: all .3s ease-in-out;
}
.card:hover {
  transform: scale(1.1);
}
.position {
  width: 100%;
  position: fixed;
  top: 4rem;
  left: 0;
  z-index: 2;
}
</style>
