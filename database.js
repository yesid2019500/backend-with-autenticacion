const mongoose = require('mongoose')
require('dotenv').config()

// usuario:yessi
// clave:yessiangulo123

const connectDB = async () => {
    try {
        
   await mongoose.connect(process.env.DATABASE_URL)

   console.log('DB CONNECTED')

    } catch (error) {
        console.log('THE ERROR IS', error)
        throw new Error("Error al inicializar la base de datos")
    }
};


module.exports = {
    connectDB
}