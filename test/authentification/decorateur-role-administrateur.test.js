import * as chai from 'chai';
import sinon from 'sinon';
import sinonchai from 'sinon-chai';
const expect = chai.use(sinonchai).expect;

import FausseReponseExpress from '../fausse-reponse-express';
import DecorateurRoleAdministrateur from '../../lib/authentification/decorateur-role-administrateur';

describe('DecorateurRoleAdministrateur', () => {

    let decorateurRoleAdministrateur;
    let fausseReponseExpress;
    let fauxElementDecore;

    beforeEach(function () {
        fauxElementDecore = {gere: sinon.stub()}
        fausseReponseExpress = new FausseReponseExpress();
        decorateurRoleAdministrateur = new DecorateurRoleAdministrateur(fauxElementDecore);
    });

    it('doit retourner un message d\'erreur si les informations d\'authentification n\'existe pas', () => {


        decorateurRoleAdministrateur.gere({}, fausseReponseExpress);

        expect(fausseReponseExpress.send).to.have.been.calledWith(JSON.stringify({
            'speech': '', 'displayText': '',
            data: {
                slack: {
                    text: 'Youps ! Cette action est reservée à certain membre. Une erreur est survenue dans votre identification.'
                }
            }
        }));

    });

    it('doit appeler l\'élement décoré si l\'authentification du webhook est trouvée', () => {
        let requete = {body: {originalRequest: {data: {event: {user: 'test'}}}}};

        decorateurRoleAdministrateur.gere(requete, fausseReponseExpress);

        verifieQueLElementDecoreEstAppele(requete)

    });

    it('doit retourner un message d\'erreur si l\'utilisateur n\'est pas administrateur du webhook', () => {
        let requete = {body: {originalRequest: {data: {event: {user: 'pasAdmin'}}}}};

        decorateurRoleAdministrateur.gere(requete, fausseReponseExpress);

        expect(fausseReponseExpress.send).to.have.been.calledWith(JSON.stringify({
            'speech': '', 'displayText': '',
            data: {
                slack: {
                    text: `Youps ! Cette action est reservée aux administrateurs. 
Demande à un membre de l'incubateur de t'ajouer comme administrateur.
Ton identifiant est pasAdmin.`
                }
            }
        }));

    });

    it('doit appeler l\'élement décoré si l\'authentification de demande de liste ou de callback est trouvée', () => {
        let requete = {body: {payload: '{"user": {"id": "test"}}'}};

        decorateurRoleAdministrateur.gere(requete, fausseReponseExpress);

        verifieQueLElementDecoreEstAppele(requete);

    });

    it('doit retourner un message d\'erreur si l\'utilisateur n\'est pas administrateur de la demande de liste ou de callback ', () => {
        let requete = {body: {payload: '{"user": {"id": "pasAdmin"}}'}};

        decorateurRoleAdministrateur.gere(requete, fausseReponseExpress);

        expect(fausseReponseExpress.send).to.have.been.calledWith(JSON.stringify({
            text: `Youps ! Cette action est reservée aux administrateurs. 
Demande à un membre de l'incubateur de t'ajouer comme administrateur.
Ton identifiant est pasAdmin.`
        }));

    });

    function verifieQueLElementDecoreEstAppele(requete) {
        expect(fauxElementDecore.gere).to.have.been.calledWith(requete, fausseReponseExpress);
    };

});