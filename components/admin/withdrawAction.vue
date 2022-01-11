<template>
  <v-dialog
    v-model="modal"
    persistent
  >
    <v-card :loading="loading.withdraw" flat max-width="300" class="mx-auto">
      <v-card-title class="text-subtitle-1 font-weight-medium text-uppercase">
        Action
        <v-spacer />
        <v-btn small outlined icon @click="toggle(false, {})">
          <v-icon size="20">
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="">
        <v-row class="ma-0">
          <v-col cols="12" class="text-h6 px-0 font-weight-light">
            <div>
              withdrawal request of
              <!-- <span v-html="user && user.currency ? user.currency : '$'" /> -->
              {{ withdraw && withdraw.amount }}
            </div>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-btn
              depressed
              block
              color="error"
              class="text-capitalize rounded text-subtitle-2 font-weight-regular ma-0"
              @click="update('fail')"
            >
              Decline
            </v-btn>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-btn
              depressed
              block
              color="success"
              class="text-capitalize rounded text-subtitle-2 font-weight-regular ma-0"
              @click="update('success')"
            >
              Approve
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    withdraw: Object,
    modal: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Function
    }
  },
  data: () => ({
    size: 70
  }),
  computed: {
    ...mapGetters({ loading: 'admin/getLoading' })

  },
  methods: {
    ...mapActions({ updatewithdraw: 'admin/updateTransactions' }),
    update (status) {
      const payload = {
        ID: this.withdraw.withdrawID,
        transactionID: this.withdraw.transactionID,
        status,
        message: `Transaction ${status === 'success' ? 'Approved' : 'Declined'}`,
        type: 'withdraw',
        amount: parseInt(this.withdraw.amount.split(',').join('').slice(1)),
        userID: this.withdraw.userID
      }

      this.updatewithdraw(payload)
      this.checkIfDone()
    },
    checkIfDone () {
      setInterval(() => {
        if (!this.loading.withdraw) {
          setTimeout(() => {
            this.toggle(false, {})
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
