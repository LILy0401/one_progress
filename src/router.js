import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ProjectEntry from './views/ProjectEntry.vue'
import GroupList from './views/GroupList.vue'
import GroupMember from './views/GroupMember.vue'
import taskList from './views/taskList.vue'
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router)

export default new Router({
  mode: 'hash',
  //history
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'ProjectEntry',
      component: ProjectEntry
    },
    {
      path: '/GroupList',
      name: 'GroupList',
      component: GroupList
    },
    {
      path: '/GroupMember',
      name: 'GroupMember',
      component: GroupMember
    },
    {
      path: '/taskList',
      name: 'taskList',
      component: taskList
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },{
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
