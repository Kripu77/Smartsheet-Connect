const {connectToDb, getDb}= require('./mongocon')

let db;
connectToDb(()=>{
db = getDb();
}) 
connectToDb();


console.log(db);