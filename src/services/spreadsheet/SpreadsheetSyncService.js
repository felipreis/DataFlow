import GoogleSheetsService from "../google/GoogleSheetsService.js";

async function sync(spreadsheetId, range) {

    const rows = await GoogleSheetsService.read(
        spreadsheetId,
        range
    );

    console.log(rows);

    // Depois vamos percorrer cada linha
}

export default {
    sync
};