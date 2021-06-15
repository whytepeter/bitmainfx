<template>
  <v-container fluid class="primary bgl">
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
            Login
          </v-card-title>
          <v-divider />

          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="pb-2"
            @submit.prevent
          >
            <v-card-text class="pb-0">
              <v-row no-gutters="">
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    type="email"
                    name="email"
                    outlined
                    dense
                    required
                    :rules="emailRules"
                    color="primary"
                    label="Email"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :type="show ? 'text' : 'password'"
                    name="password"
                    outlined
                    dense
                    color="primary"
                    label="Password"
                    required
                    :rules="passwordRules"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class=" my-1 d-flex flex-wrap align-center justify-space-between"
                >
                  <div>
                    New to <strong>CRYPTO</strong>?
                    <nuxt-link to="/register" tag="a">
                      Sign up
                    </nuxt-link>
                  </div>
                  <v-spacer />
                  <nuxt-link to="/password/reset" tag="a">
                    Forgot Password?
                  </nuxt-link>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="px-3">
              <v-btn
                block
                depressed
                type="submit"
                :loading="loading.login"
                color="secondary"
                @click="submit"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Register',

  data: () => ({
    show: false,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],

    password: '',
    passwordRules: [v => !!v || 'Password is required']
  }),
  head () {
    return {
      title: 'Login ',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Login into your free account and start investmenting'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      loading: 'authentication/getLoading',
      alert: 'authentication/getAlert'
    })
  },

  methods: {
    ...mapMutations({ setLoading: 'authentication/SET_LOADING' }),
    ...mapActions({ loginUser: 'authentication/loginUser' }),

    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
          date: this.getDate('current')
        }
        this.loginUser(user)
      }
    },
    clear () {
      this.reset()
      this.resetValidation()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getDate (get, days) {
      const currentDate = new Date()
      let newDate

      function addDays (days) {
        const result = new Date(currentDate)
        result.setDate(result.getDate() + days)
        return formatDate(result)
      }

      function formatDate (date) {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ]
        return `${date.getDate()} ${
          months[date.getMonth()]
        }, ${date.getFullYear()}`
      }

      if (get === 'add') {
        newDate = addDays(days)
      } else if (get === 'current') {
        newDate = formatDate(currentDate)
      }
      return newDate
    }
  }
}
</script>

<style>
.bgl {
  background: linear-gradient(hsl(236, 97%, 13%, 0.9), hsla(236, 97%, 13%, 0.9)),
    url("/bg/business.jpg");
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
}
.position {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
