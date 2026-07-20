import MetaLeadService from '../../services/webhook/MetaWebhookService.js'
import responseHttp from '../../response/responseHttp.js'

async function receive(req,res){
    try {
        const payload = req.body;
        const {apiKey} = req.params;
        const retorno = await MetaLeadService.receive(payload,apiKey)
        responseHttp(retorno,res)
    } catch (error) {

        if(error.message === 'Organização não encontrada'){return res.status(404).json({message:error.message})}

        return res.status(500).json({message:error.message})
    }


}

export default {receive};