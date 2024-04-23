/* Connection à la base de données postgresql */
const db = require('../utils/db')

module.exports = {
    ajouter,
    recupererToutPers,
    recupererToutAdh,
    recupererToutFour,
    recupererUnPers,
    supprimer,
    modifier
};

// Requête SQL ajouter une personne
function ajouter(categorie,nom,prenom,adresse,courriel,telephone){
    return db.one("INSERT INTO lms.personne(categorie,nom,prenom,adresse,courriel,telephone) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",[categorie,nom,prenom,adresse,courriel,telephone])
}

// Requête SQL récupérer toutes les personnes
function recupererToutPers(){
    var resultat = db.many("SELECT id, categorie, nom, prenom, adresse, telephone, courriel FROM lms.personne ORDER BY nom ASC");
    return resultat;
} 

// Requête SQL récupérer une personne
function recupererUnPers(id){
    var resultat = db.one("SELECT id, categorie, nom, prenom, adresse, telephone, courriel FROM lms.personne WHERE id=$1",[id]);
    return resultat;
} 

// Requête SQL récupérer tous les adhérents
function recupererToutAdh(){
    var resultat = db.many("SELECT id, categorie, nom, prenom, adresse, telephone, courriel FROM lms.personne WHERE categorie='adherent' ORDER BY nom ASC");
    return resultat;
} 

// Requête SQL récupérer tous les fournisseurs
function recupererToutFour(){
    var resultat = db.many("SELECT id, categorie, nom, prenom, adresse, telephone, courriel FROM lms.personne WHERE categorie='fournisseur' ORDER BY nom ASC");
    return resultat;
} 

// Requête SQL supprimer une personne
function supprimer(id){
    // Nativement DELETE ne retourne pas de résultat si la requête est valide. Le "RETURNING" permet d'y remédier.
    return db.one("DELETE FROM lms.personne WHERE id = $1 RETURNING id",[id]);
} 

// Requête SQL modifier une personne
function modifier(categorie,nom,prenom,adresse,courriel,telephone,id){
    return db.one("UPDATE lms.personne SET categorie = $1, nom = $2, prenom = $3, adresse = $4, courriel = $5, telephone = $6 WHERE id = $7 RETURNING id",[categorie,nom,prenom,adresse,courriel,telephone,id]);
}
