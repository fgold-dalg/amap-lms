var express = require('express');
var router = express.Router();

const modAdherent = require('../models/adherent-models');
const formValidator = require('../models/form-validator');
const { validationResult } = require('express-validator');



/* Obtention liste des adhérents */
router.get('/', async function(req, res) {
  var listeAdherent= [];    
  await modAdherent.recupererToutAdh()
  .then(function (donnees) {
    listeAdherent= donnees;
  })
  .catch(function (erreur) {
    console.log("ERROR:", erreur);
  });
  res.render('adherent/liste', { titre: 'Liste des adhérents', listeAdherent: listeAdherent }); 
});

/* Formulaire ajout d'un adhérent */
router.get('/ajouter', function(req, res) {
  res.render('adherent/formulaire', { titre: 'Formulaire - Ajouter un Adhérent',adherent:[], listeErreur:[] }); 
});

/* Formulaire ajout ou de modification d'un adhérent - insertion/modification données dans base */
router.post('/ajouter-modifier',formValidator.adherentValidator, function(req, res, next) {
  var adherent = {
    nom: req.body['nom'],
    prenom: req.body['prenom'],
    adresse: req.body['adresse'] ,
    tel: req.body['tel'],
    courriel: req.body['courriel'],
  };
  // Contrôle si erreur dans saisie formulaire
  const listeErreur = validationResult(req);
  if (listeErreur.isEmpty()) {
    // Si id existe alors modification de l'adhérent existant sinon ajout du nouvel adhérent
    if ( req.body['id']){
      adherent.id = req.body['id'];
      modAdherent.modifier(adherent.nom,adherent.prenom,adherent.adresse,adherent.courriel,adherent.tel,adherent.id)
        .then(function () {
          res.redirect('/adherent/'); 
        })
        .catch(function (erreur) {
          console.log("ERROR:", erreur);
      });
    }
    else{
      // Ajout dans base si pas d'erreur
      modAdherent.ajouter(adherent.nom,adherent.prenom,adherent.adresse,adherent.courriel,adherent.tel)
        .then(function () {
          res.redirect('/adherent/'); 
        })
        .catch(function (erreur) {
          console.log("ERROR:", erreur);
        });
    };
  } else{
      // Affiche le bon titre de formulaire en fonction de l'existence d'un id (signifie qu'un adhérent existe => modification)
      if (req.body['id']) {
        var titre = 'Formulaire - Modification d\'un Adhérent'
      }
      else{
        var titre = 'Formulaire - Ajout d\'un Adhérent'
      };
    // Affichage des erreurs trouvées lors de la saisie du formulaire ajout d'adhérent
    res.render('adherent/formulaire', { titre: titre, adherent: adherent, listeErreur: listeErreur.array() });
  }
});

/* Formulaire modification d'un adhérent */
router.get('/modifier/:idAdh', async function(req, res) {
  var adherent = '';
  await modAdherent.recupererUnAdh(req.params.idAdh)
    .then(function (donnees) {
      // Permet de stabiliser l'assignation des valeurs de la base de données dans une variable structurée
      adherent = {
        id: donnees.id,
        nom: donnees.nom.trim(),
        prenom: donnees.prenom.trim(),
        adresse: donnees.adresse.trim(),
        tel: donnees.telephone,
        courriel: donnees.courriel.trim(),
      };
    })
    .catch(function (erreur) {
      console.log("ERROR:", erreur);
      res.send("L'ID adhérent : " + req.params.idAdh + " n'a pas été trouvé !");
    });
    res.render('adherent/formulaire', { titre: 'Formulaire - Modification d\'un Adhérent', adherent: adherent, listeErreur: [] }); 
});

/* Suppression d'un adhérent */
router.get('/supprimer/:idAdh', async function(req, res) {
  await modAdherent.supprimer(req.params.idAdh)
    .then(function (donnees) {
      res.redirect('/adherent/'); 
    })
    .catch(function (erreur) {
      console.log("ERROR:", erreur);
      res.send("L'ID adhérent : " + req.params.idAdh + " n'a pas été trouvé !");
    });
});
module.exports = router;