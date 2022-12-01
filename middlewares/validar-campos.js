const { response } = require('express')
const { validationResult } = require('express-validator');

// un midelware es similar a un controlador, pero recibe el next
// que es un callback, si todo se ejecuta correctamente llamamos la funcion
// next, es como si esta se llamara internamente en cada validacion 
// de los checks, se ejecuta por cada check que cumpla

const validarCampos = (req, res = response , next) => {
    // valdacion express-validator
// si no hay ningun error llamamos el next()
// si hay un error hacemos el return y nunca llamamos el next();
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({
        ok: false,
        errors: errors.mapped()
    });
}

next();
}



module.exports ={
    validarCampos
} 