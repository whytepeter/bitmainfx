import { auth, db, st } from '@/services/firebase'

export const state = () => ({

  activePage: 'Home',

  loading: {
    loan: false,
    deposit: false,
    transfer: false,
    investment: false,
    withdraw: false,
    currency: false
  },

  alert: {
    is: false,
    type: '',
    message: '',
    title: '',
    persistence: false
  },

  loanID: '',
  transferID: '',
  depositID: '',
  withdrawID: '',
  investmentID: '',
  transactionID: '',

  transactions: [],
  investments: [],

  currency: []

})

export const getters = {

  getState: state => (payload) => {
    return state[payload]
  },

  getAlert (state) {
    return state.alert
  },

  getActivePage (state) {
    return state.activePage
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
      persistence = true
    }
    if (typeof timer === 'undefined') {
      timer = null
    }

    commit('setAlert', { is, type, title, timer, persistence, message })

    if (!persistence) {
      setTimeout(() => {
        commit('setAlert', { is: false, type, title: '', timer: null, persistence: false, message: '' })
      }, 5000)
    }
  },
  async initCurrency ({ commit }) {
    commit('setLoading', { type: 'currency', is: true })
    await db.collection('currency')
      .onSnapshot((snapshot) => {
        const currency = []
        const data = snapshot.docs
        // console.log(data)
        data.forEach((doc) => {
          // get setting detail
          const arr = doc.data()
          currency.push(arr)
        })

        console.log(currency)
        commit('setState', { type: 'currency', value: currency })
        commit('setLoading', { type: 'currency', is: false })
      })
  },

  // Loan Application
  async loanForm ({ rootState, commit, dispatch }, payload) {
    commit('setLoading', { type: 'loan', is: true })
    const userID = auth.currentUser.uid
    const ref = db.collection('loans')
    payload.userID = userID

    await ref.add(payload).then((docRef) => {
      // update the loan ID
      commit('setState', { type: 'loanID', value: docRef.id })
      ref.doc(docRef.id).update({
        loanID: docRef.id
      })
      console.log('loan submited')
      // Transaction details
      const user = rootState.authentication.user
      payload.purpose = `Applied for loan of ${user.symbol}${(payload.amount).toLocaleString()}`
      payload.type = 'loan'
      payload.ID = docRef.id
      const transaction = payload
      dispatch('transactions', transaction)
      dispatch('initAlert', { is: true, type: 'success', persistence: true, message: 'Loan application submitted successful and under review' })
      commit('setLoading', { type: 'loan', is: false })
    }).catch((error) => {
      dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
      commit('setLoading', { type: 'loan', is: false })
    })
  },

  // Fund Transfer
  async transferForm ({ rootState, commit, dispatch }, payload) {
    commit('setLoading', { type: 'transfer', is: true })
    const userID = auth.currentUser.uid
    const ref = db.collection('transfers')
    payload.userID = userID

    await ref.add(payload).then((docRef) => {
      // update the transferID
      commit('setState', { type: 'transferID', value: docRef.id })
      ref.doc(docRef.id).update({
        transferID: docRef.id
      })
      console.log('transfer submited')
      // Transaction details
      const user = rootState.authentication.user
      payload.purpose = `Applied for transfer of ${user.symbol}${(payload.beneficiary.amount).toLocaleString()} to ${payload.beneficiary.firstName} ${payload.beneficiary.lastName}`
      payload.type = 'transfer'
      payload.ID = docRef.id
      const transaction = payload
      dispatch('transactions', transaction)

      // Deduct Balance
      dispatch('deductBalance', payload.beneficiary.amount)

      dispatch('initAlert', { is: true, type: 'success', persistence: true, message: 'Fund Transfer  submitted successful and under review' })
      commit('setLoading', { type: 'transfer', is: false })
    }).catch((error) => {
      commit('setLoading', { type: 'transfer', is: false })
      dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
    })
  },

  async deductBalance ({ rootState, dispatch }, { amount, wallet }) {
    // get user details
    const userID = auth.currentUser.uid
    const user = rootState.authentication.user
    const currentBal = user.wallet[wallet]

    // deduct amount from balance
    const newBalance = currentBal - amount
    user.wallet[wallet] = newBalance

    // update user in database
    const ref = db.collection('users')

    await ref.doc(userID).update(user).then(() => {
      console.log(`${amount} Debited from ${wallet} was successful`)
    }).catch((error) => {
      console.log(error.message)
      dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
    })
  },

  async topBalance ({ rootState, dispatch }, { amount, wallet }) {
    // get user details
    const userID = auth.currentUser.uid
    const user = rootState.authentication.user
    const currentBal = user.wallet[wallet]

    // deduct amount from balance
    const newBalance = currentBal + amount
    user.wallet[wallet] = newBalance

    // update user in database
    const ref = db.collection('users')

    await ref.doc(userID).update(user).then(() => {
      console.log(`${amount} Credited to ${wallet} was successful`)
    }).catch((error) => {
      console.log(error.message)
      dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
    })
  },

  // Transactions
  async transactions ({ commit, dispatch, rootState }, payload) {
    console.log('Start Transactions')
    const ref = db.collection('transactions')
    payload.message = ''
    payload.updated = false
    payload.balance = rootState.authentication.user.wallet.deposit
    console.log(payload.balance)
    await ref.add(payload).then((docRef) => {
      // update the transaction ID
      commit('setState', { type: 'transactionID', value: docRef.id })
      ref.doc(docRef.id).update({
        transactionID: docRef.id
      })

      const types = {
        deposit: 'deposit',
        loan: 'loans',
        withdraw: 'withdraw',
        transfer: 'transfers'
      }

      db.collection(types[payload.type]).doc(payload.ID).update({
        transactionID: docRef.id
      })
      console.log('transaction submited')
    }).catch((error) => {
      dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
    })
  },

  async initTransactions ({ commit }) {
    commit('setLoading', { type: 'transaction', is: true })
    const userID = auth.currentUser.uid
    await db.collection('transactions')
      .where('userID', '==', userID)
      .onSnapshot((snapshot) => {
        const transactions = []
        const data = snapshot.docs
        // console.log(data)
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

  // Create Investment
  async invest ({ commit, rootState, dispatch }, payload) {
    commit('setLoading', { type: 'investment', is: true })
    const userID = auth.currentUser.uid
    const ref = db.collection('investments')
    payload.userID = userID
    await ref.add(payload).then((docRef) => {
      // update the loan ID
      commit('setState', { type: 'investmentID', value: docRef.id })
      ref.doc(docRef.id).update({
        investmentID: docRef.id
      })

      // Deduct Amount from Balance
      dispatch('deductBalance', { amount: payload.amount, wallet: 'deposit' })

      console.log('Investment submited')
      dispatch('initAlert', { is: true, type: 'success', persistence: true, message: 'Transaction was successful' })
      commit('setLoading', { type: 'investment', is: false })
    }).catch((error) => {
      dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
      commit('setLoading', { type: 'investment', is: false })
    })
  },

  async initInvestments ({ commit }) {
    commit('setLoading', { type: 'investment', is: true })
    const userID = auth.currentUser.uid
    await db.collection('investments')
      .where('userID', '==', userID)
      .onSnapshot((snapshot) => {
        const investments = []
        const data = snapshot.docs
        // console.log(data)
        data.forEach((doc) => {
          // get investment detail
          const investment = doc.data()
          investments.push(investment)
        })

        // console.log(investments)
        commit('setState', { type: 'investments', value: investments })
        commit('setLoading', { type: 'investment', is: false })
      })
  },

  investmentCrone ({ state }) {
    console.log('Starting Crone')
    // const userID = auth.currentUser.uid
    // Get Investments
    const investments = state.investments
    // Check if today is the maturity date
    investments.forEach((el) => {
      const today = getDate('current')
      console.log(today)
      if (today === el.maturityDate) {
        db.collection('investments').doc(el.investmentID).update({
          status: 'completed'
        }).then(() => {
          console.log('Investment Completed')
          // Notify user and admin
        }).catch((error) => {
          // dispatch('initAlert', { is: true, type: 'error', persistence:true, message: error.message })
          console.log(error.message)
        })
      }
    })

    function getDate (get, days) {
      const currentDate = new Date()
      let newDate

      function addDays (days) {
        const result = new Date(currentDate)
        result.setDate(result.getDate() + days)
        return formatDate(result)
      }

      function formatDate (date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December']
        return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
      }

      if (get === 'add') {
        newDate = addDays(days)
      } else if (get === 'current') {
        newDate = formatDate(currentDate)
      }
      return newDate
    }
  },
  // Withdrawal Request
  async withdrawalRequest ({ commit, rootState, dispatch }, payload) {
    commit('setLoading', { type: 'withdraw', is: true })
    const userID = auth.currentUser.uid
    const ref = db.collection('withdraw')
    payload.userID = userID
    await ref.add(payload).then((docRef) => {
      // update the loan ID
      commit('setState', { type: 'withdrawID', value: docRef.id })
      ref.doc(docRef.id).update({
        withdrawID: docRef.id
      })
      console.log('Withdrawal submited')

      // Deduct Amount from Profit
      dispatch('deductBalance', { amount: payload.amount, wallet: 'earnings' })

      // Transaction details
      const user = rootState.authentication.user
      payload.purpose = `Withdrawal request of ${user.symbol}${(payload.amount).toLocaleString()}`
      payload.type = 'withdraw'
      payload.ID = docRef.id
      const transaction = payload
      dispatch('transactions', transaction)
      dispatch('initAlert', { is: true, type: 'success', persistence: true, message: 'Withdrawal request submitted successful and under review' })
      commit('setLoading', { type: 'withdraw', is: false })
    }).catch((error) => {
      dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
      commit('setLoading', { type: 'withdraw', is: false })
    })
  },
  // Submit Proof of Payment
  async submitProof ({ commit, rootState, dispatch }, data) {
    commit('setLoading', { type: 'deposit', is: true })
    const payload = data.proof
    const userID = auth.currentUser.uid
    const ref = db.collection('deposit')
    payload.userID = userID
    await ref.add(payload).then((docRef) => {
      // update the loan ID
      commit('setState', { type: 'depositID', value: docRef.id })
      ref.doc(docRef.id).update({
        depositID: docRef.id
      })
      console.log('Deposit submited')
      // Upload Proof
      dispatch('uploadPhoto', data)
      // Transaction details
      const user = rootState.authentication.user
      payload.purpose = `Sent proof of payment of ${user.symbol}${(payload.amount).toLocaleString()}`
      payload.type = 'deposit'
      payload.ID = docRef.id
      const transaction = payload
      dispatch('transactions', transaction)
      dispatch('initAlert', { is: true, type: 'success', persistence: true, message: 'Proof of payment submitted successful and under review' })
      commit('setLoading', { type: 'deposit', is: false })
    }).catch((error) => {
      dispatch('initAlert', { is: true, type: 'error', persistence: true, message: error.message })
      commit('setLoading', { type: 'deposit', is: false })
    })
  },

  async uploadPhoto ({ dispatch, state }, payload) {
    const ID = state.depositID
    const ref = db.collection('deposit').doc(ID)

    let recieptURL
    const photo = payload.photo
    const filename = photo.name
    const ext = filename.slice(filename.lastIndexOf('.'))

    await st.ref(`reciept/${ID}${ext}`)
      .put(photo)
      .then((res) => {
        // console.log('start download')
        st.ref(`reciept/${ID}${ext}`)
          .getDownloadURL()
          .then((url) => {
            recieptURL = url
            // update photo in the database
            ref.update({
              photoURL: recieptURL
            }).then(function () {
              console.log('Deposit updated')
            })
              .catch(function (error) {
                // The document probably doesn't exist.
                console.log(error.message)
                dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
              })
          })
          .catch((error) => {
            console.log(error.message)
            dispatch('controller/initAlert', { is: true, type: 'error', message: error.message }, { root: true })
          })
      }).catch((err) => {
        console.log(err)
        dispatch('controller/initAlert', { is: true, type: 'error', message: err.message }, { root: true })
      })
  },

  // Initialize App
  async initApp ({ dispatch }) {
    await dispatch('initTransactions')
    await dispatch('initInvestments')
    await dispatch('investmentCrone')
    await dispatch('initCurrency')
    await dispatch('authentication/initializeVerification', null, { root: true })
  }

}
