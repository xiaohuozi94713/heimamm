//封装所有用来处理localstorage的方法

//定义一个统一的key
const tokenKey = 'heimamm'

//设置token
export function setToken(value) {
    //将value对象转为字符串
    //var strValue = JSON.stringify(value)
    window.localStorage.setItem(tokenKey, value)
}

//获取token
export function getToken() {
    //重点：当取出token时，要将内容返回给外界
    return window.localStorage.getItem(tokenKey)
}

//删除token
export function removeToken() {
    window.localStorage.removeItem(tokenKey)
}