import axios from 'axios';

let myAxios = axios.create({
    baseURL: 'http://49.232.65.122:3000/',
    timeout: 3000,
})

export default myAxios