'use strict';

import * as chai from 'chai';
import sinonchai from 'sinon-chai';
import FauxRouterExpress from './faux-router-express';
import FausseFabriqueDeHandler from './fausse-fabrique-de-handler';

import Webhook from '../lib/webhook';
import FausseReponseExpress from './fausse-reponse-express';
import {EXEMPLE_DE_BODY_POUR_LE_FAUX_INTENT} from '../lib/handler/faux-intent-handler';

const expect = chai.use(sinonchai).expect;

describe('webhook', () => {

    let fauxRouterExpress;
    let webhook;
    let fausseReponseExpress;

    beforeEach(() => {

        fauxRouterExpress = new FauxRouterExpress();
        webhook = new Webhook(fauxRouterExpress, new FausseFabriqueDeHandler());
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
        beforeEach(() => {
            webhook.initialiserLaRoute();
        });

        it('doit retourner une erreur si la requete est null', function () {
            verifieQueLOnRetourneUneErreurSiOnNeTrouvePasLIntentNameLorsqueLaRequeteVaut(null);
        });

        it('doit retourner une erreur si la requete est vide', function () {
            verifieQueLOnRetourneUneErreurSiOnNeTrouvePasLIntentNameLorsqueLaRequeteVaut({});

        });

        it('doit retourner une erreur si le body est null ', function () {
            verifieQueLOnRetourneUneErreurSiOnNeTrouvePasLIntentNameLorsqueLaRequeteVaut({body: null});
        });


        it('doit retourner une erreur si le result est null ', function () {
            verifieQueLOnRetourneUneErreurSiOnNeTrouvePasLIntentNameLorsqueLaRequeteVaut({body: {result: null}});
        });

        it('doit retourner une erreur si metadata est null', function () {
            verifieQueLOnRetourneUneErreurSiOnNeTrouvePasLIntentNameLorsqueLaRequeteVaut({body: {result: {metadata: null}}});
        });

        it('doit retourner une erreur si l\'intent name est null', () => {
            verifieQueLOnRetourneUneErreurSiOnNeTrouvePasLIntentNameLorsqueLaRequeteVaut({body: {result: {metadata: {intentName: null}}}});
        });

        it('doit retourner une erreur si le handler n\'est pas connue', () => {
            verifieQueLOnRetourneUneErreurSiOnNeTrouvePasLIntentNameLorsqueLaRequeteVaut({body: {result: {metadata: {intentName: 'inconnu'}}}});
        });

        function verifieQueLOnRetourneUneErreurSiOnNeTrouvePasLIntentNameLorsqueLaRequeteVaut(requete) {

            fauxRouterExpress.handlerSource(requete, fausseReponseExpress);

            expect(fausseReponseExpress.status).to.have.been.calledWith(400);
            expect(fausseReponseExpress.send).to.have.been.calledWith('La syntaxe de la requête est erronée.');
        }

        it('route vers un handler en fonction de l\'intentName', () => {

            fauxRouterExpress.handlerSource(EXEMPLE_DE_BODY_POUR_LE_FAUX_INTENT, fausseReponseExpress);

            expect(fausseReponseExpress.send).to.have.been.calledWith('je suis un faux intent');
            expect(fausseReponseExpress.setHeader).to.have.been.calledWith('Content-Type', 'application/json');
        });
    });

});
