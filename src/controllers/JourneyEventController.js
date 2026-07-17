import JourneyEventService from "../services/lead/JourneyEventService.js";
import responseHttp from "../response/responseHttp.js";

async function getByLeadId(req,res){
    try {
        const {id} = req.params;
        const retorno = await JourneyEventService.getByLeadId(id);
        responseHttp(retorno,res) 
    } catch (error) {
        if(error.message === 'Lead não encontrado') { return res.status(404).json({message:error.message})}
        return res.status(500).json({message:error.message})  
    }
}

export default {
    getByLeadId
}