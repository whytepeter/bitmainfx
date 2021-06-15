<template>
  <v-container fluid class="primary">
    <v-row justify="center" class="py-10 white--text">
      <v-col cols="12" md="6" class="text-center mb-6 opacity">
        <div class="text-h5 text-md-h4  text-capitalize font-weight-bold">
          Contact Us
        </div>
        <div class="text-subtitle-1 mt-2 font-weight-light opacity">
          Have any questions or feedback? Please get in touch with us by filling
          the contact form below and our support will get back to you within 24
          hours
        </div>
      </v-col>
      <v-col cols="12">
        <div class="elfsight-app-43607be2-d532-4909-adfa-5e51a01a0058" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Contact',

  data: () => ({}),

  methods: {},
  head () {
    return {
      title: 'Contact Us',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content:
            'Have any questions or feedback? Please get in touch with us by filling the contact form below and our support will get back to you within 24 hours'
        }
      ],
      script: [
        {
          src: 'https://apps.elfsight.com/p/platform.js'
        }
      ]
    }
  }
}
</script>

<style></style>
