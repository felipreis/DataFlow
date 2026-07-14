import express from 'express'

const router = express.Router();

router.get('/health', (req,res) => {
   return res.status(200).json({message:'ok'})
})

export default router;