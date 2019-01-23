import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/font-awesome.css'
import '@/assets/css/report.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import htmlToPdf from '@/components/htmlToPdf'

Vue.config.productionTip = false
Vue.use(htmlToPdf)
Vue.use(ElementUI)
Vue.prototype.moment = moment

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
