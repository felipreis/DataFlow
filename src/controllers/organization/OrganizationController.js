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

export default {
    create,
     findByApiKey
}