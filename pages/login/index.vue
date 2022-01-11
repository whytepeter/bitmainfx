<template>
  <v-container>
    <v-row justify="center" class="py-16">
      <v-col cols="12" class="text-center">
        <!-- <v-btn color="accent" depressed :loading="loading.updateDB" class="text-subtitle-2 font-weight-light" @click="updatedDB">
          Update DB
        </v-btn> -->
        <xlogin />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import xlogin from '~/components/xlogin.vue'
export default {
  components: { xlogin },
  computed: {
    // ...mapGetters({ loading: 'authentication/getLoading' })
  },
  created () {
    // this.$router.push('/dashboard/home')
  },
  methods: {
    // ...mapActions({ updatedDB: 'authentication/updateDB' })
  }
}
</script>

<style></style>
