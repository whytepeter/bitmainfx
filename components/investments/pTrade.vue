<template>
  <p-container tile :title="'Live Trade'">
    <template v-slot:header>
      <v-btn
        depressed
        color="secondary"
        class="text-subtitle-2 font-weight-normal mx-1"
        @click="toggle(false)"
      >
        Close
        <v-icon size="20" right>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
    <VueTradingView
      :options="{
        symbol: 'BINANCE:BTCUSDT',
        theme: 'light',
        'allow_symbol_change': true,
      }"
    />
  </p-container>
</template>

<script>
import VueTradingView from 'vue-trading-view'
import pContainer from '../other/pContainer.vue'
export default {
  components: { pContainer, VueTradingView },
  props: {
    toggle: Function
  }

}
</script>

<style>

</style>
