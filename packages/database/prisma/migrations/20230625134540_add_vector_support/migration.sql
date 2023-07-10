-- Adds Vector support to database

CREATE EXTENSION IF NOT EXISTS vector;

-- CREATE TABLE vectors (
--   id BIGSERIAL PRIMARY KEY,
--   hash VARCHAR(64) UNIQUE NOT NULL,
--   embedding VECTOR(1536)
-- );

