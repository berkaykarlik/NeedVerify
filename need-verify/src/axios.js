// axios
import axios from 'axios'

const ajax = axios.create({

})
ajax.CancelToken = axios.CancelToken
ajax.isCancel = axios.isCancel
/*
* The interceptor here ensures that we check for the token in local storage every time an ajax request is made
*/
ajax.interceptors.request.use(
 (config) => {
  var userObject = JSON.parse(localStorage.getItem("userObject"));
   let token = localStorage.getItem('accessToken')
   if (token && userObject) {
    config.headers['Token'] = token; 
    config.data = "u_id="+ userObject.u_id + "&" + config.data;
  }
  return config
 },
 (error) => {
   return Promise.reject(error)
 }
)
export default ajax