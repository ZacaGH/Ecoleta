const db = require('../config/db')

module.exports = {
    savePoint(data, callback) {

        db.query(`
        CREATE TABLE IF NOT EXISTS places (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT NOT NULL,
        address TEXT NOT NULL,
        address2 TEXT NOT NULL,
        state TEXT NOT NULL,
        city TEXT NOT NULL,
        items TEXT NOT NULL
    );
`)

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
    `

    const values = [
        data.image,
        data.name,
        data.address,
        data.address2,
        data.state,
        data.city,
        data.items,
    ]

    function afterInsertData(err) {
        if(err) throw `Erro no cadastro ${err}`

        callback(true)
    }

    db.query(query, values, afterInsertData)
    },
    search(search, callback) {
        
        db.query(`SELECT * FROM places WHERE city ILIKE $1`, [`%${search}%`], (err, results) => {
            if(err) return console.log(err)

            callback(results.rows)
        })
    }
}