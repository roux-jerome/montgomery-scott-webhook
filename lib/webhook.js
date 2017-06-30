'use strict';

export default (router => {
    router.get('/', (req, res, next) => {
        res.send('respond with a resource aaze');
    });

    return router;
});
