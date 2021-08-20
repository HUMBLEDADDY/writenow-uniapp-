import axios from 'axios'
import Vue from 'vue'
import axiosAdapterUniapp from 'axios-adapter-uniapp'

const http = axios.create({
    baseURL: 'http://localhost:3000',  
	// baseURL: 'http://124.71.228.65:3000',
	// adapter: axiosAdapterUniapp
})


http.interceptors.request.use(
    config => {
	console.log('请求拦截成功')
	if( uni.getStorageSync('usertoken')!='')
		config.headers.Authorization = 'Bearer ' + uni.getStorageSync('usertoken')
  return config;
}, error => {
        console.log(error); // for debug
        return Promise.reject(error);
});


// http.interceptors.response.use(res => {
//     return res
//   }, err => {
//       console.log(err.response.data.message)
//     if (err.response.data.message) {
//       Vue.prototype.$message({
//         type: 'error',
//         message: err.response.data.message
//       })
      
//       if (err.response.status === 401) {
//         router.push('/login')
//       }
//     }
    
//     return Promise.reject(err)
//   })

export default http;