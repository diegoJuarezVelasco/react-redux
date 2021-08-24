import React from 'react'
import { useHistory} from 'react-router-dom';

//Redux
import {useDispatch} from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productosActions'

//SweetAlert2
import Swal from 'sweetalert2';

function Producto ({producto}) {
    const {nombre, precio, id} = producto;
    const dispatch = useDispatch();
    
    //Confirmar history para redirección
    const history = useHistory();

    //Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {
        //Preguntar al usuario
        Swal.fire({
            title: '¿Estás seguro de eliminar este producto?',
            text: "Esto no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrarlo',
            cancelButtonText: 'Cancelar'
          }).then((result) => {   
            if (result.isConfirmed) {
                dispatch(borrarProductoAction(id)); 
            }
          })        
    }
    //Función que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.id}`);


    }

    return (
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
               <button
                    type="button"
                    onClick={() => redireccionarEdicion(producto)}
                    className="btn btn-primary mr-2"
               >Editar</button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >Eliminar</button>    
            </td>
        </tr>
    
    )
}

export default Producto
