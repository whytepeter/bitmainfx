<template>
  <div class="text-center">
    <v-dialog v-model="open" persistent width="500">
      <v-card>
        <v-card-title

          class="headline text-capitalize"
          primary-title
        >
          {{ user.username }}'s Wallet
        </v-card-title>
        <v-card-subtitle />
        <v-divider />
        <v-card-text>
          <v-form
            ref="form"
            lazy-validation
            @submit.prevent
          >
            <v-row no-gutters="">
              <v-col cols="12" class="text-caption error--text">
                Leave field empty if value is not to be changed
              </v-col>
              <v-col cols="12">
                <div class="text-subtitle-2 font-weight-bold pt-2">
                  Total Deposite: <span class="secondary--text"><span class="font-weight-bold " v-html="user && user.currency ? user.currency : '$'" />{{ user.wallet.totalDeposite | currency }}</span>
                  <v-text-field
                    v-model="display.totalDeposite"
                    type="text"

                    outlined
                    dense
                    placeholder="Enter Amount"
                  />
                </div>
                <div class="text-subtitle-2 font-weight-bold">
                  Earnings: <span class="secondary--text"><span class="font-weight-bold " v-html="user && user.currency ? user.currency : '$'" />{{ user.wallet.earnings | currency }}</span>
                  <v-text-field
                    v-model="display.earnings"
                    type="text"

                    outlined
                    dense
                    placeholder="Enter Amount"
                  />
                </div>
                <div class="text-subtitle-2 font-weight-bold">
                  Referral: <span class="secondary--text"><span class="font-weight-bold " v-html="user && user.currency ? user.currency : '$'" />{{ user.wallet.referral | currency }}</span>
                  <v-text-field
                    v-model="display.referral"
                    type="text"
                    outlined
                    dense
                    placeholder="Enter Amount"
                  />
                </div>
                <div class="text-subtitle-2 font-weight-bold">
                  Withdraw: <span class="secondary--text"><span class="font-weight-bold " v-html="user && user.currency ? user.currency : '$'" />{{ user.wallet.withdraw | currency }}</span>
                  <v-text-field
                    v-model="display.withdraw"
                    type="text"

                    outlined
                    dense
                    placeholder="Enter Amount"
                  />
                </div>
              </v-col>

              <v-col cols="12" class="my-0 py-0 d-flex justify-space-end align-center">
                <v-spacer />
                <v-btn depressed color="error" class="mr-2" @click="cancel">
                  close
                </v-btn>
                <v-btn
                  :loading="loading.edit"
                  depressed
                  color="primary lighten-1"

                  @click="update"
                >
                  Update
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="alert.is"

      :color="alert.status"
      elevation="24"
    >
      {{ alert.message }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'EditWalletModal',

  filters: {
    currency (val) {
      if (val) {
        val = parseFloat(val)
        return val.toLocaleString()
      } else {

      }
    }
  },

  props: {
    open: Boolean,
    user: Object
  },

  data: () => ({
  }),

  computed: {
    ...mapGetters({ loading: 'users/getLoading', alert: 'users/getAlert' }),
    display () {
      return {
        totalDeposite: this.user.wallet.totalDeposite,
        earnings: this.user.wallet.earnings,
        referral: this.user.wallet.referral,
        withdraw: this.user.wallet.withdraw
      }
    }

  },
  methods: {
    ...mapActions({ editWallet: 'users/editWallet' }),
    update () {
      const userID = this.user.userID

      this.editWallet({ userID, wallet: this.display })
      this.checkIfDone()
    },

    cancel () {
      this.$emit('closeModal', false)
    },
    checkIfDone () {
      setInterval(() => {
        if (this.loading.edit) {
          setTimeout(() => {
            this.cancel()
          }, 2000)
        }
      }, 1000)
    }
  }
}
</script>

<style>
</style>
