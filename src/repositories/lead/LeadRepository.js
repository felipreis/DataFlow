import { where } from 'sequelize';
import Lead from '../../models/lead/Lead.js'
import LeadService from '../../services/lead/LeadService.js';

async function create(payload){
    return await Lead.create(payload);
}

async function getAllLeads(organization_id,limit,offset){
    return await Lead.findAndCountAll({
        limit: limit,
        offset: offset,
        where: { organization_id: organization_id },
        order: [['createdAt', 'DESC']],
    })
}

async function getLeadById(id,organization_id){
    return await Lead.findOne({
    where: {
        id,
        organization_id
    }
})
}

async function updateStatus(id,status,organization_id){
    const leadUpdate = await Lead.update(status,{
        where: {
            id: id, 
            organization_id: organization_id
        }
    })

    return await getLeadById(id,organization_id);

}

async function getBySourceId(sourceId){
    return await Lead.findOne({
        where: {
            source_id:sourceId
        }
    })
}


export default {
    create,
    getAllLeads,
    getLeadById,
    updateStatus,
    getBySourceId
}