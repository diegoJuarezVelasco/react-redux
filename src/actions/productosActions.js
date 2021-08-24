import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    //PRODUCTO_EDITADO_ERROR,
    //PRODUCTO_EDITADO_EXITO
} from '../types'; 

//Importamos cliente axios
import clienteAxios from '../config/axios';

//Importamos sweetAlert
import Swal from 'sweetalert2';
//import EditarProducto from '../components/EditarProducto';


export const crearNuevoProductoAction = (producto) => {
    return async (dispatch) => {
        dispatch(agregarProducto());
        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto);

            //Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto))
            //Alerta
            Swal.fire('Correcto', 'El producto se agregó correctamente', 'success')


        } catch(error) {
            console.log(`An error ocurred from ProductosActions, ${error}`);
            //Si hay un error cambiar el state
            dispatch(agregarProductoError(true))
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: "Hubo un error, intentelo nuevamente"
            })
        }
    } 
}
//action creator 
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
})
//Si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
        type: AGREGAR_PRODUCTO_EXITO,
        payload: producto
})
//Si ocurrio un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado

})
//Función que descarga los productos de la base de datos
export function obtenerProductosAction () {
    return async (dispatch) => {
        dispatch(descargarProductos());
        try {
            const respuesta = await clienteAxios.get('/productos');
            // console.log(respuesta.data);
            dispatch(descargaProductosExitosa(respuesta.data));

        } catch(error) {
            console.log(`An Error ocurred from productosActions, ${error}`);
            dispatch(descargarProductosError());
        }
    
    
    }
}
const descargarProductos = () => {
    return {
        type: COMENZAR_DESCARGA_PRODUCTOS,
        payload: true
    }
}
const descargaProductosExitosa = productos => {
    return {
        type: DESCARGA_PRODUCTOS_EXITO,
        payload: productos
    }
}
const descargarProductosError = () => {
    return {
        type: DESCARGA_PRODUCTOS_ERROR,
        payload: true
    }    
}
//Selecciona y elimina el producto
export const borrarProductoAction = (id) => {  
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        //console.log(id);
        try {
            const resultado = await clienteAxios.delete(`/productos/${id}`);
            console.log(resultado);
            dispatch(eliminarProductoExito())
            
            //Si se elimina correctamente, se depliega la alerta
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
        } catch(error) {
            console.log(`An error ocurred from productosAction, ${error}`);
            dispatch(eliminarProductoError());

        }
    }

}
const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id

});
const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    

})
const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})
//Colocar producto en edición
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))

    }
}
const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto

})

//Edita un registro en la api y state
export function editarProductoAction (producto) {
    return async (dispatch) => {
        dispatch(editarProducto(producto));
        try{
            const resultado = await clienteAxios.put(`/productos/${producto.id}`, producto)
            console.log(resultado);
            
        } catch(error){
            console.log(`An error ocurred from productos action, editarProductoAction. ${error}`);
        }

    }
}
const editarProducto = (producto) => {
    return {
        type: COMENZAR_EDICION_PRODUCTO,
        payload: producto
    }

}
