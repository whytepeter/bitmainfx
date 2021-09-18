<template>
  <v-container>
    <v-row v-if="alert.is" no-gutters justify="center" style="width:100vw; position: fixed; top: 4rem; left:0; z-index:2">
      <v-col cols="12" md="10" :class="[alert.is ? 'animate__animated animate__fadeInDown' : 'animate__animated animate__fadeOutUp' ]">
        <v-alert
          :type="alert.type"
          border="top"
          dark
        >
          {{ alert.message }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <div style="height:40px; padding:0px; margin:0px; width: 100%;">
          <iframe
            src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=no"
            width="100%"
            height="36px"
            scrolling="auto"
            marginwidth="0"
            marginheight="0"
            frameborder="0"
            border="0"
            style="border:0;margin:0;padding:0;"
          />
        </div><div style="color: #626B7F; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;">
          <a href="https://coinlib.io" target="_blank" style="font-weight: 500; color: #626B7F; text-decoration:none; font-size:11px">Cryptocurrency Prices</a>&nbsp;by Coinlib
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="px-0">
        <v-card flat dark color="transparent" class="pa-0">
          <v-card-title class="pb-1 px-4">
            Hi,
            <span v-if="user && !user.username" class="ml-2">
              {{ user !== null && user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'Full Name' }}
            </span>
            <span v-else class="ml-2">
              {{ user !== null ? user.username : 'Username' }}
            </span>
          </v-card-title>
          <v-card-text class="py-0">
            <showcase />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="px-0">
        <v-card flat dark color="transparent">
          <v-card-title>Investment Packages</v-card-title>
          <v-divider />
          <v-card-text>
            <plans />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card flat color="white">
          <v-card-title>
            My Investment
            <v-spacer />
            <v-text-field
              v-model="table.search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
          </v-card-title>
          <v-data-table mobile class="" :headers="table.headers" :items="table.info" :search="table.search">
            <template v-slot:item.status="{ item }">
              <v-chip :color="getColor(item.status)">
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import showcase from '../../components/user/showcase.vue'
import plans from '../../components/user/plans.vue'
export default {
  name: 'Dashboard',
  layout: 'dashboard',

  components: {
    showcase,
    plans
  },
  data: () => ({
    currentDate: '',
    ip: ''

  }),

  computed: {
    ...mapGetters({ user: 'authentication/getUser', info: 'wallet/getInvestmentStatus', alert: 'authentication/getAlert' }),
    table () {
      return {

        search: '',
        headers: [
          {
            text: 'Package',
            align: 'start',
            sortable: false,
            value: 'name'
          },
          { text: 'Capital', value: 'capital' },
          { text: 'Date Invested', value: 'date' },
          { text: 'Elapse', value: 'elapse' },
          { text: 'Status', value: 'status' }

        ],
        info: this.info

      }
    }

  },
  created () {
    setInterval(() => {
      const d = new Date()
      const hour = d.getHours()
      const min = d.getMinutes()
      const sec = d.getSeconds()

      const date = `${this.getDate('current')} | ${hour} : ${min} : ${sec}`
      this.currentDate = date
    }, 1000)

    // get ip
    this.getIp()
  },
  methods: {
    getColor (status) {
      if (status === 'Success' || status === 'success') {
        return 'success'
      } else if (status === 'Pending' || status === 'pending') {
        return 'warning'
      } else if (status === 'Ongoing' || status === 'ongoing') {
        return 'info'
      }
    },
    getDate (get, days) {
      const currentDate = new Date()
      let newDate

      function addDays (days) {
        const result = new Date(currentDate)
        result.setDate(result.getDate() + days)
        return formatDate(result)
      }

      function formatDate (date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December']
        return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
      }

      if (get === 'add') {
        newDate = addDays(days)
      } else if (get === 'current') {
        newDate = formatDate(currentDate)
      }
      return newDate
    },

    getIp () {
      fetch('https://api.ipify.org?format=json')
        .then(x => x.json())
        .then(({ ip }) => {
          this.ip = ip
        })
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
          content: 'Invest in any of BitmainFX plans and packages'
        }
      ]
    }
  }

}
</script>

<style>

</style>
