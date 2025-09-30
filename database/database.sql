create TABLE teachers(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(200),
    email VARCHAR(100),
    password VARCHAR(100),
);
create TABLE student(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(200),
    phone_number VARCHAR(12),
    stage VARCHAR (200),
    ranking_in_class VARCHAR(100),
    student_id INTEGER,
    FOREIGN KEY (student_id) REFERENCES teachers(id)
);