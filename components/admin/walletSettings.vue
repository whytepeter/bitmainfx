<template>
  <p-container :loading="loading.wallet" tile title="Wallet Address">
    <template v-slot:header>
      <v-btn depressed color="secondary" small class="text-capitalize rounded text-subtitle-2 font-weight-regular" @click="toggle(true)">
        <v-icon small>
          mdi-plus
        </v-icon>
        Add
      </v-btn>
    </template>

    <v-row class="ma-0">
      <v-col v-for="wallet in wallets" :key="wallet.id" cols="12" md="6" class="py-0">
        <div class="d-flex align-center font-weight-medium ">
          <span> {{ wallet.name }}</span>
          <v-spacer />
          <v-menu
            left
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                icon
                v-on="on"
              >
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item dense @click="toggle(true, 'edit', wallet)">
                <v-list-item-icon>
                  <v-icon size="20" class="px-1">
                    mdi-wallet
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title>Edit {{ wallet.name }} Address</v-list-item-title>
              </v-list-item>
              <v-list-item dense @click="toggleDelete(true, wallet)">
                <v-list-item-icon>
                  <v-icon size="20" class="px-1">
                    mdi-delete
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-text-field
          type="text"
          name="wallet"
          dense
          outlined
          color="primary"
          disabled
          :value="wallet.address"
          required
          class="text-subtitle-2 font-weight-light "
        />
      </v-col>
    </v-row>
    <add-wallet :wallet="wallet" :type="type" :drawer="drawer.add" :toggle="toggle" />
    <delete-wallet :wallet="wallet" :drawer="drawer.delete" :toggle="toggleDelete" />
  </p-container>
</template>

<script>
import { mapGetters } from 'vuex'
import pContainer from '../other/pContainer.vue'
import AddWallet from './addWallet.vue'
import DeleteWallet from './deleteWallet.vue'
export default {
  components: { pContainer, AddWallet, DeleteWallet },
  data: () => ({
    drawer: {
      add: false,
      edit: false,
      delete: false
    },
    wallet: {},
    type: ''

  }),
  computed: {
    ...mapGetters({ state: 'admin/getState', loading: 'admin/getLoading' }),
    wallets () {
      return this.state('wallet')
    }
  },
  methods: {
    toggle (state, type, wallet) {
      this.drawer.add = state

      if (state === true) {
        this.wallet = wallet
        this.type = type
      } else {
        this.type = 'add'
      }

      console.log(wallet)
    },
    toggleDelete (state, wallet) {
      this.drawer.delete = state

      if (state === true) {
        this.wallet = wallet
      } else {

      }
    }
  }

}
</script>

<style>

</style>
