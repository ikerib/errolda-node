var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('dotenv').config();



var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database : process.env.DB_NAME
});

connection.connect();

router.get('/nan/:id', function(req, res, next) {
    var nan = req.params.id;

    var sql = "SELECT * from biztanleak WHERE `DNI CIF` LIKE '%" + nan + "%'";
    connection.query(sql, function(err, results, fields) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            return res.json({ errors: ["Could not retrieve photo"] });
        }

        // No results returned mean the object is not found
        if (results.length === 0) {
            // We are able to set the HTTP status code on the res object
            res.statusCode = 404;
            return res.json({ errors: ["Ez da topatu"] });
        }

        res.statusCode= 200;
        res.json(results);

    });
});



module.exports = router;
