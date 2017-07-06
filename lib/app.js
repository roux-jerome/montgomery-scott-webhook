'use strict';

import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import RouterInterne from './router-interne';
import EntrepotDeSousRouterInterne from './entrepot-de-sous-router-interne';
import WebhookDemandeDeMep from './cdv/mep/webhook-demande-de-mep';
import ListeVersionCdv from './cdv/mep/liste-versions-cdv';
import CallbackDemandeDeMep from './cdv/mep/callback-demande-de-mep';

let app = express();


let callbackDErreur = (reponse, requete, erreur) => {
    reponse.status(400).send('La syntaxe de la requête est erronée.');
    if (erreur) {
        console.error(erreur);
    }
};
let entrepotDeSousRouterInternePourLesWebhooks = new EntrepotDeSousRouterInterne({
    'cdv.dde-mep': new WebhookDemandeDeMep()
});
let routerInternePourLesWebhooks = new RouterInterne(['body', 'result', 'metadata', 'intentName'],
    entrepotDeSousRouterInternePourLesWebhooks, callbackDErreur);

let entrepotDeSousRouterInternePourLesListes = new EntrepotDeSousRouterInterne({
    'cdv.callback-dde-mep': new ListeVersionCdv()
});
let routerInternePourLesListes = new RouterInterne(['body', 'payload', 'callback_id'],
    entrepotDeSousRouterInternePourLesListes, callbackDErreur);

let entrepotDeSousRouterInternePourLesCallbacks = new EntrepotDeSousRouterInterne({
    'cdv.callback-dde-mep': new CallbackDemandeDeMep()
});
let routerInternePourLesCallbacks = new RouterInterne(['body', 'payload', 'callback_id'],
    entrepotDeSousRouterInternePourLesCallbacks, callbackDErreur);

app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/webhook', express.Router().post('/', routerInternePourLesWebhooks.initialiseLaRoute()));
app.use('/liste', express.Router().post('/', routerInternePourLesListes.initialiseLaRoute()));
app.use('/callback', express.Router().post('/', routerInternePourLesCallbacks.initialiseLaRoute()));
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
