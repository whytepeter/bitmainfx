<template>
  <v-dialog
    v-model="drawer"
    persistent
  >
    <v-card :loading="loading.delete" flat max-width="300" class="mx-auto">
      <v-card-title class="text-subtitle-1 font-weight-medium text-uppercase">
        Confirm Delete
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
            <div>You are about to delete {{ wallet && wallet.name }} address</div>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-btn
              depressed
              block
              outlined
              color="primary"
              class="text-capitalize rounded text-subtitle-2 font-weight-regular ma-0"
              @click="toggle(false)"
            >
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-btn
              depressed
              block
              :loading="loading.delete"
              color="error"
              class="text-capitalize rounded text-subtitle-2 font-weight-regular ma-0"
              @click="deleteWallet"
            >
              Delete
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
    wallet: Object,
    drawer: {
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
    ...mapActions({ deleteAddress: 'admin/deleteAddress' }),
    deleteWallet () {
      console.log(this.wallet)
      this.deleteAddress(this.wallet)
      // this.checkIfDone()
    },
    checkIfDone () {
      setInterval(() => {
        if (!this.loading.delete) {
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
