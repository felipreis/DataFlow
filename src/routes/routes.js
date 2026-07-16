import express from 'express'
import LeadController from '../controllers/LeadController.js';

const router = express.Router();

router.get('/health', (req,res) => {
   return res.status(200).json({message:'ok'})
})

router.post('/lead',LeadController.create)
router.get('/lead',LeadController.getAllLeads)
router.get('/lead/:id',LeadController.getLeadById)
router.put('/lead/:id/status',LeadController.updateStatus)

export default router;