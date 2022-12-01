const { response} =  require('express')
// el modelo
const Evento = require('../models/Evento')

// controladores de los eventos

const getEventos = async (req,res = response) => {
    // vamos a mostrar la lista de todos los eventos
    // populate es para rellenar, este nos va mostrar toda la infor
    // macion del usuario, podemos definir que vamos a pintar en 
    // pantalla del usuario, como el nombre, correo, id, etc
    // si quisieramos el password o algo mas seria asi
    // populate("user","name password")
    const eventos = await Evento.find()
                .populate("user","name")

   

    res.json({
        ok:true,
        eventos,
       
    })
   
}


const createEvento = async (req,res = response) => {

      // verificar que tenga el evento
      console.log(req.body)
    // una instancia con los datos de la req.body
     const evento = new Evento(req.body)

     try {

        // el id del usuario
        evento.user = req.uid
        console.log(req.uid)

        // vamos a grabar la informacion
     const eventoGuardado =  await evento.save()
    // si se grvo exitosamente
        res.json({
            ok: true,
            evento:eventoGuardado
        })
         
     } catch (error) {
       res.status(500).json({
           ok:false,
           msg:"Hable con el administrador"
       })  
     }

}


const actualizarEventos = async (req,res = response) => {

// id usuario 
const uid = req.uid;
// vamos a tomar el id que viene en el url
const eventoId = req.params.id

// vamos a verificar si el id esta en la base de datos
try {

    const evento = await Evento.findById(eventoId)

    // si no existe
    if (!evento) {
       return res.status(404).json({
            ok:false,
            msg:"Evento no existe con ese ID"
        })
    }

    // si no es la misma persona que creo el evento
    // 401 es el codigo de error cuando alguie no esta 
    // autorizado
    if (evento.user.toString() !== uid) {
        return res.status(401).json({
            ok:false,
            msg:"No tiene privilegio de editar este evento"
        })  
    }

    // si es la misma lo dejamos editar
    // le agregamos el id
    const nuevoEvento = {
        ...req.body,
        user:uid
    }

// actualizamos
// busca un elemento por el id y actualizalo
// recibe el id del evento que quiero actualizar el segundo parametro
// la nueva data que quiero guardar
// el tercer argumento, son las opciones para que se acualiza de una en la vista
const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new:true})
// si todo salio ok
res.json({
    ok:true,
    evento:eventoActualizado
})
    
} catch (error) {
    console.log(error)
    res.status(500).json({
        ok:false,
        msg: "Hable con el administrador"
    })
}

}


const eliminarEvento = async (req,res = response) => {


    // id usuario 
const uid = req.uid;
// vamos a tomar el id que viene en el url
const eventoId = req.params.id

// vamos a verificar si el id esta en la base de datos
try {

    const evento = await Evento.findById(eventoId)

    // si no existe
    if (!evento) {
      return res.status(404).json({
            ok:false,
            msg:"Evento no existe con ese ID"
        })
    }

    // si no es la misma persona que creo el evento
    // 401 es el codigo de error cuando alguie no esta 
    // autorizado
    if (evento.user.toString() !== uid) {
        return res.status(401).json({
            ok:false,
            msg:"No tiene privilegio de eliminar este evento"
        })  
    }


 await Evento.findByIdAndDelete(eventoId)
// si todo salio ok
res.json({
    ok:true,
})
    
} catch (error) {
    console.log(error)
    res.status(500).json({
        ok:false,
        msg: "Hable con el administrador"
    })
}


}




module.exports = {
    getEventos,
    createEvento,
    actualizarEventos,
    eliminarEvento
}