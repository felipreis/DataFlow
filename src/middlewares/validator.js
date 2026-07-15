function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefone(telefone) {
    // Regex aceita: (XX) 9XXXX-XXXX ou XX9XXXX-XXXX
    const regex = /^(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}-?[0-9]{4}$/;
    return regex.test(telefone);
}

export default {
    validarEmail,
    validarTelefone
}