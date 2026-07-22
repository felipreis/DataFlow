import ConversionEvent from '../../models/conversion/ConversionEvent.js'
import Lead from '../../models/lead/Lead.js'

async function create(payload){
    return await ConversionEvent.create(payload);
}

async function getAll(organization_id){
    return ConversionEvent.findAll({ where: {
        organization_id: organization_id
    }});
}

async function getById(id,organization_id){
    return ConversionEvent.findOne({where : {
        id:id,
        organization_id:organization_id
    }})
}


export default{
    create,
    getAll,
    getById
}

