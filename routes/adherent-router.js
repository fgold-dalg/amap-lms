var express = require('express');
var router = express.Router();

const modAdherent = require('../models/adherent-models');
const formValidator = require('../models/form-validator');
const { body,validationResult } = require('express-validator');



/* Obtention liste des adhérents */
router.get('/', async function(req, res, next) {
  var listeAdherent= [];    
  await modAdherent.recuperer()
  .then(function (donnees) {
    listeAdherent= donnees;
  })
  .catch(function (erreur) {
    console.log("ERROR:", erreur);
  });
  res.render('adherent/liste', { titre: 'Liste des adhérents', listeAdherent: listeAdherent }); 
});

/* Formulaire ajout d'un adhérent */
router.get('/ajout', function(req, res, next) {
  res.render('adherent/formulaire', { titre: 'Formulaire - Ajout d\'un Adhérent', listeErreur:[] }); 
});

/* Formulaire ajout d'un adhérent - insertion données dans base */
router.post('/ajout',formValidator.adherentValidator, function(req, res, next) {
  // Contrôle si erreur dans saisie formulaire
  const listeErreur = validationResult(req);
  if (listeErreur.isEmpty()) {
    // Ajout dans base si pas d'erreur
    modAdherent.ajout(req.body['nom'],req.body['prenom'],req.body['adresse'],req.body['courriel'],req.body['tel'])
      .then(function (donnees) {
        res.redirect('/adherent/'); 
      })
      .catch(function (erreur) {
        console.log("ERROR:", erreur);
      });
  } else{
    // Affichage des erreurs trouvées lors de la saisie du formulaire ajout d'adhérent
    res.render('adherent/formulaire', { titre: 'Formulaire - Ajout d\'un Adhérent', listeErreur: listeErreur.array() });
  }
});

/* Formulaire modification d'un adhérent */
router.get('/modification', function(req, res, next) {
  res.render('adherent/formulaire', { titre: 'Formulaire - Modification d\'un Adhérent' });
});

/* Suppression d'un adhérent */
router.get('/suppression/:idAdh', async function(req, res) {
  await modAdherent.suppression(req.params.idAdh)
    .then(function (donnees) {
      res.redirect('/adherent/'); 
    })
    .catch(function (erreur) {
      console.log("ERROR:", erreur);
      res.send("L'ID adhérent : " + req.params.idAdh + " n'a pas été trouvé !");
    });
});
module.exports = router;