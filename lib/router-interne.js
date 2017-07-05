'use strict';


export default class RouterInterne {

    constructor(router, elementAParcourirPourIdentifierLeSousRouter, entrepotDeSousRouterInterne) {
        this.router = router;
        this.entrepotDeSousRouterInterne = entrepotDeSousRouterInterne;
        this.elementAParcourirPourIdentifierLeSousRouter = elementAParcourirPourIdentifierLeSousRouter;
    }

    initialiseLaRoute() {
        this.router.post('/', (requete, reponse) => {
            let elementDifferenciant = this._touveLElementDifferenciant(requete);
            if (elementDifferenciant) {
                try {
                    reponse.setHeader('Content-Type', 'application/json');
                    this.entrepotDeSousRouterInterne.recupere(elementDifferenciant).gere(requete, reponse);
                } catch (erreur) {
                    this._retourneUneErreur(reponse, erreur);
                }
            }
            else {
                this._retourneUneErreur(reponse);
            }
        })
        ;

        return this.router;
    }
    ;

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

    _retourneUneErreur(reponse, erreur) {
        reponse.status(400).send('La syntaxe de la requête est erronée.');
        if (erreur) {
            console.error(erreur);
        }
    }
}
