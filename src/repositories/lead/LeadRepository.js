import Lead from '../../models/lead/Lead.js'

async function create(payload){
    return await Lead.create(payload);
}

async function getAllLeads(){
    return await Lead.findAll();
}

export default {
    create,
    getAllLeads
}