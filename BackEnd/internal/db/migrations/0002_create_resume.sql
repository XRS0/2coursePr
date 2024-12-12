CREATE TABLE IF NOT EXISTS cvs (
            cvid VARCHAR(36) PRIMARY KEY,
            user_id VARCHAR(36) NOT NULL,
            title VARCHAR(255) NOT NULL,
            spec VARCHAR(255),
            tags TEXT,
            about_me TEXT,
            FOREIGN KEY (user_id) REFERENCES users (uuid) ON DELETE CASCADE
        );
