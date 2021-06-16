import { auth, db } from '@/services/firebase'
import emailjs, { init } from 'emailjs-com'
// init Email.js
init('user_cd0tx2R10vZAq5l6c3IwG')

export const state = () => ({
  admin: null,
  user: null,
  users: null,

  alert: {
    is: false,
    message: '',
    status: '',
    time: 3000
  },

  totalDeposit: 0,
  totalInvestment: 0,
  totalCommissions: 0,

  loading: {
    edit: false,
    approveFund: false,
    approveInvest: false
  }

})

export const getters = {
  getAdmin (state) {
    return state.admin
  },
  getTotalDeposite (state) {
    return state.totalDeposit
  },
  getTotalInvestments (state) {
    return state.totalInvestment
  },
  getTotalCommissions (state) {
    return state.totalCommissions
  },
  getLoading (state) {
    return state.loading
  },

  getAlert (state) {
    return state.alert
  },

  totalUsers (state) {
    if (state.users !== null) {
      return state.users.length
    } else {
      return 0
    }
  },

  getUser: state => (index) => {
    return state.users[index]
  },

  getUsers (state) {
    return state.users
  }
}

export const mutations = {
  setAdmin (state, payload) {
    state.admin = payload
  },

  setUsers (state, payload) {
    state.users = payload
  },

  setLoading (state, { type, is }) {
    state.loading[type] = is
  },
  setAlert (state, alert) {
    state.alert = alert
  },
  setTotalDeposit (state, amount) {
    state.totalDeposit = amount
  },
  setTotalCommissions (state, amount) {
    state.totalCommissions = amount
  },
  setTotalInvestment (state, amount) {
    state.totalInvestment = amount
  }

}

