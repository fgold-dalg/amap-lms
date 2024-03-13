/* Connection à la base de données postgresql */
var config = require("../config");
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://"+config.database.user+":"+config.database.pwd+"@"+config.database.host+":"+config.database.port+"/"+config.database.db);

module.exports = {
    ajout,
    recuperer
};

// Requête SQL ajout adhérent
function ajout(nom,prenom,adresse,courriel,telephone){
    return db.one("INSERT INTO lms.adherent(nom,prenom,adresse,courriel,telephone) VALUES ($1,$2,$3,$4,$5) RETURNING *",[nom,prenom,adresse,courriel,telephone])
}

// Requête SQL récupérer adhérent
function recuperer(nom,prenom,adresse,courriel,telephone){
    var resultat = db.many("SELECT nom, prenom, adresse, telephone, courriel FROM lms.adherent ORDER BY nom ASC");
    return resultat;
} 