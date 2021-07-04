import { auth, db, st } from '@/services/firebase'

export const state = () => ({

  loading: {
    fund: false,
    withdraw: false,
    commission: false,
    investment: false,
    request: false
  },

  wallet: {
    totalDeposite: 0,
    earnings: 0,
    withdraw: 0,
    referral: 0
  },

  notifications: {
    general: [],
    withdraw: [],
    investmnet: [],
    fundWallet: []
  },

  proofDetails: null,
  investment: null,
  withdraw: null
})

export const getters = {

  getWallet (state) {
    return state.wallet
  },
  getLoading (state) {
    return state.loading
  },
  getBTCValue (state) {
    const oneBTC = 9542.26
    const btc = state.wallet.totalDeposite / oneBTC
    return btc
  },
  getNofitications (state) {
    if (state.notifications !== null) {
      return state.notifications
    } else {
      return {}
    }
  },
  getProofDetails (state) {
    if (state.proofDetails !== null) {
      return state.proofDetails
    } else {
      return []
    }
  },
  getWithdrawStatus (state) {
    if (state.withdraw !== null) {
      return state.withdraw
    } else {
      return []
    }
  },
  getLastWithdraw (state) {
    if (state.withdraw !== null) {
      return state.withdraw[state.withdraw.length - 1]
    } else {
      return []
    }
  },
  getInvestmentStatus (state) {
    if (state.investment !== null) {
      return state.investment
    } else {
      return []
    }
  }
}

export const mutations = {
  SET_WALLET (state, wallet) {
    state.wallet = wallet
  },

  SET_LOADING (state, { type, is }) {
    state.loading[type] = is
  },

  SET_PROOF (state, details) {
    state.proofDetails = details
  },
  SET_WITHDRAW_STATUS (state, status) {
    state.withdraw = status
  },
  SET_MODAL (state, mode) {
    state.planModal = mode
  },
  SET_NOTIFICATIONS (state, notif) {
    state.notifications = notif
  },
  SET_INVESTMENT_STATUS (state, status) {
    state.investment = status
  }
}

