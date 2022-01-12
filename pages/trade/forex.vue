<template>
  <v-container fluid class="pa-0 overflow">
    <v-row justify="center" class="bg-forex align-center px-md-16 px-4 py-16 primary ma-0">
      <v-col cols="12" class="text-center pl-md-10 my-6 mb-12">
        <div
          class=" text-h4 text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold"
        >
          Trade Forex
        </div>
        <div
          class="text-h6  white--text font-weight-light mt-5"
        >
          Trade forex on the Bitmain FX platform and enjoy reliable pricing and exceptional execution
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" class="white text2--text py-16 px-4  px-md-10 ">
      <v-col
        v-for="policy in policies"
        :key="policy.name"
        data-aos="fade-up"
        :data-aos-delay="policy.delay"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        md="10"
        class="mb-6"
      >
        <div class="text-h5 text-md-h3 font-weight-light mb-4">
          {{ policy.name }}
        </div>
        <div class="font-weight-light " v-html="policy.description" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Forex',
  scrollToTop: true,
  data: () => ({
    policies: [
      {
        name: 'What is Forex?',
        delay: 500,
        description: `
        <Forex>Forex is short for foreign exchange. The forex market is a place where currencies are traded. It is the largest and most liquid financial market in the world with an average daily turnover of 6.6 trillion U.S. dollars as of 2019. The basis of the forex market is the fluctuations of exchange rates. Forex Miners  speculate on the price fluctuations of currency pairs, making money on the difference between buying and selling prices.</p>
        `
      },
      {
        name: 'What is Margin?',
        delay: 500,
        description: `
        <p>Margin is the amount of a trader’s funds required to open a new position. Margin is estimated based on the size of your trade, which is measured in lots. A standard lot is 100,000 units. We also provide mini lots (10,000 units), micro lots (1,000 units) and nano lots (100 units). The greater the lot, the bigger the margin amount. Margin allows you to trade with leverage, which, in turn, allows you to place trades larger than the amount of your Mining capital. Leverage influences the margin amount too.</p>
        `
      },
      {
        name: 'What is leverage?',
        delay: 500,
        description: `
        <p>Leverage is the ability to trade positions larger than the amount of capital you possess. This mechanism allows Miners  to use extra funds from a broker in order to increase the size of their trades. For example, 1:100 leverage means that a trader who has deposited $1,000 into his or her account can trade with $100,000. Although leverage lets Miners  increase their trade size and, consequently, potential gains, it magnifies their potential losses putting their capital at risk.</p>
        
        `
      },
      {
        name: 'When is the forex market open?',
        delay: 500,
        description: `
        <p>Due to different time zones, the international forex market is open 24 hours a day — from 5 p.m. Eastern Standard Time (EST) on Sunday to 4 p.m. EST on Friday, except holidays. Markets first open in Australasia, then in Europe and afterwards in North America. So, when the market closes in Australia, Miners  can have access to markets in other regions. The 24-hour availability of the forex market is what makes it so attractive to millions of Miners .</p>
        
        `
      }

    ]
  }),
  head () {
    return {
      title: 'Forex',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content:
            'Forex is short for foreign exchange. The forex market is a place where currencies are traded. It is the largest and most liquid financial market in the world with an average daily turnover of 6.6 trillion U.S. dollars as of 2019. '
        }
      ]
    }
  }
}
</script>

<style>
.bg-forex {
  background: linear-gradient(rgba(0, 149, 255, 0.6), rgba(0, 149, 255, 0.6)),
    url("/assets/bgcash.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.overflow {
  width:100vw;
  overflow: hidden;
}
</style>
