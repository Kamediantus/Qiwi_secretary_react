var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "fcadmin",
    password: "fcadmin"
});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE qiwi_secretary", function (err, result) {
//         if (err) throw err;
//         console.log("Database created");
//     });
// });

function createDB() {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("CREATE DATABASE qiwi_secretary", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });
    });
}

export const createDatabase = ()=>{
    createDB();
}