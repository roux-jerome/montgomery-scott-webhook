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

let entrepotDeSousRouterInternePourLesWebhooks = new EntrepotDeSousRouterInterne({
    'cdv.dde-mep': new WebhookDemandeDeMep()
});
let routerInternePourLesWebhooks = new RouterInterne(express.Router(), ['body', 'result', 'metadata', 'intentName'],
    entrepotDeSousRouterInternePourLesWebhooks);

let entrepotDeSousRouterInternePourLesListes = new EntrepotDeSousRouterInterne({
    'cdv.callback-dde-mep': new ListeVersionCdv()
});
let routerInternePourLesListes = new RouterInterne(express.Router(), ['body', 'payload', 'callback_id'],
    entrepotDeSousRouterInternePourLesListes);

let entrepotDeSousRouterInternePourLesCallbacks = new EntrepotDeSousRouterInterne({
    'cdv.callback-dde-mep': new CallbackDemandeDeMep()
});
let routerInternePourLesCallbacks = new RouterInterne(express.Router(), ['body', 'payload', 'callback_id'],
    entrepotDeSousRouterInternePourLesCallbacks);

app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/webhook', routerInternePourLesWebhooks.initialiseLaRoute());
app.use('/liste', routerInternePourLesListes.initialiseLaRoute());
app.use('/callback', routerInternePourLesCallbacks.initialiseLaRoute());
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
