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

export default {
    create,
    findByApiKey
}