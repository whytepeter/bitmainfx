<template>
  <v-snackbar
    v-model="on"
    :value="true"
    :top="top"
    :bottom="!top"
    right
    color="primary gpop"
    elevation="24"
  >
    <div class="text-subtitle-1 font-weight-medium">
      {{ name }}
    </div>
    <div>Earned <span class="accent--text font-weight-medium">{{ currency }}{{ rateAmount(amount) | currency }}</span> 1 minute ago</div>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  filters: {
    currency (val) {
      val = parseFloat(val)
      return val.toLocaleString()
    }
  },
  props: {
    top: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    on: false,
    name: '',
    amount: 0,
    newUsers: [],
    users: [{ name: 'Bevilacqua ', amount: 10000 }, { name: 'Gracie', amount: 20333 }, { name: 'Eno ', amount: 90086 }, { name: 'Willette', amount: 12345 }, { name: 'Tinder', amount: 90099 }, { name: 'Hertha', amount: 56000 }, { name: 'Tong ', amount: 1021 }, { name: 'Margaret', amount: 56000 }, { name: 'Gleeson', amount: 8000 }, { name: 'Jacques', amount: 70050 },
      { name: 'Dell', amount: 12000 },
      { name: 'Criselda', amount: 9200 },
      { name: 'Oriley', amount: 4300 },
      { name: 'Vennie', amount: 56211 },
      { name: 'Herter', amount: 6703 },
      { name: 'Deangelo', amount: 10000 },
      { name: 'Whitsett', amount: 40000 },
      { name: 'Edmond', amount: 47000 },
      { name: 'Bartolome', amount: 1000600 },
      { name: 'Dawne', amount: 95300 },
      { name: 'Colter', amount: 2130 },
      { name: 'Annice', amount: 50006 },
      { name: 'Remmers', amount: 8002 },
      { name: 'Tula', amount: 20022 },
      { name: 'Lisk', amount: 20093 },
      { name: 'Kam', amount: 1092 },
      { name: 'Viggiano', amount: 9802 },
      { name: 'Ellyn', amount: 9888 },
      { name: 'Nam', amount: 1200 },
      { name: 'Jacquelin', amount: 5600 },
      { name: 'Huguley', amount: 8990 },
      { name: 'Leonardo', amount: 7001 },
      { name: 'Alper', amount: 8600 },
      { name: 'Sheridan', amount: 8001 },
      { name: 'Benoit', amount: 6002 },
      { name: 'Demetrius', amount: 30000 },
      { name: 'Oathout', amount: 12000 },
      { name: 'Numbers', amount: 9998 },
      { name: 'Deere', amount: 25678 },
      { name: 'Billie', amount: 60000 },
      { name: 'Dehne', amount: 1200 },
      { name: 'Delbert', amount: 900002 },
      { name: 'Fritze', amount: 5678 },
      { name: 'Lynn', amount: 8122 },
      { name: 'Blair', amount: 2700 },
      { name: 'Mellisa', amount: 7000 },
      { name: 'Fifield', amount: 10000 },
      { name: 'Traci', amount: 2333 },
      { name: 'Yedinak', amount: 90086 },
      { name: 'Nerissa', amount: 12345 },
      { name: 'Misner', amount: 9900 },
      { name: 'Douglas', amount: 56000 },
      { name: 'Heisler', amount: 1021 },
      { name: 'Samual', amount: 56000 },
      { name: 'Britt', amount: 8000 },
      { name: 'Lecia', amount: 70050 },
      { name: 'Vero', amount: 12000 },
      { name: 'Dara', amount: 9200 },
      { name: 'Kingsbury', amount: 4300 },
      { name: 'Maranda', amount: 56211 },
      { name: 'Harvison', amount: 6703 },
      { name: 'Ashton', amount: 10000 },
      { name: 'Daniell', amount: 40000 },
      { name: 'Gina', amount: 47000 },
      { name: 'Bosch', amount: 1000600 },
      { name: 'Kathrin', amount: 95300 },
      { name: 'Shenkel', amount: 2130 },
      { name: 'Beth', amount: 5006 },
      { name: 'Desilva', amount: 8002 },
      { name: 'Maximina', amount: 20012 },
      { name: 'Cloe', amount: 20093 },
      { name: 'Vernie', amount: 1092 },
      { name: 'Varnes', amount: 9802 },
      { name: 'Elna', amount: 98188 },
      { name: 'Inman', amount: 1200 },
      { name: 'Terrilyn', amount: 5600 },
      { name: 'Morace', amount: 8990 },
      { name: 'Broderick', amount: 7001 },
      { name: 'Palmore', amount: 86000 },
      { name: 'Stepanie', amount: 8001 },
      { name: 'Blackmer', amount: 4000 },
      { name: 'Ashly', amount: 7090 },
      { name: 'Butera', amount: 3001 },
      { name: 'Kathline', amount: 16000 },
      { name: 'Mcgowen', amount: 8001 },
      { name: 'Vonnie', amount: 6002 },
      { name: 'Elkington', amount: 30000 },
      { name: 'Tressa', amount: 12000 },
      { name: 'rvin', amount: 9998 },
      { name: 'Dina', amount: 25678 },
      { name: 'Seller', amount: 60000 },
      { name: 'Michale', amount: 12000 },
      { name: 'Wisener', amount: 900002 },
      { name: 'Magan', amount: 5678 },
      { name: 'Mealing', amount: 8122 },
      { name: 'Latonia', amount: 2700 },
      { name: 'Wingrove', amount: 70000 },
      { name: 'Merilyn', amount: 9100 },
      { name: 'Lueck', amount: 4569 }
    ]
  }),

  created () {
    this.newUsers = this.users

    setInterval(() => {
      this.initPopup()
    }, 50000)
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
    initPopup () {
      this.on = true
      const randomIndex = Math.floor(Math.random() * this.users.length)
      // console.log(randomIndex)
      if (this.users.length > 0) {
        this.name = this.users[randomIndex].name
        this.amount = this.users[randomIndex].amount
        this.users.splice(randomIndex, 1)
      } else {
        // console.log('finish')
        this.users = this.arr
        // console.log('users', this.users)
      }

      setTimeout(() => {
        this.on = false
      }, 3000)
    },

    generate () {
      const newUser = []
      this.names.forEach((err) => {
        const index = this.names.indexOf(err)

        newUser.push({
          name: err,
          amount: this.numbers[index]
        })
      })

      // console.log(newUser)
    },

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
.gpop {
  background: rgb(0,11,83);
background: linear-gradient(36deg, rgb(1, 12, 80) 14%, rgb(3, 23, 151) 87%);
}
</style>
