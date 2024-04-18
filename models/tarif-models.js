/* Connection à la base de données postgresql */
const db = require('../utils/db')

module.exports = {
    ajouter,
    recupererToutTarif,
    recupererUnTarif,
    supprimer,
    modifier
};

// Requête SQL ajouter un tarif
function ajouter(nom,prix){
    return db.one("INSERT INTO lms.tarif(nom,prix) VALUES ($1,$2) RETURNING *",[nom,prix])
}

// Requête SQL récupérer tous les tarifs
function recupererToutTarif(){
    var resultat = db.many("SELECT id, nom, prix FROM lms.tarif ORDER BY nom ASC");
    return resultat;
} 

// Requête SQL récupérer un tarif
function recupererUnTarif(id){
    var resultat = db.one("SELECT id, nom, prix FROM lms.tarif WHERE id=$1",[id]);
    return resultat;
} 

// Requête SQL supprimer un tarif
function supprimer(id){
    // Nativement DELETE ne retourne pas de résultat si la requête est valide. Le "RETURNING" permet d'y remédier.
    return db.one("DELETE FROM lms.tarif WHERE id = $1 RETURNING id",[id]);
} 

// Requête SQL modifier un tarif
function modifier(nom,prix,id){
    return db.one("UPDATE lms.tarif SET nom = $1, prix = $2 WHERE id = $3 RETURNING id",[nom,prix,id]);
}
