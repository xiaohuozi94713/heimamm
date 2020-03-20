//用来封装首页所有网络请求的方法

//导入操作token的方法
import { getToken } from '../utils/mytoken'
//导入axios
import axios from 'axios'

//创建axios实例对象
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

//封装用户信息的接口
export function apiInfo() {
    return instance({
        url: '/info',
        method: 'GET',
        headers: {
            token: getToken()
        },
    })
}

//封装退出登录的方法
export function apiLogout (){
    return instance ({
        url:'/logout',
        method:'GET',
        headers:{
            token:getToken()
        }

    })
}