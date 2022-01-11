<template>
  <v-container fluid class="px-0">
    <v-row
      align="center"
      justify="center"
      class="primary darken-2 ma-0"
      style="height: 100vh"
    >
      <div class="bgv">
        <video poster="/bg/poster2.png" autoplay muted loop>
          <source src="/bg/video.mp4" type="video/mp4">
        </video>
        <div class="bgc" />
      </div>
      <v-col cols="12" class="up">
        <v-row justify="center" class="ma-0">
          <v-col cols="12" md="8" class="text-center">
            <div
              class=" text-h4 text-uppercase text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold"
            >
              Bitmain FX
            </div>
            <div
              class="opacity text-h6 text-md-h5 white--text mt-3 font-weight-light"
            >
              The most convenient Mining interface. We provides hydrogen crypto mining. Let us do the work, while you earn own rewards.
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-once="true"
              data-aos-easing="ease-in-out"
              class="mt-10"
            >
              <v-btn
                depressed
                to="/login"
                x-large
                color="secondary"
                class="icon-light-a opacity text-capitalize text-subtitle-2 white--text   px-10"
              >
                Login
              </v-btn>
              <v-btn
                to="/register"
                x-large
                depressed
                title
                color="white primary--text text--darken-2"
                class="icon-light opacity text-capitalize text-subtitle-2   ml-2 px-10"
              >
                Register
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters class="ma-0">
      <v-col cols="12" class="pa-0 trasnparent mt-n2">
        <div style="height: 40px; padding: 0px 0px; margin: 0px; width: 100%">
          <iframe
            src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=light&pref_coin_id=1505&invert_hover=no"
            width="100%"
            height="36px"
            scrolling="auto"
            marginwidth="0"
            marginheight="0"
            frameborder="0"
            border="0"
            style="border: 0; margin: 0; padding: 0 "
          />
        </div>
      </v-col>
    </v-row>
    <!-- Get Started start -->
    <v-row justify="center" class="white px-md-16 px-0 py-16 ma-0">
      <v-col
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        class="text-center font-weight-light"
      >
        <h2 class="text-h6 font-weight-bold secondary--text  text-md-h4 mb-4">
          Start Trading in 3 Steps
        </h2>
        <!--
        <p>
          Begin your journey to financial freedom. Make your money work for you.
        </p> -->
      </v-col>
      <v-col
        v-for="start in started"
        :key="start.name"
        data-aos="fade-up"
        :data-aos-delay="start.delay"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        sm="6"
        md="4"
        class="pa-0"
        color="transparent"
      >
        <v-card
          class="py-2 py-sm-6 mx-auto px-0"
          color="transparent "
          flat
        >
          <v-card-text class="px-0 d-flex align-center text1--text font-weight-light ">
            <div>
              <v-avatar tile size="110">
                <img :src="start.icon" max-width="100" alt="">
              </v-avatar>
            </div>
            <div class="d-flex flex-column  text-subtitle-1">
              <span class=" font-weight-medium text3--text text-subtitle-1 text-sm-h6">{{ start.name }}</span>
              <span class=" ">{{ start.description }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Get Started Section Ends -->
    <!-- Get Started start -->
    <v-row justify="center" class="align-center bg-gradient px-md-16 px-0 py-16 primary ma-0">
      <v-col cols="12" class="up">
        <v-row justify="center" class="ma-0 pl-md-10">
          <v-col cols="12" md="7" class="text-left text-sm-left pl-md-10">
            <div
              class=" text-h5 text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold"
            >
              Years of <b class="d-none d-sm-block" /> impeccable service
            </div>
            <div
              style="font-size:17px"
              class=" text-sm-h5 indigo--text text--lighten-3 mt-5 font-weight-light"
            >
              Bitmain FX  has been one of the world’s leading online brokers since 2013. Our developers, financial experts, personal, and support managers are making every effort to make your trading more comfortable, secured and profitable year after year.
            </div>
          </v-col>
          <v-col
            data-aos="fade-left"
            data-aos-delay="700"
            data-aos-once="true"
            data-aos-easing="ease-in-out"
            class=" pr-md-10 mt-6"
            cols="12"
            md="5"
          >
            <v-card flat rounded="lg">
              <v-card-text class="px-0">
                <youtube width="100%" :video-id="videoId" :player-vars="playerVars" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- Get Started Section Ends -->
    <v-row justify="center" class="white px-md-16 py-16 ma-0 mx-md-16">
      <v-col
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        class="text-center font-weight-light"
      >
        <h2 class="text-h5 font-weight-bold text2--text  text-md-h3 mb-2">
          Why We Are The Best
        </h2>
        <!--
        <p>
          Begin your journey to financial freedom. Make your money work for you.
        </p> -->
      </v-col>
      <v-col
        v-for="why in whys"
        :key="why.name"
        data-aos="fade-up"
        :data-aos-delay="why.delay"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        class="pa-0"
        sm="6"
        color="transparent"
      >
        <v-card
          class=" mx-auto"
          color="transparent "
          flat
        >
          <v-card-text class="d-flex align-center text1--text font-weight-light ">
            <div>
              <v-avatar tile size="110">
                <img :src="why.icon" max-width="100" alt="">
              </v-avatar>
            </div>
            <div class="d-flex flex-column  text-subtitle-1">
              <span class=" font-weight-medium text3--text">{{ why.name }}</span>
              <span>{{ why.description }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="align-center px-md-16 px-4 py-16 primary ma-0 ">
      <v-col
        data-aos="fade-right"
        data-aos-delay="700"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        class=" pr-md-10 my-4 "
        cols="12"
        md="6"
      >
        <v-card class="transparent mt-n14" flat :max-height="$vuetify.breakpoint.xsOnly ? 300 : 400">
          <v-card-text>
            <v-img :height="$vuetify.breakpoint.xsOnly ? 300 : 400" src="/assets/Risk.png" contain />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class=" my-4 text-center text-sm-left pl-md-10">
        <div
          class=" text-h5 text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold"
        >
          Risk Management
        </div>
        <div
          style="font-size:17px"
          class="  text-md-h5 indigo--text text--lighten-3 mt-3 font-weight-light"
        >
          Strategies with features like Copy Trading Option, Stop Loss/Take Profit, Negative balance protection and Trailing Stop, you can manage your losses and profits at the extreme minimum levels predetermined by you.
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" class="white px-md-16  py-16 ma-0">
      <v-col
        v-for="info in infos"
        :key="info.name"
        data-aos="fade-up"
        :data-aos-delay="info.delay"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        sm="6"
        md="4"
        class="pa-0"
        color="transparent"
      >
        <v-card
          class="py-6 mx-auto"
          color="transparent "
          flat
        >
          <v-card-text class="d-flex align-center text1--text font-weight-light ">
            <div>
              <v-avatar tile size="110">
                <img :src="info.icon" max-width="100" alt="">
              </v-avatar>
            </div>
            <div class="d-flex flex-column  text-subtitle-1">
              <span class=" font-weight-medium text3--text">{{ info.name }}</span>
              <span>{{ info.description }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="align-center px-md-16 px-4 py-16 primary ma-0 ">
      <v-col
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        md="8"
        class="text-left font-weight-light mb-4"
      >
        <h2 class="text-h6 font-weight-bold white--text  text-md-h3 mb-2">
          Smooth Experience on Any Device
        </h2>

        <!-- <p style="font-size:17px" class="indigo--text text--lighten-4">
          Our services combine all the key aspects of efficient cryptocurrency mining: creating highly efficient data centers for users of an ecological mining system using hydrogen and solar panels.
        </p>
        <p style="font-size:17px" class="indigo--text text--lighten-4">
          We have selected for you the high-quality equipment, with the help of which cloud mining on our service will provide you the opportunity to multiply your income with passive profit.
        </p> -->
      </v-col>

      <v-col
        data-aos="fade-right"
        data-aos-delay="700"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        class=" pr-md-10 my-4 "
        cols="12"
        md="6"
      >
        <v-card class="transparent mt-n14" flat :max-height="$vuetify.breakpoint.xsOnly ? 300 : 500">
          <v-card-text>
            <v-img :height="$vuetify.breakpoint.xsOnly ? 300 : 500" src="/assets/Coindextrading.png" contain />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class=" my-4 text-left text-md-left pl-md-10">
        <!-- <div
          class=" text-h4 text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold"
        >
          Risk Management
        </div> -->
        <div
          style="font-size:17px"
          class="  text-subtitle-1 indigo--text text--lighten-4 mt-3 "
        >
          <p style="font-size:17px" class="text-md-h5 font-weight-light">
            Considering all nuances of working with cryptocurrency, we took care of reliable security and confidentiality for our clients.
          </p>

          <p style="font-size:17px" class="text-md-h5 font-weight-light">
            Having been in the crypto world for a long time, we managed to provide safe and most importantly ecological mining using hydrogen and solar panels.
          </p>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" class="white align-center px-md-16 px-4 py-16 ma-0 ">
      <v-col cols="12" md="8">
        <v-row class="ma-0">
          <v-col
            v-for="profile in profiles"
            :key="profile.name"
            data-aos="fade-up"
            :data-aos-delay="profile.delay"
            data-aos-once="true"
            data-aos-easing="ease-in-out"
            cols="12"
            sm="6"
            class="py-0"
            color="transparent"
          >
            <v-card
              class="py-6 mx-auto"
              color="transparent "
              flat
            >
              <v-card-text class="d-flex flex-column align-center text1--text font-weight-light ">
                <div class="my-2">
                  <v-avatar size="140">
                    <img :src="profile.icon" max-width="100" alt="">
                  </v-avatar>
                </div>
                <div class="d-flex flex-column text-center align-center  text-subtitle-1">
                  <span class=" font-weight-medium text3--text">{{ profile.name }}</span>
                  <span>{{ profile.description }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        data-aos="fade-up"
        :data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        md="4"
        class="pa-0"
        color="transparent"
      >
        <v-card
          elevation="10"
          max-width="350"
          class="py-6 mx-auto"
          color="transparent "
        >
          <v-card-text class="d-flex flex-column align-center text1--text font-weight-light ">
            <div class="my-2 mb-4">
              <v-avatar size="300">
                <img src="/assets/Deposits.png" max-width="100" alt="">
              </v-avatar>
            </div>
            <div style="width:100%">
              <div v-for="stat in stats" :key="stat.name" style="width:100%" class="d-flex align-center my-1">
                <span :class="stat.color" class="pa-2 rounded" />
                <span class="text-subtitle-1 ml-2">{{ stat.name }}</span>
                <v-spacer />
                <span class="text-subtitle-1">{{ stat.amount }}</span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="align-center px-md-16 px-4 py-16 primary ma-0 ">
      <v-col
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        class="text-center font-weight-light mb-4"
      >
        <h2 class="text-h6 font-weight-bold white--text  text-md-h3 mb-2">
          Pricing
        </h2>
        <!--
        <p class="indigo--text text--lighten-4">
          Whether you prefer trading at your desk or on the go — Bitmain FX has got you covered. The custom-built platform has been adapted for any device you may choose and switching is 100% seamless.
        </p> -->
      </v-col>

      <v-col
        v-for="plan in plans"
        :key="plan.name"
        :data-aos-delay="plan.delay"
        data-aos-once="true"
        data-aos="fade-up"
        data-aos-easing="ease-in-out"
        cols="12"
        sm="6"
        md="3"
        class="py-0 my-2"
        color="transparent"
      >
        <v-card
          class="py-4 mx-auto"
          color="white"
          max-width="270"
          max-height="400"
          flat
        >
          <v-card-text class="d-flex flex-column align-center text-center text3--text ">
            <div class="text-h6 text-uppercase">
              {{ plan.name }}
            </div>
            <div v-if="plan.amount !== '0'" class="my-6 d-flex flex-column">
              <span class="secondary--text text-h4 font-weight-bold">{{ plan.amount }}</span>
              <span class="text-subtitle-1">minimum</span>
            </div>
            <div v-else class="my-5 px-8">
              <v-text-field
                v-model="amount"
                name="amount"
                type="text"
                outlined
                class="text-subtitle-1 mx-1 font-weight-light"
                color="secondary"
                placeholder="Amount"
                required
              />
            </div>
            <v-btn to="/dashboard" large outlined color="secondary" class="mb-8">
              Purchase Plan
            </v-btn>
            <div>{{ plan.review }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="ma-0">
      <v-fab-transition>
        <v-btn
          color="redbg"
          dark
          fixed
          bottom
          target="_blank"
          class="mt-n4"
          left
          href="mailto:info@Bitmain FX.online"
          fab
        >
          <v-icon>
            mdi-email
          </v-icon>
        </v-btn>
      </v-fab-transition>
    </v-row>
  </v-container>
</template>

<script>
export default {
  scrollToTop: true,
  filters: {
    currency (val) {
      if (val) {
        return val.toLocaleString()
      } else {
      }
    }
  },

  data: () => ({
    activenow: true,
    amount: 200000,
    videoId: 'Ud-Q5VIQWkw',
    playerVars: {
      autoplay: 1
    },
    plans: [
      {
        delay: 500,
        name: 'Basic',
        amount: '$500.00',
        review: '5 stars, based on 29418 reviews'
      },
      {
        delay: 600,
        name: 'Standard',
        amount: '$3,000.00',
        review: '4.88 stars, based on 11236 reviews'
      },
      {
        delay: 700,
        name: 'Premium',
        amount: '$10,000.00',
        review: '4.88 stars, based on 996 reviews'
      },
      {
        delay: 800,
        name: 'Customize Unlimited',
        amount: '0',
        review: '4.5 stars, based on 11246 reviews'
      }

    ],
    profiles: [
      {
        name: 'Lenna Graham',
        description: 'Easy to use, risk-free trading platform that increases ones earning potential.',
        icon: '/assets/T1.jpeg',
        delay: 500
      },
      {
        name: 'Malcolm Brakus',
        description: 'The Bitmain FX team provided a lot of helpful advice when I asked about trading strategies.',
        icon: '/assets/T2.jpeg',
        delay: 600
      },
      {
        name: 'Mason Christiansen',
        description: 'I tripled the bitcoin in my wallet with this service in just 7 days.',
        icon: '/assets/T3.jpeg',
        delay: 700
      },
      {
        name: 'Katarina Hill',
        description: 'Very simple and secure method to make a bit of interest to your investments',
        icon: '/assets/T4.jpeg',
        delay: 800
      },
      {
        name: 'Linda Howes',
        description: 'Bitmain FX has allowed me to trade and sell more often without being concerned with large fees.',
        icon: '/assets/T5.jpeg',
        delay: 900
      },
      {
        name: 'Fredrick Bussman',
        description: 'I am extremely pleased with the Bitmain FX platform, in terms of ease and speed of use and reliability.',
        icon: '/assets/T6.jpeg',
        delay: 1000
      }
    ],
    started: [
      {
        name: '1. Register Now',
        description: 'You will immediately have access to your trading account and all tools you need for successful trading.',
        icon: '/icon/register.png',
        delay: 500
      },
      {
        name: '2. Fund Your Account',
        description: 'Fund your account with $500.00 deposit. You can fund an account right after signup.',
        icon: '/icon/fund.png',
        delay: 600
      },
      {
        name: '3. Trade or Copy Experts',
        description: 'Trade by yourself independently or Copy Expert Trade’s with new advance trading strategies.',
        icon: '/icon/trade.png',
        delay: 700
      }
    ],
    infos: [
      {
        name: 'FAST WITHDRAWALS',
        description: 'Withdrawal requests process instantly. You can make as many requests as you want everyday and without a minimum or limits.',
        icon: '/icon/fund.png',
        delay: 500
      },
      {
        name: 'FRIENDLY INTERFACE',
        description: 'Whether you are a beginner or a professional in the online investment field, we are sure that you will find our platform easy to use.',
        icon: '/icon/binary.png',
        delay: 600
      },
      {
        name: '24/7 SUPPORT',
        description: 'We provide unbeatable support service through ticket system and email to cater your needs and give a professional, fast and effectively response',
        icon: '/icon/support.png',
        delay: 700
      }
    ],
    whys: [
      {
        name: 'Forex',
        description: 'Explore and trade major, minor and exotic currency pairs with efficient spreads',
        icon: '/icon/forex.png',
        delay: 500
      },
      {
        name: 'CFD Stocks',
        description: 'Trade CFDs on stocks of leading companies and industry giants.',
        icon: '/icon/stock.png',
        delay: 600
      },
      {
        name: 'Cryptocurrencies',
        description: 'Trade CFDs on popular digital/crypto currencies with leverage.',
        icon: '/icon/crypto.png',
        delay: 700
      },
      {
        name: 'Copy Experts',
        description: 'Select expert trader and automatically copy trades with secured trading strategies.',
        icon: '/icon/copy.png',
        delay: 800
      },
      {
        name: 'Binary Options',
        description: 'One of the advantages of trading options is that you are not trading an actual asset',
        icon: '/icon/binary.png',
        delay: 900
      }
    ],

    stats: [
      {
        color: 'secondary lighten-3',
        name: 'Susan Brantley',
        amount: '$55,658.00'
      },
      {
        color: 'indigo lighten-1',
        name: 'ANN NICHOLESON',
        amount: '$47,254.00'
      },
      {
        color: 'secondary lighten-1',
        name: 'Tana Habibis',
        amount: '$38,524.00'
      },
      {
        color: 'indigo lighten-3',
        name: 'Deana Shufford',
        amount: '$33,542.00'
      },
      {
        color: 'indigo lighten-3',
        name: 'Donjsai MCcleod',
        amount: '$17,896.00'
      },
      {
        color: 'secondary lighten-1',
        name: 'Ann Nicholon',
        amount: '$30,432.00'
      },
      {
        color: 'secondary lighten-1',
        name: 'Daniela Lewis',
        amount: '$24,580.00'
      },
      {
        color: 'secondary darken-2',
        name: 'Jimil Martin',
        amount: '$67,000.00'
      },
      {
        color: 'accent lighten-1',
        name: 'Hann Nicholeson',
        amount: '$42,000.00'
      },
      {
        color: 'secondary lighten-1',
        name: 'Donjsai MCcleod',
        amount: '$42,856.00'
      },
      {
        color: 'secondary lighten-1',
        name: 'Jack DuPont',
        amount: '$52,000.00'
      },
      {
        color: 'secondary lighten-1',
        name: 'TIM BAKER',
        amount: '$76,098.00'
      },
      {
        color: 'indigo lighten-2',
        name: 'Patricia Taylor',
        amount: '$52,000.00'
      },
      {
        color: 'indigo lighten-2',
        name: 'Mabel modelen',
        amount: '$38,000.00'
      },
      {
        color: 'accent lighten-3',
        name: 'LAYLA',
        amount: '$45,000.00'
      },
      {
        color: 'secondary darken-2',
        name: 'Briana Smith',
        amount: '$31,000.00'
      },
      {
        color: 'indigo lighten-1',
        name: 'Martin Jimil Davon',
        amount: '$21,897.00'
      }

    ],

    awards: [
      'award_1.png',
      'award_2.png',
      'award_3.png',
      'award_5.png',
      'award_7.png',
      'award_8.png',
      'award_9.png',
      'award_11.png',
      'award_12.png',
      'award_14.png',
      'award_15.png'
    ]
  }),
  computed: {
    activeUser () {
      const users = 1868365
      return Math.floor(Math.random() * users) + 268365
    }
  },

  head () {
    return {
      title: 'Home',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content:
            "Bitmain FX strives to be worthy of our client's trust by providing them with services which are economically beneficial to them and to create awareness regarding reliable and highly profitable investment platform among our clients around the globe. All you need to do is sit back and enjoy how your profit grows on a daily"
        },

        {
          hid: 'og:description',
          property: 'og:description',
          content:
            "Bitmain FX strives to be worthy of our client's trust by providing them with services which are economically beneficial to them and to create awareness regarding reliable and highly profitable investment platform among our clients around the globe. All you need to do is sit back and enjoy how your profit grows on a daily"
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/Bitmain FX.png'
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: '/Bitmain FX.png'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Bitmain FX'
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary_large_image'
        }

      ],

      script: [
        {
          src: 'https://apps.elfsight.com/p/platform.js'
        },
        {
          src:
            '//code.tidio.co/lljsbyqeamlncjekrrk8iqgzvakct10y.js'
        }

      ],
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css'
        }
      ]
    }
  }
}
</script>
<style scoped>

.rotate {
  transform: rotate(190deg);
}
.up {
  z-index: 2;
}
.bgv {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 1;
}
.bgc {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(2, 42, 175, 0.5), rgba(1, 5, 63, 0.3)),
    url("/bg/video.mp4");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.bgv video {
  min-width: 100%;
  min-height: 100%;
}

.bg-gradient {
 background: rgb(0,0,0);
background: linear-gradient(48deg, rgba(0,0,0,1) 47%, rgba(22,0,79,1) 63%, rgba(77,19,223,1) 76%, rgba(167,9,132,1) 89%, rgba(17,0,60,1) 100%);
backdrop-filter: blur(5px);
 background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.bg-poster {
  background: linear-gradient(rgba(1, 5, 63, 0.6), rgba(1, 5, 63, 0.6)),
    url("/bg/poster2.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.bg-poster2 {
  background: linear-gradient(rgba(0, 5, 70, 0.7), rgba(0, 5, 70, 0.7)),
    url("/bg/poster2.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.bg-home {
  background: linear-gradient(rgba(11, 12, 34, 0.856), rgba(11, 12, 34, 0.7)),
    url("/bg/bg-1.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.bg2 {
  background: linear-gradient(rgba(0, 6, 110, 0.856), rgba(0, 6, 110, 0.7)),
    url("/bg/bg-1.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.redbg {
  background: linear-gradient(rgba(209, 4, 49, 0.856), rgba(255, 2, 2, 0.7))
}
</style>
