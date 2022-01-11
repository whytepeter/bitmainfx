<template>
  <v-card outlined>
    <v-card-text>
      <v-data-table
        :search="search"
        loading-text="Loading... Please wait"
        :loading="loading.withdraw"
        :headers="headers"
        :items="withdraws"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title class="text-subtitle-1 d-flex align-center text-uppercase">
              withdraw
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical />
            <v-chip class="ml-1" color="secondary" label outlined>
              {{ withdraws && withdraws.length }}
            </v-chip>

            <v-spacer />
            <v-text-field
              v-model="search"
              prepend-icon="mdi-magnify"
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
            color="primary"
            depressed
            small
            @click="action( true, item)"
          >
            Action
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>

    <withdraw-action :withdraw="withdraw" :modal="modal" :toggle="action" />
  </v-card>
</template>

</template>

<script>
import { mapGetters } from 'vuex'
import withdrawAction from './withdrawAction.vue'

export default {
  components: { withdrawAction },
  props: {
    user: Object
  },
  data: () => ({
    modal: false,
    withdraw: {},
    search: '',
    headers: [
      {
        text: 'Amount',
        align: 'start',
        sortable: false,
        value: 'amount'
      },

      {
        text: 'Date',
        value: 'date'
      },
      {
        text: 'Status',
        value: 'status'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
    ]
  }),
  computed: {
    ...mapGetters({ loading: 'admin/getLoading', state: 'admin/getState' }),
    withdraws () {
      const arr = []
      this.state('withdraws').forEach((el) => {
        el.amount = (el.amount).toLocaleString('en-US', {
          style: 'currency',
          code: 'US',
          currency: 'USD'
        })
        if (el.userID === this.user.userID) {
          arr.push(el)
        }
      })
      return arr
    }
  },
  methods: {

    action (state, withdraw) {
      this.withdraw = withdraw
      this.modal = state
    },

    getColor (type) {
      if (type && type.toLowerCase() === 'fail') {
        return 'error'
      } else if ((type && type.toLowerCase() === 'success') || (type && type.toLowerCase() === 'success')) {
        return 'success'
      } else if (type && type.toLowerCase() === 'pending') {
        return 'warning'
      } else {
        return type
      }
    }

  }

}
</script>

<style>

</style>
