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
function ajouter(nom,responsable_id,fournisseur_id,nb_max_reglements,tarif_id,commentaire){
    return db.one("INSERT INTO lms.legume(nom,responsable_id,fournisseur_id,nb_max_reglements,tarif_id,commentaire) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",[nom,responsable_id,fournisseur_id,nb_max_reglements,tarif_id,commentaire])
}

// Requête SQL récupérer tous les contrats legumes
function recupererToutLeg(){
    var resultat = db.many("SELECT id FROM lms.legume ORDER BY nom ASC");
    return resultat;
} 

// Requête SQL récupérer un contrat legume
function recupererUnLeg(id){
    var resultat = db.one("SELECT id FROM lms.legume WHERE id=$1",[id]);
    return resultat;
} 

// Requête SQL supprimer un contrat legume
function supprimer(id){
    // Nativement DELETE ne retourne pas de résultat si la requête est valide. Le "RETURNING" permet d'y remédier.
    return db.one("DELETE FROM lms.legume WHERE id = $1 RETURNING id",[id]);
} 

// Requête SQL modifier un contrat legume
function modifier(nom,responsable_id,fournisseur_id,nb_max_reglements,tarif_id,commentaire,id){
    return db.one("UPDATE lms.legume SET nom = $1, responsable_id = $2, fournisseur_id = $3, nb_max_reglements = $4, tarif_id = $5, commentaire = $6 WHERE id = $7 RETURNING id",[nom,responsable_id,fournisseur_id,nb_max_reglements,tarif_id,commentaire,id]);
}
