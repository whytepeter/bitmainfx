<template>
  <v-container>
    <!-- <v-row>
      <v-col v-if="alert.is" cols="12" md="8">
        <v-alert :type="alert.type">
          {{ alert.text }}
        </v-alert>
      </v-col>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Send Feedback</v-card-title>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field label="Subject" />
              </v-col>
              <v-col cols="12">
                <v-form @submit.prevent>
                  <v-textarea outlined placeholder="Message" />
                </v-form>
              </v-col>
              <v-col cols="6">
                <v-file-input
                  dense
                  type="file"
                  name="image"
                  chips
                  multiple
                  outlined
                  label="Add file"

                  required
                />
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn :loading="loading" depressed color="primary" @click="submit">
                  Send
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Notifications</v-card-title>
          <v-card-text>
            Blah Blah Blah
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col>
        <v-btn to="/dashboard">
          Back to dashboard
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Support',
  layout: 'dashboard',

  data: () => ({
    subject: '',
    message: '',
    alert: {
      is: false,
      type: '',
      text: ''
    }
  }),

  computed: {

  },

  methods: {
    initAlert (type, text) {
      this.alert.is = true
      this.alert.type = type
      this.alert.text = text

      setTimeout(() => {
        this.alert.is = false
        this.alert.type = ''
        this.alert.text = ''
      }, 5000)
    },

    submit () {
      const feed = {
        subject: this.subject,
        message: this.message
      }

      console.log(feed)
      this.initAlert('success', 'Feed has been submited succesfully')
    }
  },
  head () {
    return {
      title: 'Support',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Send feedback and get instant help, 24/7 '
        }
      ]
    }
  }
}
</script>

<style>

</style>
