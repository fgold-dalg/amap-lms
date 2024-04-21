/* Connection à la base de données postgresql */
const db = require('../utils/db')

module.exports = {
    ajouter,
    recupererToutAdh,
    recupererUnAdh,
    supprimer,
    modifier
};

// Requête SQL ajouter un adhérent
function ajouter(nom,prenom,adresse,courriel,telephone){
    return db.one("INSERT INTO lms.adherent(nom,prenom,adresse,courriel,telephone) VALUES ($1,$2,$3,$4,$5) RETURNING *",[nom,prenom,adresse,courriel,telephone])
}

// Requête SQL récupérer tous les adhérents
function recupererToutAdh(){
    var resultat = db.many("SELECT id, nom, prenom, adresse, telephone, courriel FROM lms.adherent ORDER BY nom ASC");
    return resultat;
} 

// Requête SQL récupérer un adhérent
function recupererUnAdh(id){
    var resultat = db.one("SELECT id, nom, prenom, adresse, telephone, courriel FROM lms.adherent WHERE id=$1",[id]);
    return resultat;
} 

// Requête SQL supprimer un adhérent
function supprimer(id){
    // Nativement DELETE ne retourne pas de résultat si la requête est valide. Le "RETURNING" permet d'y remédier.
    return db.one("DELETE FROM lms.adherent WHERE id = $1 RETURNING id",[id]);
} 

// Requête SQL modifier un adhérent
function modifier(nom,prenom,adresse,courriel,telephone,id){
    return db.one("UPDATE lms.adherent SET nom = $1, prenom = $2, adresse = $3, courriel = $4, telephone = $5 WHERE id = $6 RETURNING id",[nom,prenom,adresse,courriel,telephone,id]);
}

