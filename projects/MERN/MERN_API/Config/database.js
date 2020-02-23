
let mongoose = require('mongoose');

const server = 'localhost'+':'+27042; // REPLACE WITH YOUR DB SERVER
const database = 'mern-api';      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    console.log("loading database");
    this._connect()
  }
  
_connect() {
  let url= 'mongodb://'+server+'/'+database;
  ;
     mongoose.connect(url, {useUnifiedTopology: true})
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.log('Database connection error')
       })
  }
}

module.exports = new Database()