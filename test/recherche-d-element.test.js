'use strict';

import * as chai from 'chai';
import sinonchai from 'sinon-chai';
import RechercheDElement from '../lib/recherche-d-element';

const expect = chai.use(sinonchai).expect;

describe('RechercheDElement', () => {

    let rechercheDElement;


    describe('rechercheDans', function () {

        beforeEach(() => {
            rechercheDElement = new RechercheDElement(['niveau1', 'niveau2']);
        });

        it('doit retourner null si la requete est null', function () {
            verifieQueLOnRetourneNullSiOnNeTrouvePasLElementLorsqueLaRequeteVaut(null);
        });

        it('doit retourner une null si la requete est vide', function () {
            verifieQueLOnRetourneNullSiOnNeTrouvePasLElementLorsqueLaRequeteVaut({});
        });

        it('doit retourner une null si le niveau 1 est null ', function () {
            verifieQueLOnRetourneNullSiOnNeTrouvePasLElementLorsqueLaRequeteVaut({'niveau1': null});
        });


        it('doit retourner une null si le niveau 2 est null ', function () {
            verifieQueLOnRetourneNullSiOnNeTrouvePasLElementLorsqueLaRequeteVaut({'niveau1': {'niveau2': null}});
        });

        function verifieQueLOnRetourneNullSiOnNeTrouvePasLElementLorsqueLaRequeteVaut(requete) {

            let resultat = rechercheDElement.rechercheDans(requete);

            expect(resultat).to.have.been.null;
        }

        it('retourne l\'élément si il existe', () => {
            let requete = {'niveau1': {'niveau2': 'element'}};

            let resultat = rechercheDElement.rechercheDans(requete);

            expect(resultat).to.be.equal('element');
        });
    });

});
