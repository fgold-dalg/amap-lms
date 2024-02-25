const { body } = require('express-validator');

// Règles de validation du formulaire d'ajout d'adhérents
const adherentValidator = [
  body('nom', 'Erreur, ce champs ne peut être vide').notEmpty(),
  body('prenom', 'Erreur, ce champs ne peut être vide').notEmpty(),
  body('adresse', 'Erreur, ce champs ne peut être vide').notEmpty(),
  //courriel  
  body('courriel', 'Erreur, ce champs ne peut être vide').notEmpty(),
  body('courriel', 'Adresse courriel invalide').isEmail(),
  //Téléphone
  body('tel', 'Erreur incorrecte - 10 chiffres attendus').isInt(),
  body('tel', 'Longueur incorrecte - 10 chiffres attendus').isLength({min:10,max:10}),
];


module.exports = {
    adherentValidator
}