<template>
  <v-container fluid class="grey lighten-4">
    <v-row justify="center" align="center" class=" secondary--text  py-16">
      <v-col cols="12" md="10" class="pa-0">
        <v-row justify="center" class="ma-0">
          <v-col cols="12" md="8">
            <v-card>
              <v-expansion-panels flat accordion>
                <v-expansion-panel v-for="faq in faqs1" :key="faq.name">
                  <v-expansion-panel-header class="text-subtitle-1 font-weight-medium text-md-h6 text2--text">
                    {{ faq.name }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="grey lighten-5 py-4 font-weight-light ">
                    {{ faq.des }}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  scrollToTop: true,
  name: 'Help',
  data: () => ({
    windowWidth: 0,
    faqs1: [
      {
        name: 'How do I get started with Bitmain FX?',
        des:
          'Firstly, you need to sign up on our platform. Enter a valid mail and password to enter your personal account. Next, check out our investment packages and purchase using your BTC wallet.'
      },
      {
        name: 'How do I earn money with cloud mining?',
        des:
          'You buy cloud mining packages based on the efficiency and cost of mining hardware. You will receive the daily income depending on the terms of your contract.'
      },
      {
        name: 'How can I withdraw my profit?',
        des:
          'You create a withdrawal request in the "Payouts" section, and within 24 hours your withdrawal will be processed, and the funds will be sent to the wallet you specified.'
      },
      {
        name: 'How long do I need to wait for my payouts?',
        des:
          'When requested, your payments will be automatically credited to your balance within 24 hours.'
      },
      {
        name: 'Is there a minimum or maximum purchase amount?',
        des:
          'You can see our prices for each package. Each package has own category and its own minimum. If you want to invest more than $50,000, please contact - support@bitmainfx.online'

      },
      {
        name: 'What is the difference between referral program levels?',
        des:
          'There are three referral levels in total. The higher the level of the referral program, the greater the bonus from your referral. The highest level of the referral program is gold. Each package contains a referral level. Please pay attention.'
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
          content: 'Questions Everyone is asking about Bitmain FX'
        }
      ]
    }
  }
}
</script>

<style>
.bg-faq {
  background: linear-gradient(rgba(1, 4, 66, 0.9), rgba(1, 4, 66, 0.9)),
    url("/bg/bg-3.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
