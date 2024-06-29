// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC5p5DKufBtqbuESbWH0cWmNLSREzlsf4g',
  authDomain: 'itsmyklim.firebaseapp.com',
  projectId: 'itsmyklim',
  storageBucket: 'itsmyklim.appspot.com',
  messagingSenderId: '746539846868',
  appId: '1:746539846868:web:ff7f3b8c0d3a68a5bcff41',
  measurementId: 'G-WZTRNK0FE1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
