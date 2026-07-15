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

export default {
    create
}