const prisma = require('../db')

const countPackage = async (payload) => {
  const count = await prisma.package.count({
    where: {
      id: parseInt(payload.id),
    },
  })
  if (count !== 1) {
    throw new ResponseError(404, 'package is not found')
  }
  return true
}

const getPackages = async () => {
  return await prisma.package.findMany({
    include: { ekspedisi: true },
  })
}

const getPackage = async (payload) => {
  await countPackage(payload)

  return await prisma.package.findFirst({
    where: { id: parseInt(payload.id) },
    select: {
      alamatPenerima: true,
      alamatPengirim: true,
      ekspedisi: true,
      ekspedisiId: true,
      id: true,
      namaPenerima: true,
      namaPengirim: true,
      status: true,
      tanggalPembuatan: true,
    },
  })
}

const updatePackage = async (params, body) => {
  await countPackage(params, body)

  return await prisma.package.update({
    where: {
      id: body.id,
    },
    data: {
      alamatPenerima: body.alamatPenerima,
      alamatPengirim: body.alamatPengirim,
      ekspedisiId: body.ekspedisiId,
      namaPenerima: body.namaPenerima,
      namaPengirim: body.namaPengirim,
      status: body.status,
      tanggalPembuatan: body.tanggalPembuatan,
    },
    select: {
      id: true,
    },
  })
}

const removePackage = async (payload) => {
  await countPackage(payload)

  return await prisma.package.delete({
    where: {
      id: parseInt(payload.id),
    },
  })
}

const addPackage = async (payload) => {
  return await prisma.package.create({ data: payload })
}

module.exports = {
  getPackages,
  getPackage,
  updatePackage,
  removePackage,
  addPackage,
}
