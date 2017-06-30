'use strict';


export default class Webhook {
    constructor(router) {
        this.router = router;
    }

    initialiserLaRoute() {
        this.router.get('/', (req, res) => {
            if (req && req.body) {
                res.send('respond with a resource aaze');
            } else {
                res.status(400).send('Il manque le body.')
            }
        });

        return this.router;
    };
}
