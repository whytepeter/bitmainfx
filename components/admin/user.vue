<template>
  <v-container v-if="user !== null || user !== undefined">
    <v-row>
      <v-col cols="12" class="text-right pa-0">
        <v-spacer>
          <span v-if="user.joinDate !== undefined"><strong>Joined on</strong> {{ user.joinDate }}</span>
        </v-spacer>
      </v-col>
      <v-col cols="12" md="8">
        <div class="d-flex align-center  justify-sm-start mb-2">
          <v-icon color="primary" class="mx-2">
            mdi-account
          </v-icon>
          <span class="headline font-weight-medium grey--text text--darken-3 text-capitalize">{{ user.username }} <v-chip label small color="primary">{{ user.country }}</v-chip></span>
        </div>
        <div class="d-flex align-center  justify-sm-start mb-1">
          <v-icon color="primary" class="mx-2">
            mdi-email
          </v-icon>
          <span class="text-subtitle-1 d-inline-block text-truncate">{{ user.email }}</span>
        </div>
        <div class="d-flex align-center  justify-sm-start mb-1">
          <v-icon color="primary" class="mx-2">
            mdi-lock
          </v-icon>
          <span class="text-subtitle-1 d-inline-block text-truncate">{{ user.password }}</span>
        </div>
        <div class="d-flex align-center  justify-sm-start mb-1">
          <v-icon color="primary" class="mx-2">
            mdi-phone
          </v-icon>
          <span class="text-subtitle-1 d-inline-block text-truncate">{{ user.phoneNumber }}</span>
        </div>
        <div class="d-flex align-center  justify-sm-start">
          <v-icon color="primary" class="mx-2">
            mdi-bitcoin
          </v-icon>
          <span class="text-subtitle-1 d-inline-block text-truncate">{{ user.walletAddress }}</span>
        </div>
        <div class="d-flex align-center  justify-sm-start">
          <v-icon color="primary" class="mx-2">
            mdi-bank
          </v-icon>
          <span class="text-subtitle-1 d-inline-block text-truncate">{{ user.bank.bankName }} ({{ user.bank.accountName }}) - ({{ user.bank.accountNumber }})</span>
        </div>
      </v-col>
      <v-col cols="12" md="4" class="justify-space-between align-center">
        <div>
          <div class="text-subtitle-1">
            Total Deposite: <span class="font-weight-medium"><span class="font-weight-bold " v-html="user && user.currency ? user.currency : '$'" />{{ user.wallet.totalDeposite | currency }}</span>
          </div>
          <div class="text-subtitle-1">
            Earnings: <span class="font-weight-medium"><span class="font-weight-bold " v-html="user && user.currency ? user.currency : '$'" />{{ user.wallet.earnings | currency }}</span>
          </div>
          <div class="text-subtitle-1">
            Withdrawal: <span class="font-weight-medium"><span class="font-weight-bold " v-html="user && user.currency ? user.currency : '$'" />{{ user.wallet.withdraw | currency }}</span>
          </div>
          <div class="text-subtitle-1">
            Referral: <span class="font-weight-medium"><span class="font-weight-bold " v-html="user && user.currency ? user.currency : '$'" />{{ user.wallet.referral | currency }}</span>
          </div>
          <v-btn class="text-capitalize ml-n2" text color="secondary" @click="open = true">
            Edit
          </v-btn>
        </div>
      </v-col>
      <edit-wallet-modal :user="user" :open="open" @closeModal="open = $event" />
    </v-row>
    <v-row>
      <v-col cols="12" class="px-0">
        <v-card outlined>
          <v-card-text class="pa-0">
            <v-expansion-panels focusable popout flat>
              <v-expansion-panel>
                <v-expansion-panel-header class="py-2 text-subtitle-2 ">
                  Fund Wallet Proof
                </v-expansion-panel-header>

                <v-expansion-panel-content v-if="user.fundWallet.length" color="white grey--text pa-1">
                  <v-card
                    v-for="(fundWallet, i) in user.fundWallet"

                    :key="i"
                    light
                    outlined
                    rounded
                  >
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-card-text>
                          <div>
                            Amount <span class="font-weight-medium ml-2"> ${{ fundWallet.amount |currency }}</span>
                          </div>
                          <div>
                            Send From <span class="font-weight-medium ml-2"> {{ fundWallet.walletAddress }}</span>
                          </div>
                          <div>
                            Date <span class="font-weight-medium ml-2"> {{ fundWallet.date }}</span>
                          </div>
                          <div>
                            Status <span :class="status(fundWallet.status).color" class="font-weight-medium ml-2 pa-1 rounded white--text"> {{ fundWallet.status }}</span>
                          </div>
                          <v-btn
                            v-if="fundWallet.status !== 'Success' "
                            outlined
                            small
                            color="success"
                            class="my-2"
                            @click="approveFund(i, fundWallet.amount)"
                          >
                            Approve Payment
                          </v-btn>
                        </v-card-text>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-btn text @click="showImg = !showImg">
                          {{ showImg ? 'show image' : 'hide image' }}
                        </v-btn>
                        <v-img
                          v-if="showImg"
                          contain
                          :src="fundWallet.recieptURL"
                          max-height="300"
                          max-width="200"
                          class="grey darken-4"
                        />
                      </v-col>
                    </v-row>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" class="px-0">
        <v-card outlined>
          <v-card-text class="pa-0">
            <v-expansion-panels focusable popout flat>
              <v-expansion-panel>
                <v-expansion-panel-header class="py-2 text-subtitle-2 ">
                  Confirm Investment
                </v-expansion-panel-header>

                <v-expansion-panel-content v-if="user.investments.length" color="white grey--text pa-1">
                  <v-card
                    v-for="(investment, i) in user.investments"

                    :key="i"
                    light
                    outlined
                    rounded
                  >
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-card-text>
                          <div>
                            Package <span class="font-weight-medium ml-2"> {{ investment.name }}</span>
                          </div>
                          <div>
                            Amount <span class="font-weight-medium ml-2"> ${{ investment.amount | currency }}</span>
                          </div>
                          <div>
                            Duration <span class="font-weight-medium ml-2"> {{ investment.duration }} Days</span>
                          </div>
                          <div>
                            Date <span class="font-weight-medium ml-2"> {{ investment.date }}</span>
                          </div>
                          <div>
                            Elapse Date <span class="font-weight-medium ml-2"> {{ investment.elapse }}</span>
                          </div>
                          <div>
                            Status <span :class="status(investment.status).color" class="font-weight-medium ml-2 pa-1 rounded white--text"> {{ investment.status }}</span>
                          </div>
                          <v-btn
                            v-if="investment.status !== 'Ongoing' "
                            outlined
                            small
                            color="success"
                            class="my-2"
                            @click="approveInvestment(i, investment.amount)"
                          >
                            Approve Investment
                          </v-btn>
                        </v-card-text>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content v-else>
                  <v-card outlined>
                    <v-card-text>
                      No Investment
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" class="px-0">
        <v-card outlined>
          <v-card-text class="pa-0">
            <v-expansion-panels focusable popout flat>
              <v-expansion-panel>
                <v-expansion-panel-header class="py-2 text-subtitle-2 ">
                  Confirm Withdrawal
                </v-expansion-panel-header>

                <v-expansion-panel-content v-if="user.withdraw.length" color="white grey--text pa-1">
                  <v-card
                    v-for="(withdrawal, i) in user.withdraw"

                    :key="i"
                    light
                    outlined
                    rounded
                  >
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-card-text>
                          <div>
                            Package <span class="font-weight-medium ml-2"> {{ withdrawal.name }}</span>
                          </div>
                          <div>
                            Amount <span class="font-weight-medium ml-2"> ${{ withdrawal.amount | currency }}</span>
                          </div>
                          <div>
                            Duration <span class="font-weight-medium ml-2"> {{ withdrawal.duration }} Days</span>
                          </div>
                          <div>
                            Date <span class="font-weight-medium ml-2"> {{ withdrawal.date }}</span>
                          </div>
                          <div>
                            Elapse Date <span class="font-weight-medium ml-2"> {{ withdrawal.elapse }}</span>
                          </div>
                          <div>
                            Status <span :class="status(withdrawal.status).color" class="font-weight-medium ml-2 pa-1 rounded white--text"> {{ withdrawal.status }}</span>
                          </div>
                          <v-btn
                            v-if="withdrawal.status !== 'Success' "
                            outlined
                            small
                            color="success"
                            class="my-2"
                            @click="approveWithdrawal(i)"
                          >
                            Approve Withdrawal
                          </v-btn>
                        </v-card-text>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content v-else>
                  <v-card outlined>
                    <v-card-text>
                      No Withdrawal
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" class="px-0">
        <v-card outlined>
          <v-card-text class="pa-0">
            <v-expansion-panels focusable popout flat>
              <v-expansion-panel>
                <v-expansion-panel-header class="py-2 text-subtitle-2 ">
                  Confirm Withdrawal Commission
                </v-expansion-panel-header>

                <v-expansion-panel-content v-if="user.commissions.length" color="white grey--text pa-1">
                  <v-card
                    v-for="(commission, i) in user.commissions"

                    :key="i"
                    light
                    outlined
                    rounded
                  >
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-card-text>
                          <div>
                            Amount <span class="font-weight-medium ml-2"> ${{ commission.amount |currency }}</span>
                          </div>
                          <div>
                            Send From <span class="font-weight-medium ml-2"> {{ commission.walletAddress }}</span>
                          </div>
                          <div>
                            Date <span class="font-weight-medium ml-2"> {{ commission.date }}</span>
                          </div>
                          <div>
                            Status <span :class="status(commission.status).color" class="font-weight-medium ml-2 pa-1 rounded white--text"> {{ commission.status }}</span>
                          </div>
                          <v-btn
                            v-if="commission.status !== 'Success' "
                            outlined
                            small
                            color="success"
                            class="my-2"
                            @click="approveCommission(i, commission.amount)"
                          >
                            Approve Payment
                          </v-btn>
                        </v-card-text>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-btn text @click="showImg = !showImg">
                          {{ showImg ? 'show image' : 'hide image' }}
                        </v-btn>
                        <v-img
                          v-if="showImg"
                          contain
                          :src="commission.recieptURL"
                          max-height="300"
                          max-width="200"
                          class="grey darken-4"
                        />
                      </v-col>
                    </v-row>
                  </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content v-else>
                  <v-card outlined>
                    <v-card-text>
                      No Withdrawal
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
      </v-col>
      <v-col cols="12">
        <v-card outlined style="border-color: #ec5c5c">
          <v-card-text class="pa-0">
            <v-expansion-panels focusable popout flat>
              <v-expansion-panel>
                <v-expansion-panel-header class="py-2 text-subtitle-2 error--text">
                  Danger Zone
                </v-expansion-panel-header>

                <v-expansion-panel-content class="pa-2">
                  <v-btn large outlined color="error" @click="confirmDelete = true">
                    Delete {{ user.username }} from database
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="confirmDelete" persistent width="300">
      <v-card>
        <v-card-title
          primary-title
        >
          Are you sure
        </v-card-title>

        <v-divider />
        <v-card-text>
          <span class="error--text texr-caption mb-4">This action is irriversible</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn depressed outlined color="primary" class="mr-2" @click="confirmDelete = false">
            Cancel
          </v-btn>
          <v-btn

            depressed
            color="error"
            @click="deleting"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="alert.is"
      :color="alert.status"
    >
      {{ alert.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import editWalletModal from './editWalletModal'

export default {
  name: 'User',

  components: {
    editWalletModal
  },

  filters: {
    currency (val) {
      if (val) {
        val = parseFloat(val)
        return val.toLocaleString()
      } else {

      }
    }
  },
  props: ['index'],
  data: () => ({
    open: false,
    confirmDelete: false,
    showImg: false
  }),
  computed: {
    ...mapGetters({ getUser: 'users/getUser', alert: 'users/getAlert' }),
    user () {
      return this.getUser(this.index)
    }

  },
  head () {
    return {
      title: 'Admin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Admin dashboard '
        }
      ]
    }
  },
  methods: {
    ...mapActions({ deleteUser: 'users/deleteUser', approveCom: 'users/approveCommission', approveFd: 'users/approveFundWallet', approveIn: 'users/approveInvestments', approveW: 'users/approveWithdrawal' }),
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
      } else {
        return {
          color: '',
          icon: ''
        }
      }
    },
    deleting () {
      this.deleteUser(this.user.userID)
      this.confirmDelete = false
    },
    approveFund (index, amount) {
      amount = parseInt(amount)
      this.approveFd({ user: this.user, index, amount })
    },

    approveInvestment (index, amount) {
      this.approveIn({ user: this.user, index, amount })
    },

    approveWithdrawal (index) {
      this.approveW({ user: this.user, index })
    },

    approveCommission (index, amount) {
      const date = this.getDate('current')
      this.approveCom({ user: this.user, index, date, amount })
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
