BEGIN;

DROP TABLE IF EXISTS users cascade;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(15) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(64) NOT NULL 
);


INSERT INTO users (username, email, password)
VALUES ('marlen', 'marlen@marlen.com', '1234');



COMMIT;
