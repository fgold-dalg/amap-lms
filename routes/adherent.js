var express = require('express');
var router = express.Router();

/* Connection à la base de données postgresql */
var config = require("../config");
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://"+config.database.user+":"+config.database.pwd+"@"+config.database.host+":"+config.database.port+"/"+config.database.db);

/* Obtention liste des adhérents */
router.get('/', function(req, res, next) {
  res.send('liste des adhérents');
});

/* Formulaire ajout d'un adhérent */
router.get('/ajout', function(req, res, next) {
  res.render('formulaire_adherent', { title: 'Formulaire - Ajout d\'un Adhérent' });
});

/* Formulaire ajout d'un adhérent - insertion données dans base */
router.post('/ajout-adherent', function(req, res, next) {

  db.one("INSERT INTO lms.adherent(nom,prenom,adresse,courriel,telephone) VALUES ($1,$2,$3,$4,$5)",[req.body['nom'],req.body['prenom'],req.body['adresse'],req.body['courriel'],req.body['tel']])
    .then(function (data) {
        console.log("DATA:", data.value);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
  res.send("reçue");
  // res.redirect('/adherent');
});

/* Formulaire ajout d'un adhérent */
router.get('/modification', function(req, res, next) {
  res.render('formulaire_adherent', { title: 'Formulaire - Modification d\'un Adhérent' });
});
module.exports = router;