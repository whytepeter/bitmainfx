<template>
  <div>
    <v-dialog
      v-model="modal"
      persistent
      width="500"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card :tile="$vuetify.breakpoint.xsOnly" class="py-2 rounded-sm-lg">
        <v-card-title class="text3--text font-weight-regular text-h6  py-4">
          Transaction
          <!-- <v-chip outlined label small color="accent" class="mx-2">
            {{ transaction && transaction.status }}
          </v-chip> -->
          <v-spacer />
          <v-icon color="text3" @click="close()">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-divider :class="getColor(transaction && transaction.status)" />
        <v-card-text class="text1--text">
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Reference
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ transaction && transaction.transactionID }}
            </v-col>
          </v-row>
          <v-divider />
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Amount
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ currency }}{{ transaction && transaction.amount | currency }}
            </v-col>
          </v-row>
          <v-divider />
          <!-- <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Account Balance
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              <div v-if="transaction && transaction.balance !== 0">
                {{ currency }}{{ transaction && transaction.balance | currency }}
              </div>
              <div v-else>
                {{ currency }}0.00
              </div>
            </v-col>
          </v-row> -->
          <v-divider />
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Type
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2 text-capitalize">
              <v-chip label small :color="getColor(transaction && transaction.type)" class="">
                {{ transaction && transaction.type }}
              </v-chip>
            </v-col>
          </v-row>
          <v-divider />
          <!-- Withdrawal Payment Methods -->
          <v-row v-if="transaction && transaction.method" no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Payment Method
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2 text-capitalize">
              {{ transaction && transaction.method }}
            </v-col>
          </v-row>
          <!-- Paypal Withdrawal Method -->
          <v-divider v-if="transaction && transaction.method" />
          <v-row v-if="transaction && transaction.method === 'Paypal'" no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Paypal Address
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2 text-capitalize">
              {{ transaction && transaction.paypalAddress }}
            </v-col>
          </v-row>
          <v-divider v-if="transaction && transaction.method === 'Bank Transfer'" />

          <!-- Bank Transfer Withdrawal Method -->
          <v-row v-if="transaction && transaction.method === 'Bank Transfer'" no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Bank Name
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2 text-capitalize">
              {{ transaction && transaction.bank.name }}
            </v-col>
          </v-row>
          <v-divider v-if="transaction && transaction.method === 'Bank Transfer'" />

          <!-- Bank Transfer Withdrawal Method -->
          <v-row v-if="transaction && transaction.method === 'Bank Transfer'" no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Account Name
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2 text-capitalize">
              {{ transaction && transaction.bank.accName }}
            </v-col>
          </v-row>
          <v-divider v-if="transaction && transaction.method === 'Bank Transfer'" />

          <!-- Bank Transfer Withdrawal Method -->
          <v-row v-if="transaction && transaction.method === 'Bank Transfer'" no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Account Number
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2 text-capitalize">
              {{ transaction && transaction.bank.accNumber }}
            </v-col>
          </v-row>
          <v-divider v-if="transaction && transaction.method === 'Bank Transfer'" />

          <!-- Other Withdrawal Methods -->
          <v-row v-if="transaction && transaction.method !== 'Paypal' && transaction.method !== 'Bank Transfer'" no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              {{ transaction && transaction.method }} Address
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2 text-capitalize">
              {{ transaction && transaction.wallet }}
            </v-col>
          </v-row>
          <v-divider v-if="transaction && transaction.method !== 'Paypal' && transaction.method !== 'Bank Transfer'" />
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Date
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ transaction && transaction.date }}
            </v-col>
          </v-row>
          <v-divider />
          <v-row v-if="transaction && transaction.message" no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Message
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ transaction && transaction.message }}
            </v-col>
          </v-row>
          <v-divider />
          <v-row no-gutters class="py-2">
            <v-col cols="4" class="py-1">
              Description
            </v-col>
            <v-col cols="8" class="py-1 text-right text-subtitle-2">
              {{ transaction && transaction.purpose }}
            </v-col>
          </v-row>
          <!-- <v-divider /> -->
          <v-row no-gutters class="mt-4 d-block d-md-none">
            <v-col cols="12" class=" d-flex">
              <v-spacer />
              <v-btn depressed color="primary" class="text-subtitle-2 font-weight-normal" @click="close()">
                Okay
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TransactionDetails',
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
    modal: {
      type: Boolean,
      default: false
    },
    toggle: Function,
    transaction: {
      type: Object,
      default: () => ({
        id: 'nill',
        reference: 'nill',
        response: 'nill',
        type: 'nill',
        status: 'nill',
        shortDescription: 'nill',
        longDescription: 'nill',
        amount: 'nill',
        balance: 'nill',
        date: 'nill'
      })
    }
  },
  data: () => ({}),
  computed: {
    ...mapGetters({ user: 'authentication/getUser', state: 'controller/getState' }),
    currency () {
      const arr = this.state('currency')
      let currency
      if (this.user) {
        arr && arr.forEach((el) => {
          if (this.user && (this.user.currency).toLowerCase() === (el.name).toLowerCase()) {
            currency = el.symbol
          }
        })
      } else {
        currency = '$'
      }
      return currency
    }
  },
  methods: {
    getColor (type) {
      if (type && type.toLowerCase() === 'fail') {
        return 'error'
      } else if (type && type.toLowerCase() === 'success') {
        return 'success'
      } else if (type && type.toLowerCase() === 'pending') {
        return 'warning'
      } else {
        return 'primary'
      }
    },
    close () {
      this.toggle(null, false)
    },
    rateAmount (payload) {
      console.log(this.user)
      const arr = this.state('currency')
      let amount
      if (this.user) {
        arr && arr.forEach((el) => {
          if (this.user && (this.user.currency).toLowerCase() === (el.name).toLowerCase()) {
            amount = parseFloat(parseFloat(payload) / el.rate)
          }
        })
      } else {
        amount = payload
      }

      console.log(amount)
      return amount
    }
  }

}
</script>

<style>

</style>
