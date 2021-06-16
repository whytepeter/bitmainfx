<template>
  <v-container fluid class="primary">
    <v-row align="center" justify="center" class="primary" style="height: 100vh">
      <div class="bgv">
        <video poster="/bg/poster.png" autoplay muted loop>
          <source src="/bg/Blockchain.mp4" type="video/mp4">
        </video>
        <div class="bgc" />
      </div>
      <v-col cols="12" class="up">
        <v-row justify="center">
          <v-col cols="12" md="10" class="text-center">
            <div class=" text-h4 text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold">
              The Most Trusted Online Investment Platform Since 2019
            </div>
            <div class="opacity text-subtitle-1 text-md-h6 white--text mt-3 font-weight-light">
              The most convenient trading interface. Instant access to more than 100 assets of the world's leading companies.
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-once="true"
              data-aos-easing="ease-in-out"
              class="mt-10"
            >
              <v-btn to="/login" x-large color="accent" class="icon-light-a opacity text-capitalize text-subtitle-2 primary--text rounded-tr-lg rounded-bl-lg  px-10">
                Login
              </v-btn>
              <v-btn
                to="/register"
                x-large

                title
                color="secondary"
                class="icon-light opacity text-capitalize text-subtitle-2  rounded-tr-lg rounded-bl-lg  ml-2 px-10"
              >
                Register
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row color="red" class="py-0">
      <v-col cols="12" class="px-0 my-0">
        <div style="height:62px; background-color: #FFFFFF; overflow:hidden; box-sizing: border-box; border: 1px solid #56667F; border-radius: 4px; text-align: right; line-height:14px; block-size:62px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #56667F;padding:1px;padding: 0px; margin: 0px; width: 100%;">
          <div style="height:62px; background-color: #1D2330; overflow:hidden; box-sizing: border-box; border: 1px solid #282E3B; border-radius: 4px; text-align: right; line-height:14px; block-size:62px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #262B38;padding:1px;padding: 0px; margin: 0px; width: 100%;">
            <div style="height:40px; padding:0px; margin:0px; width: 100%;">
              <iframe
                src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=no"
                width="100%"
                height="36px"
                scrolling="auto"
                marginwidth="0"
                marginheight="0"
                frameborder="0"
                border="0"
                style="border:0;margin:0;padding:0;"
              />
            </div><div style="color: #626B7F; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;">
              <a href="https://coinlib.io" target="_blank" style="font-weight: 500; color: #626B7F; text-decoration:none; font-size:11px">Cryptocurrency Prices</a>&nbsp;by Coinlib
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" class=" white py-6 px-6 primary--text">
      <v-col cols="12" sm="6" md="4" class=" py-6 showcase primary--text text-center d-flex flex-column justify-center">
        <div class="text-subtitle-1 font-weight-medium text-uppercase">
          Supported Countries
        </div>
        <div class="text-h5 font-weight-light d-flex justify-center align-center">
          <v-icon small color="accent" class="pr-2">
            mdi-flag
          </v-icon>
          <span> 127</span>
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="4" class=" py-6 showcase primary--text text-center d-flex flex-column justify-center">
        <div class="text-subtitle-1 font-weight-medium text-uppercase">
          24H Volume
        </div>
        <div class="text-h5 font-weight-light d-flex justify-center align-center">
          <v-icon small class="pr-2" color="info" :class="[activenow ? 'animate__animated animate__fadeInUp' : 'animate__animated animate__fadeOutUp']">
            mdi-arrow-up-bold-circle
          </v-icon>
          {{ volume | currency }} BTC
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="4" class=" py-6 showcase primary--text text-center d-flex flex-column justify-center">
        <div class=" text-subtitle-1 font-weight-medium text-uppercase" @click="activenow = !activenow">
          ACTIVE TRADERS
        </div>
        <div class="text-h5 font-weight-light d-flex justify-center align-center">
          <v-icon small color="success" class="pr-2" :class="[activenow ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut']">
            mdi-album
          </v-icon>
          {{ activeUser | currency }}
        </div>
      </v-col>
    </v-row>
    <v-row id="packages" justify="center" class="bg-poster primary py-16 px-6 white--text">
      <v-col cols="12" class="text-center mb-6 opacity">
        <div class="text-h4 text-capitalize font-weight-bold">
          Our Investment Packages
        </div>
        <div class="text-h6 mt-2 font-weight-light opacity">
          Different kind of packages that will fit your investment budget
        </div>
      </v-col>
      <v-col
        v-for="plan in plans"
        :key="plan.name"
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        md="4"
        sm="6"
        class="flex-wrap justify-center align-center mx-auto"
      >
        <div class="hoverCard  rounded-tr-lg rounded-bl-lg mx-auto">
          <v-card
            max-width="400"
            tile
            flat
            color="transparent white--text"
            class="py-10 mx-auto"
          >
            <v-card-title style="border-bottom: 2px solid #29b6f6" class="justify-center font-weight-bold ">
              {{ plan.name }} Package
            </v-card-title>

            <v-divider />
            <v-card-text>
              <v-row>
                <v-col cols="12" class="text-center white--text">
                  <div>
                    <span class="opacity mr-1">Minimum Capital</span>
                    <span class="font-weight-medium ">${{ plan.minimum | currency }}</span>
                  </div>
                  <div>
                    <span class="opacity mr-1">Maximum Capital</span>
                    <span class="font-weight-medium ">${{ plan.maximum | currency }}</span>
                  </div>
                  <div class="text-h6">
                    <span class="opacity mr-1 font-weight-medium accent--text">ROI</span>
                    <span class="font-weight-medium  accent--text">{{ plan.roi }}%</span>
                  </div>
                </v-col>

                <v-col cols="12" class="text-center">
                  <v-btn
                    :to="plan.to"
                    large
                    depressed
                    dark

                    color="secondary"
                    class="icon-light opacity px-10 rounded-tr-lg rounded-bl-lg text-capitalize btn-hover"
                  >
                    Get Started
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div style="height:560px; background-color: #1D2330; overflow:hidden; box-sizing: border-box; border: 1px solid #282E3B; border-radius: 4px; text-align: right; line-height:14px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #262B38;padding:1px;padding: 0px; margin: 0px; width: 100%;">
          <div style="height:540px; padding:0px; margin:0px; width: 100%;">
            <iframe
              src="https://widget.coinlib.io/widget?type=chart&theme=dark&coin_id=859&pref_coin_id=1505"
              width="100%"
              height="536px"
              scrolling="auto"
              marginwidth="0"
              marginheight="0"
              frameborder="0"
              border="0"
              style="border:0;margin:0;padding:0;line-height:14px;"
            />
          </div><div style="color: #626B7F; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;">
            <a href="https://coinlib.io" target="_blank" style="font-weight: 500; color: #626B7F; text-decoration:none; font-size:11px">Cryptocurrency Prices</a>&nbsp;by Coinlib
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row id="services" style="min-height: 100vh" class="primary py-16 px-6  bgservice">
      <v-col cols="12" class="text-center mb-4">
        <div class="text-h5 text-md-h4 white--text text-capitalize font-weight-bold">
          Reasons We Are Trending
        </div>
      </v-col>
      <v-col
        v-for="service in services"
        :key="service.title"
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        md="6"
      >
        <v-list dark three-line color="transparent">
          <v-list-item class="d-flex flex-column flex-md-row text-center text-md-left ">
            <v-list-item-icon class="mx-auto mx-md-2">
              <div class="icon-btn icon-light pa-3">
                <v-icon color="secondary" size="64">
                  {{ service.icon }}
                </v-icon>
              </div>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="headline mb-4 mb-md-1">
                {{ service.title }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-subtitle-1 opacity white--text">
                {{ service.description }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row id="about" justify="center" class="priamry py-16 px-6 white--text bg-join">
      <v-col cols="12" class="text-center text-h4 text-capitalize font-weight-bold mb-2">
        Trusted
      </v-col>
      <v-col cols="12" md="10" class=" mb-4 text-center">
        <span class="accent--text font-weight-bold text-uppercase">Bitmain FX
          }</span><span class="opacity"> has been in existence since 2019 and we are going stronger and bigger on daily basis because it was founded with patriotic and sincere mind.
          The founder’s primary aim is to eliminate poverty and ensure ultimate financial freedom to raise the standard of living of the common people in our society.
        </span>
      </v-col>
      <v-col cols="12" class="d-flex flex-wrap justify-center align-center">
        <div
          data-aos="fade-right"
          data-aos-delay="500"
          data-aos-once="true"
          data-aos-easing="ease-in-out"
          class="mx-4 my-4"
        >
          <div class="text-h2 font-weight-medium text-center mb-2 text-capitalize">
            10K +
          </div>
          <div class="opacity-h">
            Investors trust our plaform
          </div>
        </div>
        <div
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-once="true"
          data-aos-easing="ease-in-out"
          class="mx-4 my-4"
        >
          <div class="text-h2 font-weight-medium text-center mb-2 text-capitalize">
            100 +
          </div>
          <div class="opacity-h">
            Join us every month
          </div>
        </div>
      </v-col>
      <v-col cols="12" class=" mb-4 mt-4 text-center d-none d-sm-flex justify-center">
        <v-btn
          data-aos="fade-up"
          data-aos-delay="700"
          data-aos-once="true"
          data-aos-easing="ease-in-out"

          large
          depressed
          color="accent  primary--text"
          to="/dashboard"
          class="icon-light-a opacity text-subtitle-2 primary--text rounded-tr-lg rounded-bl-lg  px-10"
        >
          Get Started Now
        </v-btn>
      </v-col>
      <v-col cols="12" class=" mb-4 mt-4 text-center d-flex d-sm-none justify-center">
        <v-btn
          large
          depressed
          class="icon-light-a opacity rounded-tr-lg rounded-bl-lg"
          color="secondary primary--text"
          to="/dashboard"
        >
          Get Started Now
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="primary py-16 px-6 bgstrade">
      <v-col cols="12" class="text-center bgt mb-4">
        <div class="white--text text-h5 text-md-h4 text-capitalize font-weight-bold">
          Auto Trading System For Any Device
        </div>
      </v-col>
      <v-col cols="12" class="px-0 ma-0">
        <v-img
          :src="'/bg/autotrade.gif'"
          aspect-ratio="1.7"
          contain
        />
      </v-col>
    </v-row>
    <v-row justify="center" class="white py-16  px-6">
      <v-col cols="12" class="text-center mb-2">
        <div class="primary--text opacity text-h4 text-capitalize font-weight-bold">
          Happy Investors
        </div>
      </v-col>
      <v-col cols="12" md="10" class=" mb-4 text-center opacity-h mb-4">
        Feedback From Our Investors
      </v-col>
      <v-col cols="12" md="8">
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(investor, i) in investors"
            :key="i"
          >
            <v-sheet
              light
              height="100%"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <v-list light three-line>
                  <v-list-item class="d-flex flex-column text-center  ">
                    <v-list-item-avatar size="74" class="mx-auto">
                      <v-img :src="investor.avatar" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-4">
                        {{ investor.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-subtitle-1">
                        {{ investor.story }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <v-row justify="center" class="bg-dash primary py-16  px-6">
      <v-col cols="12" class="white--text text-center text-h5 text-md-h4 text-capitalize font-weight-bold mb-2">
        Invite Your Friends And Earn Together!
      </v-col>
      <v-col cols="12" md="10" class=" white--text mb-4 text-center">
        <span class="opacity"> 3 types of partnership programs. Regular payments. Lots of promo materials.
        </span>
      </v-col>

      <v-col
        v-for="ref in refers"
        :key="ref.title"
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        md="4"
        sm="6"
        class="mb-4"
      >
        <div class="icon-light rounded" style="border: 1px solid #29b6f6;">
          <v-card color="transparent" flat>
            <v-list-item two-line class="d-flex flex-column flex-md-row text-center text-md-left">
              <v-list-item-icon class="mx-auto mx-md-0 mr-md-2">
                <div class="icon-btn icon-light pa-3">
                  <v-icon size="64" color="secondary">
                    {{ ref.icon }}
                  </v-icon>
                </div>
              </v-list-item-icon>
              <v-list-item-content>
                <div class="headline white--text">
                  {{ ref.title }}
                </div>
              </v-list-item-content>
            </v-list-item>

            <v-card-text class="mt-n12 mt-md-0 text-center white--text text-md-left">
              {{ ref.description }}
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" class="mb-6 mt-2 text-center justify-center opacity">
        <v-btn to="/dashboard/support" x-large color="accent" class="icon-light-a opacity text-capitalize text-subtitle-2 primary--text rounded-tr-lg rounded-bl-lg mb-4 mb-sm-0">
          Become Affiliate
        </v-btn>
        <v-btn
          to="/dashboard/support"
          x-large

          title
          color="secondary"
          class="icon-light opacity text-subtitle-2  rounded-tr-lg rounded-bl-lg  ml-4"
        >
          Contact Support
        </v-btn>
      </v-col>
    </v-row>
    </v-row>
    <v-row justify="center" class="white py-16  px-6">
      <v-col cols="12" class="text-center mb-4">
        <div class="primary--text opacity text-h5 text-md-h4  font-weight-bold">
          More Than 4 Payment Methods
        </div>
      </v-col>
      <v-col cols="12" class="d-flex d-sm-none flex-wrap justify-center mb-4">
        <v-img
          max-width="80"
          src="/logo/visa.png"
        />
        <v-img
          max-width="80"
          src="/logo/bitcoin.png"
          class="ml-4"
        />
        <v-img
          max-width="80"
          src="/logo/google-wallet.png"
          class="ml-4"
        />
        <v-im
          max-width="80"
          src="/logo/mastercard.png"
          class="ml-4"
        />
        <v-img
          max-width="80"
          src="/logo/paypal.png"
          class="ml-4"
        />
      </v-col>
      <v-col cols="12" class="d-none d-sm-flex flex-wrap justify-center mb-4">
        <v-img
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
          max-width="80"
          src="/logo/visa.png"
        />
        <v-img
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
          max-width="80"
          src="/logo/bitcoin.png"
          class="ml-4"
        />
        <v-img
          data-aos="fade"
          data-aos-delay="500"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
          max-width="80"
          src="/logo/google-wallet.png"
          class="ml-4"
        />
        <v-img
          data-aos="fade-right"
          data-aos-delay="500"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
          max-width="80"
          src="/logo/mastercard.png"
          class="ml-4"
        />
        <v-img
          data-aos="fade-right"
          data-aos-delay="500"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
          max-width="80"
          src="/logo/paypal.png"
          class="ml-4"
        />
      </v-col>
      <v-col cols="12" class="mb-6 mt-2 text-center">
        <v-btn large depressed class="rounded-tr-lg px-6 rounded-bl-lg opacity" color="primary" to="/dashboard">
          Join Now
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

  filters: {
    currency (val) {
      if (val) {
        return val.toLocaleString()
      } else {

      }
    }
  },
  data: () => ({
    volume: 13776746,
    activenow: true,
    plans: [
      {
        to: '/dashboard',
        name: 'Basic',
        minimum: 200,
        maximum: 500,
        roi: 500

      },
      {
        to: '/dashboard',
        name: 'Bronze',
        minimum: 600,
        maximum: 1500,
        roi: 600

      },
      {
        to: '/dashboard',
        name: 'Silver',
        minimum: 1600,
        maximum: 2500,
        roi: 700

      },
      {
        to: '/dashboard',
        name: 'Gold',
        minimum: 2600,
        maximum: 3500,
        roi: 800

      },
      {
        to: '/dashboard',
        name: 'Diamond',
        minimum: 3600,
        maximum: 4500,
        roi: 900

      },
      {
        to: '/dashboard',
        name: 'Platinum',
        minimum: 4600,
        maximum: 6000,
        roi: 1000

      }

    ],
    refers: [
      { title: 'ADVANCED AFFILIATE STATISTICS', icon: 'mdi-chart-box', description: 'You get different tools for checking the efficiency of your affiliate campaigns' },
      { title: 'DIFFERENT TYPES OF PROMO MATERIALS', icon: 'mdi-cards', description: 'You can use landing pages, videos, banners for promoting your affiliate campaigns on the internet' },
      { title: 'REGULAR PAYMENTS', icon: 'mdi-cash-usd', description: 'We have highly skilled and experience team working on our visionary investment projects which guarantees minimum risks of your investments.' },
      { title: 'INVITE YOUR FRIENDS AND EARN MORE THAN EVER BEFORE', icon: 'mdi-account-multiple-plus', description: 'We provide you with profit sharing instruments. Share your profit with your referrals to get more of them.' },
      { title: "GET YOUR COMMISSION FROM EACH REFERRAL'S TRADING ORDER", icon: 'mdi-cash-plus', description: 'The more your referrals trade, the bigger your commission is. You will get your commission regardless of your referrals\' trading result' },
      { title: 'MOST POPULAR AFFILIATE PROGRAMS', icon: 'mdi-account-switch', description: 'CPA, Rebate, Internet partner' }

    ],

    services: [
      { title: 'Investment Planning', icon: 'mdi-chart-histogram', description: 'All plans are based with simplicity in mind in order that even the newest of investors can interpret and leverage either plan to cultivate first rate earnings.' },
      { title: 'Fast Payout', icon: 'mdi-cash-usd', description: 'All withdrawal requests are automated ensuring there is no dilatory in the transactions once your investment reaches the elapse period.' },
      { title: 'Highly Skilled Team', icon: 'mdi-account-tie', description: 'We have highly skilled and experience team working on our visionary investment projects which guarantees minimum risks of your investments.' },
      { title: 'Secure and Stable', icon: 'mdi-shield-check', description: 'Our system is secured and stable. Your wallet funds are safe with or without investment. Your earnings are transferred to wallet and you can withdraw easily.' }

    ],
    investors: [
      { name: 'Eunice Igben', avatar: 'avatar/2.jpg', story: 'Long live BitmainFX, long live the CEO' },
      { name: 'Dominic Oseni', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', story: 'With BitmainFX i dont have to worry about financial burden anymore' },
      { name: 'Emeka Okorie', avatar: '/avatar/9.jpg', story: 'For a year now, I have been investmenting on with BitmainFX and have not been dissapointed' },
      { name: 'John Fisher', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', story: 'We really did not think it was possible before to make so much profit, but here I am right now saying “Anything is just possible with Tread Miners”' },
      { name: 'Rebecca Paulson', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg', story: 'Its\'s been a wonderful experience with you guys, BitmainFX is going places' },
      { name: 'Oluwaseyi Smith', avatar: 'avatar/3.jpg', story: 'Trust me BitmainFX is one of a kind, Keep up the good work.' },
      { name: 'Smith Jessica', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg', story: 'BitmainFX has been helpful to me.' },
      { name: 'Rebecca Paulson', avatar: 'avatar/4.jpg', story: 'The company is very transparent in their dealings which is very good. Investment plan is stable as well' }
    ]
  }),
  computed: {
    activeUser () {
      const users = 1868365
      return Math.floor(Math.random() * users) + 268365
    }
  },
  created () {
    const min = 1000 * 60 * 12
    setInterval(() => {
      this.activenow = !this.activenow
    }, 1000)

    setInterval(() => {
      this.volume = Math.floor(Math.random() * this.volume) + 1868365
    }, min)
  },
  mounted () {
    // const Tawk_API = Tawk_API || {}
    // const Tawk_LoadStart = new Date();

    (function () {
      const s1 = document.createElement('script'); const s0 = document.getElementsByTagName('script')[0]
      s1.async = true
      s1.src = 'https://embed.tawk.to/60c35d4865b7290ac6357294/1f7ti8p3h'
      s1.charset = 'UTF-8'
      s1.setAttribute('crossorigin', '*')
      s0.parentNode.insertBefore(s1, s0)
    })()
  },

  head () {
    return {
      title: 'BitmainFX',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Crypto Funds Limited is an online registered investment platform managed by a team of experienced and competent professionals in the finance and investment industry within and outside the country. Our major aim is to eliminate poverty, empower youths and incapable men within a short period of investment.'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'Crypto Funds Limited is an online registered investment platform managed by a team of experienced and competent professionals in the finance and investment industry within and outside the country. Our major aim is to eliminate poverty, empower youths and incapable men within a short period of investment.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Crypto Funds Limited'
        },
        {
          property: 'og:image',
          content: 'https://cryptofundltd.com/crypto.jpeg'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'twitter:image:src',
          content: 'https://cryptofundltd.com/crypto.jpeg'
        },
        {
          property: 'og:title',
          content: 'Crypto Fund Limited'
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image'
        }
      ],
      script: [
        {
          src:
            'https://cdn.jsdelivr.net/gh/coinponent/coinponent@undefined/dist/coinponent.js'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css'
        }

      ]
    }
  }

}
</script>
<style scoped>

.bgv {
  position: absolute;
  top:0;
  left: 0;
  height: 100vh;
  width:100%;
  overflow: hidden;
  z-index: 1;
}
.up {
  z-index: 2
}
.opacity {
  opacity: .9;
}
.opacity-h {
  opacity: .7;
}
.bg-dash {
    background: linear-gradient(rgba(1, 5, 63, 0.7), rgba(1, 5, 63, 0.7)), url('/bg/dash.jpg') ;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}
.bg-join {
    background: linear-gradient(rgba(1, 5, 63, 0.7), rgba(1, 5, 63, 0.7)), url('/bg/cointrade.jpg') ;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
}
.bg-poster {
    background: linear-gradient(rgba(1, 5, 63, 0.6), rgba(1, 5, 63, 0.6)), url('/bg/poster.png') ;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}
.bgstrade {
    background: linear-gradient(rgba(1, 5, 63, 0.7), rgba(1, 5, 63, 0.7)), url('/bg/globe.jpg') ;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
}
.bgservice {
    background: linear-gradient(rgba(1, 5, 63, 0.7), rgba(1, 5, 63, 0.7)), url('/bg/house.jpg') ;
    background-size: cover;
    background-position: right center;
    background-repeat: no-repeat;
}
.bgc {
 position: absolute;
  top:0;
  left: 0;
  height: 100%;
  width:100%;
  background: linear-gradient(rgba(1, 5, 63, 0.3), rgba(1, 5, 63, 0.3)), url('/bg/video-1.mp4') ;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}
.bgv video {
  min-width: 100%;
  min-height: 100%;
}

.v-card {
  transition: opacity .4s ease-in-out;
}
.hoverCard {
  max-width:300px;
  border: 2px solid #29b6f6;
  transition: all .3s ease-in-out;
}
.hoverCard:hover {
  border: 2px solid #29b6f6;
  box-shadow: 0 4px 16px 2px rgba(0, 0, 0, 0.199);
}
.showcase{
  border-bottom: 2px solid #01021e
}
.icon-light-a {
box-shadow: 0 2px 7px 1px rgba(255,160,0, 0.685)
}
.icon-light {
box-shadow: 0 2px 7px 1px rgba(40, 181, 246, 0.685)
}
.icon-btn {
  border:2px solid #29b6f6;
  border-radius:50%

}

</style>
