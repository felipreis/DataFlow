import express from 'express'
import ConversionController from '../controllers/conversion/ConversionController.js';
import apiKeyMiddleware from './../middlewares/apiKeyMiddleware.js'

const conversionRouter = express.Router();

conversionRouter.get('/conversions',apiKeyMiddleware,ConversionController.getAll)
router.get('/conversions/stats', apiKeyMiddleware, ConversionController.getStats)
conversionRouter.get('/conversions/:id',apiKeyMiddleware,ConversionController.getById)


export default conversionRouter