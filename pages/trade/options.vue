<template>
  <v-container fluid class="pa-0 overflow">
    <v-row justify="center" class="bg-options align-center px-md-16 px-4 py-16 primary ma-0">
      <v-col cols="12" class="text-center pl-md-10 my-6 mb-12">
        <div
          class=" text-h4 text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold"
        >
          Trade Binary Options
        </div>
        <div
          class="text-h6  white--text font-weight-light mt-5"
        >
          Trade Binary Options on the Bitmain FX platform and enjoy reliable pricing and exceptional execution
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
  name: 'BinaryOptions',
  scrollToTop: true,
  data: () => ({
    policies: [
      {
        name: '',
        delay: 500,
        description: `
        <p>One of the newest and most popular derivatives currently offered in the world of currency Mining is the binary option. Binary options are simple to trade and limit the risk of the trader’s investment to the amount of money paid to purchase the option. Today, more and more people are engaging in binary options Mining because it deals directly with the financial markets and offers high returns. There are a number of advantages that binary options Mining offers people who engage in it. The biggest draw is that it is very simple and offers large rewards.</p>
        <p>Mining in binary options is very simple and easy. The Mining process itself is a piece of cake. All you have to do is make a prediction on whether the asset will go up or nosedive. The next step is to enter the amount you want to spend on that trade and hit Send. Now all you have to do is track the trade</p>
        <p>The best thing about binary options Mining is that you do not necessarily have to trade high. You can start off with low investments till you get the hang of it. And even once you are good at it, you can continue to trade small. The returns may not be as high as if you trade big, but they are sufficient to get you to continue.</p>
        <p>Because you can engage in binary Mining with the least amount of money, the risks are also limited. Effectively, the degree of risk is for you to decide: you could go in with minimal risk or jump in with a big element of risk. One thing that works for you is that you know how much you will win or lose based on the amount you are betting or investing. This allows you to pick the amount and limit the amount of risk you expose yourself to. You take a calculated risk, and that can translate to big reward if all goes well.</p>
        <p>One area where binary options Mining differs from the standard financial Mining is in the amount of time a trade is valid for; the expire timeframes are shorter in this form of trading. Adding to this short time frame is the stupendously high returns involved with some trades; the returns could be as high as 90% if all goes well and luck is on your side. So imagine a trade that takes all of 15 minutes and gets you a return of 80%-90% – that is financial profit heaven. You trade quick, trade safe, and get good returns.</p>
        <p>The best thing about binary options Mining is that the fact of your winning is not dependent on prevalent marketing conditions. You can win regardless of whether the price of the asset you have put your money on is rising or falling. All you need to do is be aware of the different strategies that you can adopt. Adopting the right strategies can lead to you winning way more than what you ordinarily would have. Another way of maximizing wins is to track the financial markets; this allows you to be aware of when the prices are climbing skywards so you can sell and make your profits.</p>
        `
      }

    ]
  }),
  head () {
    return {
      title: 'Binary Options',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content:
            'Trade Binary Options on the Bitmain FX platform and enjoy reliable pricing and exceptional execution'
        }
      ]
    }
  }
}
</script>

<style >

.bg-options {
background: linear-gradient(0deg, rgba(25, 0, 68, 0.9) 47%, rgba(83, 2, 124, 0.9) 87%),
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
