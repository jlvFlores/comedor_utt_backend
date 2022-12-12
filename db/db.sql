DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	route VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles (
	name,
	image,
	route,
	created_at,
	updated_at
)
VALUES(
	'CLIENTE',
	'https://firebasestorage.googleapis.com/v0/b/comedor-utt.appspot.com/o/client.png?alt=media&token=b3389a4b-8cf0-4c0f-a410-61bb68afdeaa',
	'client/products/list',
	'2022-11-01',
	'2022-11-01'
);


INSERT INTO roles (
	name,
	image,
	route,
	created_at,
	updated_at
)
VALUES(
	'COMEDOR',
	'https://firebasestorage.googleapis.com/v0/b/comedor-utt.appspot.com/o/admin.png?alt=media&token=2de3f8d0-8c62-4629-b2e3-020dcbfdd9de',
	'diner/orders/list',
	'2022-11-01',
	'2022-11-01'
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	user_code VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	notification_token VARCHAR(255) NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

INSERT INTO users (
	id,
	user_code,
	name,
	password,
	notification_token,
	session_token,
	created_at,
	updated_at
)
VALUES(
	'1',
	'20192ITID042',
	'Jose Luis Vazquez Flores',
	'e10adc3949ba59abbe56e057f20f883e',
	'',
	'',
	'2022-12-07 7:14:29',
	'2022-12-07 7:14:29'
);
-- Change user_code and name to that of the main administer
-- 123456 encrypted is e10adc3949ba59abbe56e057f20f883e

DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_rol)
);

INSERT INTO user_has_roles (
	id_user,
	id_rol,
	created_at,
	updated_at
)
VALUES(
	1,
	1,
	'2022-12-07 7:14:29',
	'2022-12-07 7:14:29'
);

INSERT INTO user_has_roles (
	id_user,
	id_rol,
	created_at,
	updated_at
)
VALUES(
	1,
	2,
	'2022-12-07 7:14:29',
	'2022-12-07 7:14:29'
);

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	price DECIMAL DEFAULT 0,
	image1 VARCHAR(255) NULL,
	id_category BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders(
	id BIGSERIAL PRIMARY KEY,
	id_client BIGINT NOT NULL,
	status VARCHAR(90) NOT NULL,
	timestamp BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_client) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS order_has_products CASCADE;
CREATE TABLE order_has_products(
	id_order BIGINT NOT NULL,
	id_product BIGINT NOT NULL,
	quantity BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	PRIMARY KEY(id_order, id_product),
	FOREIGN KEY(id_order) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_product) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);
