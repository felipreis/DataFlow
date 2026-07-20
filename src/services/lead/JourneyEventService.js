import JourneyEventRepository from "../../repositories/lead/JourneyEventRepository.js";
import LeadRepository from "../../repositories/lead/LeadRepository.js";

async function create(payload){
    return await JourneyEventRepository.create(payload);
}

async function getByLeadId(id,organization_id){
    const lead = await LeadRepository.getLeadById(id,organization_id);
    if(!lead){throw new Error('Lead não encontrado')}
    
    return await JourneyEventRepository.getByLeadId(id);
}

export default {
    create,
    getByLeadId,
}