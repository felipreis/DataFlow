import { where } from 'sequelize';
import Lead from '../../models/lead/Lead.js'
import LeadService from '../../services/lead/LeadService.js';

async function create(payload){
    return await Lead.create(payload);
}

async function getAllLeads(){
    return await Lead.findAll();
}

async function getLeadById(id){
    return await Lead.findByPk(id)
}

async function updateStatus(id,status){
    const leadUpdate = Lead.update(status,{
        where: {id: id}
    })
    
    return leadUpdate;
}


export default {
    create,
    getAllLeads,
    getLeadById,
    updateStatus
}