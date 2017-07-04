export default class FauxSousRouterInterne {

    gere(requete, reponse) {
        reponse.send('je suis un faux sous router');
    }

}