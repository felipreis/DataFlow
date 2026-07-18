import Organization from "../../models/organization/Organization.js"

async function create(payload){
    return await Organization.create(payload);
}

export default {
    create
}