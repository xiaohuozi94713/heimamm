//用来封装请求注册接口的文件

//导入axios
import axios from 'axios'

//导出一个方法：得到验证码的方法
export function apiGetCode({code, phone}) {
    //将网络请求的结果返回给外界
    return axios({
        url: process.env.VUE_APP_ONLINEURL + `/sendsms`,
        data: {
            code:code,
            phone:phone
        },
        method: 'POST',
        // 请求接口时必须携带cookie
        withCredentials: true
    })
}
