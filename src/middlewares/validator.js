function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefone(telefone) {
    // Regex aceita: (XX) 9XXXX-XXXX ou XX9XXXX-XXXX
    const regex = /^p?:?\+?55?\s?\(?\d{2}\)?\s?\d{4,5}[-\s]?\d{4}$/;
    return regex.test(telefone);
}

export default {
    validarEmail,
    validarTelefone
}