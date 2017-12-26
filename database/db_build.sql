BEGIN;

DROP TABLE IF EXISTS users cascade;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);


INSERT INTO users (name, email, password)
VALUES ('marlen', 'marlen@marlen.com', '1234');



COMMIT;
