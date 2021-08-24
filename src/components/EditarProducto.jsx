import React, {useState} from 'react';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {editarProductoAction} from '../actions/productosActions';


function EditarProducto() {
    const history = useHistory();
    const dispatch = useDispatch();
    const productoEditar = useSelector(state => state.productos.productoEditar);
    
    const {nombre, precio} = productoEditar;    

    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        precio: ''
    });

    
    //Llenar el state automaticamente
    useEffect(() => {
        setNuevoProducto(productoEditar);

    }, [productoEditar]);
    
    
     
   
    const submitEditarProducto = e => {
        e.preventDefault();
        dispatch(editarProductoAction(nuevoProducto));
        history.push('/');
    }
    const handleChange = e => {
        setNuevoProducto({
            ...nuevoProducto,
            [e.target.name] : e.target.value
        })
    }
    
    
     return (
        <div>
        <div className= "row justify-content-center">
            <div className= "col-md-8">
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>Editar producto</h2>
                        <form onSubmit={submitEditarProducto}>
                            <div className="form-group">
                                <label>Nombre del Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre producto"
                                    name="nombre"    
                                    defaultValue={nombre}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio del Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio producto"
                                    name="precio"
                                    defaultValue={precio}
                                    onChange={handleChange}
                                
                                />
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Guardar cambios</button>
                        </form>    
                    </div>
                </div>
            </div>

        </div>
    </div>
    )
}

export default EditarProducto
