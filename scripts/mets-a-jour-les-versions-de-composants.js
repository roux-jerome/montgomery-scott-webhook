#!/usr/bin/env node

const execSync = require('child_process').execSync;

let argumentsDuScript = require('yargs').argv;
let repertoireDuDockerCompose = argumentsDuScript.repertoireDuDockerCompose ? argumentsDuScript.repertoireDuDockerCompose : '.';
let faitLeCommitSiNecessaire = argumentsDuScript.faitLeCommitSiNecessaire ? argumentsDuScript.faitLeCommitSiNecessaire : false;

const compose = require('npm-incubateur-docker').compose;

compose(`${repertoireDuDockerCompose}/docker-compose.yml`).metAJourLesVersionsPourLePrefixe('incubateur-cdv').then((compose) => {
    return compose.enregistrer();
}).then((compose) => {
    if (faitLeCommitSiNecessaire && compose.aConnuDesModifications()) {
        execSync('git commit -a -m "[auto] mets à jour les versions des composants"'
            , {
                cwd: __dirname,
                stdio: 'inherit'
            });
    }
});
