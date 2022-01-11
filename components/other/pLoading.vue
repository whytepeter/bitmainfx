<template>
  <v-col v-if="!loading.all" style="z-index:3" cols="12" class="pa-0 pLoading">
    <v-row no-gutters class="ma-0">
      <v-col cols="6" style="padding:2px 0" class=" primary" />
      <v-col cols="6" style="padding:2px 0" class=" secondary" />
    </v-row>
  </v-col>
  <v-col v-else cols="12" class="pa-0 pLoading">
    <v-row no-gutters class="ma-0">
      <v-col cols="6">
        <v-progress-linear color="primary" indeterminate />
      </v-col>
      <v-col cols="6">
        <v-progress-linear color="secondary" indeterminate />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PLoading',
  props: {
    color: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    ...mapGetters({ loading: 'authentication/getLoading' })
  }

}
</script>

<style>
.pLoading{
  position: fixed;
  top:0;
  left:0
}
</style>
