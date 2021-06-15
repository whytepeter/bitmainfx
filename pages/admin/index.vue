<template>
  <v-container>
    <v-row>
      <v-fab-transition>
        <v-btn
          style="top:10px"
          color="primary"
          fab
          dark
          small
          absolute
          top
          right
        >
          <v-badge
            bordered
            content="2"
            color="error"
          >
            <v-icon color="accent">
              mdi-bell
            </v-icon>
          </v-badge>
        </v-btn>
        </v-badge>
      </v-fab-transition>

      <v-col cols="10" md="3">
        <v-card dark color="primary">
          <v-card-text class="text-subtitle-1 d-flex align-center justify-space-between">
            <span>Total Users:</span> <span class=" success--text ml-2 font-weight-medium">({{ totalUsers }})</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(item, i) in data"
        :key="i"
        :cols="item.name === 'Total Deposite' ? 12 : 6"
        md="4"
      >
        <v-card class="py-4">
          <v-card-title>
            <span class="text-subtitle-2 text-sm-headline">{{ item.name }}</span>
            <v-spacer />
            <v-icon fab color="secondary">
              {{ item.icon }}
            </v-icon>
          </v-card-title>
          <!-- <v-divider /> -->
          <v-card-text>
            <span class="text-h5 text-sm-h4 font-weight-medium">${{ item.amount | currency }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Admin',
  layout: 'admin',
  filters: {
    currency (val) {
      if (val) {
        return val.toLocaleString()
      } else {

      }
    }
  },
  data: () => ({

  }),
  computed: {
    ...mapGetters({ totalDeposite: 'users/getTotalDeposite', totalUsers: 'users/totalUsers', totalInvestments: 'users/getTotalInvestments', totalCommissions: 'users/getTotalCommissions' }),

    data () {
      return [

        {
          name: 'Total Deposite',
          icon: 'mdi-cash-plus',
          amount: this.totalDeposite
        },
        {
          name: 'Total Investments',
          icon: 'mdi-bitcoin',
          amount: this.totalInvestments
        },
        {
          name: 'Total Commissions',
          icon: 'mdi-cash-usd',
          amount: this.totalCommissions
        }
      ]
    }

  },

  head () {
    return {
      title: 'Dashboard',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Universal Crypto Trade is an online registered investment platform managed by a team of experienced and competent professionals in the finance and investment industry within and outside the country. Our major aim is to eliminate poverty, empower youths and incapable men within a short period of investment.'
        }
      ]

    }
  }

}
</script>

<style>

</style>
