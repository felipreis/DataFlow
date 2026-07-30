
import ConversionService from "../../services/conversion/ConversionService.js"
import responseHttp from '../../response/responseHttp.js'




async function getAll(req,res){
    try {
        const organization_id = req.organization.id;
        const {page,limit} = req.query;
        const retorno = await ConversionService.getAll(organization_id,page,limit);
        responseHttp(retorno,res)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}

async function getById(req,res){
    try {
        const {id} = req.params
        const organization_id = req.organization.id;
        const retorno = await ConversionService.getById(id,organization_id);
        responseHttp(retorno,res)
    } catch (error) {
        if(error.message === 'Conversão não encontrada'){
            return res.status(404).json({message:error.message})
        }
        return res.status(500).json({message:error.message})
    }

}

async function getStats(req, res) {
    try {
        const organization_id = req.organization.id;
        const retorno = await ConversionService.getStats(organization_id);
        responseHttp(retorno, res)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export default{
    getAll,
    getById,
    getStats
}
