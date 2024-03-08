const { body } = require('express-validator');

// Règles de validation du formulaire d'ajout d'adhérents
const adherentValidator = [
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


module.exports = {
    adherentValidator
}