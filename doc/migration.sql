CREATE TABLE categories (
    PRIMARY KEY (id),
    id SERIAL,
    name VARCHAR(255)
);

CREATE TABLE expenses (
    PRIMARY KEY (id),
    id SERIAL,
    year INT,
    month INT,
    amount INT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
