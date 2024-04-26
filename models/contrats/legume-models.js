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
function ajouter(responsable_id,fournisseur_id,nb_max_reglements,tarif_id,commentaire){
    return db.one("INSERT INTO lms.legume(responsable_id,fournisseur_id,nb_max_reglements,tarif_id,commentaire) VALUES ($1,$2,$3,$4,$5) RETURNING *",[responsable_id,fournisseur_id,nb_max_reglements,tarif_id,commentaire])
}

// Requête SQL récupérer tous les contrats legumes
function recupererToutLeg(){
    var resultat = db.many("SELECT id FROM lms.legume ORDER BY id ASC");
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
function modifier(responsable_id,fournisseur_id,nb_max_reglements,tarif_id,commentaire,id){
    return db.one("UPDATE lms.legume SET responsable_id = $1, fournisseur_id = $2, nb_max_reglements = $3, tarif_id = $4, commentaire = $5 WHERE id = $6 RETURNING id",[responsable_id,fournisseur_id,nb_max_reglements,tarif_id,commentaire,id]);
}
