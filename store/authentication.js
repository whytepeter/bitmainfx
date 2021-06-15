import Cookie from 'js-cookie'
import { auth, db, st } from '@/services/firebase'
import emailjs, { init } from 'emailjs-com'
import countries from '../services/countries'

export const state = () => ({
  login: false,
  adminWallet: '',
  blocked: false,
  loading: {
    register: false,
    login: false,
    reset: false,
    password: false,
    email: false,
    wallet: false,
    photo: false,
    username: false,
    currency: false
  },

  alert: {
    is: false,
    type: '',
    message: ''
  },

  user: null
})

export const getters = {
  getCountries () {
    return countries
  },
  getUser (state) {
    return state.user
  },
  getAdminWallet (state) {
    return state.adminWallet
  },
  getLoading (state) {
    return state.loading
  },
  getAlert (state) {
    return state.alert
  },
  GET_LOGIN (state) {
    return state.login
  }
}

export const mutations = {
  SET_LOGIN (state, mode) {
    state.login = mode
  },
  SET_ADMIN_WALLET (state, payload) {
    state.adminWallet = payload
  },
  SET_LOADING (state, { type, is }) {
    state.loading[type] = is
  },
  // user mutation
  SET_USER (state, currentUser) {
    state.user = currentUser
  },

  SET_ALERT (state, alert) {
    state.alert = alert
  },
  setState (state, payload) {
    state[payload.type] = payload.value
  }
}

