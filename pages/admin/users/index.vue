<template>
  <keep-alive>
    <v-container>
      <v-row v-if="!show">
        <v-col cols="12">
          <v-card class="px-0">
            <v-card-title>
              <v-row no-gutters>
                <v-col cols="12" sm="6" class="d-flex align-center">
                  Users
                  <span class="text-subtitle-2 success--text ml-2 font-weight-medium">({{ totalUsers }})</span>
                </v-col>
                <v-spacer />

                <v-col cols="12" sm="6">
                  <v-text-field
                    append-icon="mdi-magnify"
                    placeholder="Search by username"
                    single-line
                    hide-details
                  />
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text class="px-0">
              <v-expansion-panels v-if="users !== null" focusable popout flat>
                <v-expansion-panel v-for="(user, index) in users" :key="user.id">
                  <v-expansion-panel-header class="px-0">
                    <v-list class="transparent">
                      <v-list-item>
                        <!-- <v-list-item-avatar>
                        <v-img src="" />
                      </v-list-item-avatar> -->
                        <v-list-item-icon>
                          <v-badge v-if="user && user.request && user.request.state" color="secondary">
                            <v-icon x-large>
                              mdi-account-circle
                            </v-icon>
                          </v-badge>
                          <v-icon v-else x-large>
                            mdi-account-circle
                          </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content class="">
                          <v-list-item-title class="text-subtitle-1 font-weight-medium text-capitalize " v-text="user.username" />
                          <v-list-item-subtitle
                            class="d-inline-block text-truncate"

                            v-text="user.walletAddress"
                          />
                        </v-list-item-content>
                        <v-list-item-icon>
                          <v-btn
                            rounded
                            small
                            depressed
                            outlined
                            class="text-capitalize text-truncate d-none d-sm-flex "
                            @click="openUser(index)"
                          >
                            View
                          </v-btn>
                        </v-list-item-icon>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-header>
                  <v-divider />
                  <v-expansion-panel-content>
                    <v-card flat>
                      <v-card-text class="d-flex">
                        Email <span class="ml-2">{{ user.email }}</span>
                        <v-spacer />
                        <v-btn
                          rounded
                          small
                          depressed
                          outlined
                          class="text-capitalize text-truncate d-flex d-sm-none "
                          @click="openUser(index)"
                        >
                          View
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="show">
        <v-col cols="12">
          <v-card>
            <v-card-title>
              Users
              <v-btn small color="primary" text class="ml-2" @click="closeUser">
                <v-icon small>
                  mdi-arrow-left
                </v-icon>
                Back
              </v-btn>
            </v-card-title>
            <v-card-text>
              <keep-alive>
                <user :index="index" />
              </keep-alive>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </keep-alive>
</template>

<script>
import { mapGetters } from 'vuex'
import User from '../../../components/admin/user'

export default {
  name: 'Users',
  layout: 'admin',

  components: {
    User
  },
  asyncData: () => ({

  }),

  data: () => ({
    show: false,
    index: ''
  }),
  computed: {
    ...mapGetters({ totalUsers: 'users/totalUsers', users: 'users/getUsers' })

  },
  methods: {
    status (type) {
      if (type === 'pending' || type === 'Pending') {
        return {
          color: 'secondary',
          icon: 'mdi-alert-circle'
        }
      } else if (type === 'ongoing' || type === 'Ongoing') {
        return {
          color: 'info',
          icon: 'mdi-dots-horizontal-circle'
        }
      } else if (type === 'success' || type === 'Success') {
        return {
          color: 'success',
          icon: 'mdi-check-circle'
        }
      } else {
        return {
          color: '',
          icon: ''
        }
      }
    },

    openUser (index) {
      this.show = true
      this.index = index
    },

    closeUser () {
      this.show = false
      this.index = ''
    }
  },
  head () {
    return {
      title: 'Admin-User',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Admin dashboard to manage all users '
        }
      ]
    }
  }

}
</script>

<style>

.v-list-item {
  padding: 0
}
.v-expansion-panel-header {
  padding-top:0;
  padding-bottom:0;
}

.v-expansion-panel-content__wrap {
   padding: 0
}

@media only screen and (max-width: 600px) {
 .v-list-item__subtitle{
   max-width: 180px;
 }
}
</style>
