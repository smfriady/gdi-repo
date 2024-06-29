const express = require('express')
const {
  getPackages,
  getPackage,
  updatePackage,
  removePackage,
  addPackage,
} = require('../controllers/package-controller')
const {
  getExpeditions,
  addExpedition,
} = require('../controllers/expedition-controller')
const { getReports } = require('../controllers/reports-controller')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('Hello World')
})

// 	GET /packages: Mendapatkan daftar semua paket.
routes.get('/packages', getPackages)
// POST /packages: Menambahkan data paket.
routes.post('/packages', addPackage)
// 	GET /packages/:id: Mendapatkan detail paket berdasarkan ID.
routes.get('/packages/:id', getPackage)
// 	PUT /packages/:id: Mengupdate data paket berdasarkan ID.
routes.put('/packages/:id', updatePackage)
// 	DELETE /packages/:id: Menghapus paket berdasarkan ID.
routes.delete('/packages/:id', removePackage)

// 	GET /expeditions: Mendapatkan daftar semua ekspedisi.
routes.get('/expeditions', getExpeditions)
// 	POST /expedition: Menambahkan daftar ekspedisi.
routes.post('/expedition', addExpedition)

// 	GET /reports: Mendapatkan laporan  .
routes.get('/reports', getReports)

module.exports = routes
