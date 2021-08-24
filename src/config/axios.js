 import axios from 'axios';
 //Cliente axios para hacer peticiones
 
 const clienteAxios = axios.create({
    baseURL: 'http://localhost:4000/'

 });
 export default clienteAxios