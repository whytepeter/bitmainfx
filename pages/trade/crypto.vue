<template>
  <v-container fluid class="pa-0 overflow">
    <v-row justify="center" class="bg-crypto align-center px-md-16 px-4 py-16 primary ma-0">
      <v-col cols="12" class="text-center pl-md-10 my-6 mb-12">
        <div
          class=" text-h4 text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold"
        >
          Trade Top Cryptocurrencies
        </div>
        <div
          class="text-h6  white--text font-weight-light mt-5"
        >
          Bitcoin, Ethereum, Ripple and other crypto assets at your disposal
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
        <div class="font-weight-light" v-html="policy.description" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Crypto',
  scrollToTop: true,
  data: () => ({
    policies: [
      {
        name: 'Build Your Cryptocurrency Mining Portfolio with Bitmain FX',
        delay: 500,
        description: `
        <p>Bitmain FX is excited to announce the launch of our new cryptocurrency Mining platform. Now you can start Mining Bitcoin, Ethereum and many more cryptocurrencies quickly, easily and safely from wherever you are — in just seconds. You get great margin Mining leverage and short sell options with fast deposits and withdrawals. Our support team is available 24/7/365 to help get you Mining on our CySEC-regulated platform with a Mining volume of US $11 billion monthly.</p>
        `
      },
      {
        name: 'What is a crypto currency',
        delay: 500,
        description: `
        <p>A cryptocurrency like bitcoin is a virtual currency traded peer-to-peer on a blockchain, independent of centralized authorities like banks and governments. Cryptocurrencies are entirely virtual, so they are not backed by physical commodities and have no intrinsic value.</p>
        `
      },
      {
        name: 'How Do Cryptocurrencies Work?',
        delay: 500,
        description: `
        <p>Primarily, cryptocurrencies rely on blockchain technology to complete a transaction via an intricate P2P network. Once a transfer request is entered into the network, it is validated by the network and added to a pool of other transactions to create a block of data for the ledger, which is then entered into the existing blockchain. Once the block is successfully added to the chain, the transaction is approved and completed.</p>
        
        `
      },
      {
        name: 'Are There Investment Opportunities with Cryptocurrencies?',
        delay: 500,
        description: `
        <p>Absolutely. Cryptocurrencies have become established investment commodities among major financial institutions and have even been adopted by countries such as Australia and Japan. As with any investment though, there are risks linked to market movements, high volatility and economics.</p>
        
        `
      }

    ]
  }),
  head () {
    return {
      title: 'Cryptocurrency',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content:
            'Bitmain FX is excited to announce the launch of our new cryptocurrency Mining platform. '
        }
      ]
    }
  }
}
</script>

<style >

.bg-crypto {
background: linear-gradient(0deg, rgba(49, 1, 131, 0.9) 47%, rgba(156,19,223, 0.9) 87%),
  url("/bg/dash.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.overflow {
  width:100vw;
  overflow: hidden;
}
</style>
