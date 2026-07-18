import express from 'express'
import LeadController from '../controllers/lead/LeadController.js';
import JourneyEventController from '../controllers/lead/JourneyEventController.js';
import OrganizationController from '../controllers/organization/OrganizationController.js';

const router = express.Router();

router.get('/health', (req,res) => {
   return res.status(200).json({message:'ok'})
})

router.post('/lead',LeadController.create)
router.get('/lead',LeadController.getAllLeads)
router.get('/lead/:id',LeadController.getLeadById)
router.put('/lead/:id/status',LeadController.updateStatus)

router.get('/lead/:id/journey',JourneyEventController.getByLeadId)

router.post('/organizations',OrganizationController.create);


export default router;