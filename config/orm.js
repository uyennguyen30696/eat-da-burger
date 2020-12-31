// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function to print an array of question marks for vals.length
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    };

    return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
    var arr = [];

    for (var key in obj) {
        var value = obj[key];

        // Check to skip hidden properties
        if (Object.hasOwnProperty.call(obj, key)) {
            // If string with spaces, add quotations (Big egg and cheese burger => 'Big egg and cheese burger')
            if (typeof value === "string" && value.indexOf(" ") >=0) {
                value = "'" + value + "'";
            };
            // Ex: {devoured: true} => ["devoured=true"]
            arr.push(key + "=" + value);
        };
    };
    // translate array of strings to a single comma-separated string
    return arr.toString();
};


var orm = {
    selectAll: function (table, cb) {
        var query = "SELECT * FROM " + table + ";";
        connection.query(query, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    create: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    update: function(table, objColVals, condition, cb) {
        var queryString = " UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    delete: function(table, condition, cb) {
        var queryString = " DELETE FROM " + table;

        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;
