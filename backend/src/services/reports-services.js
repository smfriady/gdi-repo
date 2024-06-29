const prisma = require('../db')

const getReports = async (query) => {
  const { ekspedisiId, tanggalPembuatan } = query

  let q = {
    where: {},
  }

  if (ekspedisiId) {
    q.where['ekspedisiId'] = ekspedisiId
  }

  if (tanggalPembuatan) {
    q.where['tanggalPembuatan'] = new Date(tanggalPembuatan)
  }

  if (!ekspedisiId && !tanggalPembuatan) {
    delete q.where
  }

  return await prisma.package.findMany({
    ...q,
    include: {
      ekspedisi: true,
    },
  })
}

module.exports = { getReports }
