<template>
  <v-container class="primary darken-1">
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="11" class="pa-0">
        <p-container dark :color="'primary'" :title="'Deposit'">
          <v-row class="ma-0">
            <v-col v-if="!show" cols="12" class="pa-0">
              <v-row class="ma-0">
                <v-col v-for="method in methods" :key="method.title" cols="12" sm="4" class="pa-1">
                  <dcard :icon="method.icon" :title="method.title" :action="method.action" />
                </v-col>
              </v-row>
            </v-col>

            <!-- <v-btn
                depressed
                block
                color="secondary"
                class="text-subtitle-2 font-weight-normal mx-1"
                @click="openForm('Pay with Card')"
              >
                Pay with Card
              </v-btn>
            <v-col v-if="!show" cols="12" sm="4" class="pa-1">
              <v-btn
                depressed
                block
                color="secondary"
                class="text-subtitle-2 font-weight-normal mx-1"
                @click="openForm('Pay with Wallet')"
              >
                Pay with Wallet
              </v-btn>
            </v-col>
            <v-col v-if="!show" cols="12" sm="4" class="pa-1">
              <v-btn
                depressed
                block
                color="secondary"
                class="text-subtitle-2 font-weight-normal mx-1"
                @click="openForm('Proof of Payment')"
              >
                Submit Proof
              </v-btn>
            </v-col>
            -->
            <v-col v-if="show" cols="12" class="px-0">
              <v-card flat color="primary darken-1" class="pt-4 ">
                <v-card-title
                  class="text-subtitle-2 py-0 font-weight-medium text-uppercase mb-2"
                >
                  {{ form }}
                  <v-chip small outlined label color="secondary" class="ml-2 d-none d-sm-block">
                    FORM
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
                <v-card-text>
                  <v-row no-gutters class="ma-0">
                    <v-col cols="12" md="6" class="pa-0">
                      <keep-alive>
                        <component :is="component" />
                      </keep-alive>
                    </v-col>
                    <v-col cols="12" md="6" class="d-none d-md-block">
                      <v-card flat light rounded="lg" class="white">
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
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </p-container>
        <x-transaction v-if="!show" :filter="false" :title="'Recent Deposit'" class="mt-4" :type="'deposit'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Dcard from '~/components/dcard.vue'
import PayWithCard from '~/components/deposit/payWithCard.vue'
import PayWithWallet from '~/components/deposit/payWithWallet.vue'
import SubmitProof from '~/components/deposit/submitProof.vue'
import pContainer from '~/components/other/pContainer.vue'
import XTransaction from '~/components/other/xTransaction.vue'
export default {
  name: 'Deposit',
  components: { pContainer, XTransaction, PayWithCard, SubmitProof, PayWithWallet, Dcard },
  layout: 'dashboard',
  data: () => ({
    show: false,
    valid: true,
    form: '',
    component: ''

  }),

  computed: {
    methods () {
      return [
        {
          title: 'Pay with Card',
          icon: 'mdi-credit-card',
          action: () => {
            this.openForm('Pay with Card')
          }
        },
        {
          title: 'Pay with Wallet',
          icon: 'mdi-bitcoin',
          action: () => {
            this.openForm('Pay with Wallet')
          }
        },
        {
          title: 'Submit Proof',
          icon: 'mdi-file-document',
          action: () => {
            this.openForm('Proof of Payment')
          }
        }
      ]
    }
  },
  methods: {

    openForm (payload) {
      const componets = {
        'Pay with Card': 'payWithCard',
        'Pay with Wallet': 'payWithWallet',
        'Proof of Payment': 'submitProof'
      }
      this.form = payload
      this.component = componets[payload]
      this.show = !this.show
    },

    back () {
      this.show = false
    }

  }

}
</script>

<style>

</style>
