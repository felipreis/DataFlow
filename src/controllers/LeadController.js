import responseHttp from "../response/responseHttp.js";
import LeadService from '../services/lead/LeadService.js'

async function create(req,res){
    const payload = req.body;
    const retorno = await LeadService.create(payload);
    responseHttp(retorno,res)
}

export default {
    create
}