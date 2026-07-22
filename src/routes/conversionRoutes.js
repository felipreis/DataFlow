import express from 'express'
import ConversionController from '../controllers/conversion/ConversionController';
import apiKeyMiddleware from './../middlewares/apiKeyMiddleware.js'

const conversionRouter = express.Router;

conversionRouter.get('/conversions',apiKeyMiddleware,ConversionController.getAll)
conversionRouter.get('/conversions/:id',apiKeyMiddleware,ConversionController.getById)


export default conversionRouter