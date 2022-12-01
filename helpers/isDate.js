// validar fecha
const moment = require('moment')

const isDate = ( value ) => {
    // console.log(value)

        if (!value) {
            return false;   
        }

        const fecha = moment(value)
        // si la fecha es valida
            if (fecha.isValid()) {

                return true
            }else{
                return false;
            }
}


module.exports = {
    isDate
} 