/* Connection à la base de données postgresql */
const db = require('../utils/db')

module.exports = {
    ajouter,
    recupererToutSous,
    recupererUnSous,
    recupererUnSousAdh,
    supprimer,
    modifier
};

// Requête SQL ajouter une souscription
function ajouter(adherentId, dateCreation){
    return db.one("INSERT INTO lms.souscription( adherent_id, date_creation) VALUES ($1, $2) RETURNING id",[adherentId, dateCreation])
}

// Requête SQL récupérer toutes les souscription
function recupererToutSous(){
    var resultat = db.many("SELECT id FROM lms.souscription ORDER BY id ASC");
    return resultat;
} 

// Requête SQL récupérer une souscription au contrat legume
function recupererUnSous(id){
    var resultat = db.one("SELECT id FROM lms.legume WHERE id=$1",[id]);
    return resultat;
} 

// Requête SQL supprimer une souscription
function supprimer(id){
    // Nativement DELETE ne retourne pas de résultat si la requête est valide. Le "RETURNING" permet d'y remédier.
    return db.one("DELETE FROM lms.souscription WHERE id = $1 RETURNING id",[id]);
} 

// Requête SQL modifier une souscription
function modifier(contratId, adherentId, id){
    return db.one("UPDATE lms.souscription SET contrat_id = $1, adherent_id = $2 WHERE id = $3 RETURNING id",[contratId, adherentId, id]);
}

// Récupère souscription adhérent
function recupererUnSousAdh(idAdh){
    return db.one("SELECT contrat_legume_id FROM lms.souscription WHERE adherent_id=$1",[idAdh]);
} 

