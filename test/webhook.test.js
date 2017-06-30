'use strict';

import * as chai from 'chai';
import sinonchai from 'sinon-chai';
import FauxRouterExpress from './faux-router-express';

import Webhook from '../lib/webhook';
import FausseReponseExpress from './fausse-reponse-express';


const expect = chai.use(sinonchai).expect;

describe('webhook', () => {

    let fauxRouterExpress;
    let webhook;
    let fausseReponseExpress;

    beforeEach(() => {

        fauxRouterExpress = new FauxRouterExpress();
        webhook = new Webhook(fauxRouterExpress);
        fausseReponseExpress = new FausseReponseExpress();
    });

    describe('initialiserLaRoute', function () {
        it('doit ajouter un élément au router', () => {


            let resultatRetourne = webhook.initialiserLaRoute();

            expect(resultatRetourne).to.not.be.null;
            expect(resultatRetourne).to.equal(fauxRouterExpress);
            expect(fauxRouterExpress.chemin).to.be.equal('/');
            expect(fauxRouterExpress.handlerSource).to.not.be.null;

        });

    });

    describe('handlerDeRoute', function () {
        it('doit retourner une erreur si le body est vide', () => {

            webhook.initialiserLaRoute();
            fauxRouterExpress.handlerSource(null, fausseReponseExpress);

            expect(fausseReponseExpress.status).to.have.been.calledWith(400);
            expect(fausseReponseExpress.send).to.have.been.calledWith('Il manque le body.');

        });

        it('route vers un handler en fonction de l\'intentName', () => {
        });
    });

});
