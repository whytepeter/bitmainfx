<template>
  <v-container fluid class="pa-0">
    <v-row justify="center" class="bg-legal align-center px-md-16 px-4 py-16 primary ma-0">
      <v-col cols="12" class="text-center pl-md-10 my-6 mb-12">
        <div
          class=" text-h4 text-md-h3 text-lg-h2 text-capitalize white--text font-weight-bold"
        >
          Legal Information
        </div>
        <!-- <div
          class="text-h6  white--text font-weight-light mt-5"
        >
          Last Revised: February 5, 2017
        </div> -->
      </v-col>
    </v-row>
    <v-row justify="center" class="white text2--text py-16 px-4  px-md-10 ">
      <v-col
        cols="12"
        md="10"
        class="mb-6"
      >
        <v-card outlined>
          <v-card-title class="pa-0">
            <v-btn block text color="secondary" class="pa-8 text-subtitle-1 font-wegiht-light text-capitalize" to="/policy">
              Privacy Policy
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-card-text class="pa-0">
            <v-btn block text color="secondary" class="pa-8 text-subtitle-1 font-wegiht-light text-capitalize" to="/terms">
              Terms & Conditions
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Legal',
  scrollToTop: true,
  data: () => ({

  }),
  head () {
    return {
      title: 'Legal',
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

.bg-legal {
 background: linear-gradient(rgba(0, 149, 255, 0.6), rgba(0, 149, 255, 0.6)),
  url("/assets/crypto.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
