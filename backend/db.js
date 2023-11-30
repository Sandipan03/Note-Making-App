const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/iNotebook"

async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }
// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI);
//     console.log("connected");
// }

module.exports = connectToMongo;

