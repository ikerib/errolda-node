var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pasaia',
    database : 'errolda'
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

        res.json(results);
        connection.end();
    });
});



module.exports = router;
