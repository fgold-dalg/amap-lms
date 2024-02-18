-- Database: AMAP

-- DROP DATABASE IF EXISTS "AMAP";

-- CREATE DATABASE "AMAP"
--    WITH
--    OWNER = postgres
--    ENCODING = 'UTF8'
--    LC_COLLATE = 'fr_FR.UTF-8'
--    LC_CTYPE = 'fr_FR.UTF-8'
--    TABLESPACE = pg_default
--    CONNECTION LIMIT = -1
--    IS_TEMPLATE = False;

-- SCHEMA: LMS

-- DROP SCHEMA IF EXISTS "LMS" ;

CREATE SCHEMA IF NOT EXISTS "LMS"
    AUTHORIZATION postgres;

-- Table: LMS.adherent

-- DROP TABLE IF EXISTS "LMS".adherent;

CREATE TABLE IF NOT EXISTS "LMS".adherent
(
    "ID_ADH" integer NOT NULL,
    "NOM" character(30) COLLATE pg_catalog."default",
    "PRENOM" character(30) COLLATE pg_catalog."default",
    "ADRESSE" character(200) COLLATE pg_catalog."default",
    "COURRIEL" character(150) COLLATE pg_catalog."default",
    "TELEPHONE" numeric(10,0),
    CONSTRAINT adherent_pkey PRIMARY KEY ("ID_ADH")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "LMS".adherent
    OWNER to postgres;
