var express = require('express');
var router = express.Router();

const modPersonne = require('../models/personne-models');
const formValidator = require('../models/form-validator');
const { validationResult } = require('express-validator');


/**
 * Obtention liste des personnes 
 */
router.get('/', async function(req, res) {
  var listePersonne= [];    
  await modPersonne.recupererToutPers()
  .then(function (donnees) {
    listePersonne= donnees;
  })
  .catch(function (erreur) {
    console.log("ERROR:", erreur);
  });
  res.render('personne/liste', { titre: 'Liste des personnes', listePersonne: listePersonne }); 
});


/**
 * Formulaire ajout d'un personne
 */
router.get('/ajouter', function(req, res) {
  res.render('personne/formulaire', { titre: 'Formulaire - Ajouter un Personne',personne:[], listeErreur:[] }); 
});


/**
 * Formulaire ajout ou de modification d'un personne - insertion/modification données dans base
 */
router.post('/ajouter-modifier',formValidator.personneValidator, async function(req, res, next) {
  var personne = {
    categorie: req.body['categorie'],
    nom: req.body['nom'],
    prenom: req.body['prenom'],
    adresse: req.body['adresse'] ,
    tel: req.body['tel'],
    courriel: req.body['courriel'],
  };
  // Contrôle si erreur dans saisie formulaire
  const listeErreur = validationResult(req);
  if (listeErreur.isEmpty()) {
    // Si id existe alors modification de l'personne existant sinon ajout du nouvel personne
    if ( req.body['id']){
      personne.id = req.body['id'];
      await modPersonne.modifier(personne.categorie,personne.nom,personne.prenom,personne.adresse,personne.courriel,personne.tel,personne.id)
        .then(function () {
          res.redirect('/personne/'); 
        })
        .catch(function (erreur) {
          console.log("ERROR:", erreur);
      });
    }
    else{
      // Ajout dans base si pas d'erreur
      await modPersonne.ajouter(personne.categorie,personne.nom,personne.prenom,personne.adresse,personne.courriel,personne.tel)
        .then(function () {
          res.redirect('/personne/'); 
        })
        .catch(function (erreur) {
          console.log("ERROR:", erreur);
        });
    };
  } else{
      // Affiche le bon titre de formulaire en fonction de l'existence d'un id (signifie qu'un personne existe => modification)
      if (req.body['id']) {
        var titre = 'Formulaire - Modification d\'un Personne'
      }
      else{
        var titre = 'Formulaire - Ajout d\'un Personne'
      };
    // Affichage des erreurs trouvées lors de la saisie du formulaire ajout d'personne
    res.render('personne/formulaire', { titre: titre, personne: personne, listeErreur: listeErreur.array() });
  }
});


/**
 * Formulaire modification d'un personne
 */
router.get('/modifier/:idPers', async function(req, res) {
  var personne = '';
  await modPersonne.recupererUnPers(req.params.idPers)
    .then(function (donnees) {
      // Permet de stabiliser l'assignation des valeurs de la base de données dans une variable structurée
      personne = {
        id: donnees.id,
        categorie: donnees.categorie.trim(),
        nom: donnees.nom.trim(),
        prenom: donnees.prenom.trim(),
        adresse: donnees.adresse.trim(),
        tel: donnees.telephone,
        courriel: donnees.courriel.trim(),
      };
    })
    .catch(function (erreur) {
      console.log("ERROR:", erreur);
      res.send("L'ID personne : " + req.params.idPers + " n'a pas été trouvé !");
    });
    res.render('personne/formulaire', { titre: 'Formulaire - Modification d\'un Personne', personne: personne, listeErreur: [] }); 
});


/**
 * Suppression d'un personne
 */
router.get('/supprimer/:idPers', async function(req, res) {
  await modPersonne.supprimer(req.params.idPers)
    .then(function () {
      res.redirect('/personne/'); 
    })
    .catch(function (erreur) {
      console.log("ERROR:", erreur);
      res.send("L'ID personne : " + req.params.idPers + " n'a pas été trouvé !");
    });
});
module.exports = router;