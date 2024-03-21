-- Add the password column to the Users table
ALTER TABLE Users
ADD COLUMN password VARCHAR(255) NOT NULL;
