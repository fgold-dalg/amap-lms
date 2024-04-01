CREATE SCHEMA IF NOT EXISTS "lms"
    AUTHORIZATION postgres;

CREATE TABLE IF NOT EXISTS "lms".adherent
(
    "id" serial NOT NULL,
    "nom" VARCHAR(30) COLLATE pg_catalog."default",
    "prenom" VARCHAR(30) COLLATE pg_catalog."default",
    "adresse" VARCHAR(200) COLLATE pg_catalog."default",
    "courriel" VARCHAR(150) COLLATE pg_catalog."default",
    "telephone" VARCHAR(10) COLLATE pg_catalog."default",
    CONSTRAINT adherent_pkey PRIMARY KEY ("id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "lms".adherent
    OWNER to postgres;

CREATE TABLE "lms".contrat (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    responsable_id INTEGER REFERENCES "lms".adherent(id),
    nb_max_reglements INTEGER NOT NULL
);

CREATE TABLE "lms".legume (
    id SERIAL PRIMARY KEY,
    tarif DECIMAL(10, 2) NOT NULL,
    nom VARCHAR(255) NOT NULL,
    CONSTRAINT legume_contrat_fk FOREIGN KEY (id) REFERENCES "lms".contrat(id)
) INHERITS ("lms".contrat);

CREATE TABLE "lms".oeuf (
    id SERIAL PRIMARY KEY,
    tarif DECIMAL(10, 2) NOT NULL,
    quantite INTEGER NOT NULL,
    CONSTRAINT oeufs_contrat_fk FOREIGN KEY (id) REFERENCES "lms".contrat(id)
) INHERITS ("lms".contrat);