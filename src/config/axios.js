 import axios from 'axios';
 //Cliente axios para hacer peticiones
 
 const clienteAxios = axios.create({
    baseURL: 'http://diegojvtest.ddns.net/productos'

 });
 export default clienteAxios