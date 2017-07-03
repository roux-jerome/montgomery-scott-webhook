'use strict';


export default class Callback {
    constructor(router) {
        this.router = router;
    }

    initialiserLaRoute() {
        this.router.post('/', (req, res) => {
            if (req && req.body) {
                console.log(req.body);
                let data = JSON.parse(req.body.payload)
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(`Déploiement de la version : ${data.actions[0].selected_options[0].value} ( pour de faux)`)
            } else {
                res.status(400).send('Il manque le body.')
            }
        });

        return this.router;
    };
}
