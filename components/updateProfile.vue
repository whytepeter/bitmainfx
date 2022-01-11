<template>
  <x-side-bar :loading="loading.profile" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex text3--text flex-column">
        <span class="text-h6 d-flex align-center">
          Update Profile
        </span>
      </div>
    </template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
    >
      <v-row no-gutters class="ma-0 p-2">
        <v-col cols="12" class="">
          <v-text-field
            v-model="displayFirstName"
            type="text"
            name="firstName"
            outlined
            dense
            color="primary"
            label="First Name"
            :rules="firstNameRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="">
          <v-text-field
            v-model="displayLastName"
            type="text"
            name="lastName"
            outlined
            dense
            color="primary"
            label="Last Name"
            :rules="lastNameRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="">
          <v-text-field
            v-model="displayEmail"
            type="email"
            name="email"
            outlined
            dense
            disabled
            color="primary"
            label="Email"
            :rules="emailRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="">
          <v-text-field
            v-model="displayPhoneNumber"
            type="text"
            name="phoneNumber"
            outlined
            dense
            color="primary"
            label="Phone Number"
            :rules="phoneNumberRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>

        <v-col cols="12" class="py-0">
          <v-autocomplete
            v-model="displayCountry"
            :items="countries"
            item-text="currency"
            disabled
            dense
            outlined
            class="text-subtitle-2 mx-1 font-weight-light "
            color="primary"
            label="Nationality"
            required
            :rules="[(v) => !!v || 'Nationality is required']"
          />
        </v-col>
        <v-col cols="12" class="py-2">
          <v-btn
            type="submit"
            depressed
            block
            :loading="loading.profile"
            color="primary"
            class="text-subtitle-2 font-weight-normal "
          >
            Update Profile
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </x-side-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import xSideBar from './xSideBar.vue'

export default {
  components: { xSideBar },

  filters: {
    currency (val) {
      if (val) {
        val = parseFloat(val)
        return val.toLocaleString('en-US', {
          style: 'currency',
          code: 'US',
          currency: 'USD'
        })
      } else {
      }
    }
  },
  props: ['drawer', 'toggle', 'user'],
  data: () => ({
    valid: true,
    show: false,
    firstName: '',
    firstNameRules: [v => !!v || 'First Name is required'],
    lastName: '',
    lastNameRules: [v => !!v || 'Last Name is required'],
    email: '',
    emailRules: [v => !!v || 'Email is required'],
    phoneNumber: '',
    phoneNumberRules: [v => !!v || 'Phone Number is required'],
    country: null

  }),
  computed: {
    ...mapGetters({ loading: 'authentication/getLoading', countries: 'authentication/getCountries' }),
    displayFirstName: {
      get () {
        return this.user && this.user.firstName
      },
      set (val) {
        this.user.firstName = val
      }
    },
    displayLastName: {
      get () {
        return this.user && this.user.lastName
      },
      set (val) {
        this.user.lastName = val
      }
    },
    displayEmail: {
      get () {
        return this.user && this.user.email
      },
      set (val) {
        this.user.email = val
      }
    },
    displayPhoneNumber: {
      get () {
        return this.user && this.user.phoneNumber
      },
      set (val) {
        this.user.phoneNumber = val
      }
    },
    displayCountry: {
      get () {
        return this.user && this.user.country
      },
      set (val) {
        this.user.country = val
      }
    }

  },
  methods: {
    ...mapActions({ updateProfile: 'authentication/updateProfile' }),

    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          firstName: this.displayFirstName,
          lastName: this.displayLastName,
          email: this.displayEmail,
          phoneNumber: this.displayPhoneNumber,
          country: this.displayCountry,
          currency: this.getSymbol(this.displayCountry)
        }
        console.log(payload)
        this.updateProfile(payload)
      }
      this.checkIfDone()
    },

    getSymbol (currency) {
      let symbol
      if (currency !== null) {
        symbol = this.countries.find((el) => {
          return currency.toLowerCase() === el.currency.toLowerCase() ? el.symbol : ''
        })
      } else {
        symbol = ''
      }
      return symbol.symbol
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
    },
    checkIfDone () {
      setInterval(() => {
        if (!this.loading.profile) {
          setTimeout(() => {
            this.toggle(false)
            window.location.reload()
          }, 2000)
        }
      }, 1000)
    }
  }

}
</script>

<style>

</style>
