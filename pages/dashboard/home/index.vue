<template>
  <v-container fluid class="pa-0 primary darken-1">
    <v-row justify="center" no-gutters class="ma-0">
      <v-col cols="12" class="pa-0 primary">
        <div style="height: 40px; padding: 0px; margin: 0px; width: 100%">
          <iframe
            src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=light&pref_coin_id=1505&invert_hover=no"
            width="100%"
            height="36px"
            scrolling="auto"
            marginwidth="0"
            marginheight="0"
            frameborder="0"
            border="0"
            style="border: 0; margin: 0; padding: 0"
          />
        </div>
      </v-col>
      <v-col v-if="!verified" cols="12">
        <v-card dark tile color="accent">
          <v-card-text class="d-flex align-center white--text py-1">
            Your Account is not verified
            <v-spacer />
            <v-btn small outlined @click="toggleVerify(true)">
              Verify
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="11">
        <v-card dark flat tile color="primary darken-1">
          <p-pattern v-if="daf" />
          <v-card-text class="d-flex">
            <div class="d-flex flex-column">
              <span class="text-subtitle-1 white--text">Dashboard</span>
              <span class="text-h6 white--text font-weight-light">Welcome, {{ user && user.firstName }} {{ user && user.lastName }}</span>
            </div>
            <!-- <div v-if="user && user.wallet.earnings !== 0" class="text-h6 text-sm-h4 font-weight-bold white--text my-1">
              {{ user && user.wallet.earnings | currency }}
            </div>
            <div v-else class="text-h6 text-sm-h4 font-weight-bold white--text my-1">
              $0.00
            </div>
            <v-btn
              depressed
              small
              color="white primary--text"
              class="text-body-2 font-weight-normal mt-2 mr-sm-1"
              to="/dashboard/deposit"
            >
              <v-icon size="20" left color="primary">
                mdi-cash-multiple
              </v-icon>
              Deposit
            </v-btn>
            <v-btn
              depressed
              small
              color="white primary--text"
              class="text-body-2 font-weight-normal mt-2 "
              to="/dashboard/investment"
            >
              <v-icon size="20" left color="primary">
                mdi-currency-usd
              </v-icon>
              Invest
            </v-btn>
            <v-btn
              depressed
              small
              color="white primary--text"
              class="text-body-2 font-weight-normal mt-2 ml-sm-1"
              to="/dashboard/withdraw"
            >
              <v-icon size="20" left color="primary">
                mdi-cash-check
              </v-icon>
              Withdraw
            </v-btn> -->
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="11" lg="11">
        <v-row class="ma-0">
          <!-- <v-col cols="12" class="d-flex align-center pb-0">
            <span class="text2--text text-h6 font-weight-medium">Hello, <span>Whyte Peter</span></span>
            <v-spacer />
            <v-btn
              depressed
              color="secondary"
              class="text-subtitle-2 font-weight-normal "
              to="/dashboard/deposit"
            >
              <v-icon size="20" left>
                mdi-cash-multiple
              </v-icon>
              Deposit
            </v-btn>
          </v-col> -->
          <v-col
            v-for="(wallet, i) in wallets"
            :key="i"
            cols="6"
            sm="6"
            md="3"
            class="pb-0 px-1"
          >
            <x-wallet-card
              :color="wallet.color"
              :type="wallet.type"
              :icon="wallet.icon"
              :title="wallet.title"
              :amount="wallet.amount"
              :number="wallet.number"
            />
          </v-col>
        </v-row>

        <v-row class="ma-0 mt-2">
          <v-col cols="12" md="6">
            <v-card flat rounded="lg" class="px-0 pb-0">
              <v-card-title class="text-subtitle-1 font-weight-medium">
                Market Prices
              </v-card-title>
              <v-card-text class="px-0 pb-0">
                <div style="height:433px; background-color: #1D2330; overflow:hidden; box-sizing: border-box; border: 1px solid #282E3B; border-radius: 4px; text-align: right; line-height:14px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #262B38; padding: 0px; margin: 0px; width: 100%;">
                  <div style="height:413px; padding:0px; margin:0px; width: 100%;">
                    <iframe
                      src="https://widget.coinlib.io/widget?type=full_v2&theme=light&cnt=6&pref_coin_id=1505&graph=yes"
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
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card rounded="lg" flat>
              <v-card-title class="text-subtitle-1 font-weight-medium">
                Account Information
              </v-card-title>
              <v-card-text class="text2--text ">
                <v-row>
                  <v-col cols="12" class="">
                    Last Access:
                    <v-btn color="primary" small outlined class="mx-2">
                      <v-icon class="mr-2" small>
                        mdi-buffer
                      </v-icon>
                      {{ user && user.lastLogin }}
                    </v-btn>
                  </v-col>
                  <v-col cols="12" class="">
                    Login IP Address:
                    <v-btn color="primary" small outlined class="mx-2">
                      <v-icon class="mr-2" small>
                        mdi-map-marker
                      </v-icon>
                      {{ ip }}
                    </v-btn>
                  </v-col>
                  <v-col cols="12" class="textWhite--text ">
                    Device Browser:
                    <v-btn color="primary" small outlined class="mx-2">
                      <v-icon class="mr-2" small>
                        mdi-web
                      </v-icon>
                      {{ browser }}
                    </v-btn>
                  </v-col>
                  <v-col cols="12">
                    <v-card dark flat class="bgacc">
                      <v-card-title class="d-flex flex-column align-start pb-1 text-uppercase">
                        <div style="width:100%" class="d-flex  text-subtitle-2 transparent">
                          <span>Account Type</span>
                          <v-spacer />
                          <v-chip label small color="accent">
                            {{ user && user.accType }}
                          </v-chip>
                        </div>
                        <div style="width:100%" class="d-flex mt-2 text-subtitle-2 transparent">
                          <span>Account Status</span>
                          <v-spacer />
                          <v-chip label small :color="user && (user.accStatus).toLowerCase() === 'active' ? 'success' : 'error'">
                            {{ user && user.accStatus }}
                          </v-chip>
                        </div>
                      </v-card-title>
                      <v-card-text class="textDark--text text-caption" />
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <verify-account :user="user" :drawer="drawer.verify" :toggle="toggleVerify" />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import PPattern from '~/components/other/pPattern.vue'
import xWalletCard from '~/components/other/xWalletCard.vue'
import VerifyAccount from '~/components/verifyAccount.vue'

