import { auth, db, st } from '@/services/firebase'
import emailjs from 'emailjs-com'
import countries from '../services/countries'

export const state = () => ({
  login: false,

  loading: {
    all: false,
    login: false,
    register: false,
    password: false,
    reset: false,
    wallet: false,
    profile: false,
    verify: false,
    resolve: false,
    updateDB: false
  },

  user: null,
  verification: null
})

export const getters = {
  getState: state => (payload) => {
    return state[payload]
  },

  getCountries () {
    return countries
  },
  getUser (state) {
    return state.user
  },
  getLoading (state) {
    return state.loading
  },
  getAlert (state) {
    return state.alert
  },
  getLogin (state) {
    return state.login
  }

}

export const mutations = {
  // user mutation
  setState (state, payload) {
    state[payload.type] = payload.value
  },

  setLogin (state, mode) {
    state.login = mode
  },
  setLoading (state, { type, is }) {
    state.loading.all = is
    state.loading[type] = is
  }

}

export const actions = {

  async updateDB ({ commit }, payload) {
    commit('setLoading', { type: 'updateDB', is: true })
    await db.collection('users')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs
        data.forEach((doc) => {
          // get user detail
          let newUser
          const user = doc.data()
          const name = user.email.split('@')[0]

          if (!user.accStatus) {
            newUser = {
              accStatus: 'Active',
              accType: 'Starter',
              role: user.admin ? 'admin' : 'user',
              block: false,
              delete: user.isDelete ? user.isDelete : false,
              userID: user.userID,
              firstName: name,
              lastName: '',
              phoneNumber: '',
              email: user.email,
              joinDate: user.joinDate,
              lastLogin: user.joinDate,
              referralID: getReferralID(user),
              referredBy: '',
              symbol: '$',
              verification: false,
              password: user.password,
              photoURL: user.photoURL,
              country: '',
              currency: 'USD',
              walletAddress: user.walletAddress,
              wallet: {
                deposit: 0,
                earnings: user.wallet.earnings,
                referral: 0,
                bonus: 0,
                investment: 0,
                withdraw: user.wallet.withdraw
              }
            }
          } else {
            newUser = user
          }
          console.log(newUser)
          // Updated user details
          db.collection('users').doc(user.userID).set(newUser).then(() => {
            console.log(`${user.username} updated successfully`)
            commit('setLoading', { type: 'updateDB', is: false })
          }).catch((error) => {
            commit('setLoading', { type: 'updateDB', is: false })
            console.log(error.message)
          })
        }).catch((error) => {
          commit('setLoading', { type: 'updateDB', is: false })
          console.log(error.message)
        })
      })

    function getReferralID (user) {
      const name = `${user.email.substring(0, 2)}`
      const id = user.userID.substring(0, 5)
      console.log(`${name}-${id}`)
      return `${name}-${id}`
    }
  },

  // async uploadPhoto ({ dispatch }, payload) {
  //   const userID = auth.currentUser.uid
  //   const ref = db.collection('users').doc(userID)

  //   let photoURL
  //   const photo = payload.photo
  //   const filename = photo.name
  //   const ext = filename.slice(filename.lastIndexOf('.'))

  //   await st.ref(`photo/${userID}${ext}`)
  //     .put(photo)
  //     .then((res) => {
  //       // console.log('start download')
  //       st.ref(`photo/${userID}${ext}`)
  //         .getDownloadURL()
  //         .then((url) => {
  //           photoURL = url
  //           // update photo in the database
  //           ref.update({
  //             photoURL
  //           }).then(function () {
  //             console.log('user updated')
  //           })
  //             .catch(function (error) {
  //               // The document probably doesn't exist.
  //               console.log(error.message)
  //               dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
  //             })
  //         })
  //         .catch((error) => {
  //           console.log(error.message)
  //           dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
  //         })
  //     }).catch((err) => {
  //       console.log(err)
  //       dispatch('controller/initAlert', { is: true, type: 'error', message: err.message }, { root: true })
  //     })
  // },

  async register ({ commit, dispatch, state }, user) {
    commit('setLoading', { type: 'register', is: true })
    await auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((cred) => {
        console.log(cred.user.uid)
        db.collection('users')
          .doc(cred.user.uid)
          .set({
            role: 'user',
            block: false,
            delete: false,
            userID: cred.user.uid,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            joinDate: user.date,
            lastLogin: user.date,
            accType: 'Starter',
            accStatus: 'Active',
            password: user.password,
            photoURL: '',
            country: user.country,
            currency: user.currency,
            symbol: user.symbol,
            walletAddress: 'Wallet Address',
            verification: false,
            referralID: getReferralID(cred.user.uid),
            referredBy: '',
            wallet: {
              deposit: 0,
              earnings: 0,
              bonus: 0,
              withdraw: 0,
              referral: 0,
              investment: 0
            }
          }).then((docRef) => {
            // dispatch('uploadPhoto', { photo: user.photo })
            dispatch('controller/initAlert', { is: true, type: 'success', message: 'Registration successful' }, { root: true })
            commit('setLoading', { type: 'register', is: false })
            setTimeout(() => {
              this.$router.push('/login')
            }, 1500)

            dispatch('referralFunc', { id: state.referralID })

            // send email
            emailjs.send('service_sudkpgl', 'template_s69c0ss', {
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              reply_to: user.email
            }, 'user_TLauoz4cLLa9yzX94oEe0').then(() => {
              console.log('Email Sent to User Successfully')
            })

            // send email to admin
            // emailjs.send('service_42t869i -N', 'template_zln6bza -N', {
            //   name: `${user.firstName} ${user.lastName}`,
            //   email: user.email,
            //   phoneNumber: user.phoneNumber,
            //   country: user.country,
            //   reply_to: user.email
            // }, 'user_SZoHTciRAEIr6QhgLi6rR -N').then(() => {
            //   console.log('Email Sent to User Successfully')
            // })
          }).catch((error) => {
            dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
            commit('setLoading', { type: 'register', is: false })
            console.log(error.message)
          })
      })
      .catch((error) => {
        dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
        commit('setLoading', { type: 'register', is: false })
        console.log(error.message)
      })

    function getReferralID (userId) {
      const name = `${user.firstName.substring(0, 1)}${user.lastName.substring(0, 1)}`
      const id = userId.substring(0, 5)
      return `${name}-${id}`
    }
  },

  resolveUser ({ commit, dispatch, state }, user) {
    // start the loading
    commit('setLoading', { type: 'resolve', is: true })
    commit('setLoading', { type: 'login', is: true })
    // Login the User

    auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        const userId = auth.currentUser.uid
        // const currentUser = auth.currentUser
        // commit('setState', { type: 'user', value: currentUser })
        // get current user details
        console.log(userId)
        const firstName = user.email.split('@')[0]
        console.log(firstName)
        db.collection('users')
          .doc(userId)
          .set({
            role: 'user',
            block: false,
            delete: false,
            userID: userId,
            firstName,
            lastName: '',
            phoneNumber: '',
            email: user.email,
            joinDate: user.date,
            lastLogin: user.date,
            accType: 'Starter',
            verified: false,
            password: user.password,
            photoURL: '',
            country: '',
            currency: 'USD',
            symbol: '$',
            referralID: getReferralID(userId),
            referredBy: null,
            walletAddress: 'Wallet Address',
            wallet: {
              deposit: 0,
              earnings: 0,
              bonus: 0,
              withdraw: 0,
              referral: 0,
              investment: 0
            }

          })

        dispatch('loginUser', user)
          .catch((error) => {
            dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
            commit('setLoading', { type: 'resolve', is: false })
            commit('setLoading', { type: 'login', is: false })
            console.log(error.message)
          })
      })
      .catch((error) => {
        dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
        commit('setLoading', { type: 'resolve', is: false })
        commit('setLoading', { type: 'login', is: false })
        console.log(error.message)
      })

    function getReferralID (userId) {
      const name = `${(user.email.split('@')[0]).substring(0, 2).toUpperCase()}`
      const id = userId.substring(0, 5)
      return `${name}-${id}`
    }
  },
  loginUser ({ commit, dispatch, state }, user) {
    commit('setLoading', { type: 'login', is: true })
    auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        const userID = auth.currentUser.uid
        console.log(userID)
        // get current user details
        db.collection('users').doc(userID)
          .get().then((doc) => {
            if (doc.exists) {
              const currentUser = doc.data()
              commit('setState', { type: 'user', value: currentUser })
              console.log(currentUser)

              // Update last login
              updateLastLogin(currentUser.userID, user.date)
              // Redirect to dashboard
              if (user.delete) {
                if (!state.user.block) {
                  if (state.user !== null) {
                    if (state.user.role === 'admin') {
                      this.$router.push('/admin')
                    } else {
                      this.$router.push('/dashboard/home')
                    }
                    commit('setLoading', { type: 'login', is: false })
                    dispatch('controller/initAlert', { is: true, type: 'success', message: 'Login successful' }, { root: true })
                  }
                } else {
                  location.href = '/'
                  dispatch('controller/initAlert', { is: true, type: 'error', message: 'Account blocked, Please contact support@ttub.online' }, { root: true })
                  commit('setLoading', { type: 'login', is: false })
                }
              } else {
                location.href = '/'
                dispatch('controller/initAlert', { is: true, type: 'error', message: 'Account Suspended, Please contact support@ttub.online' }, { root: true })
                commit('setLoading', { type: 'login', is: false })
              }
            } else {
              commit('setLoading', { type: 'login', is: false })
              console.log('user not found')
              dispatch('controller/initAlert', { is: true, type: 'error', message: 'user not found' }, { root: true })
              user.date = new Date().toLocaleDateString()
              dispatch('resolveUser', user)
            }
          }).catch((error) => {
            commit('setLoading', { type: 'login', is: false })
            console.log('Error getting document:', error)
          })
      })
      .catch((error) => {
        dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
        commit('setLoading', { type: 'login', is: false })
      })

    function updateLastLogin (userID, date) {
      db.collection('users').doc(userID).update({
        lastLogin: date
      })
    }
  },

  logoutUser ({ commit }) {
    auth.signOut().then(function () {
      this.$router.push('/login')
      commit('setState', { type: 'user', value: null })
    }).catch((error) => {
      console.log(error.message)
    })
  },

  resetPassword ({ commit, dispatch }, email) {
    commit('setLoading', { type: 'reset', is: true })
    auth.sendPasswordResetEmail(email).then(function () {
      // Email sent.
      commit('setLoading', { type: 'reset', is: false })
      dispatch('controller/initAlert', { is: true, type: 'primary', message: 'Check email for reset link' }, { root: true })
    }).catch(function (error) {
      commit('setLoading', { type: 'reset', is: false })
      dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
    })
  },

  async  updatePassword ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'password', is: true })
    const user = auth.currentUser
    const userId = auth.currentUser.uid
    console.log(payload)
    await user.updatePassword(payload).then(() => {
      db.collection('users')
        .doc(userId).update({
          password: payload
        }).then(() => {
          commit('setLoading', { type: 'password', is: false })
          dispatch('controller/initAlert', { is: true, type: 'success', message: 'Password updated successfully' }, { root: true })
        }).catch((error) => {
          dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
        })
    }).catch((error) => {
      commit('setLoading', { type: 'password', is: false })
      dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
    })
  },
  async  updateEmail ({ commit, dispatch, state }, email) {
    commit('setLoading', { type: 'email', is: true })
    const user = auth.currentUser
    const userId = auth.currentUser.uid
    await auth
      .signInWithEmailAndPassword(state.user.email, state.user.password).then(() => {
        user.updateEmail(email).then(function () {
          db.collection('users').doc(userId).update({
            email
          }).then(() => {
            // console.log('user email data updated')
            commit('setLoading', { type: 'email', is: false })
            dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: 'Email updated successfully' }, { root: true })
          }).catch((error) => {
            // console.log(error.message)
            commit('setLoading', { type: 'email', is: false })
            dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: error.message }, { root: true })
          })
        }).catch((error) => {
          commit('setLoading', { type: 'email', is: false })
          dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: error.message }, { root: true })
        })
      }).catch((error) => {
        commit('setLoading', { type: 'email', is: false })
        dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: error.message }, { root: true })
      })
  },

  // Update the wallet address
  async referralFunc ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'referral', is: true })
    // Get all users
    // Check for the referree
    // Update thier referral details
    const ref = db.collection('users')
    await ref.get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const user = doc.data()
          if (user.referralID === payload.id) {
            updateUser(user)
          }
        })
      }).catch((error) => {
        commit('setLoading', { type: 'referral', is: false })
        console.log('Error getting document:', error)
      })

    function updateUser (arg) {
      // get the array of referrals
      const ref = db.collection('referrals')
      const arr = []
      ref.doc(arg.userID).then((doc) => {
        if (doc.exists) {
          arr.push(doc.data())
        }
      }).catch((error) => {
        commit('setLoading', { type: 'referral', is: false })
        console.log('Error getting referral array:', error)
      })

      // add the new array
      arr && arr.push(arg)

      // update the referrals
      ref.update(arr).then(() => {
        console.log('Updated')
      }).catch((error) => {
        commit('setLoading', { type: 'referral', is: false })
        console.log('Error getting referral array:', error)
      })

      // update referral Wallet
      arg.wallet.referral = parseFloat(arg.wallet.referral) + 80
      db.collection('users').doc(arg.userID).update(arg)
    }
  },

  // Update the wallet address
  async updateWalletAddress ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'wallet', is: true })
    const userId = auth.currentUser.uid
    await db.collection('users').doc(userId).update({
      walletAddress: payload
    }).then(() => {
      commit('setLoading', { type: 'wallet', is: false })
      dispatch('controller/initAlert', { is: true, type: 'success', message: 'Wallet Address Updated' }, { root: true })
    }).catch((error) => {
      commit('setLoading', { type: 'wallet', is: false })
      console.log(error.message)
      dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
    })
  },
  // Update the wallet address
  async updateProfile ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'profile', is: true })
    const userId = auth.currentUser.uid
    await db.collection('users').doc(userId).update({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      country: payload.country,
      currency: payload.currency
    }).then(() => {
      commit('setLoading', { type: 'profile', is: false })
      dispatch('controller/initAlert', { is: true, type: 'success', message: 'Profile Updated' }, { root: true })
    }).catch((error) => {
      commit('setLoading', { type: 'profile', is: false })
      console.log(error.message)
      dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
    })
  },

  // Verification functions
  initializeVerification ({ commit }) {
    commit('setLoading', { type: 'verify', is: true })

    const userID = auth.currentUser.uid
    const ref = db.collection('verification').doc(userID)
    ref.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data()
        console.log('Verification Data', data)
        // set State
        commit('setState', { type: 'verification', value: data })
        commit('setLoading', { type: 'verify', is: false })
      } else {
        commit('setLoading', { type: 'verify', is: false })
      }
    })
  },

  async initVerification ({ commit, dispatch }, payload) {
    const userID = auth.currentUser.uid
    const ref = db.collection('verification').doc(userID)
    commit('setLoading', { type: 'verify', is: true })
    const verificationObject = {
      identity: {
        front: '',
        back: '',
        type: '',
        status: null
      },
      address: {
        type: '',
        status: null,
        document: ''
      },
      face: {
        photo: '',
        status: null
      }
    }

    await ref.set(verificationObject)
      .then(() => {
        console.log('Initialization Complete')
        commit('setLoading', { type: 'verify', is: false })
      }).catch((error) => {
        console.log(error.message)
        commit('setLoading', { type: 'verify', is: false })
        dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
      })
  },

  async verifyFunc ({ commit, dispatch }, payload) {
    const field = payload.field
    const userID = auth.currentUser.uid
    const ref = db.collection('verification').doc(userID)

    // Check if verification object is init
    await ref.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        // get Document
        updateDoc(data)
      } else {
        // init verification
        dispatch('initVerification')

        const data = {
          identity: {
            front: '',
            back: '',
            type: '',
            status: null
          },
          address: {
            type: '',
            status: null,
            document: ''
          },
          face: {
            photo: '',
            status: null
          }
        }

        updateDoc(data)
        // upload document
      }
    })

    function updateDoc (data) {
      if (field === 'identity') {
        // update data locally
        data.identity.message = ''
        data.identity.type = payload.type

        // update database
        ref.update({
          identity: data
        })

        // upload document
        dispatch('verifyIdentity', { data, photo: payload.front, doc: 'front' })
        dispatch('verifyIdentity', { data, photo: payload.back, doc: 'back' })
      } else if (field === 'address') {
        // update data locally
        data.address.message = ''
        data.address.type = payload.type

        // update database
        ref.update({
          address: data
        })

        // upload document
        dispatch('verifyAddress', { data, photo: payload.document })
      } else if (field === 'face') {
        // update data locally
        data.face.message = ''

        // update database
        console.log('updating ', data)
        ref.update(data)

        // upload document
        const photo = payload.photo
        dispatch('verifyFace', { data, photo })
      }
      // update document
    }
  },

  verifyAddress ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'verify', is: true })
    // update data locally
    const data = payload.data
    data.address.document = null // Doc mean either front or back document
    const userID = auth.currentUser.uid

    // uploadDoc(field, data, data.photo)
    const ref = db.collection('verification').doc(userID)

    let photoURL
    const photo = payload.photo
    const filename = photo.name
    const ext = filename.slice(filename.lastIndexOf('.'))

    st.ref(`verification/${userID}${ext}`)
      .put(photo)
      .then((res) => {
        // console.log('start download')
        st.ref(`verification/${userID}${ext}`)
          .getDownloadURL()
          .then((url) => {
            photoURL = url
            // update photo in the database
            data.address.status = 'Progress'
            data.address.document = photoURL
            console.log('data', data)

            ref.update(data).then(function () {
              console.log('Verification updated')
              commit('setLoading', { type: 'verify', is: false })
              dispatch('controller/initAlert', { is: true, type: 'success', message: 'Document submitted successfully' }, { root: true })
              // initialize verification
              // dispatch('initializeVerification')
            })
              .catch(function (error) {
                // The document probably doesn't exist.
                console.log(error.message)
                commit('setLoading', { type: 'verify', is: false })
                dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
              })
          })
          .catch((error) => {
            console.log(error.message)
            commit('setLoading', { type: 'verify', is: false })
            dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
          })
      }).catch((err) => {
        console.log(err)
        commit('setLoading', { type: 'verify', is: false })
        dispatch('controller/initAlert', { is: true, type: 'error', message: err.message }, { root: true })
      })
  },
  verifyIdentity ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'verify', is: true })
    // update data locally
    const data = payload.data
    data.identity[payload.doc] = null // Doc mean either front or back document
    const userID = auth.currentUser.uid

    // uploadDoc(field, data, data.photo)
    const ref = db.collection('verification').doc(userID)

    let photoURL
    const photo = payload.photo
    const filename = photo.name
    const ext = filename.slice(filename.lastIndexOf('.'))

    st.ref(`verification/${userID}${ext}`)
      .put(photo)
      .then((res) => {
        // console.log('start download')
        st.ref(`verification/${userID}${ext}`)
          .getDownloadURL()
          .then((url) => {
            photoURL = url
            console.log('URL', url)
            // update photo in the database
            data.identity.status = 'Progress'
            data.identity[payload.doc] = photoURL
            console.log('data', data)

            ref.update(data).then(function () {
              console.log('Verification updated')
              commit('setLoading', { type: 'verify', is: false })
              dispatch('controller/initAlert', { is: true, type: 'success', message: 'Document submitted successfully' }, { root: true })

              // initialize verification
              // dispatch('initializeVerification')
            })
              .catch(function (error) {
                // The document probably doesn't exist.
                console.log(error.message)
                commit('setLoading', { type: 'verify', is: false })
                dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
              })
          })
          .catch((error) => {
            console.log(error.message)
            commit('setLoading', { type: 'verify', is: false })
            dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
          })
      }).catch((err) => {
        console.log(err)
        commit('setLoading', { type: 'verify', is: false })
        dispatch('controller/initAlert', { is: true, type: 'error', message: err.message }, { root: true })
      })
  },
  verifyFace ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'verify', is: true })
    // update data locally
    const data = payload.data
    data.face.photo = null
    const userID = auth.currentUser.uid

    // uploadDoc(field, data, data.photo)
    const ref = db.collection('verification').doc(userID)

    let photoURL
    const photo = payload.photo
    const filename = photo.name
    const ext = filename.slice(filename.lastIndexOf('.'))

    st.ref(`verification/${userID}${ext}`)
      .put(photo)
      .then((res) => {
        // console.log('start download')
        st.ref(`verification/${userID}${ext}`)
          .getDownloadURL()
          .then((url) => {
            photoURL = url
            // update photo in the database
            data.face.status = 'Progress'
            data.face.photo = photoURL
            console.log('data', data)

            ref.update(data).then(function () {
              console.log('Verification updated')
              commit('setLoading', { type: 'verify', is: false })
              dispatch('controller/initAlert', { is: true, type: 'success', message: 'Document submitted successfully' }, { root: true })
              // initialize verification
              // dispatch('initializeVerification')
            })
              .catch(function (error) {
                // The document probably doesn't exist.
                console.log(error.message)
                commit('setLoading', { type: 'verify', is: false })

                dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
              })
          })
          .catch((error) => {
            console.log(error.message)
            commit('setLoading', { type: 'verify', is: false })
            dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
          })
      }).catch((err) => {
        console.log(err)
        commit('setLoading', { type: 'verify', is: false })
        dispatch('controller/initAlert', { is: true, type: 'error', message: err.message }, { root: true })
      })
  },
  // Verification Functions
  async updateStatus ({ commit, dispatch, state }, payload) {
    commit('setLoading', { type: 'verify', is: true })
    // get the exact veritification data and update the status locally
    const data = state.verification[payload]
    data.status = null
    const userID = auth.currentUser.uid
    // update the status on the server
    const ref = db.collection('verification').doc(userID)
    await ref.update({
      [payload]: data
    })
      .then(function () {
        console.log('Status updated')
        commit('setLoading', { type: 'verify', is: false })
      })
      .catch(function (error) {
      // The document probably doesn't exist.
        console.log(error.message)
        commit('setLoading', { type: 'verify', is: false })
        dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
      })
  },

  handleAuth ({ commit, dispatch, state }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        commit('setState', { type: 'login', value: true })
        // get current user id
        const userId = auth.currentUser.uid
        // get current user details
        db.collection('users')
          .doc(userId)
          .onSnapshot((snapshot) => {
            if (snapshot.exists) {
              const currentUser = snapshot.data()

              commit('setState', { type: 'user', value: currentUser })
              // init transactions
              dispatch('controller/initApp', null, { root: true })
              dispatch('admin/initAdmin', null, { root: true })

              // Redirect to dashboard
              if (!state.user.block) {
                if (state.user !== null) {
                  if (state.user.role !== 'admin') {
                    this.$router.push('/dashboard/home')
                  }
                }
              } else {
                location.href = '/login'
                dispatch('controller/initAlert', { is: true, type: 'error', message: 'Account blocked, Please contact support@ttub.online' }, { root: true })
                commit('setLoading', { type: 'login', is: false })
              }

              console.log(state.user)
            } else {
              // snapshot.data() will be undefined in this case
              // eslint-disable-next-line
                console.log('No such document!')
            }
          })
      } else {
        // console.log('logout')
        location.href = '/login'
        commit('setState', { type: 'login', value: false })
        commit('setState', { type: 'user', value: null })
      }
    })
  }

}
