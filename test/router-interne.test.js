'use strict';

import * as chai from 'chai';
import sinonchai from 'sinon-chai';
import FauxRouterExpress from './faux-router-express';

import RouterInterne from '../lib/router-interne';
import FausseReponseExpress from './fausse-reponse-express';
import FauxSousRouterInterne, {EXEMPLE_DE_BODY_POUR_UNE_SOUS_ROUTE} from './faux-sous-router-interne';
import EntrepotDeSousRouterInterne from '../lib/entrepot-de-sous-router-interne';

const expect = chai.use(sinonchai).expect;

describe('RouterInterne', () => {

    let fauxRouterExpress;
    let routerInterne;
    let fausseReponseExpress;


    describe('initialiseLaRoute', function () {
        beforeEach(() => {
            fauxRouterExpress = new FauxRouterExpress();
            routerInterne = new RouterInterne(fauxRouterExpress, ['niveau1', 'niveau2'], null);
        });

        it('doit ajouter un élément au router', () => {

            let resultatRetourne = routerInterne.initialiseLaRoute();

            expect(resultatRetourne).to.not.be.null;
            expect(resultatRetourne).to.equal(fauxRouterExpress);
            expect(fauxRouterExpress.chemin).to.be.equal('/');
            expect(fauxRouterExpress.routerInterne).to.not.be.null;

        });

    });

    describe('handlerSurLePost', function () {

        beforeEach(() => {
            fausseReponseExpress = new FausseReponseExpress();
            fauxRouterExpress = new FauxRouterExpress();
            let entrepotDeSousRouterInterne = new EntrepotDeSousRouterInterne({'fausse-sous-route': new FauxSousRouterInterne()});
            routerInterne = new RouterInterne(fauxRouterExpress, ['niveau1', 'niveau2'], entrepotDeSousRouterInterne);
            routerInterne.initialiseLaRoute();
        });

        it('doit retourner une erreur si la requete est null', function () {
            verifieQueLOnRetourneUneErreurSiOnNeTrouvePasLElementDifferenciantLorsqueLaRequeteVaut(null);
        });

        it('doit retourner une erreur si la requete est vide', function () {
            verifieQueLOnRetourneUneErreurSiOnNeTrouvePasLElementDifferenciantLorsqueLaRequeteVaut({});

        });

        it('doit retourner une erreur si le niveau 1 est null ', function () {
            verifieQueLOnRetourneUneErreurSiOnNeTrouvePasLElementDifferenciantLorsqueLaRequeteVaut({'niveau1': null});
        });


        it('doit retourner une erreur si le niveau 2 est null ', function () {
            verifieQueLOnRetourneUneErreurSiOnNeTrouvePasLElementDifferenciantLorsqueLaRequeteVaut({'niveau1': {'niveau2': null}});
        });

        it('doit retourner une erreur si le handler n\'est pas connue', () => {
            verifieQueLOnRetourneUneErreurSiOnNeTrouvePasLElementDifferenciantLorsqueLaRequeteVaut({'niveau1': {'niveau2': 'inconnu'}});
        });

        function verifieQueLOnRetourneUneErreurSiOnNeTrouvePasLElementDifferenciantLorsqueLaRequeteVaut(requete) {

            fauxRouterExpress.routerInterne(requete, fausseReponseExpress);

            expect(fausseReponseExpress.status).to.have.been.calledWith(400);
            expect(fausseReponseExpress.send).to.have.been.calledWith('La syntaxe de la requête est erronée.');
        }

        it('route vers un handler en fonction de l\'élément différenciant', () => {
            let requete = {'niveau1': {'niveau2': 'fausse-sous-route'}};

            fauxRouterExpress.routerInterne(requete, fausseReponseExpress);

            expect(fausseReponseExpress.send).to.have.been.calledWith('je suis un faux sous router');
            expect(fausseReponseExpress.setHeader).to.have.been.calledWith('Content-Type', 'application/json');
        });
    });

    describe('handlerSurLePost avec le cas particulier du playload', () => {

        beforeEach(() => {
            fausseReponseExpress = new FausseReponseExpress();
            fauxRouterExpress = new FauxRouterExpress();
            let entrepotDeSousRouterInterne = new EntrepotDeSousRouterInterne({'fausse-sous-route': new FauxSousRouterInterne()});
            routerInterne = new RouterInterne(fauxRouterExpress, ['payload', 'niveau2'], entrepotDeSousRouterInterne);
            routerInterne.initialiseLaRoute();
        });

        it('route vers un handler en fonction de l\'élément différenciant', () => {
            let requete = {'payload': '{"niveau2": "fausse-sous-route"}'};

            fauxRouterExpress.routerInterne(requete, fausseReponseExpress);

            expect(fausseReponseExpress.send).to.have.been.calledWith('je suis un faux sous router');
            expect(fausseReponseExpress.setHeader).to.have.been.calledWith('Content-Type', 'application/json');
        });
    });

});
