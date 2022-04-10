const path = require('path');
const con = require('./database/db'); // Mysql

const sqlite3 = require('./dump/db');

const login = (query, cb) => {
    const { email, password } = query;

    con.query(`SELECT * FROM login WHERE email = ? and password = ?`, [email, password], (error, result) => {
        if (error) {
            throw error;
        }
        
        cb(result);
    });
}

const store = (file) => {

    if (file != undefined) {
            // filename
        function stringEscape(s) {
            return s ? s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/\t/g,'\\t').replace(/\v/g,'\\v').replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/[\x00-\x1F\x80-\x9F]/g,hex) : s;
            function hex(c) { var v = '0'+c.charCodeAt(0).toString(16); return '\\x'+v.substr(v.length-2); }
        }

        const file_name = path.basename(stringEscape(file));

        sqlite3.run('INSERT INTO filePath (file_name, date, path) values (?, ?, ?)', [file_name, new Date().toLocaleDateString('pt-br'), file], (error) => {
            if (error) {
                throw error;
            }
        });
    }  
}

const getAll = () => {
    
    sqlite3.each('SELECT * FROM filePath', [], (error, result) => {
        if (error) {
            throw error;
        }

        return result
    });   
}

module.exports = { login, store, getAll };