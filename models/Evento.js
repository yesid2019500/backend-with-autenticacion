const { Schema, model } = require('mongoose')

// nutros squema
const EventSchema = Schema({
   title:{type:String, required:true},
   notes:{type:String},
   start:{type:Date, required:true},
   end:{type:Date, required:true},
//    el usuario que creo esta nota
// ref es una referencia para mongo
    user: {
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

// ESTO NO ES OBLIGATIO HACERLO, SIN ESTO TODO FUNCIONA NORMAL
// es solo para quitar esa V_ de control de versiones
// u otras cosas que quieran que se quiten por defecto
// aqui tenemos acceo a todo lo que enviamos en el modelo

EventSchema.method('toJSON', function(){
   const { __v,_id,...object } = this.toObject();
   object.id = _id;
   return object
})


module.exports = model('Evento', EventSchema)