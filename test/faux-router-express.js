'use strict';

export default class FauxRouterExpress {

    post(chemin, handlerSource) {
        this.chemin = chemin;
        this.handlerSource = handlerSource;
    }


}
