CREATE TABLE users (
    uuid VARCHAR(36) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    course SMALLINT,
    lfm VARCHAR(255),
    is_admin BOOLEAN,
    contact_data VARCHAR(255),
    status VARCHAR(50)
);
