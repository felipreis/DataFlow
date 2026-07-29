import ConversionRepository from "../../repositories/conversion/ConversionRepository.js"
import MetaConversionMapper from "../../utils/MetaConversionMapper.js";
import OrganizationService from "../organization/OrganizationService.js";
import JourneyEventService from "../lead/JourneyEventService.js";
import MetaApiService from "../meta/MetaApiService.js";

async function create(lead,eventName){
    
    const payload = {
        lead_id: lead.id,
        platform: "META",
        event_name: eventName,
        organization_id:lead.organization_id,
        payload: {
            email: lead.email,
            phone: lead.phone,
            city: lead.city,
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

async function markAsSent(id) {

    return await ConversionRepository.update(id, {
        status: "SENT",
        sent_at: new Date(),
        error_message: null
    });

}

async function markAsFailed(id, error) {

    return await ConversionRepository.update(id, {
        status: "FAILED",
        error_message:
            typeof error === "string"
                ? error
                : JSON.stringify(error)
    });

}

async function processConversion(lead,organization_id,eventName){
    const conv = await create(lead,eventName);
    const organization = await OrganizationService.findById(organization_id);
    const payloadMeta = MetaConversionMapper.map(conv,organization);

    try {
        await MetaApiService.send(payloadMeta, organization);
        await markAsSent(conv.id);
        await JourneyEventService.create({
            lead_id: lead.id,
            event: "META_EVENT_SENT",
            description: `Evento ${eventName} enviado para Meta`,
            payload: {
                conversion_id: conv.id,
                event_name: eventName
            }
        });
    } catch (error) {
        const errorMessage = error.response?.data || error.message;
        await markAsFailed( conv.id, errorMessage);
        await JourneyEventService.create({
            lead_id: lead.id,
            event: "META_EVENT_FAILED",
            description: `Erro ao enviar evento ${eventName}`,
            payload: {
                event_name: eventName,
                error: errorMessage
            }
        });
    }

    return conv;
}

async function getStats(organization_id) {
    const rows = await ConversionRepository.getStats(organization_id)

    const stats = { total: 0, PENDING: 0, PROCESSING: 0, SENT: 0, FAILED: 0 }

    rows.forEach((row) => {
        const count = Number(row.count)
        stats[row.status] = count
        stats.total += count
    })

    return stats
}


export default{
    create,
    getAll,
    getById,
    processConversion,
    getStats
}