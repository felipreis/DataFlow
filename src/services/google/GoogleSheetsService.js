//responsável por autenticar, ler planilha e retornar um array
import 'dotenv/config'
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

    //verificar se a planilha tem dados
    if (!response.data.values || response.data.values.length === 0) {
    return [];
    }

    // response.data.values vai retornar um array de array em que o primeiro é um array com as colunas e em sequencia as linhas
    const [headers,...rows] = response.data.values;
    const leads = [];

    rows.forEach(row => {
        const pares = headers.map((header, index) => [header, row[index]]);
        // resultado: [["id", "l:1"], ["nome", "Caio"]]

        const objeto = Object.fromEntries(pares);
        // resultado: { id: "l:1", nome: "Caio" }

        leads.push(objeto)

        console.log(objeto.cidade);

    });

    return leads;
}

export default {
    read
};