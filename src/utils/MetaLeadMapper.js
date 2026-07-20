function getField(payload, fieldName) {
    const field = payload.field_data.find(
        item => item.name === fieldName
    );

    return field ? field.values[0] : null;
}

function map(payload) {

    return {

        source: "META",

        source_id: payload.id,

        name: getField(payload, "full_name"),

        email: getField(payload, "email"),

        phone: getField(payload, "phone_number"),

        metadata: payload
    };

}

export default map