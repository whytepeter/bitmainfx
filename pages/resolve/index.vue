<template>
  <v-container>
    <v-row justify="center" class="py-16">
      <v-col cols="12" class="text-center">
        <v-card
          flat
          max-width="400"
          color="transparent"
          class="mx-auto rounded-lg px-md-4 py-4"
        >
          <v-card-title
            class="flex font-weight-light text-subtitle-1 text-md-h6 my-2"
          >
            <!-- <v-btn text href="/" class="mt-n4">
              <v-avatar tile size="100">
                <img src="/bitmainfx.jpeg" max-width="100" alt="Bitmain FX">
              </v-avatar>
            </v-btn> -->
            <div class="text-button mb-n2 mt-8 ">
              Resolve Account
            </div>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="submit"
            >
              <v-row no-gutters>
                <v-col cols="12" class="py-0 mb-n1">
                  <v-text-field
                    v-model="email"
                    type="email"
                    name="email"
                    dense
                    outlined
                    color="primary"
                    label="Email"
                    :rules="emailRules"
                    class="text-subtitle-2 font-weight-light rounded-md"
                  />
                </v-col>
                <v-col cols="12" class="py-0 mb-n1">
                  <v-text-field
                    v-model="password"
                    :type="show ? 'text' : 'password'"
                    name="password"
                    dense
                    outlined
                    color="primary"
                    label="Password"
                    :rules="passwordRules"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    class="text-subtitle-2 font-weight-light rounded-md"
                    @click:append="show = !show"
                  />
                </v-col>

                <v-col cols="12" class="py-2">
                  <v-btn
                    type="submit"
                    depressed
                    block
                    :loading="loading.resolve"
                    color="primary"
                    class="text-subtitle-2 font-weight-normal"
                  >
                    Resolve Account
                  </v-btn>
                </v-col>
                <v-col cols="12" class="py-1 mt-2 text-center">
                  <div>
                    Go back to
                    <nuxt-link
                      to="/login"
                      tag="a"
                      class="font-weight-medium secondary--text"
                    >
                      login
                    </nuxt-link>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {

  name: 'Resolve',
  data: () => ({
    valid: true,
    show: false,
    email: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v =>
        (v && v.length >= 6) || 'Password must be greater than 6 characters'
    ]
  }),
  computed: {
    ...mapGetters({
      loading: 'authentication/getLoading'
    })
  },
  methods: {
    ...mapActions({ resolveUser: 'authentication/resolveUser' }),

    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          email: this.email,
          password: this.password,
          date: this.getDate('current')
        }
        console.log(payload)
        this.resolveUser(payload)
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

<style></style>
