import PhonesUtils from "./PhonesUtils.js";

function map(payload) {
    return {
        source: "META",

        source_id: payload.leadgen_id,

        name: payload.full_name,

        email: payload.email,

        phone: PhonesUtils.normalize(payload.phone_number),

        campaign_id: payload.campaign_id,

        campaign_name: payload.campaign_name,

        adset_id: payload.adset_id,

        adset_name: payload.adset_name,

        ad_id: payload.ad_id,

        ad_name: payload.ad_name,

        fbclid: payload.fbclid,

        fbc: payload.fbc,

        fbp: payload.fbp,

        utm_source: payload.utm_source,

        utm_medium: payload.utm_medium,

        utm_campaign: payload.utm_campaign,

        utm_content: payload.utm_content,

        utm_term: payload.utm_term,

        metadata: payload
    };
}

export default map;