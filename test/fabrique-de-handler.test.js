import FabriqueDeHandler from '../lib/fabrique-de-handler';

import {expect} from 'chai';
import FauxIntentHandler, {nombreDInstanciation, reinitialiserLeNombreDInstanciation} from '../lib/handler/faux-intent-handler';

describe('FabriqueDeHandler', () => {
    let fabriqueDeHandler;

    beforeEach(function () {
        fabriqueDeHandler = new FabriqueDeHandler();
    });

    it('doit retourner une erreur si le handler n\'existe pas', function () {

        expect(() => fabriqueDeHandler.recupere('inconnu')).to.throw()

    });

    it('doit récupérer un handler si il existe', () => {
        let handler = fabriqueDeHandler.recupere('faux-intent');

        expect(handler).not.to.be.null;
        expect(handler).to.be.instanceOf(FauxIntentHandler)
    });

    it('ne doit pas instancier deux fois un handler qui existe', () => {
        reinitialiserLeNombreDInstanciation();
        fabriqueDeHandler.recupere('faux-intent');
        let handler = fabriqueDeHandler.recupere('faux-intent');

        expect(handler).not.to.be.null;
        expect(handler).to.be.instanceOf(FauxIntentHandler);
        expect(nombreDInstanciation).to.be.equal(1);

    });

})