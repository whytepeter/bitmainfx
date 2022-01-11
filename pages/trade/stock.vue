<template>
  <v-container fluid class="pa-0 overflow">
    <v-row justify="center" class="bg-stock align-center px-md-16 px-4 py-16 primary ma-0">
      <v-col cols="12" class="text-center pl-md-10 my-6 mb-12">
        <div
          class=" text-h4 text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold"
        >
          Stocks for Your Portfolio
        </div>
        <div
          class="text-h6  white--text font-weight-light mt-5"
        >
          Trade stocks or make long-term investments on the same platform
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
  name: 'Stocks',
  scrollToTop: true,
  data: () => ({
    policies: [
      {
        name: 'What is CFD?',
        delay: 500,
        description: `
        <p>A CFD, or Contract for Difference, is a type of financial instrument that allows you to trade on the price movements of stocks, regardless of whether prices are rising or falling. The key advantage of a CFD is the opportunity to speculate on the price movements of an asset (upwards or downwards) without actually owning the underlying asset.</p>
        `
      },
      {
        name: 'What Are Stocks?',
        delay: 500,
        description: `
        <p>Stocks, also commonly referred to as equities or shares, are issued by a public corporation and put up for sale. Companies originally used stocks as a way of raising additional capital, and as a way to boost their business growth. When the company first puts these stocks up for sale, this is called the Initial Public Offering. Once this stage is complete, the shares themselves are then sold on the stock market, which is where any stock trading will occur.</p>
        <p>People occasionally confuse buying shares with physically owning a portion of that company as if this somehow gives them the right to walk into the company offices and begin exerting their ownership rights over computers or furniture. The law treats this type of corporation in a unique way; as it is treated as a legal person, the corporation, therefore, owns its own assets. This is referred to as the separation of ownership and control.</p>
        <p>The separation of these things is beneficial to both the shareholders and the corporation because it limits the liability for each party. For example, if a major shareholder were to go bankrupt, they cannot then sell assets belonging to the corporation to cover their debts and pay their creditors. This is the same in reverse; if a corporation you own shares in goes bankrupt and the judge orders them to sell all their assets, none of your own personal assets are at risk.</p>
        <p>One thing lies at the core of a stock’s value: it entitles shareholders to a portion of the company profits.</p>
        `
      },
      {
        name: 'How Do I Trade Stocks?',
        delay: 500,
        description: `
        <p>A stock market is where stocks are traded: where sellers and buyers come to agree on a price. Historically, stock exchanges existed in a physical location, and all transactions took place on the trading floor. One of the world’s most famous stock markets is the London Stock Exchange (LSE).</p>
        <p>Yet as technology progresses, so does the stock market. Now we are seeing the rise of virtual stock exchanges that are made up of large computer networks will all trades performed electronically.</p>
        <p>A company's shares can be traded on the stock market only following its IPO, making this a secondary market. The large businesses listed on global stock exchanges do not trade stocks on a frequent basis. Stocks can only be purchased from an existing shareholder, not directly from the company. This rule also applies in reverse, so when selling your shares, they go to another investor, not back to the corporation.</p>
        <p>The reason traders choose to invest in stock is because the perceived value of a company can vary greatly over time. Money can be made or lost; it depends on whether the trader’s perceptions of the stock value are in line with the market.</p>
        <p>Trying to predict the price movements of stocks in the short term is nearly impossible. Generally, stocks do tend to appreciate in value in the long term, so many investors choose to have a diverse portfolio of stocks that they intend to keep for a long time. Bigger companies pay dividends to their shareholders, which is a portion of the company’s profits. The value of the share itself will not impact the dividend.</p>
        <p>In order to trade stocks, there must be a seller and a buyer; as not all traders have the same agenda, stocks are bought and sold at different times and for different reasons. Someone may sell their stock for profit, others sell it in order to cut losses, and some because they believe the value of the stock is about to change either way.</p>
        
        `
      },
      {
        name: 'Stock Trading Risk Assessment',
        delay: 500,
        description: `
        <p>All forms of financial investment carry a level of risk, and stock trading is no different. Even traders with decades of experience cannot predict the correct price movements every single time.</p>
        <p>People use various strategies, but it is important to note that there is no such thing as a failsafe strategy. It is also advisable to limit the amount of money you invest in a single trade, as part of your own risk management.</p>
        
        `
      }

    ]
  }),
  head () {
    return {
      title: 'Stocks',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content:
            'Stocks, also commonly referred to as equities or shares, are issued by a public corporation and put up for sale. '
        }
      ]
    }
  }
}
</script>

<style >

.bg-stock {
background: rgb(1,131,125);
background: linear-gradient(0deg, rgba(1,131,125,0.8) 5%, rgba(0,10,74,0.8) 95%),
  url("/assets/stock.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.overflow {
  width:100vw;
  overflow: hidden;
}
</style>