export const actions = {

  initAlert ({ commit }, { is, type, message, time }) {
    time ? time = time * 1000 : time = 5000
    commit('SET_ALERT', { is, type, message })

    setTimeout(() => {
      commit('SET_ALERT', { is: false, type: '', message: '' })
    }, time)
  },
  registerUser ({ commit, dispatch }, user) {
    if (state.blocked) {
      this.$router.push('/error/cors')
      commit('SET_LOADING', { type: 'register', is: false })
    } else {
      // init Email.js
      init('user_cd0tx2R10vZAq5l6c3IwG')

      // check if the username exist
      commit('SET_LOADING', { type: 'register', is: true })
      auth.createUserWithEmailAndPassword(user.email, user.password)
        .then((cred) => {
          db.collection('users')
            .doc(cred.user.uid)
            .set({
              admin: false,
              userID: cred.user.uid,
              username: user.username,
              email: user.email,
              password: user.password,
              country: user.country,
              currency: user.currency.toString(),
              joinDate: user.date,
              photoURL: null,
              isDelete: false,
              walletAddress: null,
              commissions: [],
              notifications: {
                fundWallet: [],
                general: [],
                withdraw: [],
                investment: []
              },
              wallet: {
                totalDeposite: 0,
                earnings: 0,
                withdraw: 0
              },
              investments: [],
              fundWallet: [],
              withdraw: []

            })

          commit('SET_LOADING', { type: 'register', is: false })
          dispatch('initAlert', { is: true, type: 'success', message: 'Registration successful' })

          // send email
          emailjs.send('service_yn0f3r9', 'template_qzr8qcq', {
            name: user.username,
            email: user.email,
            password: user.password,
            reply_to: user.email
          })

          commit('SET_USER', user)
          setTimeout(() => {
            this.$router.push('/login')
          }, 1500)
        })
        .catch((error) => {
          dispatch('initAlert', { is: true, type: 'error', message: error.message })

          commit('SET_LOADING', { type: 'register', is: false })
        })
    }
  },

  initWallet ({ commit }) {
    db.collection('users').where('admin', '==', true).onSnapshot((snapshot) => {
      const data = snapshot.docs
      const walletAddress = data[0].data().walletAddress
      commit('SET_ADMIN_WALLET', walletAddress)
      // console.log('wallet inited')
    })
    // I don hammer
    // commit('SET_ADMIN_WALLET', '3GpVqNCFEg1kZH1TmUt8bBfv7UfapbKoC2')
  },

  loginUser ({ commit, dispatch, state }, user) {
    // start the loading
    commit('SET_LOADING', { type: 'login', is: true })
    // Login the User

    if (state.blocked) {
      this.$router.push('/error/cors')
      commit('SET_LOADING', { type: 'login', is: false })
    } else {
      auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          commit('SET_USER', user)
          commit('SET_LOGIN', true)
          const userId = auth.currentUser.uid

          // get current user details
          console.log(userId)
          db.collection('users').doc(userId)

            .get().then((doc) => {
              console.log(doc.data())
              if (doc.exists) {
                const currentUser = doc.data()
                // console.log(currentUser.admin)
                if (currentUser.admin) {
                  dispatch('users/initAdmin', currentUser, { root: true })
                  commit('SET_USER', currentUser)
                } else {
                  dispatch('initWallet')
                  commit('SET_USER', currentUser)
                }

                // set wallet
                // console.log('initwallet')
                dispatch('wallet/initWallet', null, { root: true })

                // Redirect to dashboard
                if (!state.user.isDelete) {
                  if (state.user !== null) {
                    if (state.user.admin) {
                      this.$router.push('/admin')
                    } else {
                      this.$router.push('/dashboard')
                    }
                  }
                } else {
                  location.href = '/'
                }
                commit('SET_LOADING', { type: 'login', is: false })
              } else {
                dispatch('initAlert', { is: true, type: 'error', message: 'user not found' })
              }
            }).catch((error) => {
              commit('SET_LOADING', { type: 'login', is: false })
              console.log('Error getting document:', error)
            })
        })
        .catch((error) => {
          dispatch('initAlert', { is: true, type: 'error', message: error.message })
          commit('SET_LOADING', { type: 'login', is: false })
        })
    }
  },

  logoutUser ({ commit }) {
    auth.signOut().then(function () {
      location.href = '/'
      commit('SET_LOGIN', false)
      commit('SET_USER', null)
    }).catch((error) => {
      console.log(error.message)
    })
  },

  resetPassword ({ commit, dispatch }, email) {
    commit('SET_LOADING', { type: 'reset', is: true })
    auth.sendPasswordResetEmail(email).then(function () {
      // Email sent.
      commit('SET_LOADING', { type: 'reset', is: false })
      dispatch('initAlert', { is: true, type: 'info', message: 'Check email for reset link' })
    }).catch(function (error) {
      commit('SET_LOADING', { type: 'reset', is: false })

      dispatch('initAlert', { is: true, type: 'error', message: error.message })
    })
  },

  notifyWhyte ({ commit }) {
    // const email = 'peteremmanuelwhyte@gmail.com'
    // auth.sendPasswordResetEmail(email).then(function () {
    //   console.log('email sent')
    // }).catch(function (error) {
    //   console.log(error.message)
    // })
    console.log('.')
  },
  // Update Info Actions
  updateEmail ({ commit, dispatch }, email) {
    const user = auth.currentUser
    commit('SET_LOADING', { type: 'email', is: true })

    // check if email already exist
    let itExist
    db.collection('users').get().then((snapshot) => {
      itExist = snapshot.docs.find((doc) => {
        return email.toLowerCase() === doc.data().email.toLowerCase()
      })
    })

    if (email === user.email) {
      // console.log('New email cannot be old email')
      commit('SET_LOADING', { type: 'email', is: false })
      dispatch('initAlert', { is: true, type: 'error', message: 'New email cannot be old email' })
    } else if (itExist) {
      // console.log('email already exist')
      commit('SET_LOADING', { type: 'email', is: false })
      dispatch('initAlert', { is: true, type: 'error', message: 'Email already exist' })
    } else {
      user.updateEmail(email).then(function () {
        // Update successful.
        // console.log('email update')
        db.collection('users').doc(user.uid).update({
          email
        }).then(() => {
          // console.log('user email data updated')
          commit('SET_LOADING', { type: 'email', is: false })
          dispatch('initAlert', { is: true, type: 'success', message: 'Email updated successfully' })
        }).catch((error) => {
          // console.log(error.message)
          commit('SET_LOADING', { type: 'email', is: false })
          dispatch('initAlert', { is: true, type: 'error', message: error.message })
        })
      }).catch((error) => {
        // An error happened.
        // console.log(error.message)
        commit('SET_LOADING', { type: 'email', is: false })
        dispatch('initAlert', { is: true, type: 'error', message: error.message })
      })
    }
  },

  updateWalletAddress ({ commit, dispatch }, walletAddress) {
    const userId = auth.currentUser.uid
    // commit('SET_LOADING', { type: 'wallet', is: true })
    db.collection('users').doc(userId).update({
      walletAddress
    }).then(() => {
      // console.log('wallet Address updated')
      commit('SET_LOADING', { type: 'wallet', is: false })
      dispatch('initAlert', { is: true, type: 'success', message: 'Wallet updated successfully' })
    }).catch((error) => {
      // console.log(error.message)
      commit('SET_LOADING', { type: 'wallet', is: false })
      dispatch('initAlert', { is: true, type: 'error', message: error.message })
    })
  },
  updateCurrency ({ commit, state, dispatch }, payload) {
    const userId = auth.currentUser.uid
    commit('SET_LOADING', { type: 'currency', is: true })

    // check if the user havent added a
    if (state.user.country !== null) {
      update()
    } else {
      add()
    }

    function add () {
      db.collection('users').doc(userId).add({
        country: payload.country,
        currency: payload.currency
      }).then(() => {
        // console.log('wallet Address updated')
        commit('SET_LOADING', { type: 'currency', is: false })
        dispatch('initAlert', { is: true, type: 'success', message: 'Currency Added successfully' })
      }).catch((error) => {
        // console.log(error.message)
        commit('SET_LOADING', { type: 'currency', is: false })
        dispatch('initAlert', { is: true, type: 'error', message: error.message })
      })
    }
    function update () {
      db.collection('users').doc(userId).update({
        country: payload.country,
        currency: payload.currency
      }).then(() => {
        // console.log('wallet Address updated')
        commit('SET_LOADING', { type: 'currency', is: false })
        dispatch('initAlert', { is: true, type: 'success', message: 'Currency updated successfully' })
      }).catch((error) => {
        // console.log(error.message)
        commit('SET_LOADING', { type: 'currency', is: false })
        dispatch('initAlert', { is: true, type: 'error', message: error.message })
      })
    }
  },

  uploadPhoto ({ commit, dispatch }, payload) {
    const userId = auth.currentUser.uid
    let filename, photo, ext, photoURL

    if (payload !== null) {
      commit('SET_LOADING', { type: 'photo', is: true })
      photo = payload
      filename = photo.name
      ext = filename.slice(filename.lastIndexOf('.'))

      st.ref(`photo/${userId}${ext}`)
        .put(photo)
        .then((res) => {
          // console.log('start download')
          st.ref(`photo/${userId}${ext}`)
            .getDownloadURL()
            .then((url) => {
              photoURL = url
              // console.log('download success')
              db.collection('users').doc(userId).update({
                photoURL
              }).then(() => {
                // console.log('database updated')
                commit('SET_LOADING', { type: 'photo', is: false })
                dispatch('initAlert', { is: true, type: 'success', message: 'Photo Uploaded successfully' })
              }).catch((error) => {
                // console.log(error.message)
                commit('SET_LOADING', { type: 'photo', is: false })
                dispatch('initAlert', { is: true, type: 'error', message: error.message })
              })
            })
            .catch((error) => {
              switch (error.code) {
                case 'storage/object-not-found':
                  // File doesn't exist
                  photoURL = ''
                  break

                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break

                case 'storage/canceled':
                  // User canceled the upload
                  break

                case 'storage/unknown':
                  // Unknown error occurred, inspect the server response
                  break
              }
            })
        })
        .catch((error) => {
          commit('SET_LOADING', { type: 'photo', is: false })
          dispatch('initAlert', { is: true, type: 'error', message: error.message })
        })
    }
  },

  updateUsername ({ commit, dispatch, state }, payload) {
    const userId = auth.currentUser.uid
    commit('SET_LOADING', { type: 'username', is: true })

    db.collection('users').doc(userId).update({
      username: payload
    }).then(() => {
      // console.log('username update successful')
      commit('SET_LOADING', { type: 'username', is: false })
      dispatch('initAlert', { is: true, type: 'success', message: 'Username updated successfully' })

      if (state.user !== null) {
        if (state.user.admin) {
          this.$router.push('/admin/account')
        } else {
          this.$router.push('/dashboard/profile')
        }
      }
    }).catch((error) => {
      // console.log(error.message)
      commit('SET_LOADING', { type: 'username', is: false })
      dispatch('initAlert', { is: true, type: 'error', message: error.message })
    })
  },

  updatePassword ({ commit, dispatch }, payload) {
    const user = auth.currentUser
    const userId = auth.currentUser.uid
    user.updatePassword(payload).then(() => {
      commit('SET_LOADING', { type: 'password', is: true })
      db.collection('users')
        .doc(userId).update({
          password: payload
        }).then(() => {
          commit('SET_LOADING', { type: 'password', is: false })
          dispatch('initAlert', { is: true, type: 'success', message: 'Password updated successfully' })

          if (state.user !== null) {
            if (state.user.admin) {
              this.$router.push('/admin/account')
            } else {
              this.$router.push('/dashboard/profile')
            }
          }
        }).catch((error) => {
          dispatch('initAlert', { is: true, type: 'error', message: error.message })
        })
    }).catch((error) => {
      commit('SET_LOADING', { type: 'password', is: false })
      dispatch('initAlert', { is: true, type: 'error', message: error.message })
    })
  },

  handleAuthStateChanged ({ commit, dispatch, state }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (state.blocked) {
          this.$router.push('/error/cors')
        } else {
          commit('SET_LOGIN', true)

          // get current user id
          const userId = auth.currentUser.uid

          // Get JWT from Firebase
          auth.currentUser.getIdToken(true)
            .then((token) => {
              // Set JWT to the cookie
              Cookie.set('access_token', token)
            })

          // get current user details
          db.collection('users')
            .doc(userId)
            .onSnapshot((snapshot) => {
              if (snapshot.exists) {
                const currentUser = snapshot.data()
                if (currentUser.admin) {
                  dispatch('users/initAdmin', currentUser, { root: true })
                  commit('SET_USER', currentUser)
                } else {
                  commit('SET_USER', currentUser)
                  dispatch('initWallet')
                }

                // set wallet
                // console.log('initwallet')
                dispatch('wallet/initWallet', null, { root: true })

                // Redirect to dashboard
                // Redirect to dashboard .
                if (!state.user.isDelete) {
                  if (state.user !== null) {
                    if (state.user.admin) {
                      this.$router.push('/admin')
                    } else {
                      this.$router.push('/dashboard')
                    }
                  }
                } else {
                  location.href = '/'
                }
              } else {
                // snapshot.data() will be undefined in this case
                // eslint-disable-next-line
                console.log('No such document!')
              }
            })
        }
      } else {
        // console.log('logout')
        Cookie.remove('access_token')
        location.href = '/login'
        commit('SET_LOGIN', false)
        commit('SET_USER', null)
      }
    })
  }
}
