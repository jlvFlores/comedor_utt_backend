const db = require('../config/config');

const Product = {};

Product.findByCategory = (id_category) => {
    const sql = `
    SELECT
        P.id,
        P.name,
        P.description,
        P.price,
        P.image1,
        P.id_category
    FROM
        products AS P
    INNER JOIN
        categories AS C
    ON
        P.id_category = C.id
    WHERE
        C.id = $1
    `;

    return db.manyOrNone(sql, id_category);
}

Product.findByCategoryAndProductName = (id_category, product_name) => {
    const sql = `
    SELECT
        P.id,
        P.name,
        P.description,
        P.price,
        P.image1,
        P.id_category
    FROM
        products AS P
    INNER JOIN
        categories AS C
    ON
        P.id_category = C.id
    WHERE
        C.id = $1 AND p.name ILIKE $2
    `;

    return db.manyOrNone(sql, [id_category, `%${product_name}%`]);
}


Product.create = (product) => {
    const sql = `
    INSERT INTO
        products(
            name,
            description,
            price,
            image1,
            id_category,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `;
    return db.oneOrNone(sql, [
        product.name,
        product.description,
        product.price,
        product.image1,
        product.id_category,
        new Date(),
        new Date()
    ]);
}

Product.update = (product) => {
    const sql = `
    UPDATE
        products
    SET
        name = $2,
        description = $3,
        price = $4,
        image1 = $5,
        id_category = $6,
        updated_at = $7
    WHERE
        id = $1
    `;
    return db.none(sql, [
        product.id,
        product.name,
        product.description,
        product.price,
        product.image1,
        product.id_category,
        new Date()
    ]);
}


module.exports = Product;