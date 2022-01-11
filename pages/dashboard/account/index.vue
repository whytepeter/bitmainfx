<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="11" class="px-0">
        <account :type="user && user.role" :user="user" />
      </v-col>
      <v-col cols="12" md="11" class="px-0">
        <referral />
      </v-col>
      <v-col cols="12" md="11" class="px-0">
        <v-btn block color="error" outlined class="text-subtitle-1 font-weight-light text-capitalize" @click="logout">
          <v-icon left class="mr-3">
            mdi-logout-variant
          </v-icon>
          Logout
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import account from '~/components/account.vue'
import Referral from '~/components/referral.vue'
export default {
  name: 'Account',
  components: { account, Referral },
  layout: 'dashboard',
  computed: {
    ...mapGetters({ user: 'authentication/getUser' })
  },
  methods: {
    ...mapActions({ logout: 'authentication/logoutUser' })
  }

}
</script>

<style>

</style>
