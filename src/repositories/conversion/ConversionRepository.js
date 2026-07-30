import ConversionEvent from '../../models/conversion/ConversionEvent.js'
import Lead from '../../models/lead/Lead.js'
import { Sequelize } from 'sequelize'

async function create(payload){
    return await ConversionEvent.create(payload);
}

async function getAll(organization_id,limit,offset){
    return ConversionEvent.findAndCountAll({ 
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']],
        where: {
        organization_id: organization_id
    }});
}

async function getById(id,organization_id){
    return ConversionEvent.findOne({where : {
        id:id,
        organization_id:organization_id
    }})
}

async function update(id, payload) {
    await ConversionEvent.update(payload, {
        where: {
            id
        }
    });

    return await ConversionEvent.findByPk(id);
}

async function getStats(organization_id) {
    const rows = await ConversionEvent.findAll({
        attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
        where: { organization_id },
        group: ['status'],
        raw: true,
    })
    return rows
}


export default{
    create,
    getAll,
    getById,
    update,
    getStats
}

