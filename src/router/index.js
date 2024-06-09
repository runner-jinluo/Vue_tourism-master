import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home'
import Function from 'components/function'
import Plan from 'components/function/plan'
import Query from 'components/function/query'
import Personal from 'components/function/personal'
import Check from 'components/function/check'
import Help from 'components/help'
import Login from 'components/user/login'
import Register from 'components/user/register'
import Center from 'components/user/center'
import Selectoption from 'components/user/selectoption'
import Review from 'components/user/review'
import Displayteam from 'components/function/displayteam'
import Blogdisplay from 'components/function/blogdisplay'
import Validator from 'vue-validator'


Vue.use(Validator)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/function',
      name: 'Function',
      component: Function
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },{
      path: '/login',
      name: 'Login',
      component: Login
    }
    ,{
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/center',
      name: 'Center',
      component: Center
    },
    {
      path: '/query',
      name: 'Query',
      component: Query
    },
    {
      path: '/plan',
      name: 'Plan',
      component: Plan
    },
    {
      path: '/Check',
      name: 'Check',
      component: Check
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/selectoption',
      name: 'Selectoption',
      component: Selectoption
    },

    {
      path: '/review',
      name: 'Review',
      component: Review
    },
    {
      path: '/displayteam',
      name: 'Displayteam',
      component: Displayteam
    },
    {
      path: '/blogdisplay',
      name: 'Blogdisplay',
      component: Blogdisplay
    }
  ]
})
