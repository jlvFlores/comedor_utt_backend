const db = require('../config/config');

const Order = {};


Order.findByStatus = (status) => {

    const sql = `
    SELECT 
        O.id,
        O.id_client,
        O.status,
        O.timestamp,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', P.id,
                'name', P.name,
                'description', P.description,
                'price', P.price,
                'image1', P.image1,
                'quantity', OHP.quantity
            )
        ) AS products,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'user_code', U.user_code
        ) AS client
    FROM 
        orders AS O
    INNER JOIN
        users AS U
    ON
        O.id_client = U.id
    INNER JOIN
        order_has_products AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        products AS P
    ON
        P.id = OHP.id_product
    WHERE
        status = $1
    GROUP BY
        O.id, U.id
    `;

    return db.manyOrNone(sql, status);

}

Order.findByClientAndStatus = (id_client, status) => {

    const sql = `
    SELECT 
        O.id,
        O.id_client,
        O.status,
        O.timestamp,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', P.id,
                'name', P.name,
                'description', P.description,
                'price', P.price,
                'image1', P.image1,
                'quantity', OHP.quantity
            )
        ) AS products,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'user_code', U.user_code
        ) AS client
    FROM 
        orders AS O
    INNER JOIN
        users AS U
    ON
        O.id_client = U.id
    INNER JOIN
        order_has_products AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        products AS P
    ON
        P.id = OHP.id_product
    WHERE
        O.id_client = $1 AND status = $2 
    GROUP BY
        O.id, U.id
    `;

    return db.manyOrNone(sql, [id_client, status]);

}

Order.create = (order) => {
    const sql = `
    INSERT INTO
        orders(
            id_client,
            status,
            timestamp,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5) RETURNING id
    `;

    return db.oneOrNone(sql, [
        order.id_client,
        order.status,
        Date.now(),
        new Date(),
        new Date()
    ]);
}

Order.update = (order) => {
    const sql = `
    UPDATE
        orders
    SET
        id_client = $2,
        status = $3,
        updated_at = $4
    WHERE
        id = $1
    `;
    return db.none(sql, [
        order.id,
        order.id_client,
        order.status,
        new Date()
    ]);
}

Order.delete = (id) => {
    const sql = `
    DELETE FROM 
        orders
    WHERE 
        id = $1
    `;
    return db.oneOrNone(sql, id);
}

module.exports = Order;