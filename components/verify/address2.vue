<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="submit"
  >
    <v-row v-if="status === null" class="ma-0">
      <v-col cols="12" class="pb-0">
        <v-select
          v-model="document"
          dense
          color="secondary"
          :items="['Bank Statement', 'Birth Certificate', 'Utility Bill']"
          outlined
          class="text-subtitle-2 font-weight-light rounded-md"
          :rules="[(v) => !!v || 'This field is required']"
          label="Document"
          required
        />
      </v-col>
      <v-col cols="12" class="">
        <div class="text-subtitle-2 info--text">
          Make sure the document shows your photo, full name, date of birth and date of issue.
        </div>
      </v-col>
      <v-col v-if="document" cols="12" class="pb-0">
        <v-file-input
          v-model="file"
          type="file"
          outlined
          dense
          accept="image/*"
          :label="`Upload ${document} Front `"
          :rules="[v => !!v || `${document} is required`]"
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
            cover
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
    <v-row v-if="status === true" class="ma-0">
      <v-col cols="12" class="py-0 text-center">
        <v-icon size="100" color="success" class="mx-auto">
          mdi-file-check
        </v-icon>
      </v-col>
      <v-col cols="12" class="text-subtitle-1 text-center">
        Verified
      </v-col>
    </v-row>
    <v-row v-if="status === 'Progress'" class="ma-0">
      <v-col cols="12" class="py-0 text-center">
        <v-icon color="warning" size="100" class="mx-auto">
          mdi-file-restore
        </v-icon>
      </v-col>
      <v-col cols="12" class="text-subtitle-1 text-center">
        Verification in Progress
      </v-col>
    </v-row>
    <v-row v-if="status === false" class="ma-0">
      <v-col cols="12" class="py-0 text-center">
        <v-icon size="100" color="error" class="mx-auto">
          mdi-file-remove
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
    document: '',
    file: null,
    showImage: ''
  }),
  computed: {
    ...mapGetters({ loading: 'authentication/getLoading', countries: 'authentication/getCountries', state: 'authentication/getState' }),
    status () {
      const verification = this.state('verification')
      const status = verification && verification.address.status
      console.log(status)
      return status
    },
    message () {
      const verification = this.state('verification')
      return verification && verification.address.message
    }
  },
  methods: {
    ...mapActions({ verifyFunc: 'authentication/verifyFunc', updateStatus: 'authentication/updateStatus' }),
    tryAgain () {
      this.updateStatus('address')
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
          field: 'address',
          type: this.document,
          document: this.file,
          status: 'Progress'
        }
        console.log(payload)
        this.verifyFunc(payload)
      }
    //   this.checkIfDone()
    }

  }
}
</script>

<style>

</style>
