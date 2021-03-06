import React, {useState} from 'react'
import Spinner from '../components/Spinner';
//Action creators
import { crearNuevoProductoAction } from '../actions/productosActions';
import { useDispatch, useSelector } from 'react-redux';


function NuevoProducto({history}) {
    //Utilizar useDispatch y te crea una función 
    const dispatch = useDispatch();    
    
    //Llama el action de productoAction
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto));     
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState('');

    //Acceder al state con useSelector
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    
    
    const submitNuevoProducto = e => {
        //Cuando el usuario haga
        e.preventDefault();
        //Validar formulario
        if(nombre.trim() === '' || precio <= 0) {
            return 
        }
 
        //Si no hay errores

        //Crear el nuevo producto
        agregarProducto({
            nombre, precio
        });
        history.push('/');
    }
    
    
    return (
        <div>
            <div className= "row justify-content-center">
                <div className= "col-md-8">
                    <div className='card'>
                        <div className='card-body'>
                            <h2 className='text-center mb-4 font-weight-bold'>Agregar nuevo producto</h2>
                            <form
                                onSubmit={submitNuevoProducto}
                            >
                                <div className="form-group">
                                    <label>Nombre del Producto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre producto"
                                        name="nombre"    
                                        value={nombre}
                                        onChange={e => guardarNombre(e.target.value)}
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio del Producto</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Precio producto"
                                        name="precio"
                                        value={precio}
                                        onChange={e => guardarPrecio(Number(e.target.value))}
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                                >Agregar</button>
                            </form>    
                            {cargando ? <div className="spinner-container"><Spinner/></div> : null}
                            {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error, intentelo nuevamente</p> : null}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NuevoProducto
