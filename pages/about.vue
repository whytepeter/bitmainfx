<template>
  <v-container fluid class="primary">
    <v-row justify="center" class="py-10 white--text">
      <v-col cols="12" class="text-center mb-6 opacity">
        <div class="text-h5 text-md-h4  text-capitalize font-weight-bold">
          About Us
        </div>
        <div class="text-h6 mt-2 font-weight-light opacity">
          How We Started
        </div>
      </v-col>
      <v-col cols="12" md="8" class="font-weight-light text-center">
        <p>
          <span class="accent--text font-weight-medium">Bitmain FX
            }</span> is an online registered investment platform managed by a team of experienced and competent professionals in the finance and investment industry within and outside the country. Our major aim is to eliminate poverty, empower youths and incapable men within a short period of investment.
        </p>
        <p> And also to reach out to as many countries we can, and help make life easier through crypto-currency</p>

        <p>This investment platform has been in existence and business since 2019, we are growing stronger and bigger on daily basis because it is founded with patriotic and sincere minds.</p>

        <p>In BitmainFX there is security of investment and assurance of paying members promptly as at when due, irrespective of the package they invest into. Every fund that comes into the business is re-invested into productive business ventures which makes us different from any other online business or platform you might have experienced before or heard about.</p>

        <p>Also, the management team of BitmainFX are unique in the sense that they are visible, accessible and easily contacted for conversation on any matter relating to their business for clarification.</p>
      </v-col>
      <v-col cols="12" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'About',
  head () {
    return {
      title: 'About Us',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'BitmainFX is an online registered investment platform managed by a team of experienced and competent professionals in the finance and investment industry within and outside the country. Our major aim is to give returns to money invest by the members to earn them total financial liberation'
        }

      ]

    }
  }

}
</script>

<style>

</style>
