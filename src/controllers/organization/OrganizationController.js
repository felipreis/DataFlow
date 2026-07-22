import OrganizationService from "../../services/organization/OrganizationService.js"
import responseHttp from "../../response/responseHttp.js"

async function create(req,res){
    const payload = req.body
    const retorno = await OrganizationService.create(payload);
    responseHttp(retorno,res)
}

async function findByApiKey(req,res){
    const {api_key} = req.params;
    const retorno = await OrganizationService.findByApiKey(api_key);
    responseHttp(retorno,res)
}

async function metaInfo(req,res){
    try {
        const paylaod = req.body;
        const {id} = req.params;
        const retorno = await OrganizationService.metaInfo(id,paylaod);
        responseHttp(retorno,res);
    } catch (error) {
        if(error.message === 'Orgnanização não encontrada!'){ return res.status(404).json({message:error.message})}
        return res.status(500).json({message:error.message})
    }
}

export default {
    create,
     findByApiKey,
     metaInfo
}