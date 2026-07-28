function normalize(phone){
    
    if(!phone){return null;}

    return phone.normalize("NFKD").replace(/[^\d]/g, "")
}

function isValid(phone) {
    return /^\d{10,15}$/.test(phone);
}

export default {
    normalize,
    isValid
}