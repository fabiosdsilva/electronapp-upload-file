const db = require('mysql');

const con = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'electronapp'
});

module.exports = con;