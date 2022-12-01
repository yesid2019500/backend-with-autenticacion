//response para el tipado en caso que se nos borre algo cuando escribimos
// esto nos ayuda con la sintaxis de express
const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req, res=response, next) => {
// es donde lo estamos pidiendo postman x-token header

// vamos a leer los header Y RECIBIR EL TOKEN
const token = req.header('x-token');
// console.log(token)

// vamos a validarlo
// el token debe ser igual a como lo generamos

// si no viene
// sacamos al usuario
if (!token) {
    return res.status(401).json({
        ok:false,
        msg: 'No hay token en la peticion'
    })
}

// si tenemos el token
try {
    
    // const payload
    const { uid, name } = jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    )

    // console.log(payload)
    // estas propiedades vienen de la req del header que estamos estrayendo
    req.uid = uid
    req.name = name

} catch (error) {
  return  res.status(401).json({
        ok:false,
        msg: 'Token no valido'
    })
}



// si todo anda bien llamamos el next aqui
next()
}


module.exports = {
    validarJWT
}