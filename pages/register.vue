<template>
  <v-container fluid class="primary bg">
    <v-row no-gutters="" style="height : 100vh" justify="center" align="center">
      <v-col cols="12" class="d-flex align-center flex-column justify-center">
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
            Join Crypto
          </v-card-title>
          <v-divider />

          <v-form ref="form" v-model="valid" lazy-validation class="pb-2" @submit.prevent>
            <v-card-text class="pb-0">
              <v-row no-gutters="">
                <v-col cols="12">
                  <v-text-field
                    v-model="firstName"
                    type="text"
                    name="firstName"
                    outlined
                    dense
                    color="primary"
                    label="First Name"
                    required
                    :rules="firstNameRules"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="lastName"
                    type="text"
                    name="lastName"
                    outlined
                    dense
                    color="primary"
                    label="Last Name"
                    required
                    :rules="lastNameRules"
                  />
                </v-col>
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
                    v-model="phoneNumber"
                    type="phoneNumber"
                    name="phoneNumber"
                    outlined
                    dense
                    required
                    :rules="phoneNumberRules"
                    color="primary"
                    label="Phone Number"
                  />
                </v-col>

                <v-col cols="9">
                  <v-autocomplete
                    v-model="country"
                    :items="countries"
                    item-text="currency"
                    dense
                    outlined
                    color="primary"
                    label="Country"
                    required
                    :rules="[(v) => !!v || 'Country is required']"
                  />
                </v-col>
                <v-col
                  cols="3"
                >
                  <span class="px-4 pt-4 font-weight-bold text-h6 text-center" v-html="getSymbol(country)" />
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
                <v-col cols="12">
                  <v-checkbox
                    v-model="acceptTerms"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    required
                    color="primary"
                    class="py-0 my-0"
                    type="checkbox"
                    value="1"
                  >
                    <template v-slot:label>
                      <div @click.stop="">
                        Do you accept the
                        <nuxt-link tag="a" to="/policy">
                          terms
                        </nuxt-link>
                        and
                        <nuxt-link tag="a" to="/policy">
                          conditions?
                        </nuxt-link>
                      </div>
                    </template>
                  </v-checkbox>

                  <div>
                    Already have an account?
                    <nuxt-link to="/login" tag="a" @click="clear">
                      Login
                    </nuxt-link>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="px-3">
              <v-btn

                block
                depressed
                type="submit"
                :loading="loading.register"

                color="secondary"
                @click="submit"
              >
                Create Account
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
    valid: true,
    show: false,
    show1: false,
    firstName: '',
    firstNameRules: [
      v => !!v || 'First Name is required'
    ],
    lastName: '',
    lastNameRules: [
      v => !!v || 'Last Name is required'
    ],
    phoneNumber: '',
    phoneNumberRules: [
      v => !!v || 'Phone Number is required'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be greater than 6 characters'
    ],
    country: null,
    acceptTerms: null

  }),
  // head () {
  //   return {
  //     title: 'Register',
  //     meta: [
  //       // hid is used as unique identifier. Do not use `vmid` for it as it will not work
  //       {
  //         hid: 'description',
  //         name: 'description',
  //         content: 'Create a free account with unicryptotrade and earn while you sleep'
  //       }
  //     ]
  //   }
  // },
  computed: {
    ...mapGetters({ loading: 'authentication/getLoading', alert: 'authentication/getAlert', allCountries: 'authentication/getCountries' }),
    countries () {
      return this.allCountries
    }
  },
  methods: {
    ...mapMutations({ setLoading: 'authentication/SET_LOADING' }),
    ...mapActions({ registerUser: 'authentication/registerUser' }),

    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const user = {
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          email: this.email,
          password: this.password,
          country: this.country,
          currency: this.getSymbol(this.country),
          date: this.getDate('current')
        }
        this.registerUser(user)

        if (this.alert.type === 'success' || this.alert.type === 'Success') {
          this.clear()
        }
      }
    },

    getSymbol (currency) {
      let symbol
      if (currency !== null) {
        symbol = this.allCountries.find((el) => {
          return currency.toLowerCase() === el.currency.toLowerCase() ? el.symbol : ''
        })
      } else {
        symbol = ''
      }
      return symbol.symbol
    },
    clear () {
      this.reset()
      this.resetValidation()
      this.acceptTerms = null
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
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December']
        return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
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

<style >
.bg {
    background: linear-gradient(hsl(236, 97%, 13%, .9), hsla(236, 97%, 13%, .9)), url('/bg/business2.jpg') ;
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
