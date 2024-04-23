var express = require('express');
var router = express.Router();

const modLegume = require('../../models/contrats/legume-models');
const formValidator = require('../../models/form-validator');
const { validationResult } = require('express-validator');


/**
 * Obtention liste des legumes 
 */
router.get('/', async function(req, res) {
  var listeLegume= [];    
  await modLegume.recupererToutLeg()
  .then(function (donnees) {
    listeLegume= donnees;
  })
  .catch(function (erreur) {
    console.log("ERROR:", erreur);
  });
  res.render('legume/liste', { titre: 'Liste des legumes', listeLegume: listeLegume }); 
});


/**
 * Formulaire ajout d'un legume
 */
router.get('/ajouter', function(req, res) {
  res.render('legume/formulaire', { titre: 'Formulaire - Ajouter un Legume',legume:[], listeErreur:[] }); 
});


/**
 * Formulaire ajout ou de modification d'un legume - insertion/modification données dans base
 */
router.post('/ajouter-modifier',formValidator.legumeValidator, function(req, res, next) {
  var legume = {
    nom: req.body['nom'],
    responsableId: req.body['responsable_id'],
    fournisseurId: req.body['fournisseur_id'],
    nbMaxReglements: req.body['nb_max_reglements'],
    tarifId: req.body['tarif_id'] ,
    commentaire: req.body['commentaire']
  };
  // Contrôle si erreur dans saisie formulaire
  const listeErreur = validationResult(req);
  if (listeErreur.isEmpty()) {
    // Si id existe alors modification de l'legume existant sinon ajout du nouvel legume
    if ( req.body['id']){
      legume.id = req.body['id'];
      modLegume.modifier(legume.nom,legume.responsableId,legume.fournisseurId,legume.nbMaxReglements,legume.tarifId,legume.commentaire,legume.id)
        .then(function () {
          res.redirect('/legume/'); 
        })
        .catch(function (erreur) {
          console.log("ERROR:", erreur);
      });
    }
    else{
      // Ajout dans base si pas d'erreur
      modLegume.ajouter(legume.nom,legume.responsableId,legume.fournisseurId,legume.nbMaxReglements,legume.tarifId,legume.commentaire)
        .then(function () {
          res.redirect('/legume/'); 
        })
        .catch(function (erreur) {
          console.log("ERROR:", erreur);
        });
    };
  } else{
      // Affiche le bon titre de formulaire en fonction de l'existence d'un id (signifie qu'un legume existe => modification)
      if (req.body['id']) {
        var titre = 'Formulaire - Modification d\'un Legume'
      }
      else{
        var titre = 'Formulaire - Ajout d\'un Legume'
      };
    // Affichage des erreurs trouvées lors de la saisie du formulaire ajout d'legume
    res.render('legume/formulaire', { titre: titre, legume: legume, listeErreur: listeErreur.array() });
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
        nom: donnees.nom.trim(),
        responsableId: donnees.responsableId.trim(),
        fournisseurId: donnees.fournisseurId.trim(),
        nbMaxReglements: donnees.nbMaxReglements.trim(),
        commentaire: donnees.commentaire,
        tarifId: donnees.tarifId.trim(),
      };
    })
    .catch(function (erreur) {
      console.log("ERROR:", erreur);
      res.send("L'ID legume : " + req.params.idLeg + " n'a pas été trouvé !");
    });
    res.render('legume/formulaire', { titre: 'Formulaire - Modification d\'un Legume', legume: legume, listeErreur: [] }); 
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