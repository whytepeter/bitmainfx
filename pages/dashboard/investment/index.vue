<template>
  <v-container>
    <v-row v-if="!showLive" justify="center" class="ma-0">
      <v-col cols="12" md="11" class="pa-0">
        <p-container v-if="hasInvestment" dark :color="'primary'" :title="''">
          <div class="d-flex align-center mt-n2">
            <span class="text-subtitle-1 font-weight-regular text-uppercase">Live Trade</span>
            <v-spacer />
            <v-btn
              depressed
              color="secondary"
              class="text-subtitle-2 font-weight-normal mx-1"
              @click="toggleLive(true)"
            >
              View Trade
            </v-btn>
          </div>
        </p-container>
      </v-col>
      <!-- <v-col cols="12" md="11" class="px-0 pt-0">
        <v-card flat dark color="primary darken-1">
          <v-card-text>
            <div>
              <span>Amount</span>
              <span>€277</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col> -->
      <v-col cols="12" md="11" class="px-0 pt-0">
        <p-container :color="'primary'" :title="''">
          <v-data-table
            dark
            :search="search"
            loading-text="Loading... Please wait"
            :loading="loading.investment"
            :headers="headers"
            :items="investments"
            class="mt-n5 primary darken-1 rounded-lg"
          >
            <template v-slot:top>
              <v-toolbar flat class="primary darken-1 rounded-lg">
                <v-toolbar-title class="text-subtitle-2   d-flex font-weight-light text-uppercase">
                  Trades
                </v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-chip class="ml-1" color="secondary" label outlined>
                  {{ investments.length }}
                </v-chip>

                <v-spacer />
                <v-text-field
                  v-model="search"
                  prepend-icon="mdi-magnify"
                  class="d-none d-sm-block"
                  label="Search"
                  single-line
                  hide-details
                />
              <!-- <v-spacer></v-spacer>
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Investment</v-btn> -->
              </v-toolbar>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip small :color="getColor(item.status)" class="text-uppercase">
                {{ item.status }}
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn
                color="secondary"
                outlined
                small
                @click="openView( true, item)"
              >
                view
              </v-btn>
            </template>
          </v-data-table>
        </p-container>
        <p-container :color="'primary'" dark :title="'Investment Plans'">
          <plan class="mt-2" />
        </p-container>
      </v-col>
    </v-row>
    <v-row v-else no-gutters class="ma-0">
      <p-trade :toggle="toggleLive" />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import plan from '~/components/investments/plan.vue'
import PTrade from '~/components/investments/pTrade.vue'
import PContainer from '~/components/other/pContainer.vue'
export default {
  name: 'Investment',
  components: { plan, PContainer, PTrade },
  layout: 'dashboard',

  data: () => ({
    showLive: false,
    hasInvestment: false,
    search: '',
    headers: [
      {
        text: 'Amount',
        align: 'start',
        sortable: false,
        value: 'displayAmount'
      },
      {
        text: 'Plan',
        value: 'plan'
      },

      {
        text: 'Start Date',
        value: 'date'
      },
      {
        text: 'Maturity Date',
        value: 'maturityDate'
      },

      {
        text: 'Status',
        value: 'status'
      }
    ]
  }),
  computed: {
    ...mapGetters({ loading: 'controller/getLoading', state: 'controller/getState', user: 'authentication/getUser' }),
    investments () {
      const arr = this.state('investments')
      arr.forEach((el) => {
        el.displayAmount = `${this.user && this.user.symbol}${(el.amount).toLocaleString()}`
        if (el.status === 'ongoing') {
          this.hasInvestment = true
        }
      })

      return arr
    }
  },
  methods: {
    getColor (type) {
      if (type && type.toLowerCase() === 'fail') {
        return 'error'
      } else if ((type && type.toLowerCase() === 'completed') || (type && type.toLowerCase() === 'success')) {
        return 'success'
      } else if (type && type.toLowerCase() === 'ongoing') {
        return 'warning'
      } else {
        return type
      }
    },
    toggleLive (state) {
      this.showLive = state
    }
  }

}
</script>

<style>

</style>
