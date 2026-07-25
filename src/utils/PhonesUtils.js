function normalize(phone){
    
    if(!phone){return null;}

    return phone.normalize("NFKD").replace(/[^\d]/g, "")
}

export default {
    normalize
}