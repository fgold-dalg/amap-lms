CREATE SCHEMA IF NOT EXISTS lms
    AUTHORIZATION postgres;

CREATE TABLE IF NOT EXISTS lms.personne
(
    id serial PRIMARY KEY,
    categorie VARCHAR(30),
    nom VARCHAR(30) NOT NULL,
    prenom VARCHAR(30) NOT NULL,
    adresse VARCHAR(200),
    courriel VARCHAR(150),
    telephone VARCHAR(10) NOT NULL
);

CREATE TABLE lms.tarif (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prix DECIMAL(10, 2) NOT NULL
);

CREATE TABLE lms.contrat_legume (
    id SERIAL PRIMARY KEY,
    quantite INTEGER NOT NULL,
    commentaire VARCHAR(255)
);

CREATE TABLE lms.contrat_oeuf (
    id SERIAL PRIMARY KEY,
    quantite INTEGER NOT NULL,
    commentaire VARCHAR(255)
);
COMMENT ON COLUMN lms.contrat_oeuf.quantite IS 'Nombre de boîte de six oeufs';

CREATE TABLE lms.contrat_fruit (
    id SERIAL PRIMARY KEY,
    fruit BOOLEAN NOT NULL,
    quantite_fruit INTEGER NOT NULL,
    jus BOOLEAN NOT NULL,
    quantite_jus INTEGER NOT NULL,
    commentaire VARCHAR(255)
);
COMMENT ON COLUMN lms.contrat_fruit.quantite_fruit IS 'Nombre de panier de fruit';
COMMENT ON COLUMN lms.contrat_fruit.quantite_jus IS 'Nombre de bouteille de jus de fruit';

CREATE TABLE lms.formule (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);
COMMENT ON TABLE lms.formule IS 'Assortiment de divers fromages gérés par le fournisseur';

INSERT INTO lms.formule(nom) VALUES ('A');
INSERT INTO lms.formule(nom) VALUES ('B');
INSERT INTO lms.formule(nom) VALUES ('C');
INSERT INTO lms.formule(nom) VALUES ('Autres');

CREATE TABLE lms.contrat_fromage (
    id SERIAL PRIMARY KEY,
    formule_id INTEGER REFERENCES lms.formule(id),
    supplement BOOLEAN NOT NULL,
    sans_sucre BOOLEAN NOT NULL,
    commentaire VARCHAR(255)
);
COMMENT ON COLUMN lms.contrat_fromage.sans_sucre IS 'Retrait des suppléments sucrés, oui ou non ?';
COMMENT ON COLUMN lms.contrat_fromage.supplement IS 'Supplement aromatisé, oui ou non';

CREATE TABLE lms.souscription (
    id SERIAL PRIMARY KEY,
	contrat_legume_id INTEGER REFERENCES lms.contrat_legume(id),
    contrat_oeuf_id INTEGER REFERENCES lms.contrat_oeuf(id),
    contrat_fruit_id INTEGER REFERENCES lms.contrat_fruit(id),
    contrat_fromage_id INTEGER REFERENCES lms.contrat_fromage(id),
	adherent_id INTEGER REFERENCES lms.personne(id),
    date_creation DATE NOT NULL DEFAULT CURRENT_DATE
);
