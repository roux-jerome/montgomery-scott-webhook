import CallbackDemandeDeMep from '../../../lib/cdv/mep/webhook-demande-de-mep';
import FausseReponseExpress from '../../fausse-reponse-express';

import * as chai from 'chai';
import sinonchai from 'sinon-chai';

const expect = chai.use(sinonchai).expect;

describe('CallbackDemandeDeMep', () => {

    it('doit retourner la question demandant la version à mettre en production', () => {

        let cdvDemandeDeMEPSousRouterInterne = new CallbackDemandeDeMep();
        let fausseReponseExpress = new FausseReponseExpress();

        cdvDemandeDeMEPSousRouterInterne.gere({}, fausseReponseExpress);

        expect(fausseReponseExpress.send).to.have.been.calledWith(JSON.stringify({
            'speech': '', 'displayText': '',
            data: {
                slack: {
                    'attachments': [
                        {
                            'title': 'Mettre en production le compagnon de voyage',
                            'text': 'Choisissez la version',
                            'fallback': 'Impossible de déployer la version',
                            'callback_id': 'cdv.liste-version-mep',
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

    });

});