//用来封装所有与登录相关的接口文件（网络请求）

//导入axios
import axios from 'axios'

//创建一个新的axios对象，并且设置基地址
var instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    //由于使用到了验证码，跨域须携带cookie属性
    withCredentials: true
});

//axios.create:单独创建一个新的axios实例
//             这个实例的用法与axios对象是一样的
//             只不过实例可以创建对各，并且他们之间不会相互干扰
//             如果将来有这样的需求：
//             我们前端对应的服务器接口有两个基地址：
//             那么我们就可以为两个基地址分别创建两个axios实例，这样一来他们互不干扰
//注意点：
//       如果创建了axios实例，我们需要在下面导出处用它


export function apiLogin({ phone, password, code }) {
    //此处的instance相当于axios实例
    return instance({
        url: '/login',
        method: 'POST',
        data: {
            phone: phone,
            password: password,
            code: code
        }

    })
}