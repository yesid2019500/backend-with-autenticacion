const express = require('express')
require('dotenv').config()
const { connectDB } = require('./database')
const cors = require('cors')

// SERVIDOR EXPRESS
const app = express()

// mi dabse de datos
connectDB()


// CORS
app.use(cors())

// npm run dev en desarrollo
// npm start en produccion





// procesos que estan corriedno en el ambiente
// console.log(process.env)




// DEMO MOSTRAS HTML directorio publico
// use es un midelware en express
// es decir esta se ejecuta en el momento que alguien hace una
// peticion al servidor
app.use( express.static('public'));

//MIDELWARE DE lectura y parseo del body
// aqui vamos a procesar lo que venga en formato json
app.use(express.json());


// RUTAS
// TODO: autenticacion// crear usuarios, login//renovacion token
// CRUD: eventos

// LOGIN
app.use('/api/auth', require('./routes/auth'));

// EVENTOS DEL CRUD
app.use('/api/events', require('./routes/events'));



// ESCUCHAR PETICIONES
app.listen(process.env.PORT, ()=> {
    console.log(`SERVIDOR EN PUERTO ${ process.env.PORT }`)
})


