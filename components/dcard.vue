<template>
  <v-card
    flat
    dark
    class="rounded-lg bgcard"
    min-height="100"
    style="overflow:hidden;"
    @click="action"
  >
    <v-card-text
      class="d-flex flex-column py-2"
    >
      <v-btn
        v-if="icon"
        fab
        outlined
        depressed
        small
        color="white"
      >
        <v-icon size="25" color="white">
          {{ icon }}
        </v-icon>
      </v-btn>
      <div style="width:100%" class="ml-2 mt-3">
        <div class="font-weight-medium white--text opacity  text-subtitle-2">
          {{ title }}
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    action: Function
  }
}
</script>

<style>

.bgcard {
     background: rgb(0,11,83);
background: linear-gradient(36deg, rgb(1, 14, 100) 14%, rgb(0, 23, 173) 87%);
}

</style>
