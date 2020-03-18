import axios from 'axios';
import Vue from 'vue'
const service = axios.create({

    baseURL: 'http://120.78.153.174',
    timeout: 5000
});



service.interceptors.request.use(config => {
    //loadding
    let token = localStorage.getItem('KK-Access-Token');
    // let token = '123456'
    if (token) {
    
      config.headers['Authorization'] = token
  
    } else {
      // router.push('/login')
    }
  
  
    return config
  }, error => {
    return Promise.reject(error)
})

// service.interceptors.request.use(
//     config => {
//         return config;
//     },
//     error => {
//         console.log(error);
//         return Promise.reject();
//     }
// );

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
