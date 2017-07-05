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
                            'text': 'Choisissez une version parmis les 20 dernières',
                            'fallback': 'Impossible d\'afficher la liste des versions',
                            'callback_id': 'cdv.callback-dde-mep',
                            'color': '#3AA3E3',
                            'attachment_type': 'default',
                            'actions': [
                                {
                                    'name': 'versions',
                                    'text': 'Liste des versions ...',
                                    'type': 'select',
                                    'data_source': 'external',
                                    'confirm': {
                                        'title': 'Êtes vous sûr ?',
                                        'text': 'Voulez-vous que je déploie en production le compagnon de voyage ?',
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