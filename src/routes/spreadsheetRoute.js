import express from 'express'
import SpreadsheetSyncController from '../controllers/spreadsheet/SpreadsheetSyncController.js';
import apiKeyMiddleware from '../middlewares/apiKeyMiddleware.js';


const spreadSheetRouter = express.Router();

spreadSheetRouter.post('/spreadsheet/sync',apiKeyMiddleware,SpreadsheetSyncController.sync)

export default spreadSheetRouter;
