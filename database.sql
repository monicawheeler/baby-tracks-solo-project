CREATE TABLE category (
    id SERIAL PRIMARY KEY NOT NULL,
    category_name character varying(100) NOT NULL
);

CREATE TABLE child (
    id SERIAL PRIMARY KEY NOT NULL,
    first_name character varying(80) NOT NULL,
    dob date NOT NULL,
    gender character varying(10) NOT NULL,
    family_id INT REFERENCES family
);

CREATE TABLE event (
    id SERIAL PRIMARY KEY NOT NULL,
    notes character varying(255),
    datetime timestamp with time zone,
    child_id INT REFERENCES child ON DELETE CASCADE,
    category_id  INT REFERENCES category
);

CREATE TABLE family (
    id SERIAL PRIMARY KEY NOT NULL,
    username character varying(30) NOT NULL,
    password character varying(255) NOT NULL,
    family_name character varying(100) NOT NULL
);