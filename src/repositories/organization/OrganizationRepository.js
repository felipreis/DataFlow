import Organization from "../../models/organization/Organization.js"

async function create(payload){
    return await Organization.create(payload);
}

async function findByApiKey(apiKey) {
    return await Organization.findOne({
        where: {
            api_key: apiKey
        }
    });
}

async function findById(id){
    return await Organization.findByPk(id);
}

async function metaInfo(id,payload){
    const updateOrganization = await Organization.update(payload, {
        where: {
        id : id
        }
    })

    return await findById(id);
}

export default {
    create,
    findByApiKey,
    metaInfo,
    findById
}