import LeadRepository from '../../repositories/lead/LeadRepository.js'
import validarEmail from '../../middlewares/validator.js'
import validators from "../../middlewares/validator.js";


async function create(payload){
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

    return await LeadRepository.create(payload);
}

async function getAllLeads(){
    return await LeadRepository.getAllLeads();
}

export default {
    create,
    getAllLeads
}

