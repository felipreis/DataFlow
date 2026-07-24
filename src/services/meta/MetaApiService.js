
import  axios  from  'axios' ;

async function send(payload, organization) {

    const url = `https://graph.facebook.com/v25.0/${organization.pixel_id}/events`;

    try {
        console.log(JSON.stringify(payload, null, 2));
        const response = await axios.post(
            url,
            payload,
            {
                params: {
                    access_token: organization.access_token
                },
                headers: {
                    "Content-Type": "application/json"
                },
            timeout: 15000,
            }
        );

        console.log("[META] Evento enviado com sucesso");
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error("[META] Erro ao enviar evento");
        throw error;
    }

}

export default {
    send
};