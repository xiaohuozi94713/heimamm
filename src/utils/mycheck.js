//封装两个方法：设置校验规则
//校验手机
export function checkPhone(rule, value, callback) {
    //定义一个验证手机的正则
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value)) {
        callback(); //验证正确，继续向后执行
    } else {
        callback(new Error("手机号不正确"));
    }

}

//校验邮箱
export function checkEmail(rule, value, callback) {
    //定义一个验证邮箱的正则
    var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error("邮箱不合法"));
    }
}