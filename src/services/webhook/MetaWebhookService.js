import OrganizationService from '../organization/OrganizationService.js'
import LeadService from '../lead/LeadService.js';
import map from '../../utils/MetaLeadMapper.js';

async function receive(payload,api_key){
    const organization = await OrganizationService.findByApiKey(api_key);
    if(!organization){throw new Error('Organização não encontrada')}

    const mappedLead = map(payload);
    mappedLead.organization_id = organization.id;


    return await LeadService.create(mappedLead)

}

export default {receive};