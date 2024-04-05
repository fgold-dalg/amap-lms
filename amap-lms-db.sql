CREATE SCHEMA IF NOT EXISTS lms
    AUTHORIZATION postgres;

CREATE TABLE IF NOT EXISTS lms.adherent
(
    id serial PRIMARY KEY,
    nom VARCHAR(30),
    prenom VARCHAR(30),
    adresse VARCHAR(200),
    courriel VARCHAR(150),
    telephone VARCHAR(10)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS lms.adherent
    OWNER to postgres;

CREATE TABLE lms.tarif (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prix DECIMAL(10, 2) NOT NULL
);

CREATE TABLE lms.contrat (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    responsable_id INTEGER REFERENCES lms.adherent(id),
    nb_max_reglements INTEGER NOT NULL,
    tarif_id INTEGER REFERENCES lms.tarif(id)
);
COMMENT ON TABLE lms.contrat IS 'La table "contrat" est une table "parent" qui contient des rubriques que toutes les tables héritantes auront';
COMMENT ON COLUMN lms.contrat.nb_max_reglements IS 'Un contrat peut être réglé en plusieurs fois, nombre maximum de règlement';

CREATE TABLE lms.legume (
    id SERIAL PRIMARY KEY,
    tarif DECIMAL(10, 2) NOT NULL
) INHERITS (lms.contrat);

CREATE TABLE lms.oeuf (
    id SERIAL PRIMARY KEY,
    quantite INTEGER NOT NULL
) INHERITS (lms.contrat);
COMMENT ON COLUMN lms.oeuf.quantite IS 'Nombre de boîte d oeufs';

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
    supplement_sucre BOOLEAN NOT NULL,
    supplement_sale BOOLEAN NOT NULL
) INHERITS (lms.contrat);
COMMENT ON COLUMN lms.fromage.supplement_sucre IS 'Supplement sucre, oui ou non';
COMMENT ON COLUMN lms.fromage.supplement_sale IS 'Supplement salé, oui ou non';
