CREATE TABLE cvs (
    cvid VARCHAR(36) PRIMARY KEY,      
    user_id VARCHAR(36) NOT NULL,      
    title TEXT NOT NULL,
    spec TEXT,
    tags TEXT[] NOT NULL,              
 		about_me TEXT,
    FOREIGN KEY (user_id) REFERENCES users (uuid)
);

