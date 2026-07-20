import express from 'express'
import MetaWebhookController from '../controllers/webhook/MetaWebhookController.js'

const webhookRouter = express.Router();

// /webhooks/meta/:apiKey
 webhookRouter.post('/webhooks/meta/:apiKey',MetaWebhookController.receive);

 export default webhookRouter;