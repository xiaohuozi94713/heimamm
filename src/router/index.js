//导入Vue
import Vue from 'vue'

//导入路由
import VueRouter from 'vue-router'
//导入login组件
import Login from '../views/login/index.vue'

//注册路由
Vue.use(VueRouter)

//路由实例化
const router = new VueRouter({
    routes: [
        //路由重定向 默认跳转到login页面
        {
            path:'/',
            redirect:'/login'
        },
        {
            path: '/login',
            component: Login
        }
    ]
})

//将路由暴露出去
export default router;