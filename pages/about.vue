<template>
  <v-container fluid class="px-0 primary">
    <v-row justify="center" class="align-center bg-gradient px-md-16 px-4 py-16 primary ma-0">
      <v-col cols="12" class="up">
        <v-row justify="center" align="center" class="ma-0 px-md-10">
          <v-col cols="12" md="7" class="text-left text-md-left pl-md-10">
            <div
              class=". text-h5 text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold"
            >
              About us
            </div>
            <div
              style="font-size:17px"
              class=" text-md-h5 indigo--text text--lighten-3 font-weight-light mt-5"
            >
              <p style="font-size:17px">
                Bitmain FX  managed to implement environmentally friendly crypto mining into an operating service for every amateur and beginner in the crypto world.
              </p>
              <p style="font-size:17px">
                is an environmentally friendly cloud mining service based on mining efficiency using hydrogen and solar panels.
              </p>
              <p style="font-size:17px">
                We provide crypto mining services designed and inspired by various cryptocurrency enthusiasts and blockchain experts, as well as people who care about the environment, to provide an affordable and most efficient and environmentally friendly mining service with frequent payments for both small and small large investors.
              </p>
            </div>
          </v-col>
          <v-col
            data-aos="fade-left"
            data-aos-delay="700"
            data-aos-once="true"
            data-aos-easing="ease-in-out"
            class=" pr-md-10 mt-md-6"
            cols="12"
            md="5"
          >
            <v-card class="transparent " flat :max-height="$vuetify.breakpoint.xsOnly ? 300 : 400">
              <v-card-text>
                <v-img :height="500" src="/doc.jpeg" contain />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center" class="primary px-md-16 px-4 mx-md-16 py-16 ma-0">
      <v-col
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        class="text-center font-weight-light mb-4"
      >
        <h2 class="text-h6 font-weight-bold white--text  text-md-h3 mb-2">
          Our Trading Company In Numbers
        </h2>

        <p class="indigo--text text--lighten-4">
          Trace the history of our company since its foundation in 2013
        </p>
      </v-col>
      <v-col
        v-for="stat in stats"
        :key="stat.name"
        :data-aos-delay="stat.delay"
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-easing="ease-in-out"
        cols="12"
        sm="6"
        class="py-0"
        color="transparent"
      >
        <v-card
          class="py-1 py-sm-6 mx-auto"
          color="transparent "
          flat
        >
          <v-card-text class="d-flex align-center justify-center white--text font-weight-light ">
            <div class="d-flex flex-column white--text text-h5 text-center">
              <span class=" font-weight-bold ">{{ stat.title }}</span>
              <span class=" text-subtitle-1 indigo--text text--lighten-4 text-uppercase">{{ stat.info }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="align-center bg-134 px-md-16 px-4 py-16 primary ma-0">
      <v-col cols="12" md="4" class="py-16">
        <div
          class=" text-h4 text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold"
        >
          134 countries
        </div>
        <div
          style="font-size:17px"
          class=" text-md-h5 indigo--text text--lighten-3 font-weight-light mt-5"
        >
          Traders from all over the world trust Bitmain FX. The platform interface is localized into 12 languages.
        </div>
      </v-col>
      <v-col cols="12" class="py-16" />
    </v-row>
    <v-row justify="center" class="align-center px-md-16 px-4 py-16 white ma-0 ">
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
            <v-img :height="$vuetify.breakpoint.xsOnly ? 300 : 400" src="/assets/support.png" contain />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class=" my-4 text-left text-sm-left pl-md-10">
        <div
          class=" text-h4 text-md-h3 text-lg-h2 text-capitalize text2--text font-weight-bold"
        >
          Support
        </div>
        <div
          style="font-size:17px"
          class=" text-md-h5 text1--text mt-5 font-weight-light"
        >
          Choose the most convenient way to contact our support team. Ask your question via email or online chat. Experienced professionals will answer any of your questions about the platform.
        </div>
      </v-col>
      <v-col cols="12" md="10" class="px-0">
        <v-row class="ma-0" justify="center">
          <v-col
            v-for="support in supports"
            :key="support.name"
            :data-aos-delay="support.delay"
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-easing="ease-in-out"
            cols="12"
            sm="6"
            md="4"
            class="py-0"
            color="transparent"
          >
            <v-card
              class="py-1 py-sm-6 mx-auto"
              color="transparent "
              flat
            >
              <v-card-text class="d-flex  align-center text1--text font-weight-light ">
                <div style="width:100%" class="d-flex text-center text-sm-left flex-column text1--text text-h3 text-left">
                  <span class=" font-weight-bold ">{{ support.title }}</span>
                  <span class=" text-subtitle-1 text-sm-h6">{{ support.info }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'About',
  data: () => ({

    awards: [
      'award_1.png',
      'award_2.png',
      'award_3.png',
      'award_5.png',
      'award_8.png',
      'award_7.png',
      'award_9.png',
      'award_11.png',
      'award_12.png',
      'award_14.png',
      'award_15.png'
    ],
    stats: [
      {
        title: '48,091,542',
        delay: 500,
        info:
          'Registered Users'
      },
      {
        title: '$20,375,097',
        delay: 600,
        info:
          'Average withdrawn by Traders per Month'
      },
      {
        title: '$290,574,054',
        delay: 700,
        info:
          'Average Trading Volume Per Month'
      },
      {
        title: '$340,575,476',
        delay: 800,
        info:
          'AVERAGE MONTHLY TRADE TURNOVER'
      }
    ],
    supports: [
      {
        title: '500',
        delay: 500,
        info:
          'RESOLVED ISSUES DAILY'
      },
      {
        title: '800',
        delay: 600,
        info: 'AVERAGE SECONDS OF WAITING'
      },
      {
        title: '15',
        delay: 700,
        info:
          'SUPPORTED WEBSITE LANGUAGES'
      }

    ],
    services: [
      {
        name: 'Simplicity',
        delay: 500,
        description:
          'One of Bitmain FX main goals is to remove barriers and make online trading and investing more accessible to the everyday user. Whenever people join Bitmain FX, we aim to make them feel a part of the platform from the very beginning. Moreover, we realize that many people use multiple platforms to manage their capital online, which is why we are constantly expanding our product offering to eventually include all of your financial needs under one roof.'
      },
      {
        name: 'Innovation',
        delay: 600,
        description:
          'We take great pride in the fact that we have been around since the earliest days of the Fintech Revolution. Whether by introducing new and exciting ways to trade and invest online or by inventing cutting-edge financial products – we are, and always will be, innovators and disruptors in the Fintech space.'
      },
      {
        name: 'Enjoyable',
        delay: 700,
        description:
          'We believe that people should be able to trade more than financial assets, like thoughts and feelings. On Bitmain FX, our users can interact and gain from each other’s experience. Our platform is intuitive and user-friendly, turning even the most complicated actions, like stock trading, to a simple and interactive experience'
      },
      {
        name: 'Openness',
        delay: 800,
        description:
          'Openness and transparency are an integral part of the user experience on Bitmain FX. Whether it’s the ability to start a chat with any user on board, our CEO included, or the fact that we don’t charge any hidden fees and make sure our prices are clear and visible, we strive to make sure that our users feel that they have all the information they need to handle their finances on Bitmain FX.'
      },
      {
        name: 'Quality',
        delay: 900,
        description:
          'A meticulous thought process behind every decision and a constant striving for perfection, guides Bitmain FX to deliver the best possible experience for all of our users. From the moment a person is exposed to our logo, we wish to make sure that he feels our attention to even the minutest details at all times.'
      }
    ]
  }),
  head () {
    return {
      title: 'About Us',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content:
            ' Bitmain FX vision is to open the global markets for everyone to trade and invest in a simple and transparent way.'
        }
      ]
    }
  }
}
</script>

<style>

.rotate {
  transform: rotate(190deg);
}

.bg-gradient {
 background: rgb(0,0,0);
background: linear-gradient(48deg, rgba(0,0,0,1) 47%, rgba(22,0,79,1) 63%, rgba(77,19,223,1) 76%, rgba(167,9,132,1) 89%, rgba(17,0,60,1) 100%);
backdrop-filter: blur(5px);
 background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.bg-about {
  background: linear-gradient(rgba(1, 4, 66, 0.9), rgba(1, 4, 66, 0.9)),
    url("/bg/bg-4.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.bg-134 {
  background: linear-gradient(rgba(6, 6, 61, 0.1), rgba(6, 6, 61, .1)),
    url("/assets/bg134.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
