import Lead from '../../models/lead/Lead.js'

async function create(payload){
    return await Lead.create(payload);
}

export default {
    create,
}