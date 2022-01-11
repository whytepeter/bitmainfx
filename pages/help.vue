<template>
  <v-container fluid class="grey lighten-4">
    <v-row justify="center" align="center" class=" secondary--text  py-16">
      <v-col cols="12" md="10" class="pa-0">
        <v-row justify="center" class="ma-0">
          <v-col cols="12" md="6">
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
          <v-col cols="12" md="6">
            <v-card>
              <v-expansion-panels flat accordion>
                <v-expansion-panel v-for="faq in faqs2" :key="faq.name">
                  <v-expansion-panel-header class="text-subtitle-1 font-weight-medium text-md-h6 text2--text">
                    {{ faq.name }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="grey lighten-5 py-4 font-weight-light text-capitalize">
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
        name: 'What is a trading platform?',
        des:
          ' It is an online platform where traders track the quotes of different kinds of assets and make trades using the services provided by a broker.'
      },
      {
        name: 'The Platform Doesn’t Load',
        des:
          'Try opening it in some other browser. We recommend using the latest Google Chrome. The system will not let you log in to the trading platform if your location is blacklisted. Perhaps, there is an unexpected technical problem. Our support consultants will help you solve it.'
      },
      {
        name: 'When Will Deposits Be Credited',
        des:
          'The funds are usually credited to trading accounts fast, but sometimes it can take from 2 to 5 business days (depending on your payment provider.) If the money has not been credited to your account right after you make a deposit, please wait for 1 hour. If after 1 hour there is still no money, please wait and check again.'
      },
      {
        name: 'Do I Need to Install Any Trading Software?',
        des:
          'You can trade on our online platform in the web version right after you create an account. There is no need to install new software.'
      },
      {
        name: 'What Should I Do If a System Error Occurs When Loading the Platform?',
        des:
          'When system errors occurs, we recommend clearing your cache and cookies. You should also make sure you are using the latest version of the web browser. If you take these actions but the error still occurs, contact our support team.'
      }
    ],
    faqs2: [
      {
        name: 'What are bonuses?',
        des:
          'Bonus is the money the company provides to a client for trading. Traders don\'t lose their own funds when they lose a bonus. On the other hand, in case of success, they pocket the profit gained from using bonus funds.'
      },
      {
        name: 'Trading and Quote Sessions',
        des:
          'A quote session is a period when the platform receives and transmits quotes. However, one can make trades within a slightly shorter trading session, which is part of a quote session. As a rule, a quote session starts 5-10 minutes earlier and ends 5-10 minutes later than the trading session. This is meant to protect traders from the risk of high volatility at the beginning and the end of the quote session. For example, a quote session for Apple shares starts at 13:30 GMT (US Summer Time) and ends at 20:00. A trading session for Apple shares starts with a five-minute delay, i.e. at 13:35. And it ends at 19:55, which is 5 minutes before the quote session ends.'
      },
      {
        name: 'Why Doesn’t a Trade Open Instantly?',
        des:
          'It takes a few seconds to get data from the servers of our liquidity providers. As a rule, the process of opening a new trade takes up to 4 seconds.'
      },
      {
        name: 'How Can I View the History of My Trades?',
        des:
          'All information about your recent trades is available in the “Trades” section. You can access the history of all your trades through the section with the same name as your user account.'
      },
      {
        name: 'Is trading a good way to make Money?',
        des:
          'Yes. Trading is a good way to make a return on your money, but, all depends on your financial services background, extensive trading knowledge and experience, you must be an expert or consult an expert in financial trading investing before you invest any of your money.'
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
