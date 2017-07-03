export default class FabriqueDeHandler {

    constructor() {
        this.cacheDeHandler = new Map();
    }

    recupere(nomDeLIntent) {

        let nomDuModule = `./handler/${nomDeLIntent}-handler`;
        let handlerEnCache = this.cacheDeHandler.get(nomDuModule);
        if (handlerEnCache) {
            return handlerEnCache;
        } else {
            let ClasseDuHandler = require(nomDuModule).default;
            let handler = new ClasseDuHandler();
            this.cacheDeHandler.set(nomDuModule, handler);
            return handler;
        }
    }

}