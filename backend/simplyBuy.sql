DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS wishlist_items;
DROP TABLE IF EXISTS purchase_history;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR (100) NOT NULL,
    username VARCHAR (50) NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE wishlist_items(
    wishlist_itemID SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) ,
    category TEXT NOT NULL,
    user_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE purchase_history(
    purchase_id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) ,
    category TEXT NOT NULL,
    date_purchased DATE NOT NULL,
    user_id INTEGER REFERENCES users(user_id)
);


