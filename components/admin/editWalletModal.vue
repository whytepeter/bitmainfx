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
                    v-model="wallet.totalDeposite"

                    outlined
                    dense
                    placeholder="Enter Amount"
                  />
                </div>
                <div class="text-subtitle-2 font-weight-bold">
                  Earnings: <span class="secondary--text"><span class="font-weight-bold " v-html="user && user.currency ? user.currency : '$'" />{{ user.wallet.earnings | currency }}</span>
                  <v-text-field
                    v-model="wallet.earnings"

                    outlined
                    dense
                    placeholder="Enter Amount"
                  />
                </div>
                <div class="text-subtitle-2 font-weight-bold">
                  Withdraw: <span class="secondary--text"><span class="font-weight-bold " v-html="user && user.currency ? user.currency : '$'" />{{ user.wallet.withdraw | currency }}</span>
                  <v-text-field
                    v-model="wallet.withdraw"

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
                  color="primary"

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

    wallet: {
      totalDeposite: '',
      earnings: '',
      withdraw: ''
    }
  }),

  computed: {
    ...mapGetters({ loading: 'users/getLoading', alert: 'users/getAlert' })
  },
  methods: {
    ...mapActions({ editWallet: 'users/editWallet' }),
    update () {
      const userID = this.user.userID
      const wallet = {}
      this.wallet.totalDeposite !== '' ? wallet.totalDeposite = parseInt(this.wallet.totalDeposite) : wallet.totalDeposite = parseInt(this.user.wallet.totalDeposite)
      this.wallet.earnings !== '' ? wallet.earnings = parseInt(this.wallet.earnings) : wallet.earnings = parseInt(this.user.wallet.earnings)
      this.wallet.withdraw !== '' ? wallet.withdraw = parseInt(this.wallet.withdraw) : wallet.withdraw = parseInt(this.user.wallet.withdraw)

      this.editWallet({ userID, wallet })
    },

    reset () {
      this.$refs.form.reset()
    },
    cancel () {
      this.reset()
      this.$emit('closeModal', false)
    }
  }
}
</script>

<style>
</style>
