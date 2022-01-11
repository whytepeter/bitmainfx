<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="submit"
  >
    <v-row v-if="status === null" class="ma-0">
      <v-col cols="12" class="d-flex flex-column align-center">
        <v-avatar height="100" width="100" tile>
          <v-img contain height="100%" src="/assets/face.png" />
        </v-avatar>

        <div class="d-flex flex-column mt-2">
          <span class="text-caption">
            <v-icon color="success" small> mdi-check</v-icon>
            Take a selfie of yourself with a neutral expression
          </span>
          <span class="text-caption">
            <v-icon color="success" small> mdi-check</v-icon>
            Make sure your whole face is visible, centred, and your eyes are open
          </span>
          <span class="text-caption">
            <v-icon color="error" small> mdi-close</v-icon>
            Do not crop your ID or use screenshots of your ID

          </span>
          <span class="text-caption">
            <v-icon color="error" small> mdi-close</v-icon>
            Do not hide or alter parts of your face (No hats/beauty images/filters/headgear)
          </span>
        </div>
      </v-col>

      <v-col cols="12" class="pb-0">
        <v-file-input
          v-model="file"
          type="file"
          outlined
          dense
          capture="user"
          accept="image/*"
          :label="`Upload Photo `"
          prepend-icon="mdi-camera"
          :rules="[v => !!v || `This field is required`]"
          class="text-subtitle-2 mx-1 font-weight-light rounded-md"
          @change="onFileChange"
        >
          <template v-slot:selection="{ text }">
            <v-chip small label color="secondary">
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
      </v-col>
      <v-col v-if="showImage" cols="12" class="py-0">
        <v-sheet
          height="120"
          outlined
          class="position rounded"
        >
          <v-img
            height="100%"
            contain
            :src="showImage"
          />
          <div />
        </v-sheet>
      </v-col>

      <v-col cols="12" class="py-2 mb-4">
        <v-btn
          type="submit"
          depressed
          block
          :loading="loading.verify"
          color="secondary"
          class="text-subtitle-2 font-weight-light text-capitalize "
        >
          Submit Document
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="status === 'Progress'" class="ma-0">
      <v-col cols="12" class="py-0 text-center">
        <v-icon color="warning" size="100" class="mx-auto">
          mdi-account-clock
        </v-icon>
      </v-col>
      <v-col cols="12" class="text-subtitle-1 text-center">
        Verification in Progress
      </v-col>
    </v-row>
    <v-row v-if="status === true" class="ma-0">
      <v-col cols="12" class="py-0 text-center">
        <v-icon size="100" color="success" class="mx-auto">
          mdi-account-check
        </v-icon>
      </v-col>
      <v-col cols="12" class="text-subtitle-1 text-center">
        Verified
      </v-col>
    </v-row>
    <v-row v-if="status === false" class="ma-0">
      <v-col cols="12" class="py-0 text-center">
        <v-icon size="100" color="error" class="mx-auto">
          mdi-account-remove
        </v-icon>
      </v-col>
      <v-col cols="12" class="text-subtitle-1 text-center">
        Verification Failed
      </v-col>
      <v-col cols="12" class="text-subtitle-2 text-center">
        <div class="text-caption">
          Reason
        </div>
        <div class="font-weight-bold error--text">
          {{ message }}
        </div>
      </v-col>
      <v-col cols="12" class="py-2 mb-4">
        <v-btn
          type="submit"
          depressed
          block
          :loading="loading.verify"
          color="secondary"
          class="text-subtitle-2 font-weight-light text-capitalize "
          @click="tryAgain"
        >
          Try again
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    valid: true,
    photo: '',
    file: null,
    showImage: ''
  }),
  computed: {
    ...mapGetters({ loading: 'authentication/getLoading', countries: 'authentication/getCountries', state: 'authentication/getState' }),
    status () {
      const verification = this.state('verification')
      const status = verification && verification.face.status
      console.log(status)
      return status
    },
    message () {
      const verification = this.state('verification')
      return verification && verification.face.message
    }
  },
  methods: {
    ...mapActions({ verifyFunc: 'authentication/verifyFunc', updateStatus: 'authentication/updateStatus' }),
    tryAgain () {
      this.updateStatus('face')
    },
    onFileChange () {
      if (this.file) {
        const file = this.file
        this.showImage = URL.createObjectURL(file)
      } else {
        this.showImage = null
      }
    },

    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          field: 'face',
          photo: this.file,
          status: 'Progress'
        }
        console.log(payload)
        this.verifyFunc(payload)
        this.clear()
      }
    },
    clear () {
      this.reset()
      this.resetValidation()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }

  }
}
</script>

<style>

</style>
