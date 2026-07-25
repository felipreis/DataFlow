import PhonesUtils from "./PhonesUtils.js";

function map(row, organization_id) {

    return {
        organization_id,

        source: "META",

        source_id: row.id,

        name: row.nome_completo,

        phone: PhonesUtils.normalize(row.telefone),

        email: row.email,

        campaign_id: row.campaign_id,

        campaign_name: row.campaign_name,

        adset_id: row.adset_id,

        adset_name: row.adset_name,

        ad_id: row.ad_id,

        ad_name: row.ad_name,

        metadata: row
    };

}

export default {
    map
};