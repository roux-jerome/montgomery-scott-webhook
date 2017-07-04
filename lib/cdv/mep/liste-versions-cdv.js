export default class ListeVersionsCdv {


    gere(requete, reponse) {
        reponse.send(JSON.stringify({
            'options': [
                {
                    'text': 'v1.0.0',
                    'value': 'v1.0.0'
                },
                {
                    'text': 'v1.0.1',
                    'value': 'v1.0.1'
                },
                {
                    'text': 'v1.0.2',
                    'value': 'v1.0.2'
                }
            ]
        }));
    }
}
