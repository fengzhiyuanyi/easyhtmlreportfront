import Vue from 'vue'
import Router from 'vue-router'
import Perf from '@/components/tabs/Perf'
import Trace from '@/components/tabs/Trace'
import screenshot from '@/components/tabs/screenshot'
import Progress from '@/components/tabs/Progress'
import Report from '@/components/Report'
import Pdf from '@/components/Pdf'
import Index from '@/components/Index'
import Overview from '@/components/Overview'
import Template from '@/components/Template'
import History from '@/components/History'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/report',
      name: 'Report',
      component: Report,
      children: [
        {
          path: '/report',
          redirect: '/report/screenshot'
        },
        {
          path: '/report/perf',
          name: 'Perf',
          component: Perf
        },
        {
          path: '/report/trace',
          name: 'Trace',
          component: Trace
        },
        {
          path: '/report/screenshot',
          name: 'screenshot',
          component: screenshot
        },
        {
          path: '/report/progress',
          name: 'Progress',
          component: Progress
        }
      ]
    },
    {
      path: '/pdf',
      name: 'Pdf',
      component: Pdf
    },
    {
      path: '/overview/:id',
      name: 'Overview',
      component: Overview
    },
    {
      path: '/template/:id',
      name: 'Template',
      component: Template
    },
    {
      path: '/history/:id',
      name: 'History',
      component: History
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
