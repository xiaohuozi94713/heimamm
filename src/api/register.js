//用来封装与注册相关的接口的文件（网络请求）

//导入axios
import axios from 'axios'

//导出一个方法：得到验证码的方法
export function apiGetCode({ code, phone }) {
    //将网络请求的结果返回给外界
    return axios({
        url: process.env.VUE_APP_URL + `/sendsms`,
        data: {
            code: code,
            phone: phone
        },
        method: 'POST',
        // 请求接口时必须携带cookie
        withCredentials: true
    })
}

//导出一个方法：注册用户的方法
export function apiRegister({username,phone,email,avatar,password,rcode }) {
    return axios({
        url: process.env.VUE_APP_URL+'/register',
        method: 'POST',
        data: {
            username: username,
            phone: phone,
            email: email,
            avatar: avatar,
            password: password,
            rcode: rcode
        }
    })
}
