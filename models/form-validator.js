const { body } = require('express-validator');

// Règles de validation du formulaire d'ajout  et de modification des personnes
const personneValidator = [
  body('nom', 'Ce champs ne peut être vide').notEmpty(),
  body('prenom', 'Ce champs ne peut être vide').notEmpty(),
  body('adresse', 'Ce champs ne peut être vide').notEmpty(),
  //courriel  
  body('courriel', 'Ce champs ne peut être vide').notEmpty(),
  body('courriel', 'Adresse de courriel invalide (nom@mail.fr)').isEmail(),
  //Téléphone
  body('tel', 'Format incorrect - 10 chiffres attendus').isInt(),
  body('tel', 'Longueur incorrecte - 10 chiffres attendus').isLength({min:10,max:10}),
];

// Règles de validation du formulaire d'ajout et de modification des tarifs
const tarifValidator = [
  body('nom', 'Ce champs ne peut être vide').notEmpty(),
  body('prix', 'Ce champs ne peut être vide').notEmpty(),
  body('prix', 'Format incorrect - un nombre est attendu').isNumeric(),
];

// Règles de validation du formulaire d'ajout et de modification des tarifs
const legumeValidator = [
  body('adherent', 'Ce champs ne peut être vide').notEmpty(),
  body('quantite', 'Ce champs ne peut être vide').notEmpty(),
  body('quantite', 'Format incorrect - un nombre est attendu').isNumeric(),
];

module.exports = {
    personneValidator,
    tarifValidator,
    legumeValidator
}