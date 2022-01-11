<template>
  <x-side-bar :loading="loading.email" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex text3--text flex-column">
        <span class="text-h6 d-flex align-center">
          Update Email Address
        </span>
      </div>
    </template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
    >
      <v-row no-gutters class="ma-0 pt-4">
        <v-col cols="12" class="py-0">
          <v-text-field
            v-model="email"
            type="email"
            name="email"
            dense
            outlined
            color="primary"
            label="Email"
            required
            class="text-subtitle-2 font-weight-light "
          />
        </v-col>

        <v-col cols="12" class="py-0 d-flex align-center">
          <v-spacer />
          <v-btn
            block
            depressed
            type="submit"
            :loading="loading.email"
            tile
            color="primary"
            class="text-capitalize rounded text-subtitle-2 font-weight-regular"
          >
            Update Email
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
  props: ['drawer', 'toggle', 'type'],
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]

  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser', loading: 'authentication/getLoading' })

  },
  methods: {
    ...mapActions({ updateEmail: 'authentication/updateEmail' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        this.updateEmail(this.email)
        this.clear()
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
    }

  }

}
</script>

<style>

</style>
