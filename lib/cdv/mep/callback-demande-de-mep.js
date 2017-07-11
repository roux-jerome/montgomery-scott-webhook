export default class CallbackDemandeDeMep {


    gere(requete, reponse) {
        console.log(JSON.stringify(requete.body));
        let version = JSON.parse(requete.body.payload).actions[0].selected_options[0].value;
        reponse.send(JSON.stringify({
            'attachments': [
                {
                    'title': 'Mettre en production le compagnon de voyage',
                    'text': `<http://jenkins.pic-mutualisee.pole-emploi.intra/jmyt018/job/cdv-voyage/|version ${version}>`,
                    'fallback': 'Impossible d\'afficher la liste des versions',
                    'color': '#3AA3E3',
                    'mrkdwn': true
                }
            ]
        }));
    }
}
