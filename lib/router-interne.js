'use strict';


export default class RouterInterne {

    constructor(elementAParcourirPourIdentifierLeSousRouter, entrepotDeSousRouterInterne, callbackDErreur) {
        this.entrepotDeSousRouterInterne = entrepotDeSousRouterInterne;
        this.elementAParcourirPourIdentifierLeSousRouter = elementAParcourirPourIdentifierLeSousRouter;
        this.callbackDErreur = callbackDErreur;
    }

    initialiseLaRoute() {
        return (requete, reponse) => {
            let elementDifferenciant = this._touveLElementDifferenciant(requete);
            if (elementDifferenciant) {
                try {
                    reponse.setHeader('Content-Type', 'application/json');
                    this.entrepotDeSousRouterInterne.recupere(elementDifferenciant).gere(requete, reponse);
                } catch (erreur) {
                    this.callbackDErreur(requete, reponse, erreur);
                }
            }
            else {
                this.callbackDErreur(requete, reponse);
            }
        };
    };

    _touveLElementDifferenciant(requete) {
        let elementDifferenciant = requete;
        this.elementAParcourirPourIdentifierLeSousRouter.every((elementAParcourir) => {
            if (elementDifferenciant && elementDifferenciant[elementAParcourir]) {
                if (elementAParcourir == 'payload') {
                    elementDifferenciant = JSON.parse(elementDifferenciant[elementAParcourir]);
                } else {
                    elementDifferenciant = elementDifferenciant[elementAParcourir];
                }

                return true;
            } else {
                elementDifferenciant = null;
                return false;
            }
        });
        return elementDifferenciant;
    }
}
