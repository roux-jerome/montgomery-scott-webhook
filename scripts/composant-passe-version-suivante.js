#!/usr/bin/env node
'use strict';

const Composant = require('npm-incubateur-composant').Composant;

let composant = new Composant(`${__dirname}/../`);

composant.passeALaVersionSuivante();