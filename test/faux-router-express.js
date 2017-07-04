'use strict';

export default class FauxRouterExpress {

    post(chemin, routerInterne) {
        this.chemin = chemin;
        this.routerInterne = routerInterne;
    }


}
