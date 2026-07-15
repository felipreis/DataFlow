import express from 'express'
import LeadController from '../controllers/LeadController.js';

const router = express.Router();

router.get('/health', (req,res) => {
   return res.status(200).json({message:'ok'})
})

router.post('/lead',LeadController.create)

export default router;