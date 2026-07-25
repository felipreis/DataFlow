import SpreadsheetSyncService from "../../services/spreadsheet/SpreadsheetSyncService.js";

async function sync(req,res){

    const organization = req.organization;

    const retorno =
        await SpreadsheetSyncService.sync(
            organization
        );

    return res.status(200).json({
        message:"Sincronização concluída",
        retorno
    });

}

export default {
    sync
}