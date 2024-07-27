export const DB_MIGRATIONS = `

CREATE TABLE github__users (
    id varchar(36) NOT NULL PRIMARY KEY,
    username varchar(255) NOT NULL UNIQUE,
    city varchar(255) CHECK( city IN ('Texas','Dallas','Austin') ) NOT NULL DEFAULT 'Texas'
);

CREATE TABLE github__repos (
    id varchar(36) NOT NULL PRIMARY KEY
);

`
