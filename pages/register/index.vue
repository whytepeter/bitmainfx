<template>
  <v-container>
    <v-row style="height: 100hv" justify="center" class="py-4">
      <v-col
        cols="12"
        md="10"
        class="font-weight-light text-subtitle-1 text-md-h6 my-2"
      >
        <v-card max-width="500" flat class="mx-auto ">
          <v-card-title class="d-flex flex-column align-center">
            <!-- <v-btn text href="/" class="">
              <v-avatar tile size="100">
                <img src="/bitmainfx.jpeg" max-width="100" alt="Bitmain FX">
              </v-avatar>
            </v-btn> -->

            <div class="text-h5 font-weight-bold text-sm-h4 mb-2 mt-8 ">
              Sign Up
            </div>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-row class="mt-2">
              <v-col cols="12" class="py-0">
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  class="pb-2  "
                  @submit.prevent="submit"
                >
                  <v-row no-gutters class="py-4">
                    <v-col cols="12" md="6" class="py-0">
                      <v-text-field
                        v-model="firstName"
                        name="firstName"
                        type="text"
                        dense
                        outlined
                        class="text-subtitle-2 mx-1 font-weight-light"
                        color="secondary"
                        label="First Name"
                        required
                        :rules="firstNameRules"
                      />
                    </v-col>
                    <v-col cols="12" md="6" class="py-0">
                      <v-text-field
                        v-model="lastName"
                        name="lastName"
                        type="text"
                        dense
                        outlined
                        class="text-subtitle-2 mx-1 font-weight-light"
                        color="secondary"
                        label="Last Names"
                        required
                        :rules="lastNameRules"
                      />
                    </v-col>

                    <v-col cols="12" md="6" class="py-0">
                      <v-text-field
                        v-model="email"
                        name="email"
                        type="text"
                        dense
                        outlined
                        class="text-subtitle-2 mx-1 font-weight-light"
                        color="secondary"
                        label="Email"
                        required
                        :rules="emailRules"
                      />
                    </v-col>

                    <v-col cols="12" md="6" class="py-0">
                      <v-text-field
                        v-model="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        dense
                        outlined
                        class="text-subtitle-2 mx-1 font-weight-light"
                        color="secondary"
                        label="PhoneNumber"
                        required
                      />
                    </v-col>

                    <v-col cols="12" md="6" class="py-0">
                      <v-text-field
                        v-model="password"
                        :type="show ? 'text' : 'password'"
                        name="password"
                        dense
                        outlined
                        color="secondary"
                        label="Password"
                        required
                        class="text-subtitle-2 mx-1 font-weight-light"
                        :rules="passwordRules"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        hint="Password must be 8 characters long and contain atleast one lowercase, uppercase, number and special character"
                        @click:append="show = !show"
                      />
                    </v-col>
                    <v-col cols="12" md="6" class="py-0">
                      <v-text-field
                        v-model="confirmPassword"
                        :type="show1 ? 'text' : 'password'"
                        name="confirmPassword"
                        dense
                        outlined
                        color="secondary"
                        label="Confirm Password"
                        required
                        class="text-subtitle-2 mx-1 font-weight-light"
                        :rules="[confirmPasswordRules, passwordConfirmationRule]"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show1 = !show1"
                      />
                    </v-col>
                    <!-- <v-col cols="12" md="6" class="py-0">
                      <v-file-input
                        v-model="photo"
                        dense
                        type="file"
                        name="image"
                        chips
                        outlined
                        class="text-subtitle-2 font-weight-light"
                        required
                        :rules="[v => !!v || 'ID is required']"
                        label="Upload ID"
                        prepend-icon="mdi-camera"
                      />
                    </v-col> -->

                    <v-col cols="6" class="py-0">
                      <v-autocomplete
                        v-model="country"
                        :items="countries"
                        item-text="name"
                        dense
                        outlined
                        class="text-subtitle-2 mx-1 font-weight-light "
                        color="secondary"
                        label="Nationality"
                        required
                        :rules="[(v) => !!v || 'Nationality is required']"
                      />
                    </v-col>
                    <v-col cols="6" class="py-0">
                      <v-select
                        v-model="currency"
                        dense
                        color="secondary"
                        :items="currencies"
                        outlined
                        class="text-subtitle-2 mx-1 font-weight-light "
                        :rules="[(v) => !!v || 'Currency is required']"
                        label="currency"
                        required
                      />
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-select
                        v-model="trader"
                        dense
                        color="secondary"
                        :items="['Trade Yourself', 'Copy trading A.T.S(Expert)']"
                        outlined
                        class="text-subtitle-2 mx-1 font-weight-light "
                        :rules="[(v) => !!v || 'Trader is required']"
                        label="Trade Expert"
                        required
                      />
                    </v-col>

                    <v-col cols="12" class="py-0">
                      <v-checkbox
                        v-model="acceptTerms"
                        :rules="[v => !!v || 'You must agree to continue!']"
                        required
                        color="secondary"
                        class="py-0 my-0"
                        type="checkbox"
                        value="1"
                      >
                        <template v-slot:label>
                          <div class="text-subtitle-2">
                            I have Read and I Accept the
                            <nuxt-link tag="a" class="secondary--text" to="/terms">
                              Terms & Conditions
                            </nuxt-link>
                            and
                            <nuxt-link tag="a" class="secondary--text" to="/policy">
                              Privacy Policy
                            </nuxt-link>
                          </div>
                        </template>
                      </v-checkbox>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-btn
                        depressed
                        type="submit"
                        block
                        :loading="loading.register"
                        color="secondary"
                        class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular"
                      >
                        Create Account
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
              <v-col cols="12" class="py-1 mt-2 text-center">
                <div class="text-subtitle-1 mt-2">
                  Already a member?
                  <nuxt-link
                    to="/login"
                    tag="a"
                    class="font-weight-medium secondary--text"
                  >
                    Login
                  </nuxt-link>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data: () => ({
    valid: true,
    show: false,
    show1: false,
    acceptTerms: null,
    // photo: null,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    trader: '',
    traderRules: [v => !!v || 'Trader is required'],
    firstName: '',
    firstNameRules: [v => !!v || 'First Name is required'],
    lastName: '',
    lastNameRules: [v => !!v || 'Last Name is required'],
    phoneNumber: '',
    phoneNumberRules: [v => !!v || 'Phone Number is required'],
    country: null,
    currency: null,
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be greater than 6 characters'
    ],
    confirmPassword: '',
    confirmPasswordRules: [
      v => !!v || 'Password is required'
    ]

  }),

  computed: {
    ...mapGetters({ loading: 'authentication/getLoading', countries: 'authentication/getCountries', state: 'controller/getState' }),
    passwordConfirmationRule () {
      return () => (this.password === this.confirmPassword) || 'Password must match'
    },
    referred () {
      return this.$route.query.ref
    },
    currencies () {
      const currencies = this.state('currency')
      const arr = []
      currencies && currencies.forEach((el) => {
        arr.push(el.name)
      })

      console.log(arr)
      return arr
    }
  },
  methods: {
    ...mapMutations({ setData: 'authentication/setData' }),
    ...mapActions({ register: 'authentication/register', initAlert: 'controller/initAlert' }),

    customFilter (item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()
      return textOne.includes(searchText)
    },

    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          password: this.password,
          country: this.country,
          currency: this.currency,
          trader: this.trader,
          symbol: this.getSymbol(this.currency),
          date: this.getDate('current')
        }
        console.log(payload)
        this.register(payload)
      }
    },

    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getSymbol (payload) {
      const currencies = this.state('currency')
      let symbol
      currencies && currencies.forEach((el) => {
        if (el.name.toLowerCase() === payload.toLowerCase()) {
          symbol = el.symbol
        }
      })

      console.log(symbol)
      return symbol
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
        const hours = (date.getHours() % 12) || 12
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December']
        return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}-${hours}:${date.getMinutes()}`
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

<style></style>
