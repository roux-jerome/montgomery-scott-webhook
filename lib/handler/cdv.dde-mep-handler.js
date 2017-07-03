export default class CDVDemandeDeMEPHandler {


    gere(requete, reponse) {
        reponse.send(JSON.stringify(
            {
                'speech': '', 'displayText': '',
                data: {
                    slack: {
                        'text': 'Voulez mettre en production le compagnon de voyage ?',
                        'attachments': [
                            {
                                'text': 'Choisissez la version à déployer',
                                'fallback': 'Impossible de déployer la version',
                                'callback_id': 'prod_cdv',
                                'color': '#3AA3E3',
                                'attachment_type': 'default',
                                'actions': [
                                    {
                                        'name': 'versions',
                                        'text': 'Liste des versions ...',
                                        'type': 'select',
                                        'data_source': 'external',
                                        'confirm': {
                                            'title': 'Serein ?',
                                            'text': 'Le déploiement en production du CDV va être lancé',
                                            'ok_text': 'Oui',
                                            'dismiss_text': 'Non'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            }));
    }
}
