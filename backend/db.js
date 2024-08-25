/* Handles DB connection based on Node.ENV variable*/
const {Client} = require('pg');
let DB_URI;
if(process.env.Node_ENV === "test"){
    DB_URI = "postgresql:///simplybuy_test"
}

else{
    DB_URI = "postgresql:///simplybuy_test"
}

let db = new Client({connectionString: DB_URI})
db.connect();

module.exports = db;
