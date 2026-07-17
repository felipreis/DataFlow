import JourneyEvent from "../../models/lead/JourneyEvent.js";

async function create(payload){
    return await JourneyEvent.create(payload);
}

async function getByLeadId(id){
    return await JourneyEvent.findAll({
        where: {
            lead_id: id
        }
    })
}

export default {
    create,
    getByLeadId
}

