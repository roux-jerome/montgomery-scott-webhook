import RechercheDElement from '../recherche-d-element';

const ADMINISTRATEURS = ['U6211JDRU', 'test'];

function estUnAdministrateur(id) {
    return ADMINISTRATEURS.find((administrateur) => administrateur === id)
}

export default class DecorateurRoleAdministrateur {

    constructor(elementADecorer) {
        this.elementADecorer = elementADecorer;
        this.rechercheDeLUtilisateurPourLesWebhooks = new RechercheDElement(['body', 'originalRequest', 'data', 'event', 'user']);
        this.rechercheDeLUtilisateurPourLesDemandesDeListeOuCallback = new RechercheDElement(['body', 'payload', 'user', 'id']);
    }

    gere(requete, reponse) {
        console.log(JSON.stringify(requete.body));
        let idutilisateurPourLesWebHooks = this.rechercheDeLUtilisateurPourLesWebhooks.rechercheDans(requete);
        let idUtilisateurPourLesDemandesDeListeOuCallback = this.rechercheDeLUtilisateurPourLesDemandesDeListeOuCallback.rechercheDans(requete);
        if (!idutilisateurPourLesWebHooks && !idUtilisateurPourLesDemandesDeListeOuCallback) {
            reponse.send(JSON.stringify({
                'speech': '', 'displayText': '',
                data: {
                    slack: {
                        text: 'Youps ! Cette action est reservée à certain membre. Une erreur est survenue dans votre identification.'
                    }
                }
            }));
        } else if (
            (idutilisateurPourLesWebHooks && estUnAdministrateur(idutilisateurPourLesWebHooks)) ||
            (idUtilisateurPourLesDemandesDeListeOuCallback && estUnAdministrateur(idUtilisateurPourLesDemandesDeListeOuCallback))
        ) {
            this.elementADecorer.gere(requete, reponse);
        } else {
            let identifiant;
            if (idutilisateurPourLesWebHooks) {
                reponse.send(JSON.stringify({
                    'speech': '', 'displayText': '',
                    data: {
                        slack: {
                            text: `Youps ! Cette action est reservée aux administrateurs. 
Demande à un membre de l'incubateur de t'ajouer comme administrateur.
Ton identifiant est ${idutilisateurPourLesWebHooks}.`
                        }
                    }
                }));
            } else if (idUtilisateurPourLesDemandesDeListeOuCallback) {
                reponse.send(JSON.stringify({
                    text: `Youps ! Cette action est reservée aux administrateurs. 
Demande à un membre de l'incubateur de t'ajouer comme administrateur.
Ton identifiant est ${idUtilisateurPourLesDemandesDeListeOuCallback}.`
                }));
            }

        }


    }
}