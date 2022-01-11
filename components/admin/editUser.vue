<template>
  <x-side-bar :loading="loading.update" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex text3--text flex-column">
        <span class="text-subtitle-1 d-flex align-center">
          {{ user && user.firstName }} {{ user && user.lastName }}
          <v-spacer />
          <v-chip small label outlined color="secondary" class="ml-2">{{ user && user.wallet.deposit | currency }}</v-chip>
        </span>
      </div>
    </template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
    >
      <v-alert
        v-if="user.block"
        dense
        type="error"
        class="mt-n2"
        tile
      >
        This account is <strong>Blocked</strong>
      </v-alert>
      <v-row no-gutters class="ma-0 px-2">
        <v-col cols="12" class="py-0 mb-n1">
          <v-text-field
            v-model="displayDeposit"

            :disabled="user && user.block"
            type="text"
            name="deposit"
            outlined
            color="primary"
            label="Deposit"
            :rules="depositRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>

        <v-col cols="12" class="py-0 mb-n1">
          <v-text-field
            v-model="displayEarnings"

            :disabled="user && user.block"
            type="text"
            name="earnings"
            outlined
            color="primary"
            label="Profit"
            :rules="earningsRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>

        <v-col cols="12" class="py-0 mb-n1">
          <v-text-field
            v-model="displayReferral"

            :disabled="user && user.block"
            type="text"
            name="referral"
            outlined
            color="primary"
            label="Referral"
            :rules="referralRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>

        <v-col cols="12" class="py-0 mb-n1">
          <v-text-field
            v-model="displayWithdraw"

            :disabled="user && user.block"
            type="text"
            name="withdraw"
            outlined
            color="primary"
            label="Withdraw"
            :rules="withdrawRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>

        <v-col cols="12" class="d-flex text-subtitle-2 px-2">
          Advance Settings
          <v-spacer />
          <v-btn text icon :color="`${advance ? 'primary' : ''}`" @click="advance = !advance">
            <v-icon small>
              {{ advance ? 'mdi-arrow-down' : 'mdi-arrow-up' }}
            </v-icon>
          </v-btn>
        </v-col>
        <v-col v-if="advance" cols="6" class="d-flex align-center justify-space-between">
          <v-switch
            v-model="displayBlock"
            color="secondary"
            inset
            label="Block User"
            class="py-0 my-0"
          />
        </v-col>
        <v-col v-if="advance" cols="6" class="py-2">
          <v-switch
            v-model="displayDelete"

            :disabled="user && user.block"
            color="error"
            inset
            label="Delete User"
            class="py-0 my-0"
          />
        </v-col>
        <v-col cols="12" class="py-2">
          <v-btn
            type="submit"
            depressed
            block
            :loading="loading.update"
            color="primary"
            class="text-subtitle-2 font-weight-normal "
          >
            Update User
          </v-btn>
        </v-col>
        </v-col>
      </v-row>
    </v-form>
  </x-side-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import xSideBar from '../xSideBar.vue'
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
    advance: false,
    depositRules: [v => !!v || 'Deposit is required'],
    referralRules: [v => !!v || 'Referral is required'],
    withdrawRules: [v => !!v || 'Withdrawal is required'],
    earningsRules: [v => !!v || 'Earnings is required']

  }),
  computed: {
    ...mapGetters({ loading: 'admin/getLoading' }),

    displayDeposit: {
      get () {
        let val = parseInt(this.user.wallet.deposit)
        val = val.toLocaleString()
        if (val === 'NaN') {
          return ''
        } else {
          return `$${val}`
        }
      },
      set (val) {
        // check if the first Character is $ and remove it
        const firstChar = val.charAt(0)
        if (firstChar === '$') {
          val = val.substring(1)
        }
        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.user.wallet.deposit = val
        }
      }
    },
    displayEarnings: {
      get () {
        let val = parseInt(this.user.wallet.earnings)
        val = val.toLocaleString()
        if (val === 'NaN') {
          return ''
        } else {
          return `$${val}`
        }
      },
      set (val) {
        // check if the first Character is $ and remove it
        const firstChar = val.charAt(0)
        if (firstChar === '$') {
          val = val.substring(1)
        }
        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.user.wallet.earnings = val
        }
      }
    },
    displayReferral: {
      get () {
        let val = parseInt(this.user.wallet.referral)
        val = val.toLocaleString()
        if (val === 'NaN') {
          return ''
        } else {
          return `$${val}`
        }
      },
      set (val) {
        // check if the first Character is $ and remove it
        const firstChar = val.charAt(0)
        if (firstChar === '$') {
          val = val.substring(1)
        }
        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.user.wallet.referral = val
        }
      }
    },
    displayWithdraw: {
      get () {
        let val = parseInt(this.user.wallet.withdraw)
        val = val.toLocaleString()
        if (val === 'NaN') {
          return ''
        } else {
          return `$${val}`
        }
      },
      set (val) {
        // check if the first Character is $ and remove it
        const firstChar = val.charAt(0)
        if (firstChar === '$') {
          val = val.substring(1)
        }
        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.user.wallet.withdraw = val
        }
      }
    },
    displayBlock: {
      get () {
        return this.user && this.user.block
      },
      set (val) {
        this.user.block = val
      }
    },
    displayDelete: {
      get () {
        return this.user && this.user.delete
      },
      set (val) {
        this.user.delete = val
      }
    }

  },
  methods: {
    ...mapActions({ updateUser: 'admin/updateUser' }),

    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        console.log(this.user)
        this.updateUser(this.user)
        // this.checkIfDone()
      }
    },

    clear () {
      this.resetValidation()
    },

    reset () {
      this.$refs.form.reset()
    },

    resetValidation () {
      this.$refs.form.resetValidation()
    },

    checkIfDone () {
      setInterval(() => {
        if (!this.loading.update) {
          setTimeout(() => {
            this.clear()
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
