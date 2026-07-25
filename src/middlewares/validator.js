function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefone(phone) {
     if(!phone) return false;

    return /^(55)?\d{10,11}$/.test(phone);
}

export default {
    validarEmail,
    validarTelefone
}