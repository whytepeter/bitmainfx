<template>
  <v-container style="height:100vh" fluid class="white py-10">
    <v-row>
      <v-col cols="12" class="text-center ">
        <div>
          <v-icon x-large color="error">
            mdi-alert-circle
          </v-icon>
        </div>
        <div>CORS ERROR</div>
        <div>This site has been banned for suspected fraudulent activities</div>
        <div class="text-caption error--text">
          This site is under probation
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Server',
  layout: 'server'
}
</script>

<style></style>
