import OrganizationRepository from "../../repositories/organization/OrganizationRepository.js"
import crypto from "crypto";

async function create(payload){

    const apiKey = crypto.randomUUID();
    const organization = {...payload, api_key: apiKey}

    return await OrganizationRepository.create(organization);

}

export default {
    create
}