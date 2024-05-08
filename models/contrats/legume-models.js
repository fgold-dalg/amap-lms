/* Connection à la base de données postgresql */
const db = require('../../utils/db')

module.exports = {
    ajouter,
    recupererToutLeg,
    recupererUnLeg,
    supprimer,
    modifier
};

// Requête SQL ajouter un contrat legume
function ajouter(quantite,commentaire){
    return db.one("INSERT INTO lms.contrat_legume(quantite,commentaire) VALUES ($1,$2) RETURNING id",[quantite, commentaire])
}

// Requête SQL récupérer tous les contrats legumes
function recupererToutLeg(){
    var resultat = db.many("SELECT id, quantite, commentaire FROM lms.contrat_legume ORDER BY id ASC");
    return resultat;
} 

// Requête SQL récupérer un contrat legume
function recupererUnLeg(id){
    var resultat = db.one("SELECT id FROM lms.contrat_legume WHERE id=$1",[id]);
    return resultat;
} 

// Requête SQL supprimer un contrat legume
function supprimer(id){
    // Nativement DELETE ne retourne pas de résultat si la requête est valide. Le "RETURNING" permet d'y remédier.
    return db.one("DELETE FROM lms.contrat_legume WHERE id = $1 RETURNING id",[id]);
} 

// Requête SQL modifier un contrat legume
function modifier(quantite,commentaire,id){
    return db.one("UPDATE lms.contrat_legume SET quantite = $1, commentaire = $2 WHERE id = $3 RETURNING id",[quantite, commentaire, id]);
}
