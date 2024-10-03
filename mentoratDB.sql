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
    bio TEXT,                                 -- Mentor's biography
    expertise VARCHAR(255),                   -- Mentor's field of expertise
    availability VARCHAR(100),                -- Availability information (e.g., "Weekends")
    rating FLOAT DEFAULT 0,                   -- Average rating based on feedback
    pricePerSession FLOAT,                    -- Price per mentorship session
    googleID VARCHAR(255) UNIQUE,             -- Google ID for Google sign-in
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date when the mentor was created
);

-- Create the Mentoree table
CREATE TABLE Mentoree (
    mentoreeID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for mentoree
    name VARCHAR(100) NOT NULL,                -- Mentoree's name
    email VARCHAR(100) NOT NULL UNIQUE,        -- Mentoree's email (unique)
    goals TEXT,                                -- Mentoree's goals
    preferredExpertise VARCHAR(255),           -- Mentoree's preferred field of expertise
    rating FLOAT DEFAULT 0,                    -- Average rating based on feedback
    subscriptionPlan VARCHAR(100),             -- Mentoree's subscription plan
    paymentDetails VARCHAR(255),               -- Payment information for subscription
    googleID VARCHAR(255) UNIQUE,              -- Google ID for Google sign-in
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date when the mentoree was created
);

-- Create the Session table
CREATE TABLE Session (
    sessionID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for session
    mentorID INT,                            -- Foreign key to Mentor
    mentoreeID INT,                          -- Foreign key to Mentoree
    date DATETIME NOT NULL,                  -- Date and time of the session
    time VARCHAR(100),                       -- Session time
    status VARCHAR(50) DEFAULT 'pending',    -- Status of the session (e.g., pending, completed)
    sessionFee FLOAT,                        -- Fee for the session
    FOREIGN KEY (mentorID) REFERENCES Mentor(mentorID),  -- Relationship to Mentor
    FOREIGN KEY (mentoreeID) REFERENCES Mentoree(mentoreeID), -- Relationship to Mentoree
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date when the session was created
);

-- Create the Request table
CREATE TABLE Request (
    requestID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for request
    mentorID INT,                            -- Foreign key to Mentor
    mentoreeID INT,                          -- Foreign key to Mentoree
    status VARCHAR(50) DEFAULT 'pending',    -- Status of the request (e.g., pending, accepted, declined)
    FOREIGN KEY (mentorID) REFERENCES Mentor(mentorID), -- Relationship to Mentor
    FOREIGN KEY (mentoreeID) REFERENCES Mentoree(mentoreeID), -- Relationship to Mentoree
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date when the request was created
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
INSERT INTO Mentor (name, email, bio, expertise, availability, rating, pricePerSession, googleID)
VALUES
('John Smith', 'john.smith@example.com', 'Experienced software engineer specializing in backend development.', 'Software Engineering', 'Weekdays', 4.5, 120, 'google1234'),
('Jane Doe', 'jane.doe@example.com', 'Marketing professional with a decade of experience.', 'Marketing', 'Weekends', 4.8, 100, 'google5678'),
('Sam Wilson', 'sam.wilson@example.com', 'Data scientist focusing on machine learning and AI.', 'Data Science', 'Weekdays', 4.6, 150, 'google91011'),
('Mia Davis', 'mia.davis@example.com', 'Life coach helping individuals achieve personal and professional goals.', 'Life Coaching', 'Evenings', 4.9, 200, 'google121314'),
('David Lee', 'david.lee@example.com', 'Cybersecurity expert with 15 years of experience.', 'Cybersecurity', 'Weekdays', 4.7, 180, 'google151617');

-- Insert sample data into the Mentoree table
INSERT INTO Mentoree (name, email, goals, preferredExpertise, rating, subscriptionPlan, paymentDetails, googleID)
VALUES
('Alice Brown', 'alice.brown@example.com', 'Looking to improve my data analysis skills.', 'Data Science', 4.2, 'Premium', 'Paid', 'google181920'),
('Michael Scott', 'michael.scott@example.com', 'Enhance leadership and management abilities.', 'Leadership', 4.5, 'Standard', 'Paid', 'google212223'),
('Rachel Green', 'rachel.green@example.com', 'Grow my career in fashion design.', 'Design', 4.4, 'Standard', 'Paid', 'google242526'),
('James Bond', 'james.bond@example.com', 'Improve problem-solving and critical thinking.', 'Problem Solving', 4.3, 'Premium', 'Paid', 'google272829'),
('Monica Geller', 'monica.geller@example.com', 'Seek guidance for starting my own business.', 'Entrepreneurship', 4.7, 'Premium', 'Paid', 'google303132'),
('Chandler Bing', 'chandler.bing@example.com', 'Improve communication skills for corporate success.', 'Communication', 4.6, 'Standard', 'Paid', 'google333435'),
('Phoebe Buffay', 'phoebe.buffay@example.com', 'Develop a successful music career.', 'Music', 4.4, 'Premium', 'Paid', 'google363738'),
('Ross Geller', 'ross.geller@example.com', 'Enhance teaching strategies for university courses.', 'Education', 4.5, 'Premium', 'Paid', 'google394041'),
('Joey Tribbiani', 'joey.tribbiani@example.com', 'Improve acting techniques and career opportunities.', 'Acting', 4.2, 'Standard', 'Paid', 'google424344'),
('Dwight Schrute', 'dwight.schrute@example.com', 'Learn advanced sales techniques.', 'Sales', 4.6, 'Standard', 'Paid', 'google454647');

-- Sample session data (optional)
INSERT INTO Session (mentorID, mentoreeID, date, time, status, sessionFee)
VALUES
(1, 2, '2024-10-15 10:00:00', '10:00 AM', 'completed', 120),
(2, 3, '2024-10-16 14:00:00', '2:00 PM', 'pending', 100),
(3, 4, '2024-10-17 09:00:00', '9:00 AM', 'completed', 150),
(4, 5, '2024-10-18 16:00:00', '4:00 PM', 'completed', 200),
(5, 6, '2024-10-19 11:00:00', '11:00 AM', 'pending', 180);