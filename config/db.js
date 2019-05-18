// This is use to connect
const mongoose = require('mongoose')
// bring config package
const config = require('config');
// use a variable db to store the mongo UI
const db = config.get ('mongoURI');

// connect with mongoDB by using mongoose.connect
// use asyn and await instead of the .then and .catch for the promises

const connectDB = async()=>{
    // run mongoose.connect in a try and cat method to find connection errors, when using async awaita is better to use a try and catch
    try {
       await mongoose.connect (db,{
           useNewUrlParser: true,
           useCreateIndex: true
       });
       console.log('mongoDB connect');
       
    } catch (err) {
        console.log(err.message);
        // exit process with failure
        process.exit(1); 
    }
}

module.exports = connectDB;