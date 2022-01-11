<template>
  <v-container>
    <v-row justify="space-around">
      <v-col v-for="plan in plans" :key="plan.name" cols="12" sm="6" md="4">
        <v-card max-width="300" class="mx-auto">
          <v-card-title class=" headline font-weight-medium justify-center">
            {{ plan.name }} Package
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row justify="center">
              <v-col cols="12">
                <div class="d-flex justify-space-between">
                  <span>Minimum Capital</span>
                  <span class="font-weight-medium text-subtitle-1">${{ plan.minimum | currency }}</span>
                </div>
                <div class="d-flex justify-space-between">
                  <span>Maximum Capital</span>
                  <span class="font-weight-medium text-subtitle-1">${{ plan.maximum | currency }}</span>
                </div>
              </v-col>
              <v-col cols="12">
                <v-btn block depressed color="primary" @click.stop="plan.open = true">
                  Invest
                </v-btn>
              </v-col>
            </v-row>
            <plan-modal :plan="plan" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import planModal from './planModal'
export default {

  components: {
    planModal
  },
  filters: {
    currency (value) {
      return value.toLocaleString()
    }
  },
  data: () => ({
    plans: [
      {
        open: false,
        days: 10,
        name: 'Basic',
        minimum: 100,
        maximum: 500,
        withdrawCommission: 100

      },
      {
        open: false,
        days: 10,
        name: 'Bronze',
        minimum: 600,
        maximum: 1500,
        withdrawCommission: 150

      },

      {
        open: false,
        name: 'Silver',
        days: 14,
        minimum: 1600,
        maximum: 2500,
        withdrawCommission: 200
      },
      {
        open: false,
        name: 'Gold',
        days: 10,
        minimum: 2600,
        maximum: 3500,
        withdrawCommission: 300
      },
      {
        open: false,
        days: 10,
        name: 'Diamond',
        minimum: 3600,
        maximum: 4500,
        withdrawCommission: 350

      },
      {
        open: false,
        days: 10,
        name: 'Platinum',
        minimum: 4600,
        maximum: 6000,
        withdrawCommission: 400

      }

    ]
  })

}
</script>

<style>

</style>
