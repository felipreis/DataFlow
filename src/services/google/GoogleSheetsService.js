//responsável por autenticar, ler planilha e retornar um array

import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
    keyFile: "./credentials.json",
    scopes: [
        "https://www.googleapis.com/auth/spreadsheets.readonly"
    ]
});

const sheets = google.sheets({
    version: "v4",
    auth
});

async function read(spreadsheetId, range) {

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range
    });

    return response.data.values;
}

export default {
    read
};