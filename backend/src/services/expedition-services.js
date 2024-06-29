const prisma = require('../db')

const getExpeditions = async () => {
  return await prisma.expedition.findMany()
}

const addExpedition = async (payload) => {
  return await prisma.expedition.create({
    data: {
      namaEkspedisi: payload.namaEkspedisi,
    },
  })
}

module.exports = { getExpeditions, addExpedition }
