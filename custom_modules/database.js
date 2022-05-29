const knex = require('knex')({
    client: 'pg',
    debug: true,
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }
});


class Database{
    static select(filter){

    }
    static update(filter){

    }
    static delete(filter){
        
    }
}

module.exports = knex;