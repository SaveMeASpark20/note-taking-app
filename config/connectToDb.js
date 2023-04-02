
//importing dependencies
const mongoose = require('mongoose')


//function to connect to database
async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to database');
    }catch(err) {
        console.log(err);
    }
}

module.exports = connectToDb;