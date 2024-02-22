-- Database: AMAP

-- DROP DATABASE IF EXISTS "amap";

-- CREATE DATABASE "amap"
--    WITH
--    OWNER = postgres
--    ENCODING = 'UTF8'
--    LC_COLLATE = 'fr_FR.UTF-8'
--    LC_CTYPE = 'fr_FR.UTF-8'
--    TABLESPACE = pg_default
--    CONNECTION LIMIT = -1
--    IS_TEMPLATE = False;

-- SCHEMA: lms

-- DROP SCHEMA IF EXISTS "lms" ;

CREATE SCHEMA IF NOT EXISTS "lms"
    AUTHORIZATION postgres;

-- Table: lms.adherent

-- DROP TABLE IF EXISTS "lms".adherent;

CREATE TABLE IF NOT EXISTS "lms".adherent
(
    "id" serial NOT NULL,
    "nom" character(30) COLLATE pg_catalog."default",
    "prenom" character(30) COLLATE pg_catalog."default",
    "adresse" character(200) COLLATE pg_catalog."default",
    "courriel" character(150) COLLATE pg_catalog."default",
    "telephone" numeric(10,0),
    CONSTRAINT adherent_pkey PRIMARY KEY ("id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "lms".adherent
    OWNER to postgres;
