import React,{useEffect} from 'react';
//Redux
import {useSelector, useDispatch} from 'react-redux';
// importamos el action
import {obtenerProductosAction} from '../actions/productosActions';
import Producto from './Producto';
import SpinnerCargando from './SpinnerMini';

function Productos() {
    const dispatch = useDispatch();
    const productos = useSelector(state => state.productos.productos);
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading);

    const cargarProductos = () => {
        dispatch(obtenerProductosAction()); 
    }
    
    useEffect(() => {
        
        //Consultar la API
        cargarProductos();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div>
            <h2 className="text-center my-5"> Listado de Productos</h2>
            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error, intentelo nuevamente</p> : null}
            
            
            <table className= "table table-striped"> 
                <thead className='bg-primary table-dark'>
                    <tr>
                        <th scope='col'>Nombre</th>
                        <th scope='col'>Precio</th>
                        <th scope='col'>Acciones</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {productos.length === 0 && cargando === false? <p className="m-3">No hay productos</p> : (
                        productos.map(producto => (
                            <Producto
                                key={producto.id}
                                producto={producto}    
                            />
                        ))
                    )}
                </tbody>
            </table>
            {cargando ? <SpinnerCargando/> : null}

        </div>
    )
}

export default Productos
