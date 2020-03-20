//导入Vue
import Vue from 'vue'

//导入路由
import VueRouter from 'vue-router'
//导入login组件
import Login from '../views/login/index.vue'
//导入index组件
import Index from '../views/index/index.vue'
//导入数据概览组件
import Chart from '../views/chart/index.vue'
//导入用户列表组件
import User from '../views/user/index.vue'
//导入题库列表组件
import Question from '../views/question/index.vue'
//导入企业列表组件
import Enterprise from '../views/enterprise/index.vue'
//导入学科列表组件
import Subject from '../views/subject/index.vue'

//注册路由
Vue.use(VueRouter)

//路由实例化
const router = new VueRouter({
    routes: [
        //路由重定向 默认跳转到login页面
        {
            path: '/',
            redirect: '/login'
        },
        //登录页面
        {
            path: '/login',
            component: Login
        },
        //首页
        {
            path: '/index',
            component: Index,
            children: [
                { path: 'chart', component: Chart },
                { path: 'user', component: User },
                { path: 'question', component: Question },
                { path: 'enterprise', component: Enterprise },
                { path: 'subject', component: Subject }
            ]
        }
    ]
})

//将路由暴露出去
export default router;