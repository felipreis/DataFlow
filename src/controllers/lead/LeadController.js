import responseHttp from "../../response/responseHttp.js";
import LeadService from '../../services/lead/LeadService.js'

async function create(req,res){
    try {
        const payload = req.body;
        const organization_id = req.organization.id
        const organization_status = req.organization.status;
        delete payload.organization_id;
        
        const lead = {...payload,organization_id:organization_id}
        const retorno = await LeadService.create(lead,organization_status);

        responseHttp(retorno,res) 
    } catch (error) {
        console.error(error);
       if(error.message === "É obrigatório informar e-mail ou telefone." ||
         error.message === "Source é obrigatório." ||
         error.message === "Nome é obrigatório." ) {return res.status(400).json({message: error.message})}
        
        if(error.message === 'Formato de email inválido'){
            return res.status(422).json({message: error.message})
        }

        return res.status(500).json({message:'Erro interno do servidor'})
    }

}

async function getAllLeads(req,res){
    const organization_id = req.organization.id
    const {page,limit} = req.query;
    const retorno = await LeadService.getAllLeads(organization_id,{page,limit});
    responseHttp(retorno,res);
}

async function getLeadById(req,res){
    try {
        const {id} = req.params;
        const organization_id = req.organization.id
        const retorno =  await LeadService.getLeadById(id,organization_id);
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
        const organization_id = req.organization.id
        const retorno = await LeadService.updateStatus(id,status,organization_id);
        responseHttp(retorno,res)
    } catch (error) {
        if(error.message === 'Não é possível alterar status'){
            return res.status(401).json({message: error.message})
        }

        if(error.message === 'Lead não encontrado'){
            return res.status(404).json({message: error.message})
        }

        return res.status(500).json({message:error.message})
    }
}

async function getLeadStats(req, res) {
    const organization_id = req.organization.id
    const retorno = await LeadService.getLeadStats(organization_id)
    responseHttp(retorno, res)
}


export default {
    create,
    getAllLeads,
    getLeadById,
    updateStatus,
    getLeadStats
}