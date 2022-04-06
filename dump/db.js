const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = path.resolve(__dirname, 'Database.db');

const sqlite = new sqlite3.Database(db, sqlite3.OPEN_READWRITE, (error) => {

    if (error) {
        throw error;
    }

    console.log('Sqlite3');
});

module.exports = sqlite;