<template>
  <v-container fluid>
    <v-row
      style="height:100vh"
      justify="center"
      align="center"
      class="bg-why py-16 white--text"
    >
      <v-col cols="12" md="9" class="text-center white--text">
        <p class="font-weight-light">
          WHY CHOOOSE Bitmain FX ?
        </p>
        <h4 class="text-h4 text-md-h2 font-weight-bold mb-4">
          Here's why millions of users trade and invest with us.
        </h4>
      </v-col>
    </v-row>
    <v-row justify="center" class="white primary--text py-16 px-4  px-md-10 ">
      <v-col
        v-for="service in services"
        :key="service.name"
        data-aos="fade-up"
        :data-aos-delay="service.delay"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        md="10"
      >
        <div class="text-h5 text-md-h4 font-weight-medium mb-4">
          {{ service.name }}
        </div>
        <p class="font-weight-light">
          {{ service.description }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'WhyUs',
  data: () => ({
    services: [
      {
        name: 'Simple',
        delay: 500,
        description:
          'Since 2013, Bitmain FX has consistently taken measures to ensure it\'s platform makes online Mining and investing accessible to anyone. By keeping a balance between giving easy access to beginners and improving upon important elements for more experienced Miners , Bitmain FX has solidified itself as the world’s leading social Mining platform. Bitmain FX offers both short-term options for day Miners  and long-term options for investors, such as our innovative CopyPortfolios™ – a fully managed thematic portfolio. We also acknowledge that different Miners  have different risk-appetites, and offer instruments varying from low to high risk. Our tools are easy to use, and we make all of the information on the platform accessible on both our web interface and in our mobile app. It is no wonder that more than 6 million people worldwide choose Bitmain FX as their preferred Mining platform.'
      },
      {
        name: 'Social',
        delay: 600,
        description:
          'Bitmain FX takes great pride in it\'s social Mining features, enabling it\'s clients to benefit from the collective wisdom of it\'s vast network of Miners . Our social newsfeed, CopyTrader™ system, and Popular Investor program utilise the full potential of our next-generation social Mining platform. With numerous successful Miners  using our platform to share their strategies, Bitmain FX clients have everything they need to pursue their financial goals.'
      },
      {
        name: 'Secure',
        delay: 700,
        description:
          'Bitmain FX takes every necessary precaution to keep it\'s client\'s personal information and funds safe and secure. We employ the highest standards of cyber security, while the client\'s funds are kept safe in tier 1 European banks.'
      },
      {
        name: 'Personal',
        delay: 800,
        description:
          'We are here to answer any question. Our customer service team is available 24/7, so you’ll have professional assistance whenever you need it. Additionally, we provide our clients with exclusive trader programs and frequent financial news updates.'
      },
      {
        name: 'Educational',
        delay: 900,
        description:
          'Bitmain FX offers a variety of Mining tools and courses, to give you everything you need to become an educated trader or long-term investor. One of our main goals is to promote financial literacy: Our courses offer a smooth entry point into the world of online traiding. We have also partnered with major financial institutions, such as Russia’s Sberbank and China’s Ping An Group, to promote online Mining and financial education in these markets.'
      },
      {
        name: 'Collaborative',
        delay: 1000,
        description:
          'Bitmain FX’s CopyTrader feature is a brilliant way to automate some of your Mining habits. By allocating some of your funds to copy the Mining actions of experienced Miners , you can benefit from their experience, and even expand your knowledge. Our CopyTrader feature and Popular Investor program are so effective, we’ve moulded them into a new financial instrument called CopyPortfolios™. These investment products use a sophisticated algorithm to aggregate the collective knowledge of our most successful Miners  into one fully managed portfolio you can invest in.'
      },
      {
        name: 'Transparency',
        delay: 1100,
        description:
          'The only way to make sure our clients get the full benefits of our social features and have all the information they need to use them, is by operating in full transparency. On Bitmain FX, each client who can be copied has their profile available for all other users to see, including valuable information such as past performance, gain, risk score, portfolio diversity and much more. Additionally, Bitmain FX has no hidden fees or commissions, and all payments are explained in a clear and simple manner.'
      }
    ]
  }),
  head () {
    return {
      title: 'Why Choose Bitmain FX',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content:
            'Since 2013, Bitmain FX has consistently taken measures to ensure it\'s platform makes online Mining and investing accessible to anyone. By keeping a balance between giving easy access to beginners and improving upon important elements for more experienced Miners , Bitmain FX has solidified itself as the world’s leading social Mining platform. Bitmain FX offers both short-term options for day Miners  and long-term options for investors, such as our innovative CopyPortfolios™ – a fully managed thematic portfolio. We also acknowledge that different Miners  have different risk-appetites, and offer instruments varying from low to high risk. Our tools are easy to use, and we make all of the information on the platform accessible on both our web interface and in our mobile app. It is no wonder that more than 6 million people worldwide choose Bitmain FX as their preferred Mining platform.'
        }
      ]
    }
  }
}
</script>

<style>
.bg-why {
  background: linear-gradient(rgba(1, 4, 66, 0.9), rgba(1, 4, 66, 0.9)),
    url("/bg/bg-2.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
