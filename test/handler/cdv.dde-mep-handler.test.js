import CDVDemandeDeMEP from '../../lib/handler/cdv.dde-mep-handler';
import FausseReponseExpress from '../fausse-reponse-express';

import * as chai from 'chai';
import sinonchai from 'sinon-chai';

const expect = chai.use(sinonchai).expect;

describe('CDVDemandeDeMEPHandler', () => {

    it('doit retourner la question demandant la version à mettre en production', () => {

        let cdvDemandeDeMEP = new CDVDemandeDeMEP();
        let fausseReponseExpress = new FausseReponseExpress();

        cdvDemandeDeMEP.gere({}, fausseReponseExpress);

        expect(fausseReponseExpress.send).to.have.been.calledWith(JSON.stringify(
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

    });

});