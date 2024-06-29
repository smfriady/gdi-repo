require('dotenv').config()
const express = require('express')
const routes = require('./src/routes')
const cors = require('cors')

const app = express()
const port = 8081

app.use(cors())
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(express.json())

app.use(routes)

app.listen(port, (_) => {
  console.log(`Server up at port ${port}`)
})
