const services = require('../services/reports-services')

const getReports = async (req, res, next) => {
  try {
    const result = await services.getReports(req.query)
    res.json({ data: result })
  } catch (e) {
    next(e)
  }
}

module.exports = { getReports }
