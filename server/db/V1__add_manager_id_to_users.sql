ALTER TABLE users ADD manager_id INTEGER REFERENCES users(id);