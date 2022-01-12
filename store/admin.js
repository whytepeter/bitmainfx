// import Cookie from 'js-cookie'
import { db } from '@/services/firebase'
// import emailjs from 'emailjs-com'

export const state = () => ({

  activePage: 'Home',

  loading: {
    update: false,
    users: false,
    deposit: false,
    transfer: false,
    withdraw: false,
    loan: false,
    transactions: false,
    wallet: false,
    delete: false,
    verify: false
  },

  alert: {
    is: false,
    type: '',
    message: '',
    title: '',
    persistence: false
  },

  transactionID: '',

  users: [],
  deposits: [],
  transfers: [],
  withdraws: [],
  loans: [],
  transactions: [],
  wallet: '',
  verification: null,
  verifications: null

})

export const getters = {
  getState: state => (payload) => {
    return state[payload]
  },

  getAlert (state) {
    return state.alert
  },
  getLoading (state) {
    return state.loading
  }
}

export const mutations = {
  setState (state, { type, value }) {
    state[type] = value
  },

  setActivePage (state, active) {
    state.activePage = active
  },
  setAlert (state, alert) {
    state.alert = alert
  },
  setLoading (state, { type, is }) {
    state.loading.all = is
    state.loading[type] = is
  }

}

export const actions = {

  // Alert
  initAlert ({ commit }, { is, type, timer, persistence, title, message }) {
    if (typeof persistence === 'undefined') {
      persistence = false
    }
    if (typeof timer === 'undefined') {
      timer = null
    }
    commit('setAlert', { is, type, title, timer, persistence, message })
  },

  // Walle Address
  async initWalletAddress ({ commit }) {
    await db.collection('wallet')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs
        const wallets = []
        data.forEach((doc) => {
          // get user detail
          wallets.push(doc.data())
        })
        console.log(wallets)
        commit('setState', { type: 'wallet', value: wallets })
      })
  },

  // Update the wallet address
  async walletUpdate ({ commit, dispatch }, { payload, type }) {
    commit('setLoading', { type: 'wallet', is: true })
    if (type === 'add') {
      await db.collection('wallet').add(payload)
        .then((docRef) => {
          // update ID
          updateID(docRef.id)
        }).catch((error) => {
          commit('setLoading', { type: 'wallet', is: false })
          console.log(error.message)
          dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: error.message }, { root: true })
        })
    } else {
      await db.collection('wallet').doc(payload.id).update(payload)
        .then(() => {
          commit('setLoading', { type: 'wallet', is: false })
          dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: 'Wallet Address Updated' }, { root: true })
        }).catch((error) => {
          commit('setLoading', { type: 'wallet', is: false })
          console.log(error.message)
          dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: error.message }, { root: true })
        })
    }

    function updateID (id) {
      db.collection('wallet').doc(id).update({
        id
      }).then(() => {
        commit('setLoading', { type: 'wallet', is: false })
        dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: 'Wallet Address Address' }, { root: true })
      }).catch((error) => {
        commit('setLoading', { type: 'wallet', is: false })
        console.log(error.message)
        dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: error.message }, { root: true })
      })
    }
  },
  // Update the wallet address
  async deleteAddress ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'delete', is: true })

    await db.collection('wallet').doc(payload.id).delete()
      .then(() => {
        commit('setLoading', { type: 'delete', is: false })
        dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: 'Wallet Address deleted' }, { root: true })
      }).catch((error) => {
        commit('setLoading', { type: 'delete', is: false })
        console.log(error.message)
        dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: error.message }, { root: true })
      })
  },

  async initUsers ({ commit }) {
    commit('setLoading', { type: 'users', is: true })
    await db.collection('users')
      .where('role', '==', 'user')
      .where('delete', '==', false)
      .onSnapshot((snapshot) => {
        const users = []
        const data = snapshot.docs
        data.forEach((doc) => {
          // get user detail
          const user = doc.data()
          user.deposit = `$${user.wallet.deposit.toLocaleString()}`
          users.push(user)
        })

        console.log(users)
        commit('setState', { type: 'users', value: users })
        commit('setLoading', { type: 'users', is: false })
      })
  },

  async updateUser ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'update', is: true })
    const ref = db.collection('users')
    await ref.doc(payload.userID).update(payload).then(() => {
      commit('setLoading', { type: 'update', is: false })
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: 'User update successfully' }, { root: true })
    }).catch((error) => {
      commit('setLoading', { type: 'update', is: false })
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: error.message }, { root: true })
    })
  },

  async createTransaction ({ commit, dispatch }, payload) {
    const ref = db.collection('transactions')
    await ref.add(payload).then((docRef) => {
      // update the transaction ID
      commit('setState', { type: 'transactionID', value: docRef.id })
      ref.doc(docRef.id).update({
        transactionID: docRef.id
      }).then(() => {
        console.log('transactionID update')
      }).catch((error) => {
        console.log(error.message)
      })
      console.log('Transaction created successfully')
      console.log('transaction submited')
    }).catch((error) => {
      console.log(error.message)
      // dispatch('controller/initAlert', { is: true, persistence:true, type: 'error', message: error.message }, { root: true })
    })
  },

  async initTransactions ({ commit }) {
    commit('setLoading', { type: 'transaction', is: true })
    await db.collection('transactions')
      .onSnapshot((snapshot) => {
        const transactions = []
        const data = snapshot.docs
        console.log(data)
        data.forEach((doc) => {
          // get transaction detail
          const transaction = doc.data()
          transactions.push(transaction)
        })

        // console.log(transactions)
        commit('setState', { type: 'transactions', value: transactions })
        commit('setLoading', { type: 'transaction', is: false })
      })
  },

  async initWithdraw ({ commit }) {
    commit('setLoading', { type: 'withdraw', is: true })
    await db.collection('withdraw')
      .onSnapshot((snapshot) => {
        const withdraws = []
        const data = snapshot.docs
        // console.log(data)
        data.forEach((doc) => {
          // get withdraw detail
          const withdraw = doc.data()
          withdraws.push(withdraw)
        })

        // console.log(withdraws)
        commit('setState', { type: 'withdraws', value: withdraws })
        commit('setLoading', { type: 'withdraw', is: false })
      })
  },
  async initDeposit ({ commit }) {
    commit('setLoading', { type: 'deposit', is: true })
    await db.collection('deposit')
      .onSnapshot((snapshot) => {
        const deposits = []
        const data = snapshot.docs
        // console.log(data)
        data.forEach((doc) => {
          // get deposit detail
          const deposit = doc.data()
          deposits.push(deposit)
        })

        // console.log(deposits)
        commit('setState', { type: 'deposits', value: deposits })
        commit('setLoading', { type: 'deposit', is: false })
      })
  },

  async initTransfer ({ commit }) {
    commit('setLoading', { type: 'transfer', is: true })
    await db.collection('transfers')
      .onSnapshot((snapshot) => {
        const transfers = []
        const data = snapshot.docs
        // console.log(data)
        data.forEach((doc) => {
          // get transfer detail
          const transfer = doc.data()
          transfers.push(transfer)
        })

        // console.log(transfers)
        commit('setState', { type: 'transfers', value: transfers })
        commit('setLoading', { type: 'transfers', is: false })
      })
  },

  async initLoan ({ commit }) {
    commit('setLoading', { type: 'loan', is: true })
    await db.collection('loans')
      .onSnapshot((snapshot) => {
        const loans = []
        const data = snapshot.docs
        // console.log(data)
        data.forEach((doc) => {
          // get loan detail
          const loan = doc.data()
          loans.push(loan)
        })

        // console.log(loans)
        commit('setState', { type: 'loans', value: loans })
        commit('setLoading', { type: 'loan', is: false })
      })
  },

  async updateTransactions ({ state, rootState, commit, dispatch }, payload) {
    // console.log(payload)
    commit('setLoading', { type: payload.type, is: true })
    if (checkTransaction(payload.transactionID)) {
      // update the deposit | transfer | loan transaction
      const ref = db.collection(payload.type).doc(payload.ID)
      await ref.update({
        status: payload.status
      }).then(() => {
        console.log(`${payload.type} updated`)
        // call transaction functions
        updateTransaction(payload.status, payload.message)
        if (payload.type === 'deposit' && payload.status === 'success') {
          topWallet(payload.amount, 'deposit')
        } else if (payload.type === 'withdraw' && payload.status === 'fail') {
          topWallet(payload.amount, 'earnings')
        } else if (payload.type === 'withdraw' && payload.status === 'success') {
          topWallet(payload.amount, 'withdraw')
        } else if (payload.type === 'loans') {
          console.log('loan')
        }
      }).catch((error) => {
        commit('setLoading', { type: payload.type, is: false })
        console.log(error.message)
        // dispatch('controller/initAlert', { is: true, persistence:true, type: 'error', message: error.message }, { root: true })
      })
    }

    // Update the transaction
    function updateTransaction (status, message) {
      commit('setLoading', { type: payload.type, is: true })
      db.collection('transactions').doc(payload.transactionID).update({
        status,
        message,
        updated: true
      }).then(() => {
        commit('setLoading', { type: payload.type, is: false })
        console.log('transaction updated')
      }).catch((error) => {
        commit('setLoading', { type: payload.type, is: false })
        console.log(error.message)
      })
    }

    // Return withdrawal fund back to user
    // function sendEmail (amount) {
    //   commit('setLoading', { type: payload.type, is: true })
    //   const user = state.users.find((el) => {
    //     return el.userID === payload.userID
    //   })
    //   // send email
    //   emailjs.send('service_dwgphem', 'template_pr3lb01', {
    //     amount: `${user.currency}${amount}`,
    //     name: `${user.firstName}${user.lastName}`,
    //     email: `${user.currency} ${user.email}`,
    //     deposit: `${user.currency}${user.wallet.deposit}`,
    //     earnings: `${user.currency}${user.wallet.earnings}`,
    //     withdraw: `${user.currency}${user.wallet.withdraw}`,
    //     bonus: `${user.currency}${user.wallet.bonus}`

    //   }, 'user_3dmDfQU2TWwsGoVPjQkMX').then(() => {
    //     console.log('Email Sent to User Successfully')
    //   })
    // }

    // Return withdrawal fund back to user
    function topWallet (amount, wallet) {
      commit('setLoading', { type: payload.type, is: true })
      const user = state.users.find((el) => {
        return el.userID === payload.userID
      })
      console.log(user, user.wallet[wallet])
      user.wallet[wallet] += amount
      console.log(user.wallet[wallet])
      db.collection('users').doc(user.userID).update(user).then(() => {
        commit('setLoading', { type: payload.type, is: false })
        console.log('User Balance Updated')
        dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: 'Transaction updated successfully' }, { root: true })
      }).catch((error) => {
        commit('setLoading', { type: payload.type, is: false })
        console.log(error.message)
      })
    }

    // check transaction if it has been updated already
    function checkTransaction (ID) {
      const transaction = state.transactions.find((el) => {
        return el.transactionID === ID
      })
      if (transaction.updated) {
        commit('setLoading', { type: payload.type, is: false })
        dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: 'Transaction Has been updated already' }, { root: true })
        return false
      } else {
        commit('setLoading', { type: payload.type, is: false })
        return true
      }
    }

    // function updateRevenue (amount) {
    //   // get user details
    //   const currentRevenue = rootState.admin.revenue

    //   // deduct amount from balance
    //   const newRevenue = currentRevenue + amount

    //   // update user in database
    //   const ref = db.collection('wallet')

    //   await ref.doc('revenue').update(newRevenue).then(() => {
    //     console.log('Revenue updated')
    //   }).catch((error) => {
    //     console.log(error.message)
    //     dispatch('initAlert', { is: true, persistence:true, type: 'error', message: error.message })
    //   })
    // }
  },

  // Verification Functions
  // Verification functions
  initializeVerification ({ commit }, payload) {
    commit('setLoading', { type: 'verify', is: true })
    let ref
    const arr = []

    if (payload) {
      ref = db.collection('verification').doc(payload)
      ref.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data()

          console.log('singgle', data)
          console.log('verification', data)
          commit('setState', { type: 'verification', value: data })
          commit('setLoading', { type: 'verify', is: false })
        }
      })
    } else {
      ref = db.collection('verification')
      ref.onSnapshot((snapshot) => {
        const data = snapshot.docs
        // console.log(data)
        data.forEach((doc) => {
          arr.push(doc.data())
        })

        console.log('verification', arr)
        commit('setState', { type: 'verifications', value: arr })
        commit('setLoading', { type: 'verify', is: false })
      })
    }
  },

  // Verification Functions
  async verifyAction ({ commit, dispatch, state }, payload) {
    commit('setLoading', { type: 'verify', is: true })
    // get the exact veritification data and update the status locally
    const data = state.verification[payload.type]
    data.status = payload.status
    data.message = payload.message

    // update the status on the server
    const ref = db.collection('verification').doc(payload.id)
    await ref.update({
      [payload.type]: data
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

  initAdmin ({ dispatch }) {
    dispatch('initUsers')
    dispatch('initDeposit')
    dispatch('initWithdraw')
    dispatch('initTransfer')
    dispatch('initLoan')
    dispatch('initTransactions')
    dispatch('initWalletAddress')
    dispatch('initializeVerification')
  }
}
