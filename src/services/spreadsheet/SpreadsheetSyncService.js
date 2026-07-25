import GoogleSheetsService from "../google/GoogleSheetsService.js";
import SpreadsheetLeadMapper from '../../utils/SpreadsheetLeadMapper.js'
import SpreadsheetStatusMapper from "../../utils/SpreadsheetStatusMapper.js";

import LeadService from "../lead/LeadService.js";

async function sync(organization) {

    const rows = await GoogleSheetsService.read(
        organization.spreadsheet_id,
        organization.spreadsheet_range
    );

    for (const row of rows) {

        await processRow(row, organization);

    }

}

async function processRow(row, organization) {

    const lead =
        await LeadService.getBySourceId(row.id);

    if (!lead) {

        return createLead(row, organization);

    }

    return updateLead(lead, row);

}

async function createLead(row, organization) {

    const payload =
        SpreadsheetLeadMapper.map(
            row,
            organization.id
        );

    const lead = await LeadService.create(payload);

    const status = SpreadsheetStatusMapper.map(row);

    if(status !== "RECEIVED"){
        await LeadService.updateStatus(lead.id,{status},organization.id)
    }

    return lead;

}

async function updateLead(lead, row) {

    const newStatus =
        SpreadsheetStatusMapper.map(row);

    if (newStatus === lead.status) {

        return;

    }

    return LeadService.updateStatus(

        lead.id,

        {
            status: newStatus
        },

        lead.organization_id

    );

}

export default {
    sync
};