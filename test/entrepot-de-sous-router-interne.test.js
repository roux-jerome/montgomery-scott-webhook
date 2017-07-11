import EntrepotDeSousRouterInterne from '../lib/entrepot-de-sous-router-interne';

import {expect} from 'chai';
import FauxSousRouterInterne from './faux-sous-router-interne';

describe('EntrepotDeSousRouterInterne', () => {
    let entrepotDeSousRouterInterne;

    beforeEach(function () {
        let fauxSousRouterInterne = new FauxSousRouterInterne();
        entrepotDeSousRouterInterne = new EntrepotDeSousRouterInterne({'fausse-sous-route': fauxSousRouterInterne});
    });

    it('doit retourner une erreur si le handler n\'existe pas', function () {

        expect(() => entrepotDeSousRouterInterne.recupere('inconnu')).to.throw()

    });

    it('doit récupérer un handler si il existe', () => {
        let handler = entrepotDeSousRouterInterne.recupere('fausse-sous-route');

        expect(handler).not.to.be.null;
        expect(handler).to.be.instanceOf(FauxSousRouterInterne)
    });

});