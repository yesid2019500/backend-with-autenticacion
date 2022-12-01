// AQUI VA EL CRUD

/*RUTA '/api/events' */

const { Router } = require('express')
const router = Router()
const { getEventos, createEvento, actualizarEventos, eliminarEvento} = 
require('../controllers/events')
const { check } =  require('express-validator')
 const { validarCampos } = require('../middlewares/validar-campos')
// vamos a validar las rutas con JWT
const { validarJWT } = require('../middlewares/validar-jwt')
const { isDate } = require('../helpers/isDate')

// asi esta validando todas las rutas
// para no tener que ponerle la funcion a cada ruta

router.use( validarJWT )
 

router.get('/', getEventos)

// vamos a hacer otras validacion con express-validator
// validamos que vaya el title, para la fecha express
// validator no tiene funsiones para validar
// pero en el custom le podemos enviar una funcion para validar
// ese campo
router.post('/',
[
    check('title','El titulo es oligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatori').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatori').custom(isDate),

   validarCampos
],

createEvento
 
 );

router.put('/:id', actualizarEventos)

router.delete('/:id', eliminarEvento)


module.exports = router;