import LeadRepository from '../../repositories/lead/LeadRepository.js'
import validarEmail from '../../middlewares/validator.js'
import validators from "../../middlewares/validator.js";
import JourneyEventService from '../../services/lead/JourneyEventService.js';


async function create(payload,organization_status){
    //obrigatoriedade de campos
    if(!payload.phone && !payload.email){throw new Error("É obrigatório informar e-mail ou telefone.")}
    if(!payload.source){ throw new Error("Source é obrigatório.");}
    if(!payload.name){ throw new Error("Nome é obrigatório.");}

    //validação dos campos dos campos
    if(payload.phone && !validators.validarTelefone(payload.phone) ) {
        throw new Error("Formato de telefone inválido");
    }

    if(payload.email && !validators.validarEmail(payload.email)){
        throw new Error ('Formato de email inválido')
    }

    const lead =  await LeadRepository.create(payload);

    await JourneyEventService.create({
        lead_id: lead.id,
        event: "LEAD_RECEIVED",
        description: "Lead recebido",
        payload: {}
    });

    return lead;

}

async function getAllLeads(organization_id){
    return await LeadRepository.getAllLeads(organization_id);
}

async function getLeadById(id,organization_id){
    const lead = await LeadRepository.getLeadById(id,organization_id);
    if(!lead){ throw new Error('Lead não encontrado')}
    return lead
}

async function updateStatus(id,status,organization_id){
    if (status.status !== 'RECEIVED' && status.status !== 'QUALIFIED' && status.status !== 'SALE' ){throw new Error('Não é possível alterar status') }
    const lead = await LeadRepository.getLeadById(id,organization_id)
    if(!lead){ throw new Error('Lead não encontrado')}

    const oldStatus = lead.status
    const newStatus = status.status

    const updateLead = await LeadRepository.updateStatus(id,status,organization_id);

    await JourneyEventService.create({
        lead_id: lead.id,
        event: "STATUS_CHANGED",
        description: `Status alterado de ${oldStatus} para ${newStatus}`,
        payload: {
            old_status: oldStatus,
            new_status: newStatus
        }
    });

    return updateLead;
}


export default {
    create,
    getAllLeads,
    getLeadById,
    updateStatus
}

