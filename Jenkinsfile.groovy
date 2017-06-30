#!groovy

node("node && rancher && docker") {
    checkout scm

    stage("Construction application") {
        sh "npm run produit"
    }


    stage("Construction de l'image docker") {
        sh "npm run docker-cree-image"
    }


    stage("deploiement de l'image docker dans le repository snapshots") {
        sh 'docker login -u docker -p poleemploi docker-snapshots.artefact-repo.pole-emploi.intra'
        sh "npm run docker-pousse-image"
        sh "docker logout docker-snapshots.artefact-repo.pole-emploi.intra"
    }


    stage("promeut l'image docker en latest dans le repository snapshots") {
        sh 'docker login -u docker -p poleemploi docker-snapshots.artefact-repo.pole-emploi.intra'
        sh "npm run docker-promeut-en-latest"
        sh "docker logout docker-snapshots.artefact-repo.pole-emploi.intra"
    }


    stage("passe à la version suivante") {
        sh "npm run passe-a-la-version-suivante"
        sh "git push origin master"
        sh "git push --tags"
    }


    stage("Déploiement container docker") {
        sh "rancher --config /home/ypicpe/.rancher/usine-api.json --wait up -d --stack bot --upgrade --confirm-upgrade --pull"
    }

}
