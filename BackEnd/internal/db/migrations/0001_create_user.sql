CREATE TABLE IF NOT EXISTS users (
            uuid VARCHAR(36) PRIMARY KEY,
            login VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            course VARCHAR(255),
            lfm VARCHAR(255),
            is_admin BOOLEAN DEFAULT FALSE,
            contact_data TEXT,
            status VARCHAR(255)
        );
