import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyCdneMO8l5xu0zw0WBErmnEKiyzYnbOt3E',
  authDomain: 'bitmainfx-13005.firebaseapp.com',
  projectId: 'bitmainfx-13005',
  storageBucket: 'bitmainfx-13005.appspot.com',
  messagingSenderId: '342384971907',
  appId: '1:342384971907:web:4bfe2682ced862bcd28bb6'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
export const auth = firebase.auth()
export const db = firebase.firestore()
export const st = firebase.storage()
