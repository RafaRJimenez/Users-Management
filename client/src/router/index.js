import Vue from 'vue'
import Router from 'vue-router'
import PostComponent from '@/components/PostComponent'
import ListComponents from '@/components/ListComponents'
import EditPost from '@/components/EditPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/postcomponent'
    },
    {
      path: '/',
      redirect: '/postcomponent'
    },
    {
      path: '/listcomponents',
      name: 'listcomponents',
      component: ListComponents
    },
     {
      path: '/postcomponent',
      name: 'postcomponent',
      component: PostComponent
    },
     {
      path: '/editpost',
      name: 'editpost',
      component: EditPost,
      props:true
    }

  ]
})
