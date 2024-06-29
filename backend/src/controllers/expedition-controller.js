const service = require('../services/expedition-services')

const getExpeditions = async (_req, res, next) => {
  try {
    const result = await service.getExpeditions()
    res.json({ data: result })
  } catch (e) {
    next(e)
  }
}

const addExpedition = async (req, res, next) => {
  try {
    const result = await service.addExpedition(req.body)
    res.json({ data: result })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getExpeditions,
  addExpedition,
}
