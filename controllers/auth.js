// encriptar claves
const bcrypt = require('bcryptjs')
// model
const Usuario = require('../models/Usuario')
// lo requerimos para no perder la ayuda de js
// response es para no perder la informacion en caso que borremos algo de la sintaxis sin querer o algo asi en el response
const { response} = require('express');

// JWT
const { generarJWT } = require('../helpers/jwt')

// const { validationResult  } = require('express-validator');

// vamos a manejar la logica aca
// req: solicitud del usuario
// res: respondemos al usuario

const crearUsuario = async (req, res = response )=> {
    // console.log(req.body);
    // estamos obteniendo la informacion
    //del req
    const { name, email, password } = req.body
    // le pasamos la informacion
    try {

        // vamos a poner una condicion de validacion
        // sea igual al imail que recibimos
        let usuario = await Usuario.findOne({ email })
        console.log(usuario)
        // si existe
        if (usuario) {
           return res.status(404).json({
               ok: false,
               msg:'Un usuario existe con ese correo'
           })
        }

         usuario = new Usuario(req.body)

        // encriptar passowrd
            const salt = bcrypt.genSaltSync()
            usuario.password = bcrypt.hashSync(password, salt)

        // gurdamos 
       await usuario.save();
        // generar token JWT
        const token = await generarJWT(usuario.id, usuario.name)

    // validacion simple 400 del error
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
           
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

};


const loginUsuario = async (req,res = response)=> {

const { email, password } = req.body;

try {
// vamos a validar si hay un usuario con ese email
const usuario = await Usuario.findOne({ email })
        // console.log(usuario)
        // si no existe
        if (!usuario) {
           return res.status(404).json({
               ok: false,
               msg:'El usuario no existe con ese email'
           })
        }

// confirmar los passwords
// recibe el password del cliente y lo comparo con el que tenemos en la db
// devuelve un tru o false
const validPassword = bcrypt.compareSync(password, usuario.password)
// si no es valido
        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'password incorrecto'
            })
        }
    // sin son iguales vamos a generar el jwt
    // generamos el JWT
      const token = await generarJWT(usuario.id, usuario.name)
    
    res.json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token
    })
    

} catch (error) {

    console.log(error)
    res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
    })
    
}


    // res.json({
    //     ok: true,
    //     msg: 'login',
    //     email, 
    //     password 
    // })
}


// vamos a revalidar el token y darle una nueva vigencia al token por ejemlo de 2h
// y estar prolongandolo 2h mientras el usuario esta activo
// en pocas palabras nos va servir para ver si el usuario es valido y mantenrlo
// logeado
const revalidarToken = async (req,res = response)=> {

    const { uid, name } = req

// generar un nuevo jwt y retornarlo en esta petion
     // generamos el JWT
const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}