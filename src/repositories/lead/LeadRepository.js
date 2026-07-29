import { where } from 'sequelize';
import Lead from '../../models/lead/Lead.js'
import LeadService from '../../services/lead/LeadService.js';
import { Sequelize } from 'sequelize'


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

async function getLeadStats(organization_id) {
    const rows = await Lead.findAll({
        attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
        where: { organization_id },
        group: ['status'],
        raw: true,
    })
    return rows
}


export default {
    create,
    getAllLeads,
    getLeadById,
    updateStatus,
    getBySourceId,
    getLeadStats
}