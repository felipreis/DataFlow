
import hash from "./Hash";

function map(conversion, organization) {
    const { payload } = conversion;

    const user_data = {};

    if (payload.email) user_data.em = [hash(payload.email)];
    if (payload.phone) user_data.ph = [hash(payload.phone)];
    if (payload.fbc) user_data.fbc = payload.fbc;
    if (payload.fbp) user_data.fbp = payload.fbp;

    return {
        data: [
            {
                event_name: conversion.event_name,
                event_time: Math.floor(Date.now() / 1000),
                action_source: "system_generated",
                user_data,
                custom_data: {
                    currency: payload.currency,
                    value: Number(payload.value)
                }
            }
        ],
        test_event_code: organization?.test_event_code
    };
}

export default {
    map
};
/*
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1784675400,
      "event_id": "inv_2026_0722_98765",
      "action_source": "website",
      "event_source_url": "https://seusite.com",
      "user_data": {
        "em": [
          "f660ab912ec121d1b1e928a0bb4bc61b15f5ad44d5efdc4e1c92a25e99b8e44a"
        ],
        "ph": [
          "45a915da6e8ae387240f90e51785f850e5015b672f0db3f56da246b9ffda9621"
        ],
        "client_ip_address": "191.185.12.34",
        "client_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      "custom_data": {
        "currency": "BRL",
        "value": 249.90,
        "content_type": "product",
        "contents": [
          {
            "id": "prod_abc123",
            "quantity": 1,
            "item_price": 249.90
          }
        ]
      }
    }
  ],
  "test_event_code": "TEST12345"
}
*/