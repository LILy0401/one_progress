import Vue from 'vue'
import Router from 'vue-router'
import ProjectEntry from './views/ProjectEntry.vue'
import GroupList from './views/GroupList.vue'
import GroupMember from './views/GroupMember.vue'
import taskList from './views/taskList.vue'
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Classlist from './views/ClassList.vue';
import CheckTask from './views/CheckTask.vue';

Vue.use(Router)

export default new Router({
  mode: 'hash',
  //history
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name:'login',
      component:Login
    },{
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path: '/projectEntry',
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
      path:'/classlist',
      name:'classlist',
      component:Classlist
    },{
      path:'/checkTask',
      name:'checkTask',
      component:CheckTask
    }
  ]
})
