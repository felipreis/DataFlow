import OrganizationService from "../services/organization/OrganizationService.js"

async function apiKeyMiddleware(req, res, next) {
    try {
        const api_key = req.headers["x-api-key"]
        if(!api_key){ return res.status(401).json({message:'API Key obrigatória'})}

        const organization = await OrganizationService.findByApiKey(api_key);
        if(!organization){ return res.status(401).json({message:'API Key inválida'})}

        if(organization.status !== "ACTIVE"){return res.status(403).json({message: 'Organização inativa'})}

        req.organization = organization;

        return next(); 
    } catch (error) {
        return res.status(500).json({message:'Erro interno do servidor'})
    }

}

export default apiKeyMiddleware;