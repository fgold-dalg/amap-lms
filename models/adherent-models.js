/* Connection à la base de données postgresql */
var config = require("../config");
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://"+config.database.user+":"+config.database.pwd+"@"+config.database.host+":"+config.database.port+"/"+config.database.db);

module.exports = {
    ajouter,
    recuperer,
    supprimer
};

// Requête SQL ajout adhérent
function ajouter(nom,prenom,adresse,courriel,telephone){
    return db.one("INSERT INTO lms.adherent(nom,prenom,adresse,courriel,telephone) VALUES ($1,$2,$3,$4,$5) RETURNING *",[nom,prenom,adresse,courriel,telephone])
}

// Requête SQL récupérer adhérent
function recuperer(nom,prenom,adresse,courriel,telephone){
    var resultat = db.many("SELECT id, nom, prenom, adresse, telephone, courriel FROM lms.adherent ORDER BY nom ASC");
    return resultat;
} 

// Requête SQL supprimer adhérent
function supprimer(id){
    // Nativement DELETE ne retourne pas de résultat si la requête est valide. Le "RETURNING" permet d'y remédier.
    return db.one("DELETE FROM lms.adherent WHERE id = $1 RETURNING id",[id]);
} 