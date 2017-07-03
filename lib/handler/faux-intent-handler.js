export default class FauxIntentHandler {
    constructor() {
        nombreDInstanciation++;
    }

    gere(requete, reponse) {
        reponse.send('je suis un faux intent');
    }

}

export let nombreDInstanciation = 0;

export function reinitialiserLeNombreDInstanciation() {
    nombreDInstanciation = 0;
}

export const EXEMPLE_DE_BODY_POUR_LE_FAUX_INTENT = {
    body: {
        'originalRequest': {
            'source': 'slack',
            'data': {
                'authed_users': ['U618F6N3E'],
                'event_id': 'Ev63M3A9RD',
                'api_app_id': 'A60KTM9MF',
                'team_id': 'T619EA5TP',
                'event': {
                    'event_ts': '1499021706.625353',
                    'channel': 'C60KHS4JD',
                    'text': 'faux intent',
                    'type': 'message',
                    'user': 'U6211JDRU',
                    'ts': '1499021706.625353'
                },
                'type': 'event_callback',
                'event_time': 1499021706,
                'token': 'pbWk4z2aAblGpRcsr5VBepku'
            }
        },
        'id': '0b900402-af58-428a-8ecb-aaf8623bdb4a',
        'timestamp': '2017-07-02T18:55:06.855Z',
        'lang': 'fr',
        'result': {
            'source': 'agent',
            'resolvedQuery': 'faux intent',
            'speech': '',
            'action': '',
            'actionIncomplete': false,
            'parameters': {},
            'contexts': [{'name': 'faux intent', 'parameters': {}, 'lifespan': 0}],
            'metadata': {
                'intentId': '5def22bc-ce1e-4502-886f-e2275729e994',
                'webhookUsed': 'true',
                'webhookForSlotFillingUsed': 'false',
                'intentName': 'faux-intent'
            },
            'fulfillment': {'speech': '', 'messages': [{'type': 0, 'speech': ''}]},
            'score': 0.36000001430511475
        },
        'status': {'code': 200, 'errorType': 'success'},
        'sessionId': 'd89c1a77-2fea-498b-b90f-0b4e39a99ced'
    }
};