<template>
  <v-container fluid class="pa-0 overflow">
    <v-row justify="center" class="bg-copy align-center px-md-16 px-4 py-16 primary ma-0">
      <v-col cols="12" class="text-center pl-md-10 my-6 mb-12">
        <div
          class=" text-h4 text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold"
        >
          Copy Expert Traders
        </div>
        <div
          class="text-h6  white--text font-weight-light mt-5"
        >
          You dont need to be an expert trader to make profit, just copy traders
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" class="white text2--text py-16 px-4  px-md-10 ">
      <v-col
        cols="12"
        md="10"
        class="mb-6"
      >
        <div class="font-weight-light text-justify">
          <p>Bitmain FX Copy Trading is both a product and a service. We cater to both the traders and investors. Being able to copy trades from several expert traders is a great service in and of itself.</p>
          <p>We originally wanted to put together a portfolio and manage everyone’s funds in one account but we soon realized that account segregation and being in control of your funds is the only way to go, especially if we wanted to bring in outside investors. So, after looking around and finding out that there was no way for anyone to copy someone else’s trades (unlike any other market), we decided to start working on this project.</p>
          <p>There have been many challenges and obstacles to overcome but when something is worth pursuing you do it even if it’s hard. While the service is still being refined and improved on the daily bases we are actively connecting traders and investors for the mutual benefit in trading and investing.</p>
        </div>
      </v-col>
      <v-col cols="12" md="10">
        <v-row class="ma-0">
          <v-col cols="12" class="mb-sm-4">
            <div class="text-center text-h6 text-sm-h4 font-weight-bold text2--text">
              How Copy Trading Works
            </div>
          </v-col>
          <v-col
            v-for="step in steps"
            :key="step.name"
            data-aos="fade-up"
            :data-aos-delay="step.delay"
            data-aos-once="true"
            data-aos-easing="ease-in-out"
            cols="12"
            sm="6"
            md="4"
            class="py-0"
            color="transparent"
          >
            <v-card
              class="py-6 mx-auto"
              color="transparent "
              flat
            >
              <v-card-text class="d-flex flex-column align-center text1--text font-weight-light ">
                <div class="d-flex flex-column text-center align-center  text-subtitle-1">
                  <span class=" font-weight-medium text3--text">{{ step.name }}</span>
                </div>
                <div class="my-2">
                  <v-avatar tile size="140">
                    <img :src="step.icon" max-width="100" alt="">
                  </v-avatar>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="10"
        class="mb-6"
      >
        <div class="font-weight-light text-justify ">
          <p>Here is how the copier works: You, as an investor, simply select an expert or experts that you want to copy trades from. Once you are signed up, this is the only action needed on your part.</p>
          <p>Once you’ve taken care of the above, you are all set. There are no codes that you need to run or signals for you to manually input. Our software will handle the trade copying automatically on your behalf. We monitor your experts trading activity and as soon as there is a trade, we calculate all the necessary parameters and execute the trade.</p>
          <p>The only thing you have to make sure of is that you have enough funds available in your trading account. When the expert exits a position, you too will exit it. Automatically.</p>
        </div>
      </v-col>

      <v-col cols="12" md="10">
        <v-row justify="center" class="ma-0">
          <v-col cols="12" class="mb-sm-4">
            <div class="text-center text-h6 text-sm-h4 font-weight-bold text2--text">
              Frequently Asked Questions
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-expansion-panels flat accordion>
                <v-expansion-panel v-for="faq in faqs1" :key="faq.name">
                  <v-expansion-panel-header class="text-subtitle-1 font-weight-medium text-md-h6 text2--text">
                    {{ faq.name }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="grey lighten-5 pa-4 pa-md-6 font-weight-light " v-html="faq.des" />
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
                  <v-expansion-panel-content class="grey lighten-5 pa-4 pa-md-6 font-weight-light " v-html="faq.des" />
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
  name: 'CopyTrading',
  scrollToTop: true,
  data: () => ({
    steps: [
      {
        name: '1. Register and Fund Your Account',
        icon: '/icon/Vector1.png',
        delay: 500
      },
      {
        name: '2. Copy One or More Expert Traders',
        icon: '/icon/Vector3.png',
        delay: 600
      },
      {
        name: '2. Watch Your Profits Grow',
        icon: '/icon/Vector2.png',
        delay: 700
      }
    ],
    faqs1: [
      {
        name: 'Who are the experts',
        des:
          ' We carefully select expert applicants. We get to know them as a trader and examine their trading performance over a period of time. We also tend to look for expert who already have a following to further confirm their competence (social proof). You can also read about every expert on their individual performance pages.'
      },
      {
        name: 'Recommended amount to start with?',
        des:
          'We suggest to have around $3000-$5000 in your account due to exchanges minimum order requirements and so that you can at least cover the trading cost every month.'
      }

    ],
    faqs2: [
      {
        name: 'How does this work?',
        des:
          `<div>
          <p>Here is how the copier works: You, as an investor, simply select an expert or experts that you want to copy trades from. Once you are signed up, this is the only action needed on your part.</p>
          <p>Once you’ve taken care of the above, you are all set. There are no codes that you need to run or signals for you to manually input. Our software will handle the trade copying automatically on your behalf. We monitor your experts trading activity and as soon as there is a trade, we calculate all the necessary parameters and execute the trade.</p>
          <p>The copier works based on trade percent amount. So, for example, if your expert takes a position in XYZ coin for a total of 10% of his account value and you are 100% allocated to that expert, then the copier will also execute a trade in your account in the amount of 10% of your account value.</p>
          <p>The only thing you have to make sure of is that you have enough available base currency that your expert trades with, in your trading account. How much is enough? First, you must meet the exchanges minimum order amount (let’s say about $10 per trade to be safe). That means that if your expert executes a 5% order, you must have at least $300 in your account total value (at 100% expert allocation as an example). This also means that you need to have at least 10% or higher in available base currency to avoid missed trades.</p>
          <p>When the expert exits a position, you too will exit it. Automatically. You can also change allocation at any time.</p>
          </div>
                  `
      },
      {
        name: 'What are the fees?',
        des:
          'We do not charge you any setup or maintenance fees, each trader gets a set precentage of the profit they make, make sure you check this percentage before copying any trader.'
      }

    ]
  }),
  head () {
    return {
      title: 'Copy Trading',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content:
            'Bitmain FX Copy Trading is both a product and a service. We cater to both the traders and investors. Being able to copy trades from several expert traders is a great service in and of itself.'
        }
      ]
    }
  }
}
</script>

<style >

.bg-copy {
background: linear-gradient(0deg, rgba(69, 1, 187, 0.699) 47%, rgba(131, 19, 223, 0.671) 87%),
  url("/assets/copy.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.overflow {
  width: 100vw;
  overflow: hidden;
}
</style>
