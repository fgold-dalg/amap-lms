CREATE SCHEMA IF NOT EXISTS lms
    AUTHORIZATION postgres;

CREATE TABLE IF NOT EXISTS lms.personne
(
    id serial PRIMARY KEY,
    categorie VARCHAR(30),
    nom VARCHAR(30),
    prenom VARCHAR(30),
    adresse VARCHAR(200),
    courriel VARCHAR(150),
    telephone VARCHAR(10)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS lms.personne
    OWNER to postgres;

CREATE TABLE lms.tarif (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prix DECIMAL(10, 2) NOT NULL
);

CREATE TABLE lms.contrat (
    id SERIAL PRIMARY KEY,
    responsable_id INTEGER REFERENCES lms.personne(id),
    fournisseur_id INTEGER REFERENCES lms.personne(id),
    nb_max_reglements INTEGER NOT NULL,
    tarif_id INTEGER REFERENCES lms.tarif(id),
    commentaire VARCHAR(255)
);
COMMENT ON TABLE lms.contrat IS 'La table "contrat" est une table "parent" qui contient des rubriques que toutes les tables héritantes auront';
COMMENT ON COLUMN lms.contrat.nb_max_reglements IS 'Un contrat peut être réglé en plusieurs fois, nombre maximum de règlement';
COMMENT ON COLUMN lms.contrat.responsable_id IS 'Membre du CA qui gère la relation entre les adhérents et le fournisseur d un contrat';
COMMENT ON COLUMN lms.contrat.fournisseur_id IS 'Un fournisseur est celui qui propose un contrat aux adhérents';

CREATE TABLE lms.legume (
    id SERIAL PRIMARY KEY
) INHERITS (lms.contrat);

CREATE TABLE lms.oeuf (
    id SERIAL PRIMARY KEY,
    quantite INTEGER NOT NULL
) INHERITS (lms.contrat);
COMMENT ON COLUMN lms.oeuf.quantite IS 'Nombre de boîte de six oeufs';

CREATE TABLE lms.fruit (
    id SERIAL PRIMARY KEY,
    fruit BOOLEAN NOT NULL,
    quantite_fruit INTEGER NOT NULL,
    jus BOOLEAN NOT NULL,
    quantite_jus INTEGER NOT NULL
) INHERITS (lms.contrat);
COMMENT ON COLUMN lms.fruit.quantite_fruit IS 'Nombre de panier de fruit';
COMMENT ON COLUMN lms.fruit.quantite_jus IS 'Nombre de bouteille de jus de fruit';

CREATE TABLE lms.formule (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);
COMMENT ON TABLE lms.formule IS 'Assortiment de divers fromages gérés par le fournisseur';

CREATE TABLE lms.fromage (
    id SERIAL PRIMARY KEY,
    formule_id INTEGER REFERENCES lms.formule(id),
    supplement BOOLEAN NOT NULL,
    sans_sucre BOOLEAN NOT NULL
) INHERITS (lms.contrat);
COMMENT ON COLUMN lms.fromage.sans_sucre IS 'retrait des suppléments sucrés, oui ou non';
COMMENT ON COLUMN lms.fromage.supplement IS 'Supplement aromatisé, oui ou non';

INSERT INTO lms.formule(nom) VALUES ('A');
INSERT INTO lms.formule(nom) VALUES ('B');
INSERT INTO lms.formule(nom) VALUES ('C');
INSERT INTO lms.formule(nom) VALUES ('Autres');

CREATE TABLE lms.adhesion (
    id SERIAL PRIMARY KEY,
	contrat_id INTEGER REFERENCES lms.contrat(id),
	adherent_id INTEGER REFERENCES lms.personne(id) 
);
