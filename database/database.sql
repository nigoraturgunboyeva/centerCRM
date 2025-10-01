create TABLE teachers(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(200),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
);
create TABLE student(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(200),
    phone_number VARCHAR(12),
    level VARCHAR (200),

);
create TABLE student_attendance(
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES student(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('presence', 'absence')),
    UNIQUE(student_id, date)
);