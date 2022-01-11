<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="11" class="pa-0">
        <p-container tile :title="'LOAN APPLICATION'">
          <v-row class="ma-0">
            <v-col v-if="!show" cols="12" sm="6" md="4" class="pa-1">
              <v-btn
                depressed
                block
                color="secondary"
                class="text-subtitle-2 font-weight-normal mx-1"
                @click="show = !show"
              >
                Apply For Loan
              </v-btn>
            </v-col>
            <v-col v-if="show" cols="12" class="pa-0">
              <v-card flat>
                <v-card-title
                  class="text-subtitle-2 py-0 font-weight-medium text-uppercase"
                >
                  Application Form
                  <v-chip small outlined label color="primary" class="ml-2 d-none d-sm-block">
                    FORM
                  </v-chip>
                  <v-spacer />
                  <v-btn
                    depressed
                    outlined
                    small
                    color="primary"
                    class="text-subtitle-2 font-weight-normal mx-1"
                    @click="show = false"
                  >
                    <v-icon size="20" :left="$vuetify.breakpoint.smAndUp">
                      mdi-arrow-left
                    </v-icon>
                    <span class="d-none d-sm-block text-body-2">Go Back</span>
                  </v-btn>
                </v-card-title>
              </v-card>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="submit"
                >
                  <v-row class="ma-0" no-gutters>
                    <v-col cols="12" class="d-flex mb-2 text-subtitle-2">
                      Loan Details
                      <v-spacer />
                      <v-btn text icon :color="`${accordian.loan ? 'primary' : ''}`" @click="accordian.loan = !accordian.loan">
                        <v-icon small>
                          {{ accordian.loan ? 'mdi-arrow-down' : 'mdi-arrow-up' }}
                        </v-icon>
                      </v-btn>
                    </v-col>
                    <v-col v-if="accordian.loan" cols="12" sm="6" class="py-0 mb-n1 pr-sm-1">
                      <v-text-field
                        v-model="xAmount"
                        type="text"
                        name="amount"
                        dense
                        outlined
                        color="primary"
                        :label="`Desired Amount (${user && user.currency ? user.currency : '$'})`"
                        :rules="loan.amountRules"
                        class="text-subtitle-2 font-weight-light rounded-md"
                      />
                    </v-col>

                    <v-col v-if="accordian.loan" cols="12" sm="6" class="py-0 mb-n1 pr-sm-1">
                      <v-text-field
                        v-model="xAmount2"
                        type="text"
                        name="monthlyPayment"
                        dense
                        outlined
                        color="primary"
                        :label="`Monthly Payment (${user && user.currency ? user.currency : '$'})`"
                        :rules="loan.monthlyPaymentRules"
                        class="text-subtitle-2 font-weight-light rounded-md"
                      />
                    </v-col>

                    <v-col cols="12" class="d-flex mb-2 text-subtitle-2">
                      Personal Details
                      <v-spacer />
                      <v-btn text icon :color="`${accordian.personal ? 'primary' : ''}`" @click="accordian.personal = !accordian.personal">
                        <v-icon small>
                          {{ accordian.personal ? 'mdi-arrow-down' : 'mdi-arrow-up' }}
                        </v-icon>
                      </v-btn>
                    </v-col>
                    <v-col v-if="accordian.personal" cols="12" sm="6" md="4" class="py-0 mb-n1 pr-sm-1">
                      <v-text-field
                        v-model="personal.firstName"
                        type="text"
                        name="firstName"
                        dense
                        outlined
                        color="primary"
                        label="First Name"
                        :rules="personal.firstNameRules"
                        class="text-subtitle-2 font-weight-light rounded-md"
                      />
                    </v-col>
                    <v-col v-if="accordian.personal" cols="12" sm="6" md="4" class="py-0 mb-n1 px-sm-1">
                      <v-text-field
                        v-model="personal.lastName"
                        type="text"
                        name="lastName"
                        dense
                        outlined
                        color="primary"
                        label="Last Name"
                        :rules="personal.lastNameRules"
                        class="text-subtitle-2 font-weight-light rounded-md "
                      />
                    </v-col>
                    <v-col v-if="accordian.personal" cols="12" sm="6" md="4" class="py-0 mb-n1 px-sm-1">
                      <v-text-field
                        v-model="personal.email"
                        type="text"
                        name="email"
                        dense
                        outlined
                        color="primary"
                        label="email"
                        :rules="personal.emailRules"
                        class="text-subtitle-2 font-weight-light rounded-md"
                      />
                    </v-col>

                    <v-col v-if="accordian.personal" cols="12" sm="4" class="py-0 mb-n1 px-sm-1">
                      <v-menu
                        ref="menu"
                        v-model="personal.menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="personal.dob"
                            :rules="[
                              (v) => !!v || 'Date of Birth is required',
                            ]"
                            outlined
                            class="text-subtitle-2 font-weight-light rounded-md "
                            dense
                            label="Date of Birth"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="personal.dob"
                          color="primary"
                          scrollable
                        >
                          <v-spacer />
                          <v-btn
                            text
                            class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular"
                            color="primary"
                            @click="personal.menu = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            depressed

                            text
                            class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular"
                            color="primary"
                            @click="$refs.menu.save(personal.date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col v-if="accordian.personal" cols="12" sm="6" md="4" class="py-0 mb-n1 px-sm-1">
                      <v-autocomplete
                        v-model="personal.country"
                        :items="countries"
                        item-text="currency"
                        dense
                        outlined
                        class="text-subtitle-2 font-weight-light rounded-md "
                        color="primary"
                        label="Nationality"
                        required
                        :rules="[(v) => !!v || 'Nationality is required']"
                      />
                    </v-col>

                    <v-col cols="12" class="py-0 mb-n1 px-sm-1">
                      <v-btn
                        depressed
                        type="submit"
                        color="primary"
                        :loading="loading.loan"
                        class="text-subtitle-2 font-weight-normal mx-1"
                      >
                        Proceed
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </p-container>
        <x-transaction v-if="!show" :filter="false" :title="'Loan Applications'" class="mt-4" :type="'loan'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import pContainer from '~/components/other/pContainer.vue'
