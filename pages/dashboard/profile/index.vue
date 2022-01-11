<template>
  <v-container>
    <v-row v-if="alert.is" justify="center" style="width:100%; position: fixed; top: 4.2rem; left:0; z-index:2">
      <v-col cols="12" md="10" :class="[alert.is ? 'animate__animated animate__fadeInDown' : 'animate__animated animate__fadeOutUp' ]">
        <v-alert
          :type="alert.type"
          border="top"
          dark
        >
          {{ alert.message }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Profile
            <v-spacer />

            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  v-bind="attrs"
                  color="secondary"
                  class=" text-capitalize "
                  v-on="on"
                >
                  Edit Profile
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  @click="open(item.open)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>

          <v-card-text>
            <v-row align="center">
              <v-col cols="12" sm="4" class="text-center">
                <v-avatar
                  v-if="user !== null"
                  class="profile rounded-circle"
                  color="grey"
                  size="164"
                >
                  <v-img :src="user.photoURL" />
                </v-avatar>
                <v-avatar v-else size="90" color="indigo">
                  <v-icon x-large dark>
                    mdi-account-circle
                  </v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="d-flex align-center justify-center justify-sm-start mb-4">
                  <v-icon color="primary" class="mx-2">
                    mdi-account
                  </v-icon>
                  <span class="headline font-weight-medium grey--text text--darken-3 text-capitalize">{{ user !== null ? user.username : 'username' }}</span>
                </div>
                <div class="d-flex align-center justify-center justify-sm-start mb-2">
                  <v-icon color="primary" class="mx-2">
                    mdi-email
                  </v-icon>
                  <span class="text-subtitle-1 d-inline-block text-truncate">{{ user !== null ? user.email : 'email' }}</span>
                </div>
                <div class="d-flex align-center justify-center justify-sm-start">
                  <v-icon color="primary" class="mx-2">
                    mdi-bitcoin
                  </v-icon>
                  <span class="text-subtitle-1 d-inline-block text-truncate">{{ user !== null ? user.walletAddress : 'wallet address' }}</span>
                </div>
              </v-col>
              <v-spacer />
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="show === 'email'" cols="12" md="6">
        <v-card>
          <v-card-title>Update Email</v-card-title>
          <v-divider />
          <v-card-text>
            <v-form @submit.prevent>
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="email"
                    type="email"
                    name="email"
                    color="primary"
                    dense
                    prepend-icon="mdi-email"
                    required
                    outlined
                    label="Email"
                  />
                </v-col>

                <v-col cols="12" class="py-0 px-4 text-right">
                  <v-btn :loading="loading.email" depressed color="secondary" @click="update('email')">
                    Update Email
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="show === 'photo'" cols="12" md="6">
        <v-card>
          <v-card-title>Upload Photo</v-card-title>
          <v-divider />
          <v-card-text>
            <v-form @submit.prevent>
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-file-input
                    v-model="file"
                    type="file"
                    name="photo"
                    color="primary"
                    dense
                    chips
                    outlined
                    prepend-icon="mdi-camera"
                    required
                    label="Upload Photo"
                  />
                </v-col>

                <v-col cols="12" class="py-0 px-4 text-right">
                  <v-btn :loading="loading.photo" depressed color="secondary" @click="update('photo')">
                    Upload Photo
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="show === 'username'" cols="12" md="6">
        <v-card>
          <v-card-title>Change Username</v-card-title>
          <v-divider />
          <v-card-text>
            <v-form @submit.prevent>
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="username"
                    type="text"
                    name="email"
                    color="primary"
                    dense
                    outlined
                    prepend-icon="mdi-account"
                    required
                    label="Username"
                  />
                </v-col>

                <v-col cols="12" class="py-0 px-4 text-right">
                  <v-btn :loading="loading.username" depressed color="secondary" @click="update('username')">
                    Change Username
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="show === 'walletAddress'" cols="12" md="6">
        <v-card>
          <v-card-title>Update Wallet</v-card-title>
          <v-divider />
          <v-card-text>
            <v-form @submit.prevent>
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="walletAddress"
                    type="text"
                    name="email"
                    color="primary"
                    dense
                    outlined
                    prepend-icon="mdi-bitcoin"
                    label="Wallet Address"
                    required
                  />
                </v-col>

                <v-col cols="12" class="py-0 px-4 text-right">
                  <v-btn :loading="loading.wallet" depressed color="secondary" @click="update('walletAddress')">
                    Update Wallet
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="show === 'password'" cols="12" md="6">
        <v-card>
          <v-card-title>Update Password</v-card-title>
          <v-divider />
          <v-card-text>
            <v-form @submit.prevent>
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="password.old"
                    type="password"
                    name="old-password"
                    color="primary"
                    dense
                    outlined
                    label="Current Password"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="password.new"
                    type="password"
                    name="new-password"
                    color="primary"
                    dense
                    outlined
                    label="New Password"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="password.confirm"
                    type="password"
                    name="confirm-password"
                    color="primary"
                    dense
                    outlined
                    label="Confirm Password"
                  />
                </v-col>

                <v-col cols="12" class="py-0 px-4 text-right">
                  <v-btn :loading="loading.password" depressed color="secondary" @click="updatePassword">
                    Update Password
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Profile',
  layout: 'dashboard',

  data: () => ({
    show: '',
    username: '',
    email: '',
    walletAddress: '',
    file: [],
    password: {
      old: '',
      new: '',
      confirm: ''
    },
    items: [
      { title: 'Edit Username', open: 'username' },
      { title: 'Update Email', open: 'email' },
      { title: 'Upload Photo', open: 'photo' },
      { title: 'Edith Wallet Address', open: 'walletAddress' },
      { title: 'Change Password', open: 'password' }
    ]

  }),
  head () {
    return {
      title: this.user !== null ? this.user.username + 'Profile' : 'Your Profile',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Your Profile'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({ user: 'authentication/getUser', loading: 'authentication/getLoading', alert: 'authentication/getAlert' })
  },

  methods: {
    ...mapActions({ updateEmail: 'authentication/updateEmail', updateUsername: 'authentication/updateUsername', uploadPhoto: 'authentication/uploadPhoto', updateWalletAddress: 'authentication/updateWalletAddress', updatePsw: 'authentication/updatePassword', initAlert: 'authentication/initAlert' }),

    open (el) {
      this.show = el
    },

    clearFields () {
      this.email = ''
      this.username = ''
      this.walletAddress = ''
      this.file = []

      this.password.new = ''
      this.password.old = ''
      this.password.confirm = ''
    },

    update (field) {
      if (field === 'email') {
        this.updateEmail(this.email)

        this.clearFields()
      } else if (field === 'username') {
        this.updateUsername(this.username)

        this.clearFields()
      } else if (field === 'walletAddress') {
        this.updateWalletAddress(this.walletAddress)

        this.clearFields()
      } else if (field === 'photo') {
        this.uploadPhoto(this.file)

        this.clearFields()
      }
    },

    updatePassword () {
      if (this.password.old === this.user.password) {
        if (this.password.new !== this.user.password) {
          this.updatePsw(this.password.new)

          this.clearFields()
        } else {
          this.initAlert({ is: true, type: 'error', message: 'new password can\'t be thesame with old password' })
        }
      } else {
        this.initAlert({ is: true, type: 'error', message: 'Old password is not correct' })
      }
    }

  }

}
</script>

<style lang="scss">
.position {
  width: 100%;
  position: fixed;
  top: 4rem;
  left: 0;
  z-index: 2

}

</style>
