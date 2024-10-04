-- Create the database
CREATE DATABASE IF NOT EXISTS mentorship_platform;

-- Use the newly created database
USE mentorship_platform;

-- Drop existing tables if they exist (for testing purposes)
DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS Session;
DROP TABLE IF EXISTS Request;
DROP TABLE IF EXISTS Mentoree;
DROP TABLE IF EXISTS Mentor;

-- Create the Mentor table
CREATE TABLE Mentor (
                        mentorID INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for mentor
                        name VARCHAR(100) NOT NULL,               -- Mentor's name
                        email VARCHAR(100) NOT NULL UNIQUE,       -- Mentor's email (unique)
                        password VARCHAR(255) NOT NULL,           -- Mentor's password
                        expertise VARCHAR(255) NOT NULL           -- Mentor's field of expertise
);

-- Create the Mentoree table
CREATE TABLE Mentoree (
                          mentoreeID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for mentoree
                          name VARCHAR(100) NOT NULL,                -- Mentoree's name
                          email VARCHAR(100) NOT NULL UNIQUE,        -- Mentoree's email (unique)
                          password VARCHAR(255) NOT NULL             -- Mentoree's password
);

-- Create the Session table
CREATE TABLE Session (
                         sessionID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for session
                         mentorID INT,                            -- Foreign key to Mentor
                         mentoreeID INT,                          -- Foreign key to Mentoree
                         date DATETIME NOT NULL,                  -- Date and time of the session
                         status VARCHAR(50) DEFAULT 'pending',    -- Status of the session (e.g., pending, completed)
                         sessionFee FLOAT,                        -- Fee for the session
                         FOREIGN KEY (mentorID) REFERENCES Mentor(mentorID),  -- Relationship to Mentor
                         FOREIGN KEY (mentoreeID) REFERENCES Mentoree(mentoreeID) -- Relationship to Mentoree
);

-- Create the Request table
CREATE TABLE Request (
                         requestID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for request
                         mentorID INT,                            -- Foreign key to Mentor
                         mentoreeID INT,                          -- Foreign key to Mentoree
                         status VARCHAR(50) DEFAULT 'pending',    -- Status of the request (e.g., pending, accepted, declined)
                         FOREIGN KEY (mentorID) REFERENCES Mentor(mentorID), -- Relationship to Mentor
                         FOREIGN KEY (mentoreeID) REFERENCES Mentoree(mentoreeID) -- Relationship to Mentoree
);

-- Create the Payment table
CREATE TABLE Payment (
                         paymentID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for payment
                         mentoreeID INT,                          -- Foreign key to Mentoree
                         mentorID INT,                            -- Foreign key to Mentor
                         amount FLOAT NOT NULL,                   -- Payment amount
                         date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date when the payment was made
                         status VARCHAR(50) DEFAULT 'completed',  -- Status of the payment (e.g., completed)
                         FOREIGN KEY (mentoreeID) REFERENCES Mentoree(mentoreeID), -- Relationship to Mentoree
                         FOREIGN KEY (mentorID) REFERENCES Mentor(mentorID) -- Relationship to Mentor
);

-- Insert sample data into the Mentor table
INSERT INTO Mentor (name, email, password, expertise)
VALUES
    ('John Doe', 'john@mentor.com', 'password123', 'Software Engineering'),
    ('Jane Smith', 'jane@mentor.com', 'password123', 'Marketing'),
    ('Sam Wilson', 'sam@mentor.com', 'password123', 'Data Science'),
    ('Mia Davis', 'mia@mentor.com', 'password123', 'Life Coaching'),
    ('David Lee', 'david@mentor.com', 'password123', 'Cybersecurity');

-- Insert sample data into the Mentoree table
INSERT INTO Mentoree (name, email, password)
VALUES
    ('Alice Brown', 'alice@mentoree.com', 'password123'),
    ('Michael Scott', 'michael@mentoree.com', 'password123'),
    ('Rachel Green', 'rachel@mentoree.com', 'password123'),
    ('James Bond', 'james@mentoree.com', 'password123'),
    ('Monica Geller', 'monica@mentoree.com', 'password123');

-- Sample session data
INSERT INTO Session (mentorID, mentoreeID, date, status, sessionFee)
VALUES
    (1, 2, '2024-10-15 10:00:00', 'completed', 120),
    (2, 3, '2024-10-16 14:00:00', 'pending', 100),
    (3, 4, '2024-10-17 09:00:00', 'completed', 150),
    (4, 5, '2024-10-18 16:00:00', 'completed', 200),
    (5, 1, '2024-10-19 11:00:00', 'pending', 180);

-- Sample request data
INSERT INTO Request (mentorID, mentoreeID, status)
VALUES
    (1, 2, 'accepted'),
    (2, 3, 'pending'),
    (3, 4, 'declined'),
    (4, 5, 'accepted'),
    (5, 1, 'pending');

-- Sample payment data
INSERT INTO Payment (mentoreeID, mentorID, amount, status)
VALUES
    (2, 1, 120, 'completed'),
    (3, 2, 100, 'completed'),
    (4, 3, 150, 'completed'),
    (5, 4, 200, 'completed'),
    (1, 5, 180, 'pending');