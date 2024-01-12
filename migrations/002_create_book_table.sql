CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY,
    person_id INTEGER,
    title VARCHAR(255),
    author_id INTEGER,
    genre VARCHAR(100),
    FOREIGN KEY (author_id) REFERENCES author(id)
);

CREATE TABLE IF NOT EXISTS author (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS author_book (
    author_id INTEGER,
    contact_type VARCHAR(20),
    contact_value VARCHAR(255),
    FOREIGN KEY (author_id) REFERENCES author(id),
    PRIMARY KEY (author_id, contact_type)
);

CREATE TABLE IF NOT EXISTS book_review (
    book_id INTEGER,
    rating INTEGER,
    review_text TEXT,
    FOREIGN KEY (book_id) REFERENCES book(id),
    PRIMARY KEY (book_id)
);
