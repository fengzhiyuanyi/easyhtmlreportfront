import Vue from 'vue'
import Router from 'vue-router'
import Perf from '@/components/tabs/Perf'
import Trace from '@/components/tabs/Trace'
import Progress from '@/components/tabs/Progress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/perf'
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
      path: '/progress',
      name: 'Progress',
      component: Progress
    }
  ]
})
