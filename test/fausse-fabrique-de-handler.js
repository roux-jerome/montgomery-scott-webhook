import FauxIntentHandler from '../lib/handler/faux-intent-handler';

export default class FausseFabriqueDeHandler {

    constructor() {
        this.fauxHandler = new Map();
        this.fauxHandler.set('faux-intent-handler', new FauxIntentHandler());
    }

    recupere(nomDeLIntent) {
        let intentHandler = this.fauxHandler.get(`${nomDeLIntent}-handler`);
        if (intentHandler) {
            return intentHandler;
        } else {
            throw 'erreur pour les tests : intent handler inconnu';
        }

    }

}