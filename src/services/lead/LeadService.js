import LeadRepository from '../../repositories/lead/LeadRepository.js'


async function create(payload){
    return await LeadRepository.create(payload);
}

export default {
    create,
}