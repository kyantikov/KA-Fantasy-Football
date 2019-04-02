const mysql = require('mysql')

// Create connection 
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'ffapp'
});

// connect to mysql db 
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("MySQL Connected!")
})