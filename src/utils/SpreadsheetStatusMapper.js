function map(row) {

    const comercial = row["Status Comercial"];
    const lead = row["Status do Lead"];

    if (comercial === "Venda") {
        return "SALE";
    }

    if (lead === "Qualificado") {
        return "QUALIFIED";
    }

    return "RECEIVED";
}

export default {
    map
};