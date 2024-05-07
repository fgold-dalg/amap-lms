var express = require('express');
var router = express.Router();

const modLegume = require('../../models/contrats/legume-models');
const modAdherent = require('../../models/personne-models');
const formValidator = require('../../models/form-validator');
const { validationResult } = require('express-validator');


/**
 * Obtention liste des contrats legumes 
 */
router.get('/', async function(req, res) {
  var listeContrat= [];    
  await modLegume.recupererToutLeg()
  .then(function (donnees) {
    listeContrat= donnees;
  })
  .catch(function (erreur) {
    console.log("ERROR:", erreur);
  });
  res.render('contrat/legume/liste', { titre: 'Liste des contrats legumes', listeContrat: listeContrat }); 
});


/**
 * Formulaire ajout d'un contrat legume
 */
router.get('/ajouter', async function(req, res) {
  var listeAdherent= [];
  await modAdherent.recupererToutAdh()
  .then(function (donnees) {
    listeAdherent= donnees;
  })
  .catch(function (erreur) {
    console.log("ERROR:", erreur);
  });
  res.render('contrat/legume/formulaire', { titre: 'Formulaire - Ajouter un Legume', listeAdherent:listeAdherent, contrat:[], listeErreur:[] }); 
});


/**
 * Formulaire ajout ou de modification d'un contrat legume - insertion/modification données dans base
 */
router.post('/ajouter-modifier',formValidator.legumeValidator, function(req, res, next) {
  var listeAdherent= [];
  var contrat = {
    adherent: req.body['adherent'],
    quantite: req.body['quantite'],
    commentaire: req.body['commentaire']
  };
  // Contrôle si erreur dans saisie formulaire
  const listeErreur = validationResult(req);
  if (listeErreur.isEmpty()) {
    // Si id existe alors modification de du contrat existant sinon ajout du nouveau contrat legume
    if ( req.body['id']){
      contrat.id = req.body['id'];
      modLegume.modifier(contrat.quantite,contrat.commentaire,contrat.id)
        .then(function () {
          res.redirect('/contrat/legume/'); 
        })
        .catch(function (erreur) {
          console.log("ERROR:", erreur);
      });
    }
    else{
      // Ajout dans base si pas d'erreur
      modLegume.ajouter(contrat.quantite,contrat.commentaire)
        .then(function () {
          res.redirect('/contrat/legume/'); 
        })
        .catch(function (erreur) {
          console.log("ERROR:", erreur);
        });
    };
  } else{
      // Affiche le bon titre de formulaire en fonction de l'existence d'un id (signifie qu'un contrat legume existe => modification)
      if (req.body['id']) {
        var titre = 'Formulaire - Modification d\'un contrat Legume'
      }
      else{
        var titre = 'Formulaire - Ajout d\'un contrat Legume'
      };

      // Recuperation de la liste des adhérents
      modAdherent.recupererToutAdh()
      .then(function (donnees) {
        listeAdherent= donnees;
      })
      .catch(function (erreur) {
        console.log("ERROR:", erreur);
      });
    // Affichage des erreurs trouvées lors de la saisie du formulaire ajout d'legume
    res.render('contrat/legume/formulaire', { titre: titre, contrat: contrat, listeAdherent:listeAdherent, listeErreur: listeErreur.array() });
  }
});


/**
 * Formulaire modification d'un legume
 */
router.get('/modifier/:idLeg', async function(req, res) {
  var legume = '';
  await modLegume.recupererUnLeg(req.params.idLeg)
    .then(function (donnees) {
      // Permet de stabiliser l'assignation des valeurs de la base de données dans une variable structurée
      legume = {
        id: donnees.id,
        responsableId: donnees.responsableId.trim(),
        fournisseurId: donnees.fournisseurId.trim(),
        quantite: donnees.quantite.trim(),
        commentaire: donnees.commentaire,
        tarifId: donnees.tarifId.trim(),
      };
    })
    .catch(function (erreur) {
      console.log("ERROR:", erreur);
      res.send("L'ID legume : " + req.params.idLeg + " n'a pas été trouvé !");
    });
    res.render('contrat/legume/formulaire', { titre: 'Formulaire - Modification d\'un Legume', legume: legume, listeErreur: [] }); 
});


/**
 * Suppression d'un legume
 */
router.get('/supprimer/:idLeg', async function(req, res) {
  await modLegume.supprimer(req.params.idLeg)
    .then(function () {
      res.redirect('/legume/'); 
    })
    .catch(function (erreur) {
      console.log("ERROR:", erreur);
      res.send("L'ID legume : " + req.params.idLeg + " n'a pas été trouvé !");
    });
});
module.exports = router;