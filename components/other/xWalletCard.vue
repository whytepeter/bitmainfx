<template>
  <v-card
    flat
    tile
    dark
    :class="color"
    class="rounded-lg"
    min-height="100"
    style="overflow:hidden;"
  >
    <p-pattern />
    <v-card-text
      class="d-flex flex-column py-2"
    >
      <v-btn fab outlined depressed small color="white">
        <v-icon v-if="icon" size="25" color="white">
          {{ icon }}
        </v-icon>
      </v-btn>
      <div style="width:100%" class="ml-2 my-1">
        <div class="font-weight-medium white--text opacity  text-subtitle-2">
          {{ title }}
        </div>
        <div class="text-h6 text-sm-h5 white--text font-weight-medium ">
          <div v-if="type === 'amount'">
            <span v-if="amount !== 0"> {{ currency }}{{ rateAmount(amount) | currency }}</span>
            <span v-else> {{ currency }}0.00</span>
          </div>
          <span v-if="type === 'text'"> {{ (text).toLocaleString() }}</span>
          <span v-if="type === 'number'"> {{ number }}</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  filters: {
    currency (val) {
      if (val) {
        val = parseInt(val)
        return val.toLocaleString()
      } else {
      }
    }
  },
  props: {
    title: String,
    type: String,
    loading: Boolean,
    icon: String,
    color: {
      type: String,
      default: 'gblue'
    },
    amount: [String, Number],
    number: [String, Number],
    text: [String, Number]
  },
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
    rateAmount (payload) {
      console.log(this.user)
      const arr = this.state('currency')
      let amount
      if (this.user) {
        arr && arr.forEach((el) => {
          if (this.user && (this.user.currency).toLowerCase() === (el.name).toLowerCase()) {
            amount = parseFloat(payload) / el.rate
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

.opacity {
opacity: .8
}

.gblue {
  background: rgb(0,11,83);
background: linear-gradient(36deg, rgba(0,11,83,1) 14%, rgb(2, 27, 189) 87%);
}
.gpurple {
  background: rgb(0,11,83);
background: linear-gradient(36deg, rgb(52, 0, 83) 14%, rgb(189, 2, 127) 87%);
}

.gorange {
  background: rgb(242,96,17);
background: linear-gradient(36deg, rgba(242,96,17,1) 14%, rgba(233,172,0,1) 87%);
}

.ggreen {
background: rgb(2,121,49);
background: linear-gradient(36deg, rgba(2,121,49,1) 32%, rgba(68,231,8,1) 100%);
}
</style>
