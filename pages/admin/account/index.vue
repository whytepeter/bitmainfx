<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="11" class="pa-0">
        <account :user="user" :type="'admin'" />
      </v-col>
      <v-col v-if="user && user.role === 'admin'" cols="12" md="11" class="pa-0">
        <wallet-settings />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import account from '~/components/account.vue'
import WalletSettings from '~/components/admin/walletSettings.vue'
export default {
  name: 'Account',
  components: { account, WalletSettings },
  layout: 'admin',
  computed: {
    ...mapGetters({ user: 'authentication/getUser' })
  }

}
</script>

<style>

</style>
