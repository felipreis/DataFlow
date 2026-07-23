import OrganizationRepository from "../../repositories/organization/OrganizationRepository.js"
import crypto from "crypto";

async function create(payload){

    const apiKey = crypto.randomUUID();
    const organization = {...payload, api_key: apiKey}

    return await OrganizationRepository.create(organization);
}

async function findByApiKey(api_key){
    return await OrganizationRepository.findByApiKey(api_key)
}

async function metaInfo(id,payload){

    const organization = await OrganizationRepository.findById(id);
    if(!organization){throw new Error('Orgnanização não encontrada!')};

    return await OrganizationRepository.metaInfo(id,payload);
}

export default {
    create,
    findByApiKey,
    metaInfo
}