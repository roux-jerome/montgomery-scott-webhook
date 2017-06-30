'use strict';

import * as chai from 'chai';
import FauxRouterExpress from './faux-router-express';

import webhook from '../lib/webhook';


const expect = chai.expect;

describe('webhook', () => {

    let fauxRouterExpress;


    beforeEach(() => {
        fauxRouterExpress = new FauxRouterExpress();
    });
    it('ajoute un élément au router', function () {


        let resultatRetourne = webhook(fauxRouterExpress);

        expect(resultatRetourne).to.not.be.null;
        expect(resultatRetourne).to.equal(fauxRouterExpress)
        expect(fauxRouterExpress.chemin).to.be.equal('/');
        expect(fauxRouterExpress.handlerSource).to.not.be.null;

    });

    it('route vers un handler en fonction du nom de l\'intentName', function () {
        webhook(fauxRouterExpress);

        //fauxRouterExpress.handlerSource()

    });
});
