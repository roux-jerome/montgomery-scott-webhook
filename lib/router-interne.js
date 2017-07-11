import RechercheDElement from './recherche-d-element';

export default class RouterInterne {

    constructor(elementAParcourirPourIdentifierLeSousRouter, entrepotDeSousRouterInterne, callbackDErreur) {
        this.entrepotDeSousRouterInterne = entrepotDeSousRouterInterne;
        this.callbackDErreur = callbackDErreur;
        this.rechercheDeLUtilisateurPourLesWebhooks = new RechercheDElement(elementAParcourirPourIdentifierLeSousRouter);
    }

    initialiseLaRoute() {
        return (requete, reponse) => {
            let elementDifferenciant = this.rechercheDeLUtilisateurPourLesWebhooks.rechercheDans(requete);
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
}
