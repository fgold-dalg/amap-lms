var express = require('express');
var router = express.Router();

const modTarif = require('../models/tarif-models');
const formValidator = require('../models/form-validator');
const { validationResult } = require('express-validator');
const modSouscription = require('../models/souscription-models');


/**
 * Obtention liste des souscriptions
 */
router.get('/', async function(req, res) {
  res.send("Liste des souscriptions en attente.");
0});

async function existSouscription(adherentId) {
  var idContratLegume = null
  await modSouscription.recupererUnSousAdh(adherentId)
  .then(function (donnees) {
    idContratLegume = donnees;
  })
  .catch(function (erreur) {
    console.log("ERROR:", erreur);
  });
  return idContratLegume;
}

module.exports = {
  router,
  existSouscription,
};