import XTransaction from '~/components/other/xTransaction.vue'
export default {
  name: 'Loan',
  components: { pContainer, XTransaction },
  layout: 'dashboard',
  data: () => ({
    accordian: {
      loan: true,
      personal: true
    },
    show: false,

    valid: true,
    loan: {
      amount: '',
      amountRules: [v => !!v || 'Amount is required'],
      monthlyPayment: '',
      monthlyPaymentRules: [v => !!v || 'Monthly Payment is required']
    },
    personal: {
      firstName: '',
      firstNameRules: [v => !!v || 'First Name is required'],
      lastName: '',
      lastNameRules: [v => !!v || 'Last Name is required'],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      phoneNumber: '',
      phoneNumberRules: [v => !!v || 'Phone Number is required'],
      menu: false,
      dob: '',
      date: new Date().toISOString().substr(0, 10),
      country: null

    }
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser', countries: 'authentication/getCountries', loading: 'controller/getLoading' }),
    xAmount: {
      get () {
        let val = parseInt(this.loan.amount)
        val = val.toLocaleString()
        if (val === 'NaN') {
          return ''
        } else {
          return `${val}`
        }
      },
      set (val) {
        // check if the first Character is ₦ and remove it

        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.loan.amount = val
        }
      }
    },
    xAmount2: {
      get () {
        let val = parseInt(this.loan.monthlyPayment)
        val = val.toLocaleString()
        if (val === 'NaN') {
          return ''
        } else {
          return `${val}`
        }
      },
      set (val) {
        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.loan.monthlyPayment = val
        }
      }
    }
  },
  methods: {
    ...mapActions({ loanForm: 'controller/loanForm' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const amount = parseInt(this.xAmount.split(',').join(''))
        const amount2 = parseInt(this.xAmount2.split(',').join(''))
        const payload = {
          amount,
          monthlyPayment: amount2,
          firstName: this.personal.firstName,
          lastName: this.personal.lastName,
          email: this.personal.email,
          dob: this.personal.dob,
          country: this.personal.country,
          date: this.getDate('current'),
          status: 'pending'
        }
        console.log(payload)
        this.loanForm(payload)
        this.clear()
      }
    },

    clear () {
      this.loan.amount = ''
      this.loan.monthlyPayment = ''
      this.personal.firstName = ''
      this.personal.lastName = ''
      this.personal.email = ''
      this.personal.phoneNumber = ''
      this.personal.menu = false
      this.personal.dob = ''
      this.personal.country = null
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

<style>

</style>
