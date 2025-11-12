const mongoose = require('mongoose');

const connectDB = async () => {  
    await mongoose.connect(
      "mongodb+srv://piyushpatil1741_db_user:ye9iedd8dNnbrqI3@devtinder.4cef29n.mongodb.net/DevTinder?retryWrites=true&w=majority&appName=DevTinder/devTinder"
    );
};

module.exports = connectDB;

