import OrganizationService from "../../services/organization/OrganizationService.js"
import responseHttp from "../../response/responseHttp.js"

async function create(req,res){
    const payload = req.body
    const response = await OrganizationService.create(payload);
    responseHttp(response,res)
}

export default {
    create
}