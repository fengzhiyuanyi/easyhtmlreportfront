import Vue from 'vue'
import Router from 'vue-router'
import Perf from '@/components/tabs/Perf'
import Trace from '@/components/tabs/Trace'
import screenshot from '@/components/tabs/screenshot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/screenshot'
    },
    {
      path: '/perf',
      name: 'Perf',
      component: Perf
    },
    {
      path: '/trace',
      name: 'Trace',
      component: Trace
    },
    {
      path: '/screenshot',
      name: 'screenshot',
      component: screenshot
    }
  ]
})
