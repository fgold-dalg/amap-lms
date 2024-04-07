var express = require('express');
var router = express.Router();

const modTarif = require('../models/tarif-models');
const formValidator = require('../models/form-validator');
const { validationResult } = require('express-validator');


/**
 * Obtention liste des tarifs 
 */
router.get('/', async function(req, res) {
  var listeTarif= [];    
  await modTarif.recupererToutTarif()
  .then(function (donnees) {
    listeTarif= donnees;
  })
  .catch(function (erreur) {
    console.log("ERROR:", erreur);
  });
  res.render('tarif/liste', { titre: 'Liste des tarifs', listeTarif: listeTarif }); 
});


/**
 * Formulaire ajout d'un tarif
 */
router.get('/ajouter', function(req, res) {
  res.render('tarif/formulaire', { titre: 'Formulaire - Ajouter un tarif',tarif:[], listeErreur:[] }); 
});


/**
 * Formulaire ajout ou de modification d'un tarif - insertion/modification données dans base
 */
router.post('/ajouter-modifier',formValidator.tarifValidator, function(req, res, next) {
  var tarif = {
    nom: req.body['nom'],
    prix: req.body['prix'],
  };
  // Contrôle si erreur dans saisie formulaire
  const listeErreur = validationResult(req);
  if (listeErreur.isEmpty()) {
    // Si id existe alors modification de l'tarif existant sinon ajout du nouvel tarif
    if ( req.body['id']){
      tarif.id = req.body['id'];
      modTarif.modifier(tarif.nom,tarif.prix,tarif.id)
        .then(function () {
          res.redirect('/tarif/'); 
        })
        .catch(function (erreur) {
          console.log("ERROR:", erreur);
      });
    }
    else{
      // Ajout dans base si pas d'erreur
      modTarif.ajouter(tarif.nom,tarif.prix)
        .then(function () {
          res.redirect('/tarif/'); 
        })
        .catch(function (erreur) {
          console.log("ERROR:", erreur);
        });
    };
  } else{
      // Affiche le bon titre de formulaire en fonction de l'existence d'un id (signifie qu'un tarif existe => modification)
      if (req.body['id']) {
        var titre = 'Formulaire - Modification d\'un Tarif'
      }
      else{
        var titre = 'Formulaire - Ajout d\'un Tarif'
      };
    // Affichage des erreurs trouvées lors de la saisie du formulaire ajout d'tarif
    res.render('tarif/formulaire', { titre: titre, tarif: tarif, listeErreur: listeErreur.array() });
  }
});


/**
 * Formulaire modification d'un tarif
 */
router.get('/modifier/:idTarif', async function(req, res) {
  var tarif = '';
  await modTarif.recupererUnTarif(req.params.idTarif)
    .then(function (donnees) {
      // Permet de stabiliser l'assignation des valeurs de la base de données dans une variable structurée
      tarif = {
        id: donnees.id,
        nom: donnees.nom.trim(),
        prix: donnees.prix.trim(),
      };
    })
    .catch(function (erreur) {
      console.log("ERROR:", erreur);
      res.send("L'ID tarif : " + req.params.idTarif + " n'a pas été trouvé !");
    });
    res.render('tarif/formulaire', { titre: 'Formulaire - Modification d\'un Tarif', tarif: tarif, listeErreur: [] }); 
});


/**
 * Suppression d'un tarif
 */
router.get('/supprimer/:idTarif', async function(req, res) {
  await modTarif.supprimer(req.params.idTarif)
    .then(function (donnees) {
      res.redirect('/tarif/'); 
    })
    .catch(function (erreur) {
      console.log("ERROR:", erreur);
      res.send("L'ID tarif : " + req.params.idTarif + " n'a pas été trouvé !");
    });
});
module.exports = router;