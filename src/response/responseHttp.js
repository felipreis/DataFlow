

function responseHttp(data,res){
    
    if(!data){
        return res.status(400).json({message: 'Problemas na requisição'})
    }

    return res.status(200).json(data);
}

export default responseHttp