// funcion para para los tokens

const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {
// devolvemos una promesa
 return new Promise( (resolve, reject)=> {
// aqui vamos a generar el jwt
    const payload = { uid, name }
    // generar token
    // el segundo parametro es una palabra clave para que el bakcken sepa si es el
    // token que genero o no
    // el objecto es para poner la duracion del token, podemos poner el time que de
    // deseemos
    jwt.sign(payload, process.env.SECRET_JWT_SEED,{
        expiresIn: '2h'
    }, (err, token)=> {
        // si hay un error
        if (err) {
            console.log(err)
            reject('No se pudo generar el token')
        }

        // si todo fue bien
        resolve(token)
    })

    })

}


module.exports = { 
    generarJWT
}