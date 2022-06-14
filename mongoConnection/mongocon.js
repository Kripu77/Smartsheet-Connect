const { MongoClient } = require("mongodb");

require("dotenv").config();
const uri = process.env.MONGODB_URI;
let dbConnection;

//inital connection to db
function connectToDb(cb) {
  MongoClient.connect(uri)
    .then((client) => {
      dbConnection = client.db();
      return cb();
    })
    .catch((err) => {
      console.log(err);
      return cb(err);
    });
}

//reterive data from db

function getDb() {

    return dbConnection;
}

module.exports = {connectToDb, getDb};
