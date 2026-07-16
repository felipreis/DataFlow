import responseHttp from "../response/responseHttp.js";
import LeadService from '../services/lead/LeadService.js'

async function create(req,res){
    try {
        const payload = req.body;
        const retorno = await LeadService.create(payload);
        responseHttp(retorno,res) 
    } catch (error) {
        console.error(error);
       if(error.message === "É obrigatório informar e-mail ou telefone." ||
         error.message === "Source é obrigatório." ||
         error.message === "Nome é obrigatório." ) {return res.status(400).json({message: error.message})}
        
        if(error.message === 'Formato de telefone inválido' || error.message === 'Formato de email inválido'){
            return res.status(422).json({message: error.message})
        }

        return res.status(500).json({message:'Erro interno do servidor'})
    }

}

async function getAllLeads(req,res){
    const retorno = await LeadService.getAllLeads();
    responseHttp(retorno,res);
}

async function getLeadById(req,res){
    try {
        const {id} = req.params;
        const retorno =  await LeadService.getLeadById(id);
        responseHttp(retorno,res);
    } catch (error) {
        if(error.message === 'Lead não encontrado'){ return res.status(404).json({message: error.message})}
        return res.status(500).json({message: error.message})
    }    
}

async function updateStatus(req,res){
    try {
        const {id} = req.params;
        const status = req.body
        const retorno = await LeadService.updateStatus(id,status);
        responseHttp(retorno,res)
    } catch (error) {
        if(error.message === 'Não é possível alterar status'){
            return res.status(401).json({message: error.message})
        }

        if(error.message === 'Lead não encontrado'){
            return res.status(404).json({message: error.message})
        }

        return status(500).json({message:error.message})
    }
}

export default {
    create,
    getAllLeads,
    getLeadById,
    updateStatus
}