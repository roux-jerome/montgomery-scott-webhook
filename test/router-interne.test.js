'use strict';

import * as chai from 'chai';
import sinon from 'sinon';
import sinonchai from 'sinon-chai';

import RouterInterne from '../lib/router-interne';
import FausseReponseExpress from './fausse-reponse-express';
import FauxSousRouterInterne from './faux-sous-router-interne';
import EntrepotDeSousRouterInterne from '../lib/entrepot-de-sous-router-interne';

const expect = chai.use(sinonchai).expect;

describe('RouterInterne', () => {

    let routerInterne;
    let fausseReponseExpress;
    let callbackDErreur;
    let gestionDeLaRoute;


    describe('initialiseLaRoute', function () {
        beforeEach(() => {
            routerInterne = new RouterInterne(['niveau1', 'niveau2'], null, callbackDErreur);
        });

        it('doit ajouter un élément à l\'initialisation de la route', () => {

            let resultatRetourne = routerInterne.initialiseLaRoute();

            expect(resultatRetourne).to.not.be.null;

        });

    });

    describe('initialiseLaRoute', function () {

        beforeEach(() => {
            callbackDErreur = sinon.mock();
            fausseReponseExpress = new FausseReponseExpress();
            let entrepotDeSousRouterInterne = new EntrepotDeSousRouterInterne({'fausse-sous-route': new FauxSousRouterInterne()});
            routerInterne = new RouterInterne(['niveau1', 'niveau2'], entrepotDeSousRouterInterne, callbackDErreur);
            gestionDeLaRoute = routerInterne.initialiseLaRoute();
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

            gestionDeLaRoute(requete, fausseReponseExpress);

            expect(callbackDErreur).to.have.been.calledWith(requete, fausseReponseExpress);
        }

        it('route vers un handler en fonction de l\'élément différenciant', () => {
            let requete = {'niveau1': {'niveau2': 'fausse-sous-route'}};

            gestionDeLaRoute(requete, fausseReponseExpress);

            expect(fausseReponseExpress.send).to.have.been.calledWith('je suis un faux sous router');
            expect(fausseReponseExpress.setHeader).to.have.been.calledWith('Content-Type', 'application/json');
        });
    });

    describe('initialiseLaRoute avec le cas particulier du playload', () => {

        beforeEach(() => {
            fausseReponseExpress = new FausseReponseExpress();
            let entrepotDeSousRouterInterne = new EntrepotDeSousRouterInterne({'fausse-sous-route': new FauxSousRouterInterne()});
            routerInterne = new RouterInterne(['payload', 'niveau2'], entrepotDeSousRouterInterne, callbackDErreur);
            gestionDeLaRoute = routerInterne.initialiseLaRoute();
        });

        it('route vers un handler en fonction de l\'élément différenciant', () => {
            let requete = {'payload': '{"niveau2": "fausse-sous-route"}'};

            gestionDeLaRoute(requete, fausseReponseExpress);

            expect(fausseReponseExpress.send).to.have.been.calledWith('je suis un faux sous router');
            expect(fausseReponseExpress.setHeader).to.have.been.calledWith('Content-Type', 'application/json');
        });
    });

});
