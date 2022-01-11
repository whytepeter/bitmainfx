<template>
  <v-dialog
    v-model="modal"
    persistent
  >
    <v-card :loading="loading.verify" flat max-width="300" class="mx-auto">
      <v-card-title class="text-subtitle-1 font-weight-medium text-uppercase">
        {{ title }}
        <v-spacer />
        <v-btn small outlined icon @click="close">
          <v-icon size="20">
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="">
        <v-row class="ma-0">
          <v-col cols="12" class="text-h6 px-0 font-weight-light">
            <v-textarea
              v-model="message"
              name="message"
              type="text"
              dense
              rows="2"
              outlined
              class="text-subtitle-2 font-weight-light rounded-md"
              color="primary"
              label="Message"
              required
            />
          </v-col>
          <v-col cols="6" class="px-1">
            <v-btn
              outlined
              block
              class="text-capitalize rounded text-subtitle-2 font-weight-regular ma-0"
              @click="close"
            >
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-btn
              depressed
              block
              :loading="loading.verify"
              :color="action === 'approve' ? 'success' : 'error'"
              class="text-capitalize rounded text-subtitle-2 font-weight-regular ma-0"
              @click="actionFunc(action)"
            >
              {{ action }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    id: {
      type: String,
      default: 'Action'
    },
    title: {
      type: String,
      default: 'Action'
    },
    type: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: ''
    },
    modal: {
      type: Boolean,
      default: false
    },
    toggle: Function
  },
  data: () => ({
    size: 70,
    message: ''
  }),
  computed: {
    ...mapGetters({ loading: 'admin/getLoading' })

  },
  methods: {
    ...mapActions({ verifyAction: 'admin/verifyAction' }),
    actionFunc () {
      const status = {
        approve: true,
        decline: false
      }

      const payload = {
        id: this.id,
        type: this.type,
        action: this.action,
        status: status[this.action],
        message: this.message
      }
      console.log(payload)
      this.verifyAction(payload)
      this.checkIfDone()
    },

    close () {
      this.toggle(false)
      this.message = ''
    },
    checkIfDone () {
      setInterval(() => {
        if (!this.loading.verify) {
          setTimeout(() => {
            this.close()
            window.location.reload()
          }, 2000)
        }
      }, 1000)
    }

  }

}
</script>

<style>

</style>
