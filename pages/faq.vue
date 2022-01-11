<template>
  <v-container fluid class="primary ">
    <v-row justify="center" class="py-10 primary white--text">
      <v-col cols="12" class="text-center mb-6 opacity">
        <div class="text-h5 text-md-h4  text-capitalize font-weight-bold">
          Frequently Asked Questions (FAQ)
        </div>
      </v-col>
      <v-col cols="12" md="10">
        <div
          style="border:1px solid #29b6f6; border-radius:7px; overflow:hidden"
        >
          <v-expansion-panels accordion>
            <v-expansion-panel
              v-for="(item, i) in faq"
              :key="i"
              class="primary "
            >
              <v-expansion-panel-header class="accent--text font-weight-medium">
                {{ item.name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content class="white--text font-weight-light">
                {{ item.des }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FAQ',
  data: () => ({
    windowWidth: 0,
    faq: [
      {
        name: 'What is CFD?',
        des:
          ' CFD - Contract for Difference. CFD is type of financial asset which helps trader to gain and earn in a continuous way. By predicting the move of a currency, trader can choose to open BUY or SELL contract for any asset'
      },
      {
        name: 'What is binary option?',
        des:
          'Binary options are a simple and potentially very profitable way to make money from short term movements on the market. By correctly predicting whether the price of an asset will go up or down, you can get a significant income in a continuous way.'
      },
      {
        name: 'What is Bitmain FX?',
        des:
          "Bitmain FX is a digital currency, which functioning is based on blockchain techology. Physically currency doesn't exist, it exist only in virtuality. The most popular cryptocurrencies are Bitcoin, Ethereum, Litecoin, Dash, Ripple. You can use these currencies to fund and trade."
      },
      {
        name: 'What is the minimum and maximum deposit amount?',
        des:
          'The minimum deposit amount is 150$ (or €), and the maximum - 50000$ (or €).'
      },
      {
        name: 'Do I have to download any software for trading?',
        des:
          'There is no need to download something before you can start trading with Trust Investment. All you need to do is sign up and add funds into your account and you’ll be ready to start trading.'
      },
      {
        name: 'Is there any maintenance or registration fee?',
        des: 'No, it is free to open an account with Trust Investment.'
      },
      {
        name: 'How can I sign up?',
        des:
          'To sign up go to ‘Open an Account’ and enter the required information.Please make sure the data you submit is correct and up to date. In the future it will simplify withdrawal process.'
      }
    ]
  }),
  mounted () {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  head () {
    return {
      title: 'FAQ - Frequently Asked Questions',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Questions Everyone is asking about Trust Investment'
        }
      ]
    }
  }
}
</script>

<style></style>
