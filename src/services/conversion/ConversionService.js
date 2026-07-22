import ConversionRepository from "../../repositories/conversion/ConversionRepository.js"

async function create(lead){
    
    const payload = {
        lead_id: lead.id,
        platform: "META",
        event_name: "Purchase",
        organization_id:lead.organization_id,
        payload: {
            email: lead.email,
            phone: lead.phone,
            fbc: lead.fbc,
            fbp: lead.fbp,
            fbclid: lead.fbclid,
            value: lead.value,
            currency: lead.currency,

            campaign_id: lead.campaign_id,
            campaign_name: lead.campaign_name,

            source_id: lead.source_id,

    }
};

    return await ConversionRepository.create(payload);
}

async function getAll(organization_id){
    return await ConversionRepository.getAll(organization_id)
}

async function getById(id,organization_id){
    const conversion = await ConversionRepository.getById(id,organization_id);
    if(!conversion){throw new Error('Conversão não encontrada')}
    return conversion;
}


export default{
    create,
    getAll,
    getById
}