export const actions = {
  initAdmin ({ commit }) {
    const userID = auth.currentUser.uid
    db.collection('users').doc(userID).onSnapshot((snapshot) => {
      if (snapshot.exists) {
        const admin = snapshot.data()
        commit('setAdmin', admin)
        // console.log(state.admin)
      } else {
        // console.log('admin not found')
      }
    })
  },
  initUsers ({ commit, dispatch }) {
    db.collection('users')
      .where('admin', '==', false)
      .where('isDelete', '==', false)
      .onSnapshot((snapshot) => {
        const users = []
        const data = snapshot.docs
        data.forEach((doc) => {
        // get user detail
          const user = doc.data()
          users.push(user)
        })

        commit('setUsers', users)
      // console.log('Users has been updated')
      })

    dispatch('initTotal')
  },

  editWallet ({ commit, dispatch }, { userID, wallet }) {
    commit('setLoading', { type: 'edit', is: true })
    const ref = db.collection('users').doc(userID)
    ref.update({
      wallet
    }).then(() => {
      // console.log('wallet successfully update')
      commit('setLoading', { type: 'edit', is: false })
      dispatch('initAlert', { is: true, status: 'success', message: 'wallet edited successful' })
    }).catch((err) => {
      console.log(err.message)
      commit('setLoading', { type: 'edit', is: false })
      dispatch('initAlert', { is: true, status: 'error', message: err.message })
    })
  },

  initAlert ({ commit }, alert) {
    commit('setAlert', alert)
    setTimeout(() => {
      commit('setAlert', { is: false, status: '', message: '' })
    }, 3000)
  },

  async approveFundWallet ({ commit, dispatch }, { user, index, amount }) {
    const userID = user.userID
    let users
    await db.collection('users').where('userID', '==', userID).get().then((docs) => {
      users = docs.docs
    })

    users.forEach((doc) => {
      const user = doc.data()
      const fundWallet = user.fundWallet
      fundWallet[index].status = 'Success'
      db.collection('users').doc(userID).update({
        fundWallet
      }).then(() => {
        // console.log('funds successfully approved')

        //  top up total
        dispatch('updateTotal', { type: 'totalDeposit', amount })

        // send email
        amount = parseInt(amount)
        emailjs.send('service_yn0f3r9', 'template_9q1sps6', {
          name: user.username,
          email: user.email,
          amount: `$${amount.toLocaleString()}`,
          reply_to: user.email

        })

        makeDeposite()
        // console.log('wallet updated')
        dispatch('initAlert', { is: true, status: 'success', message: 'Fund approved successfully' })
      }).catch((err) => {
        console.log(err.message)
        dispatch('initAlert', { is: true, status: 'error', message: err.message })
      })
    })

    function makeDeposite () {
      const ref = db.collection('users').doc(userID)
      let user
      ref.get().then((doc) => {
        user = doc.data()
        const wallet = user.wallet
        wallet.totalDeposite === 0 ? wallet.totalDeposite = amount : wallet.totalDeposite += amount

        ref.update({
          wallet
        })
      }).catch((err) => {
        console.log(err.message)
      })
    }
  },
  approveCommission ({ commit, dispatch }, { user, index, date, amount }) {
    const userID = user.userID
    db.collection('users').where('userID', '==', userID).get().then((docs) => {
      const users = docs.docs
      users.forEach((doc) => {
        const user = doc.data()
        const commissions = user.commissions
        commissions[index].status = 'Success'
        db.collection('users').doc(userID).update({
          commissions
        }).then(() => {
          // console.log('commission successfully approved')
          //  top up total
          dispatch('updateTotal', { type: 'totalCommissions', amount })
          // Send a notification of approval to user
          const message = {
            status: 'Success',
            date,
            text: `Your withdrawal request of amount $${commissions[index].amount} has been approved`
          }
          approveMessage('withdraw', message)

          console.log('wallet updated')
          dispatch('initAlert', { is: true, status: 'success', message: 'Withdraw Commission approved successfully' })
        }).catch((err) => {
          console.log(err.message)
          dispatch('initAlert', { is: true, status: 'error', message: err.message })
        })
      })
    })

    function approveMessage (type, message) {
      const ref = db.collection('users').doc(userID)
      let user, notifications, whichOne
      ref.get().then(function (doc) {
        if (doc.exists) {
          user = doc.data()
          notifications = user.notifications
          whichOne = notifications[type]
          // push the newInvestment in
          whichOne.unshift(message)
          // update investment in the database
          ref.update({
            notifications
          }).then(function () {
            console.log('notification sent successfully updated!')
          })
            .catch(function (error) {
              // The document probably doesn't exist.
              console.error('Error updating notifications: ', error)
            })
        } else {
        // doc.data() will be undefined in this case
          // console.log('No such document!')
        }
      })
    }
  },

  approveInvestments ({ commit, dispatch }, { user, index, amount }) {
    // console.log('starting...')
    const userID = user.userID
    db.collection('users').where('userID', '==', userID).get().then((docs) => {
      const users = docs.docs
      users.forEach((doc) => {
        const user = doc.data()
        const investments = user.investments
        investments[index].status = 'Ongoing'
        db.collection('users').doc(userID).update({
          investments
        }).then(() => {
          // console.log('funds successfully approved')
          dispatch('initAlert', { is: true, status: 'success', message: 'Fund approved successfully' })

          // top up total
          dispatch('updateTotal', { type: 'totalInvestment', amount })
        }).catch((err) => {
          console.log(err.message)
          dispatch('initAlert', { is: true, status: 'error', message: err.message })
        })
      })
    })
  },

  approveWithdrawal ({ commit, dispatch }, { user, index }) {
    // console.log('starting...')
    const userID = user.userID
    db.collection('users').where('userID', '==', userID).get().then((docs) => {
      const users = docs.docs
      users.forEach((doc) => {
        const user = doc.data()
        const withdraw = user.withdraw
        withdraw[index].status = 'Success'
        db.collection('users').doc(userID).update({
          withdraw
        }).then(() => {
          // console.log('funds successfully approved')
          dispatch('initAlert', { is: true, status: 'success', message: 'Fund approved successfully' })
        }).catch((err) => {
          console.log(err.message)
          dispatch('initAlert', { is: true, status: 'error', message: err.message })
        })
      })
    })
  },

  async updateTotal ({ commit }, { type, amount }) {
    console.log('updating...')

    const ref = await db.collection('total').doc(type)
    ref.get().then((doc) => {
      const oldAmount = doc.data().amount
      const newAmount = oldAmount + parseInt(amount)
      ref.update({
        amount: newAmount
      })
    })
  },

  initTotal ({ commit }) {
    db.collection('total').doc('totalDeposit').onSnapshot((snapshot) => {
      const amount = snapshot.data().amount
      commit('setTotalDeposit', amount)
    })

    db.collection('total').doc('totalInvestment').onSnapshot((snapshot) => {
      const amount = snapshot.data().amount
      commit('setTotalInvestment', amount)
    })

    db.collection('total').doc('totalCommissions').onSnapshot((snapshot) => {
      const amount = snapshot.data().amount
      commit('setTotalCommissions', amount)
    })
  },

  deleteUser ({ dispatch }, userID) {
    db.collection('users').doc(userID).update({
      isDelete: true
    }).then(() => {
      dispatch('initAlert', { is: true, status: 'success', message: 'user is deleted' })
    }).catch((err) => {
      dispatch('initAlert', { is: true, status: 'error', message: err.message })
    })
  }
}