export default {
  name: 'Dashboard',
  components: { xWalletCard, PPattern, VerifyAccount },
  layout: 'dashboard',
  filters: {
    currency (val) {
      if (val) {
        val = parseInt(val)
        return val.toLocaleString('en-US', {
          style: 'currency',
          code: 'US',
          currency: 'USD'
        })
      } else {
      }
    }
  },
  data: () => ({
    drawer: {
      verify: false
    },
    ip: '',
    browser: ''
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser', state: 'authentication/getState' }),
    verified () {
      let verified = false
      const verification = this.state('verification')

      console.log(verification)

      const address = verification && verification.address.status
      const identity = verification && verification.identity.status
      const face = verification && verification.face.status
      const arr = [address, identity, face]

      verified = arr.every(el => el === true)

      return verified
    },
    wallets () {
      return [
        {
          icon: 'mdi-wallet',
          title: 'Active Deposit',
          type: 'amount',
          color: 'gblue',
          amount: this.user && this.user.wallet.deposit
        },
        {
          icon: 'mdi-finance',
          title: 'Profit',
          type: 'amount',
          color: 'gorange',
          amount: this.user && this.user.wallet.earnings
        },
        {
          icon: 'mdi-cash-fast',
          title: 'Withdrawn',
          type: 'amount',
          color: 'ggreen',
          amount: this.user && this.user.wallet.withdraw
        },
        {
          icon: 'mdi-account-switch',
          title: 'Referral Bonus',
          type: 'amount',
          color: 'gpurple',
          amount: this.user && this.user.wallet.referral
        }

      ]
    }

  },
  created () {
    // get ip
    this.getIp()
    this.getBrowser()
  },

  methods: {
    ...mapActions({ initAlert: 'controller/initAlert' }),
    getIp () {
      fetch('https://api.ipify.org?format=json')
        .then(x => x.json())
        .then(({
          ip
        }) => {
          this.ip = ip
        })
    },
    getBrowser () {
      try {
        if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
          this.browser = 'Opera'
        } else if (navigator.userAgent.includes('Chrome')) {
          this.browser = 'Chrome'
        } else if (navigator.userAgent.includes('Safari')) {
          this.browser = 'Safari'
        } else if (navigator.userAgent.includes('Firefox')) {
          this.browser = 'Firefox'
        } else if ((navigator.userAgent.includes('MSIE')) || (!!document.documentMode === true)) {
          this.browser = 'IE'
        } else {
          this.browser = 'unknown'
        }
      } catch (err) {
        console.log(err)
      }
    },
    toggleVerify (state) {
      this.drawer.verify = state
    }
  }
}
</script>

<style>
.bgacc {
  background: rgb(0,11,83);
background: linear-gradient(36deg, rgb(0, 9, 70) 14%, rgb(0, 18, 133) 87%);
}
</style>
