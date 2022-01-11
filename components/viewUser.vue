<template>
  <v-card outlined>
    <v-alert
      v-if="user.block"
      dense
      type="error"
      tile
    >
      This account is <strong>Blocked</strong>
    </v-alert>
    <v-card-title class="text-subtitle-1 font-weight-medium">
      {{ user && user.firstName }} {{ user && user.lastName }}
      <v-btn
        depressed
        outlined
        color="primary"
        class="text-capitalize rounded text-subtitle-2 font-weight-regular ml-2"
        @click="toggleDrawer(true)"
      >
        <v-icon :left="$vuetify.breakpoint.smAndUp">
          mdi-account-edit
        </v-icon>
        <span class="d-none d-sm-block">Edit User</span>
      </v-btn>
      <v-spacer />
      <v-btn
        depressed
        outlined
        color="primary"
        class="text-capitalize rounded text-subtitle-2 font-weight-regular"
        @click="toggle(false, {})"
      >
        <v-icon :left="$vuetify.breakpoint.smAndUp">
          mdi-close
        </v-icon>
        <span class="d-none d-sm-block">Close</span>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-col cols="12" class="pa-0">
        <v-divider />
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tab
            v-for="tab in tabs"
            :key="tab.name"
            :href="tab.href"
            class="text-capitalize"
          >
            {{ tab.name }}
          </v-tab>
        </v-tabs>
        <v-divider />
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-tabs-items v-model="tab" class="grey lighten-3">
          <v-tab-item value="account">
            <account :type="'admin'" :user="user" :switch-tabs="switchTabs" />
          </v-tab-item>
          <v-tab-item value="deposit">
            <deposit :user="user" :switch-tabs="switchTabs" />
          </v-tab-item>
          <v-tab-item value="withdraw">
            <withdraw :user="user" :switch-tabs="switchTabs" />
          </v-tab-item>
          <v-tab-item value="verification">
            <view-verification :user="user" :switch-tabs="switchTabs" />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-card-text>
    <edit-user :user="user" :drawer="drawer" :toggle="toggleDrawer" />
  </v-card>
</template>

<script>
import account from './account.vue'
import Deposit from './admin/deposit.vue'
import EditUser from './admin/editUser.vue'
import ViewVerification from './admin/verification/viewVerification.vue'
import Withdraw from './admin/withdraw.vue'
export default {
  components: { account, EditUser, Deposit, Withdraw, ViewVerification },
  props: {
    user: Object,
    toggle: Function
  },
  data: () => ({
    drawer: false,
    tab: null,
    tabs: [
      { name: 'Account Info', href: '#account' },
      { name: 'Deposit', href: '#deposit' },
      { name: 'Withdraw', href: '#withdraw' },
      { name: 'verification', href: '#verification' }
    ]
  }),
  created () {
    this.$store.dispatch('admin/initializeVerification', this.user && this.user.userID)
  },
  methods: {
    switchTabs (tab) {
      this.tab = tab
    },
    toggleDrawer (state) {
      this.drawer = state
    }
  }

}
</script>

<style>

</style>
