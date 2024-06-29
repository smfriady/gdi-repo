import 'moment/locale/id'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './assets/scss/styles.scss'
import reportWebVitals from './reportWebVitals'
import { routes } from './routes'
import moment from 'moment-timezone'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

moment.tz.setDefault('Asia/Jakarta')

const root = ReactDOM.createRoot(document.getElementById('root'))
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

root.render(<RouterProvider router={routes} />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
