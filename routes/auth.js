/*
RUTAS DE USUARIO
localhost:4000/api/auth/new
*/
const { Router } = require('express');
// check valida un campo en particular
const { check } = require('express-validator')
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } 
= require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos');

// ENVIAR INFORMACION/
// el array es una collections de midelwares
router.post('/new',
  [  //midelware
     check('name', 'El nombre es obligatorio').not().isEmpty(),
     check('email', 'El email es obligatorio').isEmail(),
     check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
     validarCampos
     
 ], 

 crearUsuario)

// los midelware se ejecutan en orden, es decir 
// ejecuta algo y despues lo otro, entonces si algo no se cumple
// podemos lanzar un error o algo para detener el proceso
router.post('/', 
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    validarCampos
],

loginUsuario);


router.get('/renew', validarJWT ,revalidarToken);    

module.exports = router;