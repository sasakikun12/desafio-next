CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	token VARCHAR NOT NULL
);
	
CREATE TABLE sales (
	id SERIAL PRIMARY KEY,
	productId INT NOT NULL,
	userId INT NOT NULL,
	quantity INT NOT NULL,
	value FLOAT NOT NULL,
	saleDate DATE,
	FOREIGN KEY(productId)
	REFERENCES products(id),
	FOREIGN KEY(userId)
	REFERENCES users(id)
);

CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	userId INT NOT NULL,
	name VARCHAR NOT NULL,
	description VARCHAR,
	value FLOAT NOT NULL,
	quantity INT NOT NULL,
	link VARCHAR,
	type VARCHAR NOT NULL,
	CONSTRAINT unique_product_name
	UNIQUE(name),
	FOREIGN KEY(userId)
	REFERENCES users(id)
);


CREATE TABLE productUpdates (
	id SERIAL PRIMARY KEY,
	productId INT NOT NULL,
	userId INT NOT NULL,
	oldValue FLOAT NOT NULL,
	newValue FLOAT NOT NULL,
	createdAt DATE DEFAULT CURRENT_DATE,
	FOREIGN KEY(productId)
	REFERENCES products(id),
	FOREIGN KEY(userId)
	REFERENCES users(id)
);


CREATE TABLE productDiscounts (
	id SERIAL PRIMARY KEY,
	productId INT NOT NULL,
	userId INT NOT NULL,
	value FLOAT NOT NULL,
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	startTime TIME NOT NULL,
	endTime TIME NOT NULL,
	FOREIGN KEY(productId)
	REFERENCES products(id),
	FOREIGN KEY(userId)
	REFERENCES users(id)
);