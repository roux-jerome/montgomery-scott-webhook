export default class EntrepotDeSousRouterInterne {

    constructor(sousRouterInterneParNom) {
        this.sousRouterInterneParNom = sousRouterInterneParNom;
    }

    recupere(nomDuSousRouterInterne) {

        let sousRouterInterne = this.sousRouterInterneParNom[nomDuSousRouterInterne];
        if (sousRouterInterne) {
            return sousRouterInterne;
        } else {
            throw `Impossible de gérer l\'action ${nomDuSousRouterInterne}`;
        }
    }

}