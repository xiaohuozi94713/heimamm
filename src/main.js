import Vue from 'vue'
import App from './App.vue'

//导入路由
import router from './router/index'

//导入element-ui
import ElementUI from 'element-ui'
//导入element-ui css
import 'element-ui/lib/theme-chalk/index.css'

//引入全局css
import './style/index.css'

//注册element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //将路由注入到vue实例
  router
}).$mount('#app')
