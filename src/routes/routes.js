import express from 'express'
import LeadController from '../controllers/lead/LeadController.js';
import JourneyEventController from '../controllers/lead/JourneyEventController.js';
import OrganizationController from '../controllers/organization/OrganizationController.js';
import apiKeyMiddleware from '../middlewares/apiKeyMiddleware.js'

const router = express.Router();

router.get('/health', (req,res) => {
   return res.status(200).json({message:'ok'})
})

router.post('/lead',apiKeyMiddleware, LeadController.create)
router.get('/lead',apiKeyMiddleware, LeadController.getAllLeads)
router.get('/lead/:id',apiKeyMiddleware,LeadController.getLeadById)
router.put('/lead/:id/status',apiKeyMiddleware, LeadController.updateStatus)

router.get('/lead/:id/journey',apiKeyMiddleware,JourneyEventController.getByLeadId)

router.post('/organizations',OrganizationController.create);
router.get('/organizations/:api_key',OrganizationController.findByApiKey)
router.put('/organizations/:id/meta',OrganizationController.metaInfo)



export default router;