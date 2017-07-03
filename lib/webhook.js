'use strict';


export default class Webhook {

    constructor(router, fabriqueDeHandler) {
        this.router = router;
        this.fabriqueDeHandler = fabriqueDeHandler;
        this.elementAParcourirPourIdentifierLeHandler = ['body', 'result', 'metadata', 'intentName'];
    }

    initialiserLaRoute() {
        this.router.post('/', (requete, reponse) => {

            let elementDifferenciant = this._touverLElementDifferenciant(requete);

            if (elementDifferenciant) {

                try {
                    let handler = this.fabriqueDeHandler.recupere(elementDifferenciant);
                    reponse.setHeader('Content-Type', 'application/json');
                    handler.gere(requete, reponse);
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

    _touverLElementDifferenciant(requete) {
        let elementDifferenciant = requete;
        this.elementAParcourirPourIdentifierLeHandler.every((elementAParcourir) => {
            if (elementDifferenciant && elementDifferenciant[elementAParcourir]) {
                elementDifferenciant = elementDifferenciant[elementAParcourir];
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
