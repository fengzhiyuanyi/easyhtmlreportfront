import Vue from 'vue'
import Router from 'vue-router'
import Perf from '@/components/tabs/Perf'
import Trace from '@/components/tabs/Trace'
import screenshot from '@/components/tabs/screenshot'
import Progress from '@/components/tabs/Progress'
import Report from '@/components/Report'
import Pdf from '@/components/Pdf'
import Index from '@/components/Index'
import Template from '@/components/Template'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Report',
      component: Report,
      children: [
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
        },
        {
          path: '/progress',
          name: 'Progress',
          component: Progress
        }
      ]
    },
    {
      path: '/report',
      name: 'Pdf',
      component: Pdf
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/template/:id',
      name: 'Template',
      component: Template
    }
  ]
})
