'use strict';

export default class FauxRouterExpress {

    get(chemin, handlerSource) {
        this.chemin = chemin;
        this.handlerSource = handlerSource;
    }


}
