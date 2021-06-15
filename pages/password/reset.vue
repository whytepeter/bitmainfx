<template>
  <v-container fluid class="primary bgr">
    <v-row no-gutters="" style="height : 100vh" justify="center" align="center">
      <v-col cols="12" class="d-flex flex-column align-center justify-center">
        <div v-if="alert.is" class=" my-2 d-flex  justify-center">
          <v-alert
            transition="fade-transition"
            border="right"
            colored-border
            width="400"
            prominent
            :type="alert.type"
            elevation="3"
          >
            {{ alert.message }}
          </v-alert>
        </div>
        <v-card width="400">
          <v-card-title class="text-uppercase">
            <v-icon color="primary" large class="mr-2">
              mdi-account-circle-outline
            </v-icon>
            RESET PASSWORD
          </v-card-title>
          <v-divider />

          <v-form ref="form" v-model="valid" lazy-validation class="pb-2" @submit.prevent>
            <v-card-text class="pb-0">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    type="email"
                    name="email"
                    outlined
                    dense
                    color="primary"
                    label="Email"
                    :rules="emailRules"
                    required
                  />
                </v-col>
                <v-col cols="12">
                  <v-btn

                    block
                    depressed
                    type="submit"
                    :loading="loading.reset"

                    color="secondary"
                    @click="submit"
                  >
                    Reset Password
                  </v-btn>
                </v-col>
                <v-col cols="12" class="mb-2 mt-3">
                  <div class="text-center">
                    <v-icon fab color="primary mr-2">
                      mdi-arrow-left-circle
                    </v-icon>
                    Back to
                    <nuxt-link to="/login" tag="a" @click="clear">
                      Login
                    </nuxt-link>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Register',

  data: () => ({
    valid: true,
    show: false,

    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]

  }),
  head () {
    return {
      title: 'Reset Password',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Reset your password'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({ loading: 'authentication/getLoading', alert: 'authentication/getAlert' })

  },

  methods: {
    ...mapActions({ resetPassword: 'authentication/resetPassword' }),

    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        this.resetPassword(this.email)
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    clear () {
      this.reset()
      this.resetValidation()
    }

  }

}
</script>

<style>
.bgr {
    background: linear-gradient(hsl(236, 97%, 13%, .9), hsla(236, 97%, 13%, .9)), url('/bg/lock.jpg') ;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;

}
.position {

 position: absolute;
 top: 0;
 left: 0;
 width:100%;

}
</style>