export const actions = {

  sendRequest ({ commit, dispatch, rootState }) {
    commit('SET_LOADING', { type: 'request', is: true })
    const userId = auth.currentUser.uid
    const ref = db.collection('users').doc(userId)

    const request = {
      state: true
    }

    ref.update({
      request
    }).then(() => {
      commit('SET_LOADING', { type: 'request', is: false })
      dispatch('authentication/initAlert', { is: true, type: 'success', message: 'A request has been sent to admin, expect an email shortly' }, { root: true })
    }).catch((error) => {
      console.log('Error getting document:', error)
      commit('SET_LOADING', { type: 'request', is: false })
      dispatch('authentication/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
    })
  },

  initWallet ({ commit, state }) {
    const userId = auth.currentUser.uid
    const ref = db.collection('users').doc(userId)
    let currentUser
    ref.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        currentUser = snapshot.data()
        const wallet = currentUser.wallet
        commit('SET_WALLET', wallet)
      } else {
        // snapshot.data() will be undefined in this case
        // eslint-disable-next-line
        console.log('No such document!')
      }
    })

    notifications()
    proof()
    investmentStatus()
    withdrawStatus()

    function notifications () {
      ref.onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const user = snapshot.data()
          const notifications = user.notifications

          commit('SET_NOTIFICATIONS', notifications)
        } else {
          // console.log('notification not found!')
        }
      })
    }

    function investmentStatus () {
      ref.onSnapshot((snapshot) => {
        const user = snapshot.data()
        const investments = user.investments
        if (investments.length) {
          const arr = []
          investments.forEach((doc) => {
            const status = {
              name: doc.name,
              capital: doc.amount,
              date: doc.date,
              elapse: doc.elapse,
              status: doc.status
            }
            arr.push(status)
          })
          commit('SET_INVESTMENT_STATUS', arr)
        }
      })
    }

    function withdrawStatus () {
      ref.onSnapshot((snapshot) => {
        const user = snapshot.data()
        const withdraw = user.withdraw
        if (withdraw.length) {
          const arr = []
          withdraw.forEach((doc) => {
            const status = {
              walletAddress: doc.walletAddress,
              amount: doc.amount,
              date: doc.date,
              commission: doc.commission,
              status: doc.status
            }
            arr.push(status)
          })

          commit('SET_WITHDRAW_STATUS', arr)
        }
      })
    }

    function proof () {
      ref.onSnapshot((snapshot) => {
        const user = snapshot.data()
        const fundWallet = user.fundWallet
        if (fundWallet.length) {
          const arr = []
          fundWallet.forEach((doc) => {
            const proof = {
              wallet: {
                walletAddress: doc.walletAddress,
                amount: doc.amount,
                date: doc.date,
                status: doc.status
              },
              bank: {
                bankName: doc.bankName,
                accountName: doc.accountName,
                accountNumber: doc.accountNumber,
                amount: doc.amount,
                date: doc.date,
                status: doc.status
              }
            }
            arr.push(proof[doc.type])
          })

          commit('SET_PROOF', arr)
        }
      })
    }
  },

  investFund ({ commit, state, dispatch }, payload) {
    // check if Funds is available
    payload.status = 'Ongoing'
    payload.id = auth.currentUser.uid
    const userID = auth.currentUser.uid
    // commit('authentication/SET_LOADING', true, { root: true })
    commit('SET_MODAL', true)
    commit('SET_LOADING', { type: 'investment', is: true })

    // get the user investment
    let user, investments
    const ref = db.collection('users').doc(userID)
    ref.get().then(function (doc) {
      if (doc.exists) {
        user = doc.data()
        investments = user.investments

        // deduct the amount from your wallet
        deduct(payload.amount)

        // push the newInvestment in
        investments.unshift(payload)
        // update investment in the database

        ref.update({
          investments
        }).then(function () {
          console.log('invesment successfully updated!')
          dispatch('authentication/initAlert', { is: true, type: 'success', message: 'Your Investment was successful, awaiting approval' }, { root: true })
          commit('SET_LOADING', { type: 'investment', is: false })
        })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error('Error updating document: ', error)

            // update investment status
            dispatch('authentication/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
            investmentStatus()
            commit('SET_LOADING', { type: 'investment', is: false })
          })
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
        commit('SET_LOADING', { type: 'investment', is: false })
      }
    })

    function deduct (amount) {
      const userId = auth.currentUser.uid
      const newTotalDeposite = state.wallet.totalDeposite - parseInt(amount)
      // console.log(newTotalDeposite)

      db.collection('users')
        .doc(userId).update({
          'wallet.totalDeposite': newTotalDeposite
        }).then(() => {
          // console.log('totalDeposite update')
        }).catch((err) => {
          console.log(err)
        })
    }
    function investmentStatus () {
      ref.onSnapshot((snapshot) => {
        const user = snapshot.doc.data()
        const investments = user.investments
        const arr = []
        investments.forEach((doc) => {
          const status = {
            name: doc.name,
            capital: doc.amount,
            date: doc.date,
            elapse: doc.elapse,
            status: doc.status
          }
          arr.push(status)
        })
        // console.log(arr)
        commit('SET_INVESTMENT_STATUS', arr)
      })
    }
  },

  fundWallet ({ commit, dispatch }, fund) {
    // console.log('start')
    commit('SET_LOADING', { type: 'fund', is: true })
    const userID = auth.currentUser.uid
    const ref = db.collection('users').doc(userID)

    let filename, photo, ext, recieptURL
    if (fund.photo !== null) {
      photo = fund.photo
      filename = fund.photo.name
      ext = filename.slice(filename.lastIndexOf('.'))

      st.ref(`reciept/${userID}${ext}`)
        .put(photo)
        .then((res) => {
          // console.log('start download')
          st.ref(`reciept/${userID}${ext}`)
            .getDownloadURL()
            .then((url) => {
              recieptURL = url
              // console.log('download success')

              // get the user withdrawals
              let user, fundWallet
              ref.get().then(function (doc) {
                if (doc.exists) {
                  user = doc.data()
                  fundWallet = user.fundWallet

                  // push the newInvestment in
                  const object = {
                    wallet: {
                      type: fund.type,
                      walletAddress: fund.walletAddress,
                      amount: fund.amount,
                      date: fund.date,
                      recieptURL,
                      status: 'Pending'
                    },
                    bank: {
                      type: fund.type,
                      bankName: fund.bankName,
                      accountName: fund.accountName,
                      accountNumber: fund.accountNumber,
                      amount: fund.amount,
                      date: fund.date,
                      recieptURL,
                      status: 'Pending'
                    }
                  }
                  fundWallet.unshift(object[fund.type])

                  const username = db.collection('users').doc(userID).username
                  const message = {
                    text: `${username} just funded `,
                    status: 'Pending',
                    date: fund.date
                  }

                  dispatch('sendNotification', { type: 'withdraw', message })
                  // update investment in the database

                  ref.update({
                    fundWallet
                  }).then(function () {
                    // console.log('proof sent to admin')
                    commit('SET_LOADING', { type: 'fund', is: false })
                    dispatch('authentication/initAlert', { is: true, type: 'success', message: 'Proof of payment has been sent to admin, awaiting approval' }, { root: true })
                    commit('SET_PROOF', fundWallet)
                  })
                    .catch(function (error) {
                      // The document probably doesn't exist.
                      console.log(error.message)
                      dispatch('authentication/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
                      commit('SET_LOADING', { type: 'fund', is: false })
                    })
                } else {
                  // doc.data() will be undefined in this case
                  console.log('No such document!')
                }
              })
            })
            .catch((error) => {
              console.log(error.message)
              dispatch('authentication/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
              commit('SET_LOADING', { type: 'fund', is: false })
            })
        }).catch((err) => {
          console.log(err)
          dispatch('authentication/initAlert', { is: true, type: 'error', message: err.message }, { root: true })
          commit('SET_LOADING', { type: 'fund', is: false })
        })
    } else {
      commit('SET_LOADING', { type: 'fund', is: false })
    }
  },

  sentCommission ({ commit, dispatch }, commission) {
    // console.log('start')
    commit('SET_LOADING', { type: 'commission', is: true })
    const userID = auth.currentUser.uid
    const ref = db.collection('users').doc(userID)

    let filename, photo, ext, recieptURL
    if (commission.photo !== null) {
      photo = commission.photo
      filename = commission.photo.name
      ext = filename.slice(filename.lastIndexOf('.'))

      st.ref(`reciept/${userID}${ext}`)
        .put(photo)
        .then((res) => {
          // console.log('start download')
          st.ref(`reciept/${userID}${ext}`)
            .getDownloadURL()
            .then((url) => {
              recieptURL = url
              // console.log('download success')

              // get the user withdrawals
              let user, commissions
              ref.get().then(function (doc) {
                if (doc.exists) {
                  user = doc.data()
                  commissions = user.commissions

                  // unshift the newInvestment in
                  commissions.unshift({
                    walletAddress: commission.walletAddress,
                    amount: commission.amount,
                    date: commission.date,
                    recieptURL,
                    status: 'Pending'
                  })

                  // send notification message
                  const message = {
                    text: 'commission sent, awaiting approval',
                    status: 'Pending',
                    date: commission.date
                  }

                  dispatch('sendNotification', { type: 'withdraw', message })

                  // update investment in the database
                  ref.update({
                    commissions
                  }).then(function () {
                    // console.log('proof sent to admin')
                    commit('SET_LOADING', { type: 'commission', is: false })
                    dispatch('authentication/initAlert', { is: true, type: 'success', message: 'Proof of payment has been sent to admin, awaiting approval' }, { root: true })
                  })
                    .catch(function (error) {
                      // The document probably doesn't exist.
                      console.log(error.message)
                      dispatch('authentication/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
                      commit('SET_LOADING', { type: 'commission', is: false })
                    })
                } else {
                  // doc.data() will be undefined in this case
                  console.log('No such document!')
                }
              })
            })
            .catch((error) => {
              console.log(error.message)
              dispatch('authentication/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
              commit('SET_LOADING', { type: 'commission', is: false })
            })
        }).catch((err) => {
          console.log(err)
          dispatch('authentication/initAlert', { is: true, type: 'error', message: err.message }, { root: true })
          commit('SET_LOADING', { type: 'commission', is: false })
        })
    } else {
      commit('SET_LOADING', { type: 'commission', is: false })
    }
  },

  sendNotification ({ commit }, { type, message }) {
    const userID = auth.currentUser.uid
    const ref = db.collection('users').doc(userID)
    let user, notifications, whichOne
    ref.get().then(function (doc) {
      if (doc.exists) {
        user = doc.data()
        notifications = user.notifications
        whichOne = notifications[type]
        // unshift the newInvestment in
        whichOne.unshift(message)
        // update investment in the database
        ref.update({
          notifications
        }).then(function () {
          // console.log('notification sent successfully updated!')
        })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error('Error updating notifications: ', error)
          })
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    })
  },

  withdrawFund ({ commit, dispatch, state }, payload) {
    const userID = auth.currentUser.uid
    const ref = db.collection('users').doc(userID)
    commit('SET_LOADING', { type: 'withdraw', is: true })

    // deduct amount from balance
    const balance = state.wallet.earnings - payload.amount
    console.log(balance)
    const newWallet = {
      totalDeposite: state.wallet.totalDeposite,
      earnings: balance,
      withdraw: state.wallet.withdraw
    }
    console.log(newWallet)
    // get the user withdrawals
    let user, withdraw
    ref.get().then(function (doc) {
      if (doc.exists) {
        user = doc.data()
        withdraw = user.withdraw

        // push the newInvestment in
        withdraw.push(payload)
        // update investment in the database

        const message = {
          text: `Your withdrawal request of $${payload.amount.toLocaleString()} has been sent, You will receive a confirmation email shortly`,
          status: 'Pending',
          date: payload.date
        }

        dispatch('sendNotification', { type: 'withdraw', message })

        ref.update({
          withdraw,
          wallet: newWallet
        }).then(function () {
          // console.log('withdraw successfully updated!')
          commit('SET_LOADING', { type: 'withdraw', is: false })
          dispatch('authentication/initAlert', { is: true, type: 'success', message: `Your withdrawal request of $${payload.amount.toLocaleString()} has been sent, You will receive a confirmation email shortly` }, { root: true })
        })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error('Error updating document: ', error)
            dispatch('authentication/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
            // update withdraw status
            withdrawStatus()

            commit('SET_LOADING', { type: 'withdraw', is: false })
          })
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
        commit('SET_LOADING', { type: 'withdraw', is: false })
      }
    })

    function withdrawStatus () {
      ref.onSnapshot((snapshot) => {
        const arr = []
        snapshot.docs.forEach((doc) => {
          const status = {
            walletAddress: doc.walletAddress,
            amount: doc.amount,
            date: doc.date,
            commission: doc.commission,
            status: doc.status
          }
          arr.push(status)
        })

        commit('SET_WITHDRAW_STATUS', arr)
      })
    }
  }

}
