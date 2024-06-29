const packageService = require('../services/package-services')

const getPackages = async (_req, res, next) => {
  try {
    const result = await packageService.getPackages()
    res.json({ data: result })
  } catch (e) {
    next(e)
  }
}

const getPackage = async (req, res, next) => {
  try {
    const result = await packageService.getPackage(req.params)
    res.json({ data: result })
  } catch (e) {
    next(e)
  }
}

const updatePackage = async (req, res, next) => {
  try {
    const result = await packageService.updatePackage(req.params, req.body)
    res.json({ data: result })
  } catch (e) {
    next(e)
  }
}

const removePackage = async (req, res, next) => {
  try {
    const result = await packageService.removePackage(req.params)
    res.json({ data: result })
  } catch (e) {
    next(e)
  }
}

const addPackage = async (req, res, next) => {
  try {
    const result = await packageService.addPackage(req.body)
    res.json({ data: result })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getPackages,
  getPackage,
  updatePackage,
  removePackage,
  addPackage,
}
