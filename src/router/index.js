import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

// import Index from '@/components/Index'
import Edit from '@/components/Edit'
import ListVideo from '@/components/ListVideo'
import ListImg from '@/components/ListImg'
import Jobs from '@/components/Jobs'
import Home from '@/components/Home'

Vue.use(Router)
Vue.use(iView)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'listvideo',
          component: ListVideo
        },
        {
          path: 'listimg',
          component: ListImg
        },
        {
          path: 'edit',
          name: 'edit',
          component: Edit
        },
        {
          path: 'jobs',
          component: Jobs
        },
      ],
    }
    // {
    //   path: '/edit',
    //   name: 'edit',
    //   component: Edit
    // },
    // {
    //   path: '/index',
    //   name: 'index',
    //   component: Index
    // },
  ]
})
