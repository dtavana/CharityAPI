const pgp = require('pg-promise')();
const db = pgp(process.env.PG_CONNECTION_STRING);

function connect() {
    db.connect()
        .then(obj=>{
            console.log('Postgres Connected');
            obj.done();
        })
        .catch(err=>{
            console.log('Postgres Error Connecting');
            console.log(err);
        });
    init(db).then();
    return db;
}

async function init(db) {
    await db.none('CREATE TABLE IF NOT EXISTS donations(id SERIAL PRIMARY KEY, userid SMALLINT, amount SMALLINT, charity VARCHAR, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP);');
    await db.none('CREATE TABLE IF NOT EXISTS users(email VARCHAR PRIMARY KEY, userid SERIAL);');
    await db.none('CREATE TABLE IF NOT EXISTS tickets(ticketid SERIAL PRIMARY KEY, userid SMALLINT, charity VARCHAR);');
}

module.exports = connect();
