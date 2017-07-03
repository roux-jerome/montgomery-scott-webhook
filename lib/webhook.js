'use strict';


export default class Webhook {
    constructor(router, fabriqueDeHandler) {
        this.router = router;
        this.fabriqueDeHandler = fabriqueDeHandler;
    }

    initialiserLaRoute() {
        this.router.post('/', (requete, reponse) => {
            if (requete && requete.body && requete.body.result && requete.body.result.metadata && requete.body.result.metadata.intentName) {
                try {
                    let handler = this.fabriqueDeHandler.recupere(requete.body.result.metadata.intentName);
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

    _retourneUneErreur(reponse, erreur) {
        reponse.status(400).send('La syntaxe de la requête est erronée.');
        if (erreur) {
            console.error(erreur);
        }
    }
}
