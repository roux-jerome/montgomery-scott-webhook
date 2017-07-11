export default class RechercheDElement {

    constructor(cheminDeLElementARechercher) {
        this._cheminDeLElementARechercher = cheminDeLElementARechercher;
    }

    rechercheDans(requete) {
        let elementDifferenciant = requete;
        this._cheminDeLElementARechercher.every((elementAParcourir) => {
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