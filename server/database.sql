-- CREATE DATABASE IF NOT EXISTS reviews;
DROP table IF EXISTS product, review;

\c reviews;

-- CREATE TABLE IF NOT EXISTS product (
--   product SERIAL PRIMARY KEY NOT NULL,
--   page INT DEFAULT 0,
--   count INT DEFAULT 5
--   -- FOREIGN KEY (id) REFERENCES meta (id)
-- );

CREATE TABLE IF NOT EXISTS review (
  review_id SERIAL PRIMARY KEY NOT NULL,
  page INT DEFAULT 0,
  count INT DEFAULT 5,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR NOT NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR(30) NOT NULL,
  reviewer_email VARCHAR(50) NOT NULL,
  response VARCHAR DEFAULT NULL,
  helpfulness SMALLINT NOT NULL,
  photos VARCHAR
);

CREATE TABLE IF NOT EXISTS characteristic(
  id SERIAL PRIMARY KEY NOT NULL,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  values SMALLINT NOT NULL,
  name VARCHAR(20),
  FOREIGN KEY (review_id) REFERENCES review(review_id)
